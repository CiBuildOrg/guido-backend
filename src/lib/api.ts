import Sequelize = require("sequelize");
import {getRoute, getRoutes} from "./api/index";
import * as api from "./interfaces/api/index";
import {Models} from "./interfaces/sequelize/index";
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

  context: api.Context;

  constructor(context: api.Context) {
    this.context = context;
  }

  /**
   * Retrieves the route `routeId`.
   *
   * If the route is not found, return `null`.
   *
   * @param routeId
   * @returns {Promise<ApiRoute>}
   */
  async getRoute(routeId: string): Promise<api.Route | null> {
    return getRoute(this.context, routeId);
  }

  async getRoutes(): Promise<api.Route[]> {
    return getRoutes(this.context);
  }
}
