import * as kryo from "kryo";
import {Api} from "../../lib/api";
import {CreateRouteOptions} from "../../lib/api/create-route";
import {Route} from "../../lib/interfaces/api/route";

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

export interface PostError {
  name: string;
  message: string;
}
export type PostResult = {status: 200, body: Route.Json} | {status: 400 | 403 | 500, body: PostError};

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
