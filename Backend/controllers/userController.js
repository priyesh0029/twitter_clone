import { Op } from "sequelize";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import sequelize from "../config/dbConfig.js";

export const userController = {

 getWhoToFollow : asyncHandler(async (req, res) => {
  try {
    const userId = req.query.userId;

    const user = await User.findByPk(userId);
    console.log("Logged user from the user controller: ", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure following is an array
    const followingIds = user.following || [];
    console.log("Following IDs: ", followingIds);

    const followList = await User.findAll({
      where: {
        id: {
          [Op.notIn]: followingIds.concat(userId), 
        },
        isDeleted: false,
      },
      attributes: ["id", "name", "username", "profileImage"],
      order: [["createdAt", "DESC"]],
      limit: 5,
    });

    const followListPlain = followList.map((user) =>
      user.get({ plain: true })
    );

    console.log(
      "Logged follow list from the user controller: ",
      followListPlain
    );

    res.status(200).json(followListPlain);
  } catch (error) {
    console.error("Error fetching who to follow list:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}),


  handleFollowUnfollow: asyncHandler(async (req, res) => {
    const logginedUserId = req.query.userId;
    const searchedUsername = req.body.userId;
    console.log("ioejgeophpweoheoh : ", req.body, searchedUsername);

    try {
      // Find the user by username
      const user = await User.findOne({
        where: { id: searchedUsername },
        attributes: ["id", "followers"],
      });

      if (!user) {
        throw new Error("User not found");
      }

      const followersArray = user.followers || [];

      const isFollower = followersArray.includes(logginedUserId);

      if (isFollower) {
        // Unfollow logic
        await Promise.all([
          User.update(
            {
              followers: sequelize.literal(
                `array_remove(followers, '${logginedUserId}')`
              ),
            },
            { where: { id: searchedUsername } }
          ),
          User.update(
            {
              following: sequelize.literal(
                `array_remove(following, '${user.id}')`
              ),
            },
            { where: { id: logginedUserId } }
          ),
        ]);
        res
          .status(200)
          .json({ status: true, user: logginedUserId, state: "removed" });
        return;
      } else {
        // Follow logic
        await Promise.all([
          User.update(
            {
              followers: sequelize.literal(
                `array_append(followers, '${logginedUserId}')`
              ),
            },
            { where: { id: searchedUsername } }
          ),
          User.update(
            {
              following: sequelize.literal(
                `array_append(following, '${user.id}')`
              ),
            },
            { where: { id: logginedUserId } }
          ),
        ]);
        res
          .status(200)
          .json({ status: true, user: logginedUserId, state: "added" });
      }
    } catch (error) {
      console.error("Error fetching who to follow list:", error);
      res.status(500).json({ message: "error occured during follow/unfollow request" });
    }
  }),
};
