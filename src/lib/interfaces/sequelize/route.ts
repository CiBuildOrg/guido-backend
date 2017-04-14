import * as Sequelize from "sequelize";
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

  getComments(): Promise<Comment>[];

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

  addTags(tag: Tag): Promise<any>;

  getTags(): Promise<Tag[]>;

  getWaypoints(): Promise<Waypoint[]>;
}

export type RouteModel = Sequelize.Model<Route, any>;
