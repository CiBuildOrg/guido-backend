import {Context} from "../interfaces/api/context";
import {User as ApiUser} from "../interfaces/api/user";
import {User as SequelizeUser} from "../interfaces/sequelize/user";
import {toPlainUser} from "../to-plain";

export async function getUser(apiContext: Context, userId: string): Promise<ApiUser | null> {
  const user: SequelizeUser | null = await apiContext.models.user.findOne({where: {id: userId}});
  return user === null ? null : toPlainUser(user);
}
