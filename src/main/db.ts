import {Sequelize} from "sequelize";
import {db} from "../lib/db";
import {Route, routeModel, User, userModel} from "../lib/models";

export async function initDb(force: boolean = false): Promise<void> {
  await db.sync({force: force});
}

export async function populateDb(): Promise<void> {
  const user: User = await userModel.create({
    username: "Guido"
  });
  const route: Route = await routeModel.create({
    title: "Test Route",
    description: "A beautiful test route.",
    duration: 68
  });
  await route.setAuthor(user);
  await route.addFavorites(user);
}
