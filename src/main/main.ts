import express = require("express");
import {Server} from "http";
import morgan = require("morgan");
import {apiRouter} from "./routes";

async function run() {
  const app: express.Application = express();
  app.use(morgan("dev"));
  app.use(apiRouter);

  const server: Server = app.listen(8080, () => {
    console.log(`Listening on: http://localhost:${server.address().port}`);
  });
}

run();
