import * as bodyParser from "body-parser";
import cookieParser = require("cookie-parser");
import express = require("express");
import {Server} from "http";
import morgan = require("morgan");
import * as sysPath from "path";
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
  app.use("/", express.static(sysPath.resolve(__dirname, "..", "static")));

  app.use(await createApiRouter(api));

  app.post("/get", bodyParser.json(), (req, res) => {
    console.log(req.body);
  });

  const server: Server = app.listen(httpPort, () => {
    console.log(`Listening on all interfaces on port ${server.address().port}`);
  });
}

run();
