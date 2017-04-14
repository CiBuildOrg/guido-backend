import {Comment, CommentModel} from "./comment";
import {Landmark, LandmarkModel} from "./landmark";
import {Route, RouteModel} from "./route";
import {Tag, TagModel} from "./tag";
import {User, UserModel} from "./user";
import {Waypoint, WaypointModel} from "./waypoint";

export interface Models {
  comment: CommentModel;
  landmark: LandmarkModel;
  route: RouteModel;
  tag: TagModel;
  user: UserModel;
  waypoint: WaypointModel;
}

export {
  Comment,
  CommentModel,
  Landmark,
  LandmarkModel,
  Route,
  RouteModel,
  Tag,
  TagModel,
  User,
  UserModel,
  Waypoint,
  WaypointModel
};
