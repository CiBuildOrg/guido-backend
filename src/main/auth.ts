import * as crypto from "crypto";
import {Request} from "express";
import {User as DbUser} from "../lib/db-models/user";
import {ApiContext} from "../lib/interfaces/api-context";
import {User as ApiUser} from "../lib/resources/user";

export async function authenticateUser(apiContext: ApiContext, req: Request): Promise<ApiUser | undefined> {
  if (typeof req.query.key !== "string") {
    return undefined;
  }
  const user: DbUser | null = await apiContext.models.user.findOne({
    where: {
      key: crypto.createHash("sha256").update(req.query.key).digest("hex")
    }
  });
  return user === null ? undefined : DbUser.toPlain(user);
}
