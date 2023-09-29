import { json } from "body-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { Server, createServer as createHttpServer } from "http";
import { ServerOptions } from "https";
import { Knex } from "knex";
import morgan from "morgan";
import { compose } from "ramda";
import { connection } from "./infra/database";
import { wokemonRouter } from "./infra/router";
import { errorMiddleware } from "./modules/middleware";

const createApp = (database: Knex) => {
  const app = express();
  app.use(cors({}));
  app.request.database = connection(database);
  app.use(json({}));
  app.use(morgan("dev", {}));
  app.use(wokemonRouter);
  app.use("/ping", (_, res) => {
    res.json({
      serverStatus: "UP",
    });
  });

  app.use(errorMiddleware);

  return app as ServerOptions;
};

const startServer = (serverInstance: Server) => (host: string, port: number) =>
  serverInstance.listen(port, host, () => {
    process.env.ENV === "development" &&
      console.table({
        port,
        host,
        env: process.env.ENV,
        status: "UP",
      });
  });

const server = compose(startServer, createHttpServer, createApp);

export { server, startServer };
