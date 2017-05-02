import * as Sequelize from "sequelize";
import {Tag as ApiTag} from "../resources/tag";

/**
 * Sequelize instance of a Tag
 */
export interface Tag {
  value: string;
}

export type TagModel = Sequelize.Model<Tag, any>;

export function defineTagModel(db: Sequelize.Sequelize): TagModel {
  return db.define<Tag, any>("tag", {
    value: Sequelize.STRING
  });
}

export async function toPlainTag(tag: Tag): Promise<ApiTag> {
  return tag.value;
}

export async function toPlainTags(tags: Tag[]): Promise<ApiTag[]> {
  return Promise.all(tags.map(toPlainTag));
}

/* tslint:disable-next-line:no-namespace */
export namespace Tag {
  export type Model = TagModel;
  export const define: typeof defineTagModel = defineTagModel;
  export const toPlain: typeof toPlainTag = toPlainTag;
  export const toPlainList: typeof toPlainTags = toPlainTags;
}
