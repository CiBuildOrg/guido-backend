import {Ucs2StringType} from "kryo";

export type Uuid = string;

/* tslint:disable-next-line:no-namespace */
export namespace Uuid {
  export type Json = string;

  export const type: Ucs2StringType = new Ucs2StringType({
    lowerCase: true,
    trimmed: true,
    minLength: 36,
    maxLength: 36,
    pattern: /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
  });
}
