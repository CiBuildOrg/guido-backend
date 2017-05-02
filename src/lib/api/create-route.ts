import {Route as DbRoute} from "../db-models/route";
import {ApiContext} from "../interfaces/api-context";
import {Route as ApiRoute} from "../resources/route";

export interface CreateRouteOptions {
  /**
   * The id of the author of the route.
   */
  authorId: string;

  /**
   * The title of the new route.
   */
  title: string;

  /**
   * The title of the new route.
   */
  description: string;

  /**
   * The integer number of minutes of the duration
   * of the route.
   */
  duration: number;
}

export async function createRoute(apiContext: ApiContext, options: CreateRouteOptions): Promise<ApiRoute> {
  const route: DbRoute = await apiContext.models.route.create({
    title: options.title,
    description: options.description,
    duration: options.duration
  });
  return DbRoute.toPlain(route, false);
}
