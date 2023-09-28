import "dotenv/config";
import express, { Request } from "express";
import { Server, createServer as createHttpServer } from "http";
import { json } from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { compose } from "ramda";
import { ServerOptions } from "https";
import { wokemonRouter } from "./infra/router";
import knex, { Knex } from "knex";
import { connection } from "./infra/database";
import { Transaction } from "./domain/types";

declare global {
  namespace Express {
    export interface Request {
      database: Transaction;
    }
  }
}

const createApp = (database: Knex) => {
  const app = express();
  // app.use(cors({}));
  app.request.database = connection(database);
  app.use(json({}));
  app.use(morgan("dev", {}));
  app.use(wokemonRouter);
  app.use("/ping", (_, res) => {
    res.json({
      serverStatus: "UP",
    });
  });
  return app as ServerOptions;
};

const startServer = (serverInstance: Server) => (host: string, port: number) =>
  serverInstance.listen(port, host, () => {
    console.table({
      port,
      host,
      env: process.env.ENV,
      status: "UP",
    });
  });

const server = compose(startServer, createHttpServer, createApp);

export { server, startServer };
