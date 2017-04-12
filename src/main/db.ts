import {Models, Route, User} from "../lib/interfaces/models/index";

export async function populateDb(models: Models): Promise<void> {
  const user: User = await models.user.create({
    username: "Guido"
  });
  const route: Route = await models.route.create({
    title: "Test Route",
    description: "A beautiful test route.",
    duration: 68
  });
  await route.setAuthor(user);
  await route.addFavorites(user);
}
