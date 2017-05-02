import {Landmark as DbLandmark} from "../db-models/landmark";
import {ApiContext} from "../interfaces/api-context";
import {Landmark as ApiLandmark} from "../resources/landmark";

export async function getLandmarks(apiContext: ApiContext): Promise<ApiLandmark[]> {
  const landmarks: DbLandmark[] = await apiContext.models.landmark.findAll();
  return Promise.all(
    landmarks.map((landmark: DbLandmark): Promise<ApiLandmark> => {
      return DbLandmark.toPlain(landmark);
    })
  );
}
