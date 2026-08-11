import 'dotenv/config';
import { Sequelize } from 'sequelize';

const {
  DB_NAME = 'database',
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_PORT = 3306,
  DB_HOST = 'localhost',
} = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  port: DB_PORT,
  host: DB_HOST,
  dialect: 'mysql',
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('Database connected');
  } catch (error) {
    console.error(`error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
