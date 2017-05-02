import * as api from "./interfaces/api/index";
import * as sequelize from "./interfaces/sequelize/index";

export async function toPlainComment(comment: sequelize.Comment): Promise<api.Comment> {
  const id: string = comment.id;
  const author: api.User = await toPlainUser(await comment.getAuthor());
  const text: string = comment.text;
  return {id, author, text};
}

export async function toPlainComments(comments: sequelize.Comment[]): Promise<api.Comment[]> {
  return Promise.all(comments.map((comment: sequelize.Comment): Promise<api.Comment> => toPlainComment(comment)));
}

export async function toPlainLandmark(landmark: sequelize.Landmark): Promise<api.Landmark> {
  const id: string = landmark.id;
  const title: string = landmark.title;
  const latitude: number = landmark.latitude;
  const longitude: number = landmark.longitude;
  return {id, title, latitude, longitude};
}

export async function toPlainRoute(route: sequelize.Route, partial: true): Promise<api.PartialRoute>;
export async function toPlainRoute(route: sequelize.Route, partial: false): Promise<api.Route>;
export async function toPlainRoute(route: any, partial: any): Promise<any> {
  const id: string = route.id;
  const title: string = route.title;
  const description: string = route.description;
  // TODO(demurgos): Ensure that the author always exists
  const _author: sequelize.User | null = await route.getAuthor();
  const author: api.User = _author !== null ? await toPlainUser(_author) : {} as any;
  const creationDate: Date = route.createdAt;
  const modificationDate: Date = route.updatedAt;
  const duration: number = route.duration;
  const likes: number = (await route.getLikes()).length;
  const favorites: number = (await route.getFavorites()).length;
  const tags: string[] = await toPlainTags(await route.getTags());

  const partialRoute: api.PartialRoute = {
    id, title, description, author, creationDate,
    modificationDate, duration, likes, favorites, tags
  };

  if (partial) {
    return partialRoute;
  } else {
    const comments: api.Comment[] = await toPlainComments(await route.getComments());
    const waypoints: api.Waypoint[] = await toPlainWaypoints(await route.getWaypoints());
    return {...partialRoute, comments, waypoints};
  }
}

async function toPlainTags(tags: sequelize.Tag[]): Promise<string[]> {
  return tags.map((tag: sequelize.Tag): string => tag.value);
}

export async function toPlainUser(user: sequelize.User): Promise<api.User> {
  const id: string = user.id;
  const username: string = user.username;
  return {id, username};
}

async function toPlainWaypoints(waypoints: sequelize.Waypoint[]): Promise<api.Waypoint[]> {
  return waypoints
    .map((waypoint: sequelize.Waypoint): api.Waypoint => ({
      id: waypoint.id,
      latitude: waypoint.latitude,
      longitude: waypoint.longitude,
      note: waypoint.note,
      duration: waypoint.duration
    }));
}
