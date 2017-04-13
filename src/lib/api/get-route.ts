import {Context} from "../interfaces/api/context";
import {Route as ApiRoute} from "../interfaces/api/route";
import {Route as SequelizeRoute} from "../interfaces/sequelize/route";
import {toPlainRoute} from "../to-plain";

export async function getRoute(apiContext: Context, routeId: string): Promise<ApiRoute | null> {
  const route: SequelizeRoute | null = await apiContext.models.route.findOne({where: {id: routeId}});
  return route === null ? null : toPlainRoute(route, false);
}
