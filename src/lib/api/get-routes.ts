import {Route as DbRoute} from "../db-models/route";
import {ApiContext} from "../interfaces/api-context";
import {PartialRoute as ApiPartialRoute} from "../resources/route";

export interface GetRoutesOptions {
  keywords?: string;
  limit: number;
  near?: {latitude: number, longitude: number, radius: number};
  tags?: string[];
}

export async function getRoutes(apiContext: ApiContext, options: GetRoutesOptions): Promise<ApiPartialRoute[]> {
  const routes: DbRoute[] = await apiContext.models.route.findAll();
  return Promise.all(
    routes.map((route: DbRoute): Promise<ApiPartialRoute> => {
      return DbRoute.toPlain(route, true);
    })
  );
}
