import * as Sequelize from "sequelize";
import {Landmark as ApiLandmark} from "../resources/landmark";

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

export function defineLandmarkModel(db: Sequelize.Sequelize): LandmarkModel {
  return db.define<Landmark, any>("landmark", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    title: Sequelize.STRING,
    latitude: Sequelize.DOUBLE,
    longitude: Sequelize.DOUBLE
  });
}

export async function toPlainLandmark(landmark: Landmark): Promise<ApiLandmark> {
  const id: string = landmark.id;
  const title: string = landmark.title;
  const latitude: number = landmark.latitude;
  const longitude: number = landmark.longitude;
  return {id, title, latitude, longitude};
}

/* tslint:disable-next-line:no-namespace */
export namespace Landmark {
  export type Model = LandmarkModel;
  export const define: typeof defineLandmarkModel = defineLandmarkModel;
  export const toPlain: typeof toPlainLandmark = toPlainLandmark;
}
