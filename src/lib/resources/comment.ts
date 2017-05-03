import * as kryo from "kryo";
import {PartialUser} from "./partial-user";
import {Uuid} from "./uuid";

export interface Comment {
  id: Uuid;
  author: PartialUser;
  text: string;
}

/* tslint:disable-next-line:no-namespace */
export namespace Comment {
  /**
   * Serialized route
   */
  export interface Json {
    id: string;
    author: PartialUser.Json;
    text: string;
  }

  /**
   * Safe deserializer
   */
  export const type: kryo.DocumentType<Comment> = new kryo.DocumentType<Comment>({
    properties: {
      id: {
        type: Uuid.type
      },
      text: {
        type: new kryo.Ucs2StringType({maxLength: 500})
      },
      author: {
        type: PartialUser.type
      }
    }
  });
}
