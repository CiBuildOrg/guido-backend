import * as kryo from "kryo";
import {Comment} from "./comment";
import {PartialRoute} from "./partial-route";
import {Waypoint} from "./waypoint";

export interface Route extends PartialRoute {
  waypoints: Waypoint[];
  comments: Comment[];
}

export namespace Route {
  /**
   * Serialized Route
   */
  export interface Json extends PartialRoute.Json {
    waypoints: Waypoint.Json[];
    comments: Comment.Json[];
  }

  export const type: kryo.DocumentType<Route> = new kryo.DocumentType<Route>({
    properties: {
      ...PartialRoute.type.properties,
      waypoints: {
        type: new kryo.ArrayType({
          itemType: Waypoint.type,
          maxLength: 100
        })
      },
      comments: {
        type: new kryo.ArrayType({
          itemType: Comment.type,
          maxLength: 100
        })
      }
    }
  });
}
