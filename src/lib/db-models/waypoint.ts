import * as Sequelize from "sequelize";
import {Waypoint as ApiWaypoint} from "../resources/waypoint";

/**
 * Sequelize instance of a Waypoint
 */
export interface Waypoint {
  id: string;
  latitude: number;
  longitude: number;
  note: string;
  duration: number;
  order: number;
}

export type WaypointModel = Sequelize.Model<Waypoint, any>;

export function defineWaypointModel(db: Sequelize.Sequelize): WaypointModel {
  return db.define<Waypoint, any>("waypoint", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    latitude: Sequelize.DOUBLE,
    longitude: Sequelize.DOUBLE,
    note: Sequelize.STRING,
    duration: Sequelize.INTEGER,
    order: Sequelize.INTEGER
  });
}

export async function toPlainWaypoint(waypoint: Waypoint): Promise<ApiWaypoint> {
  return {
    id: waypoint.id,
    latitude: waypoint.latitude,
    longitude: waypoint.longitude,
    note: waypoint.note,
    duration: waypoint.duration
  };
}

export async function toPlainWaypoints(waypoints: Waypoint[]): Promise<ApiWaypoint[]> {
  return Promise.all(waypoints.sort((a, b) => a.order - b.order).map(toPlainWaypoint));
}

/* tslint:disable-next-line:no-namespace */
export namespace Waypoint {
  export type Model = WaypointModel;
  export const define: typeof defineWaypointModel = defineWaypointModel;
  export const toPlain: typeof toPlainWaypoint = toPlainWaypoint;
  export const toPlainList: typeof toPlainWaypoints = toPlainWaypoints;
}
