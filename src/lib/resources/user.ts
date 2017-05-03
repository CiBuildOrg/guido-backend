import * as kryo from "kryo";
import {PartialRoute} from "./partial-route";
import {PartialUser} from "./partial-user";

export interface User extends PartialUser {
  recentRoutes: PartialRoute[];
  favoriteRoutes: PartialRoute[];
}

export namespace User {
  /**
   * Serialized route
   */
  export interface Json extends PartialUser.Json {
    recentRoutes: PartialRoute.Json[];
    favoriteRoutes: PartialRoute.Json[];
  }

  /**
   * Safe deserializer
   */
  export const type: kryo.DocumentType<User> = new kryo.DocumentType<User>({
    properties: {
      ...PartialUser.type.properties,
      recentRoutes: {
        type: new kryo.ArrayType({
          itemType: PartialRoute.type,
          maxLength: 30
        })
      },
      favoriteRoutes: {
        type: new kryo.ArrayType({
          itemType: PartialRoute.type,
          maxLength: 30
        })
      }
    }
  });
}
