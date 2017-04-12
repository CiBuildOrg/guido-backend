import Sequelize = require("sequelize");
import {dbHost, dbName, dbPassword, dbUser} from "./config";

export const db: Sequelize.Sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: "postgres"
});
