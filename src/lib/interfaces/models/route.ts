import {Tag} from "./tag";
import {User} from "./user";
import {Waypoint} from "./waypoint";

export interface Route {
  id: string;
  title: string;
  description: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;

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

  /**
   * Gets the user who created a route.
   *
   * @return A promise to the author.
   */
  getAuthor(): Promise<User>;

  addTags(tag: Tag): Promise<any>;

  getTags(): Promise<Tag[]>;

  /**
   * Sets the author of a route.
   *
   * @param author The user who created the route.
   */
  setAuthor(author: User): Promise<any>;

  getWaypoints(): Promise<Waypoint[]>;
}
