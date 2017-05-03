import {Waypoint as DbWaypoint} from "../db-models/waypoint";
import {ApiContext} from "../interfaces/api-context";
import {Waypoint as ApiWaypoint} from "../resources/waypoint";

export async function getWaypoint(apiContext: ApiContext, waypointId: string): Promise<ApiWaypoint | null> {
  const waypoint: DbWaypoint | null = await apiContext.models.waypoint.findOne({where: {id: waypointId}});
  return waypoint === null ? null : DbWaypoint.toPlain(waypoint);
}
