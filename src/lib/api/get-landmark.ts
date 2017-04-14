import {Context} from "../interfaces/api/context";
import {Landmark as ApiLandmark} from "../interfaces/api/landmark";
import {Landmark as SequelizeLandmark} from "../interfaces/sequelize/landmark";
import {toPlainLandmark} from "../to-plain";

export async function getLandmark(apiContext: Context, landmarkId: string): Promise<ApiLandmark | null> {
  const landmark: SequelizeLandmark | null = await apiContext.models.landmark.findOne({where: {id: landmarkId}});
  return landmark === null ? null : toPlainLandmark(landmark);
}
