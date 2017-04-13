import {Context} from "../interfaces/context";
import {Route} from "../interfaces/models/route";

export async function getRoute(apiContext: Context, routeId: string): Promise<Route> {
  return apiContext.models.route.findOne({where: {id: routeId}});
}
