import {Api} from "../../lib/api";
import {Route} from "../../lib/resources/route";
import {Uuid} from "../../lib/resources/uuid";

export type GetResult = {status: 200, body: Route.Json} | {status: 400 | 404, body: any};

/**
 * Get all the route
 */
export async function get(api: Api, routeIdJson: Uuid.Json): Promise<GetResult> {
  let routeId: Uuid;
  try {
    routeId = Uuid.type.read("json", routeIdJson);
  } catch (err) {
    return {status: 400, body: {name: "InvalidRequest", message: err.toString()}};
  }
  let result: Route | null;
  try {
    result = await api.getRoute(routeId);
  } catch (err) {
    switch (err.name) {
      // TODO(demurgos): Handle the errors
      default:
        throw err;
    }
  }
  if (result === null) {
    return {status: 404, body: {name: "NotFound", message: "Route not found"}};
  } else {
    return {status: 200, body: Route.type.write("json", result) as Route.Json};
  }
}
