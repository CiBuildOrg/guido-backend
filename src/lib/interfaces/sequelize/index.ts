import {Route, RouteModel} from "./route";
import {Tag, TagModel} from "./tag";
import {User, UserModel} from "./user";
import {Waypoint, WaypointModel} from "./waypoint";

export interface Models {
  route: RouteModel;
  tag: TagModel;
  user: UserModel;
  waypoint: WaypointModel;
}

export {Route, RouteModel, Tag, TagModel, User, UserModel, Waypoint, WaypointModel};
