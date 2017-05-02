import * as crypto from "crypto";

import {Comment, Landmark, Models, Route, Tag, User} from "../lib/interfaces/sequelize/index";

export async function populateDb(models: Models): Promise<void> {
  const user: User = await models.user.create({
    id: "f4d2ae8b-9cc1-44b9-9da5-f326bd248980",
    username: "Guido",
    key: crypto.createHash("sha256").update("0102030405").digest("hex")
  });
  const route: Route = await models.route.create({
    id: "f4d2ae8b-9cc1-44b9-9da5-f326bd248981",
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
  const landmark: Landmark = await models.landmark.create({
    title: "Fourvière",
    latitude: 10,
    longitude: 20
  });
  const comment: Comment = await models.comment.create({
    text: "I loved it!"
  });
  await comment.setAuthor(user);
  await route.addComments(comment);
  await route.setAuthor(user);
  await route.addFavorites(user);
  await route.addTags(tag1);
  await route.addTags(tag2);
}
