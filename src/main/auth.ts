import * as crypto from "crypto";
import {Request} from "express";
import {Context} from "../lib/interfaces/api/context";
import {User as ApiUser} from "../lib/interfaces/api/user";
import {User as SequelizeUser} from "../lib/interfaces/sequelize/user";
import {toPlainUser} from "../lib/to-plain";

export async function authenticateUser(apiContext: Context, req: Request): Promise<ApiUser | undefined> {
  if (typeof req.query.key !== "string") {
    return undefined;
  }
  const user: SequelizeUser | null = await apiContext.models.user.findOne(
    {
      where: {key: crypto.createHash("sha256").update(req.query.key).digest("hex")}
    });
  return user === null ? undefined : toPlainUser(user);
}
