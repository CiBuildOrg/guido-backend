import * as Sequelize from "sequelize";
import {Comment} from "./comment";
import {Landmark} from "./landmark";
import {Route} from "./route";
import {Tag} from "./tag";
import {User} from "./user";
import {Waypoint} from "./waypoint";

export {
  Comment,
  Landmark,
  Route,
  Tag,
  User,
  Waypoint
};

export interface Models {
  comment: Comment.Model;
  landmark: Landmark.Model;
  route: Route.Model;
  tag: Tag.Model;
  user: User.Model;
  waypoint: Waypoint.Model;
}

export function defineAll(db: Sequelize.Sequelize): Models {
  const comment: Comment.Model = Comment.define(db);
  const landmark: Landmark.Model = Landmark.define(db);
  const route: Route.Model = Route.define(db);
  const tag: Tag.Model = Tag.define(db);
  const user: User.Model = User.define(db);
  const waypoint: Waypoint.Model = Waypoint.define(db);

  comment.belongsTo(user, {as: "author"});
  landmark.hasMany(comment, {as: "comments"});
  route.hasMany(comment, {as: "comments"});
  route.hasMany(waypoint, {as: "waypoints"});
  route.belongsTo(user, {as: "author"});

  route.belongsToMany(tag, {as: "Tags", through: "routes_tags"});
  tag.belongsToMany(route, {as: "Routes", through: "routes_tags"});
  route.belongsToMany(user, {as: "Favorites", through: "routes_favorites"});
  user.belongsToMany(route, {as: "FavoriteRoutes", through: "routes_favorites"});
  route.belongsToMany(user, {as: "Likes", through: "routes_likes"});
  user.belongsToMany(route, {as: "LikedRoutes", through: "routes_likes"});
  route.belongsToMany(user, {as: "RecentUsers", through: "routes_recent"});
  user.belongsToMany(route, {as: "RecentRoutes", through: "routes_recent"});

  return {comment, landmark, route, tag, user, waypoint};
}
