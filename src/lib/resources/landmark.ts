import * as kryo from "kryo";
import {Uuid} from "./uuid";

export interface Landmark {
  id: Uuid;
  title: string;
  latitude: number;
  longitude: number;
}

/* tslint:disable-next-line:no-namespace */
export namespace Landmark {
  /**
   * Serialized route
   */
  export interface Json {
    id: string;
    title: string;
    latitude: number;
    longitude: number;
  }

  /**
   * Safe deserializer
   */
  export const type: kryo.DocumentType<Landmark> = new kryo.DocumentType<Landmark>({
    properties: {
      id: {
        type: Uuid.type
      },
      title: {
        type: new kryo.Ucs2StringType({maxLength: 300})
      },
      latitude: {
        type: new kryo.Float64Type({notNan: true, notInfinity: true})
      },
      longitude: {
        type: new kryo.Float64Type({notNan: true, notInfinity: true})
      }
    }
  });
}
