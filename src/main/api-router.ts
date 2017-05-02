import {Request, Response, Router} from "express";
import {Api} from "../lib/api";
import * as resources from "../lib/resources/index";
import {User} from "../lib/resources/user";
import bodyParser = require("body-parser");
import {authenticateUser} from "./auth";
import * as handlers from "./handlers/index";

export interface HandlerResult {
  status: number;
  body: any;
}

export function handle(
  handler: (req: Request, res: Response) => Promise<HandlerResult>
): (req: Request, res: Response) => Promise<any> {
  return async function (req: Request, res: Response): Promise<any> {
    try {
      const {status, body}: HandlerResult = await handler(req, res);
      res.status(status).json(body);
    } catch (err) {
      console.error(err);
      res.status(500).json({name: "InternalServerError", message: "Internal server error"});
    }
  };
}

export async function createApiRouter(api: Api): Promise<Router> {
  const apiRouter: Router = Router();

  apiRouter.get(
    "/landmarks",
    handle(async function (req: Request, res: Response): Promise<HandlerResult> {
      return handlers.landmarks.get(api);
    })
  );

  apiRouter.get(
    "/landmark/:landmark_id",
    handle(async function (req: Request, res: Response): Promise<HandlerResult> {
      return handlers.landmark.get(api, req.params["landmark_id"]);
    })
  );

  apiRouter.get("/routes", async function (req: Request, res: Response) {
    try {
      const routes: resources.PartialRoute[] = await api.getRoutes(req.query);
      return res.status(200).json(routes);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  });

  apiRouter.post(
    "/routes",
    bodyParser.json(),
    handle(async function (req: Request, res: Response): Promise<HandlerResult> {
      const user: User | undefined = await authenticateUser(api.context, req);
      return handlers.routes.post(api, user, req.body);
    })
  );

  apiRouter.get(
    "/routes/:route_id",
    handle(async function (req: Request, res: Response): Promise<HandlerResult> {
      return handlers.route.get(api, req.params["route_id"]);
    })
  );

  apiRouter.get(
    "/users/:user_id",
    handle(async function (req: Request, res: Response): Promise<HandlerResult> {
      return handlers.user.get(api, req.params["user_id"]);
    })
  );

  apiRouter.get(
    "/waypoints/:waypoint_id",
    handle(async function (req: Request, res: Response): Promise<HandlerResult> {
      return handlers.waypoint.get(api, req.params["waypoint_id"]);
    })
  );

  return apiRouter;
}

export default createApiRouter;
