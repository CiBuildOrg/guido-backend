import Sequelize = require("sequelize");
import {getRoute, getRoutes} from "./api/index";
import {Context} from "./interfaces/context";
import {Models, Route} from "./interfaces/models/index";
import {define as defineModels} from "./models";

export interface CreateApiOptions {
  databaseUrl: string;
  resetDb: boolean;
}

export class Api {
  static async create(options: CreateApiOptions): Promise<Api> {
    const db: Sequelize.Sequelize = new Sequelize(options.databaseUrl);

    const models: Models = defineModels(db);

    if (options.resetDb) {
      await db.sync({force: true});
    }

    return new Api({db, models});
  }

  context: Context;

  constructor(context: Context) {
    this.context = context;
  }

  async getRoute(routeId: string): Promise<Route> {
    return getRoute(this.context, routeId);
  }

  async getRoutes(): Promise<Route[]> {
    return getRoutes(this.context);
  }
}
