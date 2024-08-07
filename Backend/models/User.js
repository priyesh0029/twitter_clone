import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true, 
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    unique: true, 
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true, 
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  following: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    allowNull: true,
  },
  followers: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    allowNull: true,
  },
}, {
  timestamps: true, 
});

export default User;
