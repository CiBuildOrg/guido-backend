import {Sequelize} from "sequelize";

export interface Context {
  db: Sequelize;
}
