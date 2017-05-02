import * as Sequelize from "sequelize";
import {User as ApiUser} from "../resources/user";

/**
 * Sequelize instance of a User
 */
export interface User {
  id: string;
  username: string;
  key: string;
}

export type UserModel = Sequelize.Model<User, any>;

export function defineUserModel(db: Sequelize.Sequelize): UserModel {
  return db.define<User, any>("user", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    username: Sequelize.STRING,
    key: Sequelize.STRING
  });
}

export async function toPlainUser(user: User): Promise<ApiUser> {
  const id: string = user.id;
  const username: string = user.username;
  return {id, username};
}

/* tslint:disable-next-line:no-namespace */
export namespace User {
  export type Model = UserModel;
  export const define: typeof defineUserModel = defineUserModel;
  export const toPlain: typeof toPlainUser = toPlainUser;
}
