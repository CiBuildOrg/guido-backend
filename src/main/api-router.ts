import {Request, Response, Router} from "express";
import {Api} from "../lib/api";
import * as api from "../lib/interfaces/api";

export async function createApiRouter(api: Api): Promise<Router> {
  const apiRouter: Router = Router();

  apiRouter.get("/routes/:route_id", async function (req: Request, res: Response) {
    try {
      const routeId: string = req.params["route_id"];
      const route: api.Route | null = await api.getRoute(routeId);
      if (route === null) {
        res
          .status(404)
          .json({
            error: "Route not found"
          });
      } else {
        res
          .status(200)
          .json(route);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  apiRouter.get("/routes/", async function (req: Request, res: Response) {
    try {
      const routes: api.Route[] = await api.getRoutes();
      res.status(200).json(routes);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  return apiRouter;
}

export default createApiRouter;
