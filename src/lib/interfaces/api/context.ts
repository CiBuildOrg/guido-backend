import {Sequelize} from "sequelize";
import {Models} from "../sequelize/index";

export interface Context {
  db: Sequelize;
  models: Models;
}
