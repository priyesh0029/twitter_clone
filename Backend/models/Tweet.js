import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';
import User from './User.js';

const Tweet = sequelize.define('Tweet', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  caption: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imgNames: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
}, {
  timestamps: true,
});

// Define the association between User and Tweet
User.hasMany(Tweet, { foreignKey: 'userId' });
Tweet.belongsTo(User, { foreignKey: 'userId' });

export default Tweet;
