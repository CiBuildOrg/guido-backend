import {Sequelize} from "sequelize";
import {Models} from "../db-models/index";

export interface ApiContext {
  db: Sequelize;
  models: Models;
}
