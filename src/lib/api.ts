import Sequelize = require("sequelize");
import {CreateRouteOptions} from "./api/create-route";
import {createRoute} from "./api/index";
import * as api from "./api/index";
import * as apiInterfaces from "./interfaces/api/index";
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

  context: apiInterfaces.Context;

  constructor(context: apiInterfaces.Context) {
    this.context = context;
  }

  async getLandmark(landmarkId: string): Promise<apiInterfaces.Landmark | null> {
    return api.getLandmark(this.context, landmarkId);
  }

  async getLandmarks(): Promise<apiInterfaces.Landmark[]> {
    return api.getLandmarks(this.context);
  }

  async createRoute(options: CreateRouteOptions): Promise<apiInterfaces.Route> {
    return createRoute(this.context, options);
  }

  /**
   * Retrieves the route `routeId`.
   *
   * If the route is not found, return `null`.
   *
   * @param routeId
   * @returns {Promise<ApiLandmark>}
   */
  async getRoute(routeId: string): Promise<apiInterfaces.Route | null> {
    return api.getRoute(this.context, routeId);
  }

  async getRoutes(): Promise<apiInterfaces.PartialRoute[]> {
    return api.getRoutes(this.context);
  }

  async getUser(userId: string): Promise<apiInterfaces.User | null> {
    return api.getUser(this.context, userId);
  }
}
