import * as kryo from "kryo";
import {User} from "./user";
import {Uuid} from "./uuid";

export interface Comment {
  id: Uuid;
  author: User;
  text: string;
}

/* tslint:disable-next-line:no-namespace */
export namespace Comment {
  /**
   * Serialized route
   */
  export interface Json {
    id: string;
    author: User.Json;
    text: string;
  }

  /**
   * Safe deserializer
   */
  export const type: kryo.DocumentType<User> = new kryo.DocumentType<User>({
    properties: {
      id: {
        type: Uuid.type
      },
      text: {
        type: new kryo.Ucs2StringType({maxLength: 500})
      },
      author: {
        type: User.type
      }
    }
  });
}
