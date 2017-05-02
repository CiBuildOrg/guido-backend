import {Landmark as DbLandmark} from "../db-models/landmark";
import {ApiContext} from "../interfaces/api-context";
import {Landmark as ApiLandmark} from "../resources/landmark";

export async function getLandmark(apiContext: ApiContext, landmarkId: string): Promise<ApiLandmark | null> {
  const landmark: DbLandmark | null = await apiContext.models.landmark.findOne({where: {id: landmarkId}});
  return landmark === null ? null : DbLandmark.toPlain(landmark);
}
