import Sequelize = require("sequelize");

import {db} from "./db";

export interface Route {
  id: string;
  title: string;
  description: string;
  duration: number;
  addFavorites(user: User): Promise<any>;
  setAuthor(author: User): Promise<any>;
}

export interface User {
  id: string;
  username: string;
}

export interface Waypoint {
  id: string;
  latitude: number;
  longitude: number;
  note: string;
  duration: string;
}

export const routeModel: Sequelize.Model<Route, any> = db.define<Route, any>("route", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  duration: Sequelize.INTEGER
});

export const waypointModel: Sequelize.Model<any, any> = db.define<Waypoint, any>("waypoint", {
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

export const userModel: Sequelize.Model<User, any> = db.define<User, any>("user", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  username: Sequelize.STRING
});

routeModel.hasMany(waypointModel, {as: "waypoints"});
routeModel.hasOne(userModel, {as: "author"});
routeModel.belongsToMany(userModel, {as: "favorites", through: "favorite_routes"});
userModel.belongsToMany(routeModel, {as: "favorites", through: "favorite_routes"});
