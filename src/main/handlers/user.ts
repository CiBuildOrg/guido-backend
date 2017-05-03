import {Api} from "../../lib/api";
import {User} from "../../lib/resources/user";
import {Uuid} from "../../lib/resources/uuid";

export type GetResult = {status: 200, body: User.Json} | {status: 400 | 404, body: any};

/**
 * Get all the user
 */
export async function get(api: Api, userIdJson: Uuid.Json): Promise<GetResult> {
  let userId: Uuid;
  try {
    userId = Uuid.type.read("json", userIdJson);
  } catch (err) {
    return {status: 400, body: {name: "InvalidRequest", message: err.toString()}};
  }
  let result: User | null;
  try {
    result = await api.getUser(userId);
  } catch (err) {
    switch (err.name) {
      // TODO(demurgos): Handle the errors
      default:
        throw err;
    }
  }
  if (result === null) {
    return {status: 404, body: {name: "NotFound", message: "User not found"}};
  } else {
    return {status: 200, body: User.type.write("json", result) as User.Json};
  }
}
