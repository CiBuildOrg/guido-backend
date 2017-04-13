import * as Sequelize from "sequelize";

/**
 * Sequelize instance of a Tag
 */
export interface Tag {
  value: string;
}

export type TagModel = Sequelize.Model<Tag, any>;
