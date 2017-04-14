import * as Sequelize from "sequelize";

/**
 * Sequelize instance of a Landmark
 */
export interface Landmark {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
}

export type LandmarkModel = Sequelize.Model<Landmark, any>;
