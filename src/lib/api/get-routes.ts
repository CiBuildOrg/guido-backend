import {Context} from "../interfaces/api/context";
import {Route as ApiRoute} from "../interfaces/api/route";
import {Route as SequelizeRoute} from "../interfaces/sequelize/route";
import {toPlainRoute} from "../to-plain";

export async function getRoutes(apiContext: Context): Promise<ApiRoute[]> {
  const routes: SequelizeRoute[] = await apiContext.models.route.findAll();
  return Promise.all(
    routes.map((route: SequelizeRoute): Promise<ApiRoute> => {
      return toPlainRoute(route, false);
    })
  );
}
