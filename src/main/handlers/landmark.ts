import {Api} from "../../lib/api";
import {Landmark} from "../../lib/resources/landmark";
import {Uuid} from "../../lib/resources/uuid";

export type GetResult = {status: 200, body: Landmark.Json} | {status: 400 | 404, body: any};

/**
 * Get all the landmark
 */
export async function get(api: Api, landmarkIdJson: Uuid.Json): Promise<GetResult> {
  let landmarkId: Uuid;
  try {
    landmarkId = Uuid.type.read("json", landmarkIdJson);
  } catch (err) {
    return {status: 400, body: {name: "InvalidRequest", message: err.toString()}};
  }
  let result: Landmark | null;
  try {
    result = await api.getLandmark(landmarkId);
  } catch (err) {
    switch (err.name) {
      // TODO(demurgos): Handle the errors
      default:
        throw err;
    }
  }
  if (result === null) {
    return {status: 404, body: {name: "NotFound", message: "Landmark not found"}};
  } else {
    return {status: 200, body: Landmark.type.write("json", result) as Landmark.Json};
  }
}
