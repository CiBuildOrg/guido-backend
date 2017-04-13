import * as Sequelize from "sequelize";
import {
  Models,
  Route,
  RouteModel,
  Tag,
  TagModel,
  User,
  UserModel,
  Waypoint,
  WaypointModel
} from "./interfaces/models/index";

export function define(db: Sequelize.Sequelize): Models {
  const route: RouteModel = db.define<Route, any>("route", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    duration: Sequelize.INTEGER
  });

  const tag: TagModel = db.define<Tag, any>("tag", {
    value: Sequelize.STRING
  });

  const user: UserModel = db.define<User, any>("user", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    username: Sequelize.STRING
  });

  const waypoint: WaypointModel = db.define<Waypoint, any>("waypoint", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    latitude: Sequelize.DOUBLE,
    longitude: Sequelize.DOUBLE,
    note: Sequelize.STRING,
    duration: Sequelize.INTEGER
  });

  route.hasMany(tag, {as: "tags"});
  route.hasMany(waypoint, {as: "waypoints"});
  route.hasOne(user, {as: "author"});
  route.belongsToMany(user, {as: "favorites", through: "routes_favorites"});
  route.belongsToMany(user, {as: "likes", through: "routes_likes"});
  user.belongsToMany(route, {as: "favorites", through: "routes_favorites"});
  user.belongsToMany(route, {as: "likes", through: "routes_likes"});

  return {route, tag, user, waypoint};
}
