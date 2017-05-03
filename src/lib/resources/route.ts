import * as kryo from "kryo";
import {Comment} from "./comment";
import {Tag} from "./tag";
import {User} from "./user";
import {Uuid} from "./uuid";
import {Waypoint} from "./waypoint";

export interface PartialRoute {
  id: Uuid;
  creationDate: Date;
  modificationDate: Date;
  title: string;
  description: string;
  imageUrl: string;
  author: User;
  duration: number;
  likes: number;
  favorites: number;
  tags: string[];
}

/* tslint:disable-next-line:no-namespace */
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
        type: new kryo.DocumentType<{}>({properties: {}})
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

export interface Route extends PartialRoute {
  waypoints: Waypoint[];
  comments: Comment[];
}

/* tslint:disable-next-line:no-namespace */
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
