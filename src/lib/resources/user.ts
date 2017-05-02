import * as kryo from "kryo";
import {Uuid} from "./uuid";

export interface User {
  id: Uuid;
  username: string;
}

/* tslint:disable-next-line:no-namespace */
export namespace User {
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
  export const type: kryo.DocumentType<User> = new kryo.DocumentType<User>({
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
