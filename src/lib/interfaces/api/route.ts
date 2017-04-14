import {User} from "./user";

export interface PartialRoute {
  id: string;
  creationDate: Date;
  modificationDate: Date;
  title: string;
  description: string;
  author: User;
  duration: number;
  likes: number;
  favorites: number;
  tags: string[];
}

export interface Route extends PartialRoute {
  waypoints: any[];
}
