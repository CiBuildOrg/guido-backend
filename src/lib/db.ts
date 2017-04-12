import Sequelize = require("sequelize");
import {dbHost, dbName, dbPass, dbUser} from "./config";

export const db: Sequelize.Sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: "postgres"
});

const userModel: Sequelize.Model<any, any> = db.define("user", {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});
