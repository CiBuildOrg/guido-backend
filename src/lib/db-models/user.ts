import * as Sequelize from "sequelize";
import {PartialRoute as ApiPartialRoute} from "../resources/partial-route";
import {PartialUser as ApiPartialUser} from "../resources/partial-user";
import {User as ApiUser} from "../resources/user";
import {Route} from "./route";

/**
 * Sequelize instance of a User
 */
export interface User {
  id: string;
  username: string;
  key: string;

  getFavoriteRoutes(): Promise<Route[]>;
  getRecentRoutes(): Promise<Route[]>;
  addFavoriteRoutes(route: Route): Promise<any>;
  addRecentRoutes(route: Route): Promise<any>;
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

export async function toPlainUser(user: User, partial: true): Promise<ApiPartialUser>;
export async function toPlainUser(user: User, partial: false): Promise<ApiUser>;
export async function toPlainUser(user: User, partial: any): Promise<any> {
  const id: string = user.id;
  const username: string = user.username;
  const partialUser: ApiPartialUser = {id, username};

  if (partial) {
    return partialUser;
  } else {
    const favoriteRoutes: ApiPartialRoute[] = await Route.toPlainList(await user.getFavoriteRoutes(), true);
    const recentRoutes: ApiPartialRoute[] = await Route.toPlainList(await user.getRecentRoutes(), true);
    return {...partialUser, favoriteRoutes, recentRoutes};
  }
}

export async function toPlainUsers(users: User[], partial: true): Promise<ApiPartialUser[]>;
export async function toPlainUsers(users: User[], partial: false): Promise<ApiUser[]>;
export async function toPlainUsers(users: User[], partial: any): Promise<any> {
  return Promise.all(users.map((user: User) => toPlainUser(user, partial)));
}

export namespace User {
  export type Model = UserModel;
  export const define: typeof defineUserModel = defineUserModel;
  export const toPlain: typeof toPlainUser = toPlainUser;
  export const toPlainList: typeof toPlainUsers = toPlainUsers;
}
