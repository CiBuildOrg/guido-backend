import * as Sequelize from "sequelize";
import {User} from "./user";

/**
 * Sequelize instance of a Comment
 */
export interface Comment {
  id: string;
  author: User;
  text: string;

  getAuthor(): Promise<User>;
  setAuthor(author: User): Promise<any>;
}

export type CommentModel = Sequelize.Model<Comment, any>;
