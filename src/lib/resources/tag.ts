import {Ucs2StringType} from "kryo";

export type Tag = string;

/* tslint:disable-next-line:no-namespace */
export namespace Tag {
  export type Json = string;

  export const type: Ucs2StringType = new Ucs2StringType({
    lowerCase: true,
    trimmed: true,
    maxLength: 50
  });
}
