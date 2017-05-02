import * as kryo from "kryo";
import {Uuid} from "./uuid";

export interface Waypoint {
  id: Uuid;
  latitude: number;
  longitude: number;
  note: string;
  duration: number;
}

/* tslint:disable-next-line:no-namespace */
export namespace Waypoint {
  /**
   * Serialized route
   */
  export interface Json {
    id: string;
    latitude: number;
    longitude: number;
    note: string;
    duration: number;
  }

  /**
   * Safe deserializer
   */
  export const type: kryo.DocumentType<Waypoint> = new kryo.DocumentType<Waypoint>({
    properties: {
      id: {
        type: Uuid.type
      },
      latitude: {
        type: new kryo.Float64Type({notNan: true, notInfinity: true})
      },
      longitude: {
        type: new kryo.Float64Type({notNan: true, notInfinity: true})
      },
      note: {
        type: new kryo.Ucs2StringType({maxLength: 300})
      },
      duration: {
        type: new kryo.Int32Type()
      }
    }
  });
}
