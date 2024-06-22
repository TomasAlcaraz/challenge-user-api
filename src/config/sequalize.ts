import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User';

const sequelize = new Sequelize({
  database: 'user_management_db',
  dialect: 'mysql',
  username: 'root',
  password: '',
  models: [User],
});

export { sequelize };
