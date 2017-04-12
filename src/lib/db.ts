import Sequelize = require("sequelize");
import {dbHost, dbName, dbPass, dbUser} from "./config";

export const db: Sequelize.Sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: "postgres"
});
