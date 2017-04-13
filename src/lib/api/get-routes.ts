import {Context} from "../interfaces/context";
import {Route} from "../interfaces/models/route";

export async function getRoutes(apiContext: Context): Promise<Route[]> {
  return apiContext.models.route.findAll();
}
