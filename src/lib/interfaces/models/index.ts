import * as Sequelize from "sequelize";
import {Route} from "./route";
import {Tag} from "./tag";
import {User} from "./user";
import {Waypoint} from "./waypoint";

export type RouteModel = Sequelize.Model<Route, any>;
export type TagModel = Sequelize.Model<Tag, any>;
export type UserModel = Sequelize.Model<User, any>;
export type WaypointModel = Sequelize.Model<Waypoint, any>;

export interface Models {
  route: RouteModel;
  tag: TagModel;
  user: UserModel;
  waypoint: WaypointModel;
}

export {Route, Tag, User, Waypoint};
