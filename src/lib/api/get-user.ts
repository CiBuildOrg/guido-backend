import {User as DbUser} from "../db-models/user";
import {ApiContext} from "../interfaces/api-context";
import {User as ApiUser} from "../resources/user";

export async function getUser(apiContext: ApiContext, userId: string): Promise<ApiUser | null> {
  const user: DbUser | null = await apiContext.models.user.findOne({where: {id: userId}});
  return user === null ? null : DbUser.toPlain(user);
}
