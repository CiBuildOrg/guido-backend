import {Api} from "../../lib/api";
import {Uuid} from "../../lib/resources/uuid";
import {Waypoint} from "../../lib/resources/waypoint";

export type GetResult = {status: 200, body: Waypoint.Json} | {status: 400 | 404, body: any};

/**
 * Get all the waypoint
 */
export async function get(api: Api, waypointIdJson: Uuid.Json): Promise<GetResult> {
  let waypointId: Uuid;
  try {
    waypointId = Uuid.type.read("json", waypointIdJson);
  } catch (err) {
    return {status: 400, body: {name: "InvalidRequest", message: err.toString()}};
  }
  let result: Waypoint | null;
  try {
    result = await api.getWaypoint(waypointId);
  } catch (err) {
    switch (err.name) {
      // TODO(demurgos): Handle the errors
      default:
        throw err;
    }
  }
  if (result === null) {
    return {status: 404, body: {name: "NotFound", message: "Waypoint not found"}};
  } else {
    return {status: 200, body: Waypoint.type.write("json", result) as Waypoint.Json};
  }
}
