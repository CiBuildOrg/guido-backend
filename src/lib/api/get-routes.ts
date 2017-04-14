import {Context} from "../interfaces/api/context";
import {PartialRoute as ApiPartialRoute} from "../interfaces/api/route";
import {Route as SequelizeRoute} from "../interfaces/sequelize/route";
import {toPlainRoute} from "../to-plain";

export async function getRoutes(apiContext: Context): Promise<ApiPartialRoute[]> {
  const routes: SequelizeRoute[] = await apiContext.models.route.findAll();
  return Promise.all(
    routes.map((route: SequelizeRoute): Promise<ApiPartialRoute> => {
      return toPlainRoute(route, true);
    })
  );
}
