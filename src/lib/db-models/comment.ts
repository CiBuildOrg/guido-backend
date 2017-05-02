import * as Sequelize from "sequelize";
import {Comment as ApiComment} from "../resources/comment";
import {User as ApiUser} from "../resources/user";
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

export function defineCommentModel(db: Sequelize.Sequelize): CommentModel {
  return db.define<Comment, any>("comment", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    text: Sequelize.STRING
  });
}

export async function toPlainComment(comment: Comment): Promise<ApiComment> {
  const id: string = comment.id;
  const author: ApiUser = await User.toPlain(await comment.getAuthor());
  const text: string = comment.text;
  return {id, author, text};
}

export async function toPlainComments(comments: Comment[]): Promise<ApiComment[]> {
  return Promise.all(comments.map(toPlainComment));
}

/* tslint:disable-next-line:no-namespace */
export namespace Comment {
  export type Model = CommentModel;
  export const define: typeof defineCommentModel = defineCommentModel;
  export const toPlain: typeof toPlainComment = toPlainComment;
  export const toPlainList: typeof toPlainComments = toPlainComments;
}
