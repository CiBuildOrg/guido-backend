import * as Sequelize from "sequelize";
import * as sequelizeInterfaces from "./interfaces/sequelize/index";

export function define(db: Sequelize.Sequelize): sequelizeInterfaces.Models {
  const route: sequelizeInterfaces.RouteModel = db.define<sequelizeInterfaces.Route, any>("route", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    duration: Sequelize.INTEGER
  });

  const tag: sequelizeInterfaces.TagModel = db.define<sequelizeInterfaces.Tag, any>("tag", {
    value: Sequelize.STRING
  });

  const user: sequelizeInterfaces.UserModel = db.define<sequelizeInterfaces.User, any>("user", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    username: Sequelize.STRING
  });

  const waypoint: sequelizeInterfaces.WaypointModel = db.define<sequelizeInterfaces.Waypoint, any>("waypoint", {
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
