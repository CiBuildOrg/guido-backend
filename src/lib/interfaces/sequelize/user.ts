import * as Sequelize from "sequelize";

/**
 * Sequelize instance of a User
 */
export interface User {
  id: string;
  username: string;
}

export type UserModel = Sequelize.Model<User, any>;
