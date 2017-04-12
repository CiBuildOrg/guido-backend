import { Request, Response, Router} from "express";

import * as api from "../lib/api";

export const apiRouter: Router = Router();

apiRouter.get("/users/:user_id", async function (req: Request, res: Response) {
  const userId: string = req.params["user_id"];
  res.status(200).json({name: "Test user", friends : await api.getUsers()});
});

export default apiRouter;
