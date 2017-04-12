import express = require("express");
import {Server} from "http";
import morgan = require("morgan");
import {Api} from "../lib/api";
import {dbHost, dbName, dbPassword, dbUser} from "../lib/config";
import {createApiRouter} from "./routes";

async function run() {
  const app: express.Application = express();
  const api: Api = await Api.create({
    dbHost: dbHost,
    dbName: dbName,
    dbPassword: dbPassword,
    dbUser: dbUser,
    resetDb: false
  });

  await populateDb();

  app.use(morgan("dev"));
  app.use(await createApiRouter(api));

  const server: Server = app.listen(8080, () => {
    console.log(`Listening on: http://localhost:${server.address().port}`);
  });
}

run();
