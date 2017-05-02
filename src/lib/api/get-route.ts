import {Route as DbRoute} from "../db-models/route";
import {ApiContext} from "../interfaces/api-context";
import {Route as ApiRoute} from "../resources/route";

export async function getRoute(apiContext: ApiContext, routeId: string): Promise<ApiRoute | null> {
  const route: DbRoute | null = await apiContext.models.route.findOne({where: {id: routeId}});
  return route === null ? null : DbRoute.toPlain(route, false);
}
