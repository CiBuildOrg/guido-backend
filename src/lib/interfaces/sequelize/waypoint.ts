import * as Sequelize from "sequelize";

/**
 * Sequelize instance of a Waypoint
 */
export interface Waypoint {
  id: string;
  latitude: number;
  longitude: number;
  note: string;
  duration: string;
}

export type WaypointModel = Sequelize.Model<Waypoint, any>;
