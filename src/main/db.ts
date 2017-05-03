import * as crypto from "crypto";
import {v4 as uuid4} from "uuid";

import {Comment, Landmark, Models, Route, Tag, User} from "../lib/db-models/index";
import {Waypoint} from "../lib/db-models/waypoint";

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
    imageUrl: "https://i.imgur.com/s8ZhtFZ.png",
    duration: 68
  });
  const coordinates: {latitude: number, longitude: number}[] = [
    {latitude: 45.7570142556995, longitude: 4.832353591918945},
    {latitude: 45.7579424547621, longitude: 4.833769798278809},
    {latitude: 45.760427556887024, longitude: 4.834005832672119},
    {latitude: 45.760697019140615, longitude: 4.834027290344238},
    {latitude: 45.76062216864514, longitude: 4.836945533752441},
    {latitude: 45.76172994572358, longitude: 4.836945533752441},
    {latitude: 45.76217903827326, longitude: 4.837031364440918},
    {latitude: 45.763466416880846, longitude: 4.836387634277343},
    {latitude: 45.76345144753286, longitude: 4.835700988769531},
    {latitude: 45.763331692604346, longitude: 4.834156036376953},
    {latitude: 45.762074250335004, longitude: 4.834113121032715},
    {latitude: 45.76202934115837, longitude: 4.832825660705566},
    {latitude: 45.76198443194557, longitude: 4.832439422607422},
    {latitude: 45.762074250335004, longitude: 4.831752777099609},
    {latitude: 45.763226906831036, longitude: 4.83198881149292},
    {latitude: 45.763226906831036, longitude: 4.829435348510742},
    {latitude: 45.761370669081074, longitude: 4.828770160675049},
    {latitude: 45.761939522696615, longitude: 4.826087951660156},
    {latitude: 45.76036767620949, longitude: 4.8255085945129395},
    {latitude: 45.760322765659154, longitude: 4.826667308807372},
    {latitude: 45.759933539375425, longitude: 4.826602935791016},
    {latitude: 45.75966407343458, longitude: 4.826366901397705},
    {latitude: 45.75905028504455, longitude: 4.826409816741943},
    {latitude: 45.75875087362366, longitude: 4.8268818855285645},
    {latitude: 45.75740350234746, longitude: 4.825594425201416},
    {latitude: 45.75678968909056, longitude: 4.827032089233398},
    {latitude: 45.756041127200405, longitude: 4.8262810707092285},
    {latitude: 45.75569678535898, longitude: 4.827332496643066},
    {latitude: 45.75512786809614, longitude: 4.828941822052002},
    {latitude: 45.75575667104927, longitude: 4.829435348510742},
    {latitude: 45.7555620423209, longitude: 4.8301005363464355},
    {latitude: 45.75530752680575, longitude: 4.830679893493652},
    {latitude: 45.75366063365148, longitude: 4.829607009887695},
    {latitude: 45.75346599761287, longitude: 4.83048677444458},
    {latitude: 45.7557416996327, longitude: 4.831645488739014},
    {latitude: 45.75602615586017, longitude: 4.8310017585754395},
    {latitude: 45.75675974680774, longitude: 4.8314738273620605},
    {latitude: 45.75696934244999, longitude: 4.832096099853516}
  ];

  let i: number = 0;
  for (const coordinate of coordinates) {
    const wp: Waypoint = await models.waypoint.create({
      id: uuid4(),
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      note: "",
      duration: 1,
      order: i++
    });
    await route.addWaypoints(wp);
  }
  const tag1: Tag = await models.tag.create({
    value: "lyon"
  });
  const tag2: Tag = await models.tag.create({
    value: "historical"
  });
  const landmark0: Landmark = await models.landmark.create({
    title: "Fourvière",
    latitude: 45.7622928,
    longitude: 4.822626
  });
  const landmark1: Landmark = await models.landmark.create({
    title: "INSA Lyon",
    latitude: 45.782938,
    longitude: 4.878273
  });
  const comment: Comment = await models.comment.create({
    text: "I loved it!"
  });
  await comment.setAuthor(user);
  await route.addComments(comment);
  await route.setAuthor(user);
  await route.addFavorites(user);
  await route.addTags([tag1, tag2]);
}
