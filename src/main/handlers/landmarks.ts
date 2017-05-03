import {Api} from "../../lib/api";
import {Landmark} from "../../lib/resources/landmark";

export interface GetResult {
  status: 200;
  body: Landmark.Json[];
}

/**
 * Get all the landmarks
 */
export async function get(api: Api): Promise<GetResult> {
  let result: Landmark[];
  try {
    result = await api.getLandmarks();
  } catch (err) {
    switch (err.name) {
      // TODO(demurgos): Handle the errors
      default:
        throw err;
    }
  }
  return {status: 200, body: result.map((item) => Landmark.type.write("json", item)) as Landmark.Json[]};
}
