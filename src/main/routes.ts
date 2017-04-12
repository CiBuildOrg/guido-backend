import {Request, Response, Router} from "express";

import {Api} from "../lib/api";

export async function createApiRouter(api: Api): Promise<Router> {
  const apiRouter: Router = Router();

  apiRouter.get("/users/:user_id", async function (req: Request, res: Response) {
    const userId: string = req.params["user_id"];
    res.status(200).json({name: "Test user", friends: await api.getRoutes()});
  });

  return apiRouter;
}

export default createApiRouter;
