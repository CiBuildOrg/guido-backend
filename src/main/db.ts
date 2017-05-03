import * as crypto from "crypto";
import {IncomingMessage} from "http";
import * as request from "request";
import {v4 as uuid4} from "uuid";
import {Comment, Landmark, Models, Route, Tag, User} from "../lib/db-models/index";
import {Waypoint} from "../lib/db-models/waypoint";

export async function getLandmarks(page: number): Promise<any> {
  return new Promise((resolve, reject): void => {
    request.get({
      uri: "https://download.data.grandlyon.com/ws/rdata/sit_sitra.sittourisme/all.json",
      qs: {
        start: page * 1000 + 1,
        maxfeatures: 1000
      },
      callback: (error: any, response: IncomingMessage, body: any): void => {
        if (error !== null) {
          reject(error);
          return;
        }
        try {
          resolve(JSON.parse(body));
        } catch (err) {
          reject(err);
        }
      }
    });
  });
}

export async function populateLandmarks(): Promise<void> {
  const page0: any = await getLandmarks(0);
}

export async function populateDb(models: Models): Promise<void> {
  await populateLandmarks();
  const user0: User = await models.user.create({
    id: "f4d2ae8b-9cc1-44b9-9da5-f326bd248980",
    username: "Guido",
    key: crypto.createHash("sha256").update("0102030405").digest("hex")
  });
  const user1: User = await models.user.create({
    id: "1d537966-548c-4b75-bae4-18e82b3ce2b4",
    username: "Marco",
    key: crypto.createHash("sha256").update("1111111111").digest("hex")
  });
  const user2: User = await models.user.create({
    id: "e3b0df79-3766-4ec7-892c-9bbec96db7d2",
    username: "Amélie",
    key: crypto.createHash("sha256").update("2222222222").digest("hex")
  });
  const user3: User = await models.user.create({
    id: "a25a9049-8191-43e8-8f8a-8974db2a20c0",
    username: "Antoine",
    key: crypto.createHash("sha256").update("2222222222").digest("hex")
  });
  const route0: Route = await models.route.create({
    id: "f4d2ae8b-9cc1-44b9-9da5-f326bd248981",
    title: "Lyon centre",
    description: "Un petit parcours pour découvrir le centre-ville de Lyon.",
    imageUrl: "https://i.imgur.com/s8ZhtFZ.png",
    duration: 68
  });
  const coordinates0: {latitude: number, longitude: number}[] = [
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
  for (let i: number = 0; i < coordinates0.length; i++) {
    const wp: Waypoint = await models.waypoint.create({
      id: uuid4(),
      latitude: coordinates0[i].latitude,
      longitude: coordinates0[i].longitude,
      note: "",
      duration: 1,
      order: i
    });
    await route0.addWaypoints(wp);
  }
  const route1: Route = await models.route.create({
    id: "c15dbf6a-7a17-48f5-a319-7a5031922385",
    title: "Les secrets du street art",
    description: "Un chemin pour les passionés d'art urbain. Plutôt adapté à un petit groupe.",
    imageUrl: "https://i.imgur.com/1P5LqpD.jpg",
    duration: 123
  });
  const coordinates1: {latitude: number, longitude: number}[] = [
    {latitude: 45.7479347, longitude: 4.851976},
    {latitude: 45.7463996, longitude: 4.8424195},
    {latitude: 45.7451842, longitude: 4.841695},
    {latitude: 45.740711, longitude: 4.855777},
    {latitude: 45.7424925, longitude: 4.8573053},
    {latitude: 45.7438988, longitude: 4.8521132},
    {latitude: 45.7464129, longitude: 4.8498323}
  ];
  for (let i: number = 0; i < coordinates1.length; i++) {
    const wp: Waypoint = await models.waypoint.create({
      id: uuid4(),
      latitude: coordinates1[i].latitude,
      longitude: coordinates1[i].longitude,
      note: "",
      duration: 1,
      order: i
    });
    await route1.addWaypoints(wp);
  }
  const route2: Route = await models.route.create({
    id: "6fcb0027-d53b-4aa8-9e67-a9a1c5fc0dfa",
    title: "Monuments historiques",
    description: "Une visite pour découvrir les monuments principaux de la ville de Lyon. Adapté à tous les groupes.",
    imageUrl: "https://i.imgur.com/KXBxatb.jpg",
    duration: 210
  });
  const coordinates2: {latitude: number, longitude: number}[] = [
    {latitude: 45.7635981, longitude: 4.8613894},
    {latitude: 45.7636386, longitude: 4.8737026},
    {latitude: 45.767252, longitude: 4.8734529},
    {latitude: 45.7690631, longitude: 4.8844905},
    {latitude: 45.7802959, longitude: 4.8826495},
    {latitude: 45.7825346, longitude: 4.8785945}
  ];
  for (let i: number = 0; i < coordinates2.length; i++) {
    const wp: Waypoint = await models.waypoint.create({
      id: uuid4(),
      latitude: coordinates2[i].latitude,
      longitude: coordinates2[i].longitude,
      note: "",
      duration: 1,
      order: i
    });
    await route2.addWaypoints(wp);
  }
  const route3: Route = await models.route.create({
    id: "41dbda0b-0f15-4adb-888d-10f96254fef6",
    title: "Saone et Rhones",
    description: "Découvrez les secrets du Rhone et de la Saone.",
    imageUrl: "https://i.imgur.com/iYLViq6.jpg",
    duration: 210
  });
  const coordinates3: {latitude: number, longitude: number}[] = [
    {latitude: 45.7427862, longitude: 4.816091},
    {latitude: 45.7410991, longitude: 4.8145528},
    {latitude: 45.7397401, longitude: 4.8179142},
    {latitude: 45.7371151, longitude: 4.8162832},
    {latitude: 45.7338252, longitude: 4.8186022},
    {latitude: 45.732511, longitude: 4.823537},
    {latitude: 45.7337716, longitude: 4.8236377},
    {latitude: 45.7342774, longitude: 4.8225246},
    {latitude: 45.7367738, longitude: 4.8238157},
    {latitude: 45.7374925, longitude: 4.8242649},
    {latitude: 45.737729, longitude: 4.8241452},
    {latitude: 45.7479174, longitude: 4.8328115}
  ];
  for (let i: number = 0; i < coordinates3.length; i++) {
    const wp: Waypoint = await models.waypoint.create({
      id: uuid4(),
      latitude: coordinates3[i].latitude,
      longitude: coordinates3[i].longitude,
      note: "",
      duration: 1,
      order: i
    });
    await route3.addWaypoints(wp);
  }
  const route4: Route = await models.route.create({
    id: "1185c419-e5fc-4d45-9078-8ae7f950d347",
    title: "Redécouvrez le vieux Lyon",
    description: "Les vieux Lyon n'a pas fini de vous surprendre",
    imageUrl: "https://i.imgur.com/C5QPdss.jpg",
    duration: 210
  });
  const coordinates4: {latitude: number, longitude: number}[] = [
    {latitude: 45.7623429, longitude: 4.8214917},
    {latitude: 45.7623343, longitude: 4.8222592},
    {latitude: 45.762739, longitude: 4.8229318},
    {latitude: 45.7623429, longitude: 4.8214917},
    {latitude: 45.7599346, longitude: 4.8259933},
    {latitude: 45.7597663, longitude: 4.8259941},
    {latitude: 45.7596807, longitude: 4.8254912},
    {latitude: 45.7603079, longitude: 4.8254617},
    {latitude: 45.7609919, longitude: 4.8256201},
    {latitude: 45.7608182, longitude: 4.8268285},
    {latitude: 45.7598044, longitude: 4.8263692}
  ];
  for (let i: number = 0; i < coordinates4.length; i++) {
    const wp: Waypoint = await models.waypoint.create({
      id: uuid4(),
      latitude: coordinates4[i].latitude,
      longitude: coordinates4[i].longitude,
      note: "",
      duration: 1,
      order: i
    });
    await route4.addWaypoints(wp);
  }
  const route5: Route = await models.route.create({
    id: "dd3ddb29-bea3-4956-9be4-793c025327c4",
    title: "Les bouchons lyonnais",
    description: "Faites le tour des meilleurs bouchons lyonnais",
    imageUrl: "https://i.imgur.com/JTtisK0.jpg",
    duration: 210
  });
  const coordinates5: {latitude: number, longitude: number}[] = [
    {latitude: 45.7677666, longitude: 4.8338539},
    {latitude: 45.7679144, longitude: 4.8357665},
    {latitude: 45.7649223, longitude: 4.8357219},
    {latitude: 45.7648679, longitude: 4.8341788}
  ];
  for (let i: number = 0; i < coordinates5.length; i++) {
    const wp: Waypoint = await models.waypoint.create({
      id: uuid4(),
      latitude: coordinates5[i].latitude,
      longitude: coordinates5[i].longitude,
      note: "",
      duration: 1,
      order: i
    });
    await route5.addWaypoints(wp);
  }
  const tag1: Tag = await models.tag.create({
    value: "lyon"
  });
  const tag2: Tag = await models.tag.create({
    value: "historical"
  });
  const tag3: Tag = await models.tag.create({
    value: "art"
  });
  const tag4: Tag = await models.tag.create({
    value: "sport"
  });
  const tag5: Tag = await models.tag.create({
    value: "rivers"
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
  await comment.setAuthor(user0);
  await route0.addComments(comment);
  await route0.setAuthor(user0);
  await route1.setAuthor(user1);
  await route2.setAuthor(user1);
  await route3.setAuthor(user2);
  await route4.setAuthor(user2);
  await route5.setAuthor(user0);
  await route0.addFavorites(user0);
  await route0.addTags([tag1, tag2]);
  await user0.addFavoriteRoutes(route0);
  await user0.addFavoriteRoutes(route1);
  await user0.addFavoriteRoutes(route2);
  await user0.addFavoriteRoutes(route3);
  await user0.addRecentRoutes(route3);
  await user0.addRecentRoutes(route4);
  await user0.addRecentRoutes(route5);
}
