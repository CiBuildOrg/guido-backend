import * as kryo from "kryo";
import {Uuid} from "./uuid";

export interface PartialUser {
  id: Uuid;
  username: string;
}

export namespace PartialUser {
  /**
   * Serialized route
   */
  export interface Json {
    id: string;
    username: string;
  }

  /**
   * Safe deserializer
   */
  export const type: kryo.DocumentType<PartialUser> = new kryo.DocumentType<PartialUser>({
    properties: {
      id: {
        type: Uuid.type
      },
      username: {
        type: new kryo.Ucs2StringType({maxLength: 30})
      }
    }
  });
}
