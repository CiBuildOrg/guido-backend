import express = require("express");
import {Server} from "http";
import morgan = require("morgan");
import {Api} from "../lib/api";
import {dbHost, dbName, dbPassword, dbUser, httpPort} from "./config";
import {populateDb} from "./db";
import {createApiRouter} from "./routes";

async function run() {
  const app: express.Application = express();
  // const api: Api = await Api.create({
  //   dbHost: dbHost,
  //   dbName: dbName,
  //   dbPassword: dbPassword,
  //   dbUser: dbUser,
  //   resetDb: true
  // });

  // await populateDb(api.context.models);

  app.set("json spaces", 2);
  app.use(morgan("dev"));
  // app.use(await createApiRouter(api));

  const server: Server = app.listen(httpPort, () => {
    console.log(`Listening on all interfaces on port ${server.address().port}`);
  });
}

run();
