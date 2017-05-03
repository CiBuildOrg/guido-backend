import * as kryo from "kryo";
import {Api} from "../../lib/api";
import {CreateRouteOptions} from "../../lib/api/create-route";
import {GetRoutesOptions} from "../../lib/api/get-routes";
import {PartialRoute, Route} from "../../lib/resources/route";
import {Tag} from "../../lib/resources/tag";

/**
 * Deserialized request
 */
export interface CreateRouteBody {
  title: string;
  description: string;
  duration: number;
}

/* tslint:disable-next-line:no-namespace */
export namespace CreateRouteBody {
  /**
   * Serialized request
   */
  export interface Json {
    title: string;
    description: string;
    duration: number;
  }

  /**
   * Safe deserializer
   */
  export const type: kryo.DocumentType<CreateRouteBody> = new kryo.DocumentType<CreateRouteBody>({
    ignoreExtraKeys: true,
    properties: {
      title: {
        type: new kryo.Ucs2StringType({maxLength: 100})
      },
      description: {
        type: new kryo.Ucs2StringType({maxLength: 500})
      },
      duration: {
        type: new kryo.Int32Type()
      }
    }
  });
}

export type GetRoutesQuery = GetRoutesOptions;

/* tslint:disable-next-line:no-namespace */
export namespace GetRoutesQuery {
  export type Json = GetRoutesOptions;

  export const type: kryo.DocumentType<GetRoutesQuery> = new kryo.DocumentType<GetRoutesQuery>({
    ignoreExtraKeys: true,
    properties: {
      keywords: {
        optional: true,
        type: new kryo.Ucs2StringType({maxLength: 100})
      },
      limit: {
        optional: true,
        type: new kryo.Int32Type()
      },
      near: {
        optional: true,
        type: new kryo.DocumentType<any>({
          ignoreExtraKeys: false,
          properties: {
            latMin: {
              type: new kryo.Float64Type()
            },
            latMax: {
              type: new kryo.Float64Type()
            },
            longMin: {
              type: new kryo.Float64Type()
            },
            longMax: {
              type: new kryo.Float64Type()
            }
          }
        })
      },
      tags: {
        optional: true,
        type: new kryo.ArrayType({
          itemType: Tag.type,
          maxLength: 50
        })
      }
    }
  });
}

export interface HandlerError {
  name: string;
  message: string;
}
export type GetResult = {status: 200, body: PartialRoute.Json[]} | {status: 400 | 500, body: HandlerError};
export type PostResult = {status: 200, body: Route.Json} | {status: 400 | 403 | 500, body: HandlerError};

/**
 * Get routes, filtered by query search parameters.
 */
export async function get(api: Api, query: GetRoutesQuery.Json): Promise<GetResult> {
  let options: GetRoutesQuery;
  try {
    options = GetRoutesQuery.type.read("qs", query);
  } catch (err) {
    return {status: 400, body: {name: "InvalidRequest", message: err.toString()}};
  }
  let result: PartialRoute[];
  try {
    result = await api.getRoutes(options);
  } catch (err) {
    switch (err.name) {
      // TODO(demurgos): Handle the errors
      default:
        throw err;
    }
  }
  return {status: 200, body: result.map((route) => PartialRoute.type.write("json", route)) as PartialRoute.Json[]};
}
/**
 * Create a new Route
 */
export async function post(api: Api, user: {id: string} | undefined, body: CreateRouteBody.Json): Promise<PostResult> {
  if (user === undefined) {
    return {status: 403, body: {name: "AuthenticationRequired", message: "Authentication required"}};
  }

  let options: CreateRouteBody;
  try {
    options = CreateRouteBody.type.read("json", body);
  } catch (err) {
    return {status: 400, body: {name: "InvalidRequest", message: err.toString()}};
  }
  let result: Route;
  try {
    result = await api.createRoute({...options, authorId: user.id});
  } catch (err) {
    switch (err.name) {
      // TODO(demurgos): Handle the errors
      default:
        throw err;
    }
  }
  return {status: 200, body: Route.type.write("json", result) as Route.Json};
}
