import * as api from "./interfaces/api/index";
import * as sequelize from "./interfaces/sequelize/index";

export async function toPlainRoute(route: sequelize.Route, partial: true): Promise<api.PartialRoute>;
export async function toPlainRoute(route: sequelize.Route, partial: false): Promise<api.Route>;
export async function toPlainRoute(route: any, partial: any): Promise<any> {
  const id: string = route.id;
  const title: string = route.title;
  const description: string = route.description;
  const author: api.User = await toPlainUser(await route.getAuthor());
  const creationDate: Date = route.createdAt;
  const modificationDate: Date = route.updatedAt;
  const duration: number = route.duration;
  const likes: number = (await route.getLikes()).length;
  const favorites: number = (await route.getFavorites()).length;
  const tags: string[] = await toPlainTags(await route.getTags());

  if (partial) {
    return {
      id, title, description, author, creationDate,
      modificationDate, duration, likes, favorites, tags
    };
  } else {
    const waypoints: api.Waypoint[] = await toPlainWaypoints(await route.getWaypoints());
    return {
      id, title, description, author, creationDate,
      modificationDate, duration, likes, favorites, tags, waypoints
    };
  }
}

async function toPlainTags(tags: sequelize.Tag[]): Promise<string[]> {
  return tags.map((tag: sequelize.Tag): string => tag.value);
}

async function toPlainUser(user: sequelize.User): Promise<api.User> {
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
