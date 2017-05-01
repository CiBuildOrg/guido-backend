import {Context} from "../interfaces/api/context";
import {Route as ApiRoute} from "../interfaces/api/route";
import {Route as SequelizeRoute} from "../interfaces/sequelize/route";
import {toPlainRoute} from "../to-plain";

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

export async function createRoute(apiContext: Context, options: CreateRouteOptions): Promise<ApiRoute> {
  const route: SequelizeRoute = await apiContext.models.route.create({
    title: options.title,
    description: options.description,
    duration: options.duration
  });
  return toPlainRoute(route, false);
}
