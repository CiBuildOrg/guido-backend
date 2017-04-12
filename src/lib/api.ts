import {getRoute, getRoutes} from "./api/index";
import {db} from "./db";
import * as interfaces from "./interfaces/index";

export interface CreateApiOptions {
  dbHost: string;
  dbName: string;
  dbPassword: string;
  dbUser: string;
  resetDb: boolean;
}

export class Api {
  static async create(options: CreateApiOptions): Promise<Api> {
    if (options.resetDb) {
      db.sync({force: true});
    }
    return new Api({db: db});
  }

  context: interfaces.Context;

  constructor(context: interfaces.Context) {
    this.context = context;
  }

  async getRoute(routeId: string): Promise<interfaces.Route> {
    return getRoute(this.context, routeId);
  }

  async getRoutes(): Promise<interfaces.Route[]> {
    return getRoutes(this.context);
  }
}
