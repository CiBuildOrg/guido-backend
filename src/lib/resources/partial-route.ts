import * as kryo from "kryo";
import {PartialUser} from "./partial-user";
import {Tag} from "./tag";
import {Uuid} from "./uuid";

export interface PartialRoute {
  id: Uuid;
  creationDate: Date;
  modificationDate: Date;
  title: string;
  description: string;
  imageUrl: string;
  author: PartialUser;
  duration: number;
  likes: number;
  favorites: number;
  tags: string[];
}

export namespace PartialRoute {
  /**
   * Serialized route
   */
  export interface Json {
    id: string;
    creationDate: string;
    modificationDate: string;
    title: string;
    description: string;
    author: {};
    duration: number;
    likes: number;
    favorites: number;
    tags: string[];
  }

  /**
   * Safe deserializer
   */
  export const type: kryo.DocumentType<PartialRoute> = new kryo.DocumentType<PartialRoute>({
    properties: {
      id: {
        type: Uuid.type
      },
      creationDate: {
        type: new kryo.DateType()
      },
      modificationDate: {
        type: new kryo.DateType()
      },
      title: {
        type: new kryo.Ucs2StringType({maxLength: 100})
      },
      description: {
        type: new kryo.Ucs2StringType({maxLength: 500})
      },
      imageUrl: {
        type: new kryo.Ucs2StringType({maxLength: 500})
      },
      author: {
        type: PartialUser.type
      },
      duration: {
        type: new kryo.Int32Type()
      },
      likes: {
        type: new kryo.Int32Type()
      },
      favorites: {
        type: new kryo.Int32Type()
      },
      tags: {
        type: new kryo.ArrayType({
          itemType: Tag.type,
          maxLength: 20
        })
      }
    }
  });
}
