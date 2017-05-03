import {Route as DbRoute} from "../db-models/route";
import {ApiContext} from "../interfaces/api-context";
import {PartialRoute as ApiPartialRoute} from "../resources/route";

export interface GetRoutesOptions {
  keywords?: string;
  limit: number;
  near?: {latMin: number, latMax: number, longMin: number, longMax: number};
  tags?: string[];
}

export async function getRoutes(apiContext: ApiContext, options: GetRoutesOptions): Promise<ApiPartialRoute[]> {
  const query: any = {
    include: [],
    limit: 50,
    where: {}
  };
  if (options.keywords !== undefined) {
    query.where.title = {
      $like: "%" + options.keywords + "%"
    };
  }
  if (options.tags) {
    query.include.push({
      model: apiContext.models.tag,
      as: "Tags",
      where: {
        value: {
          $in: options.tags
        }
      }
    });
  }
  if (options.near) {
    query.include.push({
      model: apiContext.models.waypoint,
      as: "waypoints",
      where: {  // TODO(Lyrositor) Might not be the desired functionality
        latitude: {
          $and: {
            $gt: options.near.latMin,
            $lt: options.near.latMax
          }
        },
        longitude: {
          $and: {
            $gt: options.near.longMin,
            $lt: options.near.longMax
          }
        }
      }
    });
  }
  if (options.limit !== undefined) {
    query.limit = options.limit;
  }
  const routes: DbRoute[] = await apiContext.models.route.findAll(query);
  return Promise.all(
    routes.map((route: DbRoute): Promise<ApiPartialRoute> => {
      return DbRoute.toPlain(route, true);
    })
  );
}
