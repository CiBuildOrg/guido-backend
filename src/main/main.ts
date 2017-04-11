import * as api from "../lib/api";

async function run() {
  console.log(await api.getUsers());
}

run();
