import {Models, Route, Tag, User} from "../lib/interfaces/models/index";

export async function populateDb(models: Models): Promise<void> {
  const user: User = await models.user.create({
    username: "Guido"
  });
  const route: Route = await models.route.create({
    title: "Test Route",
    description: "A beautiful test route.",
    duration: 68
  });
  const tag1: Tag = await models.tag.create({
    value: "Lyon"
  });
  const tag2: Tag = await models.tag.create({
    value: "Historical"
  });
  await route.setAuthor(user);
  await route.addFavorites(user);
  await route.addTags(tag1);
  await route.addTags(tag2);
}
