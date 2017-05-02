import {Request, Response, Router} from "express";
import {Api} from "../lib/api";
import * as resources from "../lib/resources/index";
import {User} from "../lib/resources/user";
import bodyParser = require("body-parser");
import {authenticateUser} from "./auth";
import * as handlers from "./handlers/index";

export async function createApiRouter(api: Api): Promise<Router> {
  const apiRouter: Router = Router();

  apiRouter.get("/landmarks/:landmark_id", async function (req: Request, res: Response) {
    try {
      const landmarkId: string = req.params["landmark_id"];
      const landmark: resources.Landmark | null = await api.getLandmark(landmarkId);  // TODO(Lyrositor) Check input
      if (landmark === null) {
        res
          .status(404)
          .json({
            error: "Route not found"
          });
      } else {
        res
          .status(200)
          .json(landmark);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  apiRouter.get("/landmarks/", async function (req: Request, res: Response) {
    try {
      const landmarks: resources.Landmark[] = await api.getLandmarks();
      res.status(200).json(landmarks);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  apiRouter.get("/routes/:route_id", async function (req: Request, res: Response) {
    try {
      const routeId: string = req.params["route_id"];
      const route: resources.Route | null = await api.getRoute(routeId);  // TODO(Lyrositor) Check input
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
      const routes: resources.PartialRoute[] = await api.getRoutes();
      return res.status(200).json(routes);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  });

  apiRouter.post(
    "/routes",
    bodyParser.json(),
    async function (req: Request, res: Response) {
      // TODO(demurgos): Retrieve the user from the session or token
      const user: User | undefined = await authenticateUser(api.context, req);
      try {
        const {status, body} = await handlers.routes.post(api, user, req.body);
        res.status(status).json(body);
      } catch (err) {
        console.error(err);
        res.status(500).json({name: "InternalServerError", message: "Internal server error"});
      }
    }
  );

  apiRouter.get("/users/:user_id", async function (req: Request, res: Response) {
    try {
      const userId: string = req.params["user_id"];
      const user: User | null = await api.getUser(userId);  // TODO(Lyrositor) Check input
      if (user === null) {
        res
          .status(404)
          .json({
            error: "Route not found"
          });
      } else {
        res
          .status(200)
          .json(user);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  return apiRouter;
}

export default createApiRouter;
