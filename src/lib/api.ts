import Sequelize = require("sequelize");
import {CreateRouteOptions} from "./api/create-route";
import {createRoute} from "./api/index";
import * as api from "./api/index";
import * as dbModel from "./db-models/index";
import {ApiContext} from "./interfaces/api-context";
import * as apiInterfaces from "./resources/index";

export interface CreateApiOptions {
  databaseUrl: string;
  resetDb: boolean;
}

export class Api {
  static async create(options: CreateApiOptions): Promise<Api> {
    const db: Sequelize.Sequelize = new Sequelize(options.databaseUrl);

    const models: dbModel.Models = dbModel.defineAll(db);

    if (options.resetDb) {
      await db.sync({force: true});
    }

    return new Api({db, models});
  }

  context: ApiContext;

  constructor(context: ApiContext) {
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
