import {assert} from "chai";
import {databaseUrl} from "../test/config";
import {Api} from "./api";

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
