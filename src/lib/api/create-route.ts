import {Context} from "../interfaces/api/context";
import {CreateRouteOptions} from "../interfaces/api/index";
import {Route as ApiRoute} from "../interfaces/api/route";
import {Route as SequelizeRoute} from "../interfaces/sequelize/route";
import {toPlainRoute} from "../to-plain";

export async function createRoute(apiContext: Context, options: CreateRouteOptions): Promise<ApiRoute> {
  const route: SequelizeRoute = await apiContext.models.route.create({
    title: options.title,
    description: options.description,
    duration: options.duration
  });
  return toPlainRoute(route, false);
}
