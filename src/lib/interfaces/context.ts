import {Sequelize} from "sequelize";
import {Models} from "./models/index";

export interface Context {
  db: Sequelize;
  models: Models;
}
