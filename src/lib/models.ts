import * as Sequelize from "sequelize";
import * as sequelizeInterfaces from "./interfaces/sequelize/index";

export function define(db: Sequelize.Sequelize): sequelizeInterfaces.Models {
  const comment: sequelizeInterfaces.CommentModel = db.define<sequelizeInterfaces.Comment, any>("comment", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    text: Sequelize.STRING
  });

  const landmark: sequelizeInterfaces.LandmarkModel = db.define<sequelizeInterfaces.Landmark, any>("landmark", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    title: Sequelize.STRING,
    latitude: Sequelize.DOUBLE,
    longitude: Sequelize.DOUBLE
  });

  const route: sequelizeInterfaces.RouteModel = db.define<sequelizeInterfaces.Route, any>("route", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
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
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    username: Sequelize.STRING,
    key: Sequelize.STRING
  });

  const waypoint: sequelizeInterfaces.WaypointModel = db.define<sequelizeInterfaces.Waypoint, any>("waypoint", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    latitude: Sequelize.DOUBLE,
    longitude: Sequelize.DOUBLE,
    note: Sequelize.STRING,
    duration: Sequelize.INTEGER
  });

  comment.belongsTo(user, {as: "author"});
  landmark.hasMany(comment, {as: "comments"});
  route.hasMany(comment, {as: "comments"});
  route.hasMany(tag, {as: "tags"});
  route.hasMany(waypoint, {as: "waypoints"});
  route.belongsTo(user, {as: "author"});
  route.belongsToMany(user, {as: "favorites", through: "routes_favorites"});
  route.belongsToMany(user, {as: "likes", through: "routes_likes"});
  user.belongsToMany(route, {as: "favorites", through: "routes_favorites"});
  user.belongsToMany(route, {as: "likes", through: "routes_likes"});

  return {comment, landmark, route, tag, user, waypoint};
}
