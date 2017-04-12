import {User} from "./user";

export interface Route {
  id: string;
  title: string;
  description: string;
  duration: number;
  addFavorites(user: User): Promise<any>;
  setAuthor(author: User): Promise<any>;
}
