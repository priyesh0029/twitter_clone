import User from '../models/User.js';
import Tweet from '../models/Tweet.js';
import asyncHandler from 'express-async-handler';
import { HttpStatus } from '../utilities/errorTypes.js';
import { ErrorMessage } from '../utilities/errorMessage.js';

export const userController = {
  getWhoToFollow: asyncHandler(async (req, res) => {
    try {
      const userId = req.query.userId;

      const user = await User.query().findById(userId);
      console.log("Logged user from the user controller: ", user);

      if (!user) {
        // return res.status(404).json({ message: "User not found" });
        throw new Error(ErrorMessage.USER_NOT_FOUND_ERR,HttpStatus.NOT_FOUND);
      }

      // Ensure following is an array
      const followingIds = user.following || [];
      console.log("Following IDs: ", followingIds);

      const followList = await User.query()
        .whereNotIn('id', [...followingIds, userId])
        .where('isDeleted', false)
        .select('id', 'name', 'username', 'profileImage')
        .orderBy('created_at', 'DESC')
        .limit(5);

      console.log(
        "Logged follow list from the user controller: ",
        followList
      );

      res.status(200).json(followList);
    } catch (error) {
      console.error("Error fetching who to follow list:", error);
      // res.status(500).json({ message: "Internal server error" });
      throw new Error(ErrorMessage.SERVER_ERROR,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }),

  handleFollowUnfollow: asyncHandler(async (req, res) => {
    const loggedInUserId = req.query.userId;
    const searchedUserId = req.body.userId;
    console.log("Request Body: ", req.body);

    // console.log("Request Body: ", req.body, searchedUserId);

    try {
      // Find the user by id
      const user = await User.query().findById(searchedUserId).select('id', 'followers');

      if (!user) {
        // return res.status(404).json({ message: "User not found" });
        throw new Error(ErrorMessage.USER_NOT_FOUND_ERR,HttpStatus.NOT_FOUND);

      }

      const followersArray = user.followers || [];
      const isFollower = followersArray.includes(loggedInUserId);

      if (isFollower) {
        // Unfollow logic
        await Promise.all([
          User.query().patch({
            followers: User.raw(`array_remove(followers, ?)`, [loggedInUserId]),
          }).where({ id: searchedUserId }),
          User.query().patch({
            following: User.raw(`array_remove(following, ?)`, [user.id]),
          }).where({ id: loggedInUserId }),
        ]);
        res.status(200).json({ status: true, user: loggedInUserId, state: "removed" });
      } else {
        // Follow logic
        await Promise.all([
          User.query().patch({
            followers: User.raw(`array_append(followers, ?)`, [loggedInUserId]),
          }).where({ id: searchedUserId }),
          User.query().patch({
            following: User.raw(`array_append(following, ?)`, [user.id]),
          }).where({ id: loggedInUserId }),
        ]);
        res.status(200).json({ status: true, user: loggedInUserId, state: "added" });
      }
    } catch (error) {
      console.error("Error handling follow/unfollow:", error);
      // res.status(500).json({ message: "Error occurred during follow/unfollow request" });
      throw new Error(ErrorMessage.SERVER_ERROR,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }),

  handleProfile: asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    console.log("userId: ", userId);

    if (typeof userId !== 'string') {
      // return res.status(400).json({ success: false, message: 'Invalid user ID' });
      throw new Error(ErrorMessage.INVALID_USER_ID,HttpStatus.BAD_REQUEST);
    }

    try {
      // Fetch user's tweets
      let tweets = []
       tweets = await Tweet.query()
        .where({ userId: userId, isDeleted: false })
        .withGraphFetched('user')
        .orderBy('created_at', 'DESC');

      console.log("User with user and tweet details:", tweets);

      if(tweets.length === 0){
       const user = await User.query()
        .where({ id: userId, isDeleted: false })
        .first()
        tweets.push({user})
       
      }

      return res.status(200).json({
        success: true,
        message: 'User profile fetched successfully',
        data: tweets,
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // return res.status(500).json({ success: false, message: 'Internal server error' });
      throw new Error(ErrorMessage.SERVER_ERROR,HttpStatus.INTERNAL_SERVER_ERROR);

    }
  }),

  changePropic: asyncHandler(async (req, res) => {
    try {
      const media = req.files;
      let filename;

      if (media && media.length > 0 && media[0].filename) {
        filename = media[0].filename;
      }

      const userId = req.query.userId;

      if (!userId || typeof userId !== 'string') {
        // return res.status(400).json({ success: false, message: 'Invalid user ID' });
        throw new Error(ErrorMessage.INVALID_USER_ID,HttpStatus.BAD_REQUEST);
      }

      console.log("User inside change profile picture function: ", userId, filename);

      // Update the user's profile image
      const affectedCount = await User.query()
        .patch({ profileImage: filename })
        .where({ id: userId });

      console.log("Affected count:", affectedCount);

      if (affectedCount > 0) {
        return res.status(200).json({
          success: true,
          message: 'Profile image changed successfully',
        });
      } else {
        // return res.status(404).json({
        //   success: false,
        //   message: 'User not found',
        // });
        throw new Error(ErrorMessage.USER_NOT_FOUND_ERR,HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.error('Error changing profile picture:', error);
      // return res.status(500).json({ success: false, message: 'Internal server error' });
      throw new Error(ErrorMessage.SERVER_ERROR,HttpStatus.INTERNAL_SERVER_ERROR);

    }
  }),
};
