import * as Sequelize from "sequelize";
import {Comment as ApiComment} from "../resources/comment";
import {PartialRoute as ApiPartialRoute, Route as ApiRoute} from "../resources/route";
import {User as ApiUser} from "../resources/user";
import {Uuid} from "../resources/uuid";
import {Waypoint as ApiWaypoint} from "../resources/waypoint";
import {Comment} from "./comment";
import {Tag} from "./tag";
import {User} from "./user";
import {Waypoint} from "./waypoint";

/**
 * Sequelize instance of a Route
 */
export interface Route {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;

  /**
   * Gets the user who created a route.
   *
   * @return A promise to the author.
   */
  getAuthor(): Promise<User>;

  /**
   * Sets the author of a route.
   *
   * @param author The user who created the route.
   */
  setAuthor(author: User): Promise<any>;

  addComments(comment: Comment): Promise<any>;

  addWaypoints(waypoint: Waypoint): Promise<any>;

  getComments(): Promise<Comment[]>;

  /**
   * Adds a single user favorite to a route.
   *
   * @param user The user who favorited the route.
   */
  addFavorites(user: User): Promise<any>;

  getFavorites(): Promise<User>[];

  /**
   * Adds a single user like to a route.
   *
   * @param user The user who liked the route.
   */
  addLikes(user: User): Promise<any>;

  getLikes(): Promise<User>[];

  addTags(tags: Tag[]): Promise<any>;

  getTags(): Promise<Tag[]>;

  getWaypoints(): Promise<Waypoint[]>;
}

export type RouteModel = Sequelize.Model<Route, any>;

export function defineRouteModel(db: Sequelize.Sequelize): RouteModel {
  return db.define<Route, any>("route", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    imageUrl: Sequelize.STRING,
    duration: Sequelize.INTEGER
  });
}

export async function toPlainRoute(route: Route, partial: true): Promise<ApiPartialRoute>;
export async function toPlainRoute(route: Route, partial: false): Promise<ApiRoute>;
export async function toPlainRoute(route: Route, partial: boolean): Promise<any> {
  const id: Uuid = route.id;
  const title: string = route.title;
  const description: string = route.description;
  const imageUrl: string = route.imageUrl;
  const author: ApiUser = await User.toPlain(await route.getAuthor());
  const creationDate: Date = route.createdAt;
  const modificationDate: Date = route.updatedAt;
  const duration: number = route.duration;
  const likes: number = (await route.getLikes()).length;
  const favorites: number = (await route.getFavorites()).length;
  const tags: string[] = await Tag.toPlainList(await route.getTags());

  const partialRoute: ApiPartialRoute = {
    id, title, description, imageUrl, author, creationDate,
    modificationDate, duration, likes, favorites, tags
  };

  if (partial) {
    return partialRoute;
  } else {
    const comments: ApiComment[] = await Comment.toPlainList(await route.getComments());
    const waypoints: ApiWaypoint[] = await Waypoint.toPlainList(await route.getWaypoints());
    return {...partialRoute, comments, waypoints};
  }
}

/* tslint:disable-next-line:no-namespace */
export namespace Route {
  export type Model = RouteModel;
  export const define: typeof defineRouteModel = defineRouteModel;
  export const toPlain: typeof toPlainRoute = toPlainRoute;
}
