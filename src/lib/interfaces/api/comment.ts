import {User} from "./user";

export interface Comment {
  id: string;
  author: User;
  text: string;
}
