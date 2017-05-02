import {assert} from "chai";
import {Api} from "../lib/api";
import {databaseUrl} from "./config";

describe("Api", function () {
  describe("create", function () {
    it("Should synchronize the database", async function () {
      const api: Api = await Api.create({
        databaseUrl,
        resetDb: true
      });
      assert.instanceOf(api, Api);
    });
  });
});
