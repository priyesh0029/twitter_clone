import User from '../models/User.js';
import Tweet from '../models/Tweet.js';
import asyncHandler from 'express-async-handler';
import AppError from '../utilities/appError.js';

export const tweetController = {
  createTweet: asyncHandler(async (req, res) => {
    try {
      const media = req.files;
      let filenames
      if (media !== undefined && media.length !== 0) {
        filenames = media.map((element) => element.filename);
      }

      const userId = req.query.userId;
      const { text } = req.body;

      console.log("filename array after updating cloudinary : ",filenames);
      if (!Array.isArray(filenames) || !filenames.every(item => typeof item === 'string')) {
        throw new Error('imgNames should be an array of strings.');
      }
      // const formattedArrayString = `{${filenames.join(',')}}`;


      // Create tweet details
      const tweetDetails = {
        caption: text,
        imgNames: filenames,
        userId: userId,
      };

      // Create new tweet
      const newTweet = await Tweet.query().insert(tweetDetails);

      // Fetch the tweet along with user details
      const tweetWithUser = await Tweet.query()
        .findById(newTweet.id)
        .withGraphFetched('user');

      return res.status(201).json({
        success: true,
        message: 'Tweet created successfully',
        data: tweetWithUser,
      });
    } catch (error) {
      console.error('Error creating tweet:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }),

  // Get all tweets
  getAllTweets: asyncHandler(async (req, res) => {
    try {
      const userId = req.query.userId;

      // Find the user to get the following list
      const user = await User.query().findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const followingIds = user.following || [];
      const userIds = [userId, ...followingIds];

      const tweets = await Tweet.query()
        .whereIn('userId', userIds)
        .where('isDeleted', false)
        .withGraphFetched('user')
        .orderBy('created_at', 'desc');

      res.status(200).json({
        success: true,
        data: tweets,
      });
    } catch (error) {
      console.error('Error fetching tweets:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }),
};
