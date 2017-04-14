import {Context} from "../interfaces/api/context";
import {Landmark as ApiLandmark} from "../interfaces/api/landmark";
import {Landmark as SequelizeLandmark} from "../interfaces/sequelize/landmark";
import {toPlainLandmark} from "../to-plain";

export async function getLandmarks(apiContext: Context): Promise<ApiLandmark[]> {
  const landmarks: SequelizeLandmark[] = await apiContext.models.landmark.findAll();
  return Promise.all(
    landmarks.map((landmark: SequelizeLandmark): Promise<ApiLandmark> => {
      return toPlainLandmark(landmark);
    })
  );
}
