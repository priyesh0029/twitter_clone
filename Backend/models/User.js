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
  following: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    allowNull: true,
  },
}, {
  timestamps: true, 
});

export default User;
