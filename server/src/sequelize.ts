import {Sequelize} from 'sequelize';

export default new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS, {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  define: {
    underscored: true,
    // timestamps: false
  },
  logging: false,
  timezone: '+00:00',
});
