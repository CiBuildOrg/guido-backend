import Sequelize = require("sequelize");
import {getRoute, getRoutes} from "./api/index";
import * as interfaces from "./interfaces/index";
import {Models} from "./interfaces/models/index";
import {define as defineModels} from "./models";

export interface CreateApiOptions {
  dbHost: string;
  dbName: string;
  dbPassword: string;
  dbUser: string;
  resetDb: boolean;
}

export class Api {
  static async create(options: CreateApiOptions): Promise<Api> {
    const db: Sequelize.Sequelize = new Sequelize(
      options.dbName,
      options.dbUser,
      options.dbUser,
      {
        host: options.dbHost,
        dialect: "postgres"
      }
    );

    const models: Models = defineModels(db);

    if (options.resetDb) {
      await db.sync({force: true});
    }

    return new Api({db, models});
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
