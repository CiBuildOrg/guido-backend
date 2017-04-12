import {Context} from "../interfaces/context";
import {Route} from "../interfaces/route";

export async function getRoute(apiContext: Context, routeId: string): Promise<Route> {
  return {
    id: "eee-ff-ss-x",
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "My route",
    description: "A nice route",
    author: {},
    waypoints: [],
    duration: 123,
    votes: 23,
    favorites: 45,
    tags: ["lyon", "landmarks"]
  };
}
