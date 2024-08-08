import User from '../models/User.js';
import Tweet from '../models/Tweet.js';
import asyncHandler from 'express-async-handler';
import AppError from '../utilities/appError.js';
import { Op } from 'sequelize';

export const tweetController = {
  createTweet: asyncHandler(async (req, res) => {
    try {
      const media = req.files;
      let filenames;
      if (media !== undefined && media.length !== 0) {
        filenames = media.map((element) => element.filename);
      }

      const userId = req.query.userId;
      const { text } = req.body;

      // Create tweet details
      const tweetDetails = {
        caption: text,
        imgNames: filenames,
        userId: userId,
      };

      // Create new tweet
      const newTweet = await Tweet.create(tweetDetails);

      return res.status(201).json({
        success: true,
        message: 'Tweet created successfully',
        data: newTweet,
      });
    } catch (error) {
      console.error('Error creating tweet:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }),



  //TO GET getAllTweets

  getAlltTweets : async (req, res) => {
    try {
      const userId = req.query.userId;
  
      // Find the user to get the following list
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const followingIds = user.following || [];
      const userIds = [userId, ...followingIds];
  
      const tweets = await Tweet.findAll({
        where: {
          userId: {
            [Op.or]: userIds,
          },
          isDeleted: false, 
        },
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'username', 'email'],
          },
        ],
        order: [['createdAt', 'DESC']],
      });
  
      res.status(200).json(tweets);
    } catch (error) {
      console.error('Error fetching tweets:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

};
