import express = require("express");
import {Server} from "http";
import morgan = require("morgan");
import {Api} from "../lib/api";
import {createApiRouter} from "./api-router";
import {databaseUrl, httpPort} from "./config";
import {populateDb} from "./db";

async function run() {
  const app: express.Application = express();
  const api: Api = await Api.create({
    databaseUrl,
    resetDb: true
  });

  await populateDb(api.context.models);

  app.set("json spaces", 2);
  app.use(morgan("dev"));
  app.use(await createApiRouter(api));

  const server: Server = app.listen(httpPort, () => {
    console.log(`Listening on all interfaces on port ${server.address().port}`);
  });
}

run();