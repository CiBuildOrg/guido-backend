import {Request, Response, Router} from "express";

import {Api} from "../lib/api";
import {Route, User, Waypoint} from "../lib/interfaces/models/index";
import {Route as PlainRoute, User as PlainUser, Waypoint as PlainWaypoint} from "./interfaces/index";
import * as plain from "./interfaces/index";

export async function createApiRouter(api: Api): Promise<Router> {
  const apiRouter: Router = Router();

  apiRouter.get("/routes/:route_id", async function (req: Request, res: Response) {
    const routeId: string = req.params["route_id"];
    const route: Route = await api.getRoute(routeId);
    if (route === null) {
      res.status(404).json({
        error: "Route not found"
      });
      return;
    }
    res.status(200).json(await serializeRoute(route, true));
  });

  apiRouter.get("/routes/", async function (req: Request, res: Response) {
    const result: plain.Route[] = [];
    const routes: Route[] = await api.getRoutes();
    for (const route of routes) {
      result.push(await serializeRoute(route, false));
    }
    res.status(200).json(result);
  });

  return apiRouter;
}

// TODO(Lyrositor) Move these to a more appropriate location
async function serializeRoute(route: Route, withWaypoints: boolean): Promise<plain.Route> {
  // TODO(Lyrositor) Consider removing additional database requests from here
  const result: plain.Route = {
    id: route.id,
    title: route.title,
    description: route.description,
    author: await serializeUser(await route.getAuthor()),
    creation_date: route.createdAt,
    modification_date: route.updatedAt,
    duration: await route.duration,
    likes: (await route.getLikes()).length,
    favorites: (await route.getFavorites()).length,
    tags: []
  };
  if (withWaypoints) {
    result.waypoints = await serializeWaypoints(await route.getWaypoints());
  }
  return result;
}

async function serializeUser(author: User): Promise<plain.User> {
  return {
    id: author.id,
    username: author.username
  };
}

async function serializeWaypoints(waypoints: Waypoint[]): Promise<plain.Waypoint[]> {
  const result: PlainWaypoint[] = [];
  for (const waypoint of waypoints) {
    result.push({
      id: waypoint.id,
      latitude: waypoint.latitude,
      longitude: waypoint.longitude,
      note: waypoint.note,
      duration: waypoint.duration
    });
  }
  return result;
}

export default createApiRouter;
