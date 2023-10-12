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
import { typesRouter, wokemonRouter } from "./infra/router";
import { errorMiddleware } from "./modules/middleware";
import { attackRouter } from "./infra/router/attacks";

const createApp = (database: Knex) => {
  const app = express();
  app.use(cors({}));
  app.request.database = connection(database);
  app.use(json({}));
  app.use(morgan("dev", {}));
  app.use(wokemonRouter);
  app.use(typesRouter);
  app.use(attackRouter);
  app.use("/ping", (_, res) => {
    res.json({
      serverStatus: "UP",
    });
  });
  app.get("/migrate", async (req, res, next) => {
    try {
      await req.database((tsx) => tsx.migrate.latest());
      res.json({
        migrations: true,
        smaple: await req.database<any>((tsx) =>
          tsx.table("types").select("*")
        ),
      });
    } catch (error) {
      console.log({ error });
      next(error);
    }
  });
  app.get("/migrate/rollback", async (req, res, next) => {
    try {
      await req.database((tsx) => tsx.migrate.rollback());
      res.json({
        migrations: true,
        smaple: "reroll"
      });
    } catch (error) {
      console.log({ error });
      next(error);
    }
  });
  app.use(errorMiddleware);
  return app as ServerOptions;
};

const startServer = (serverInstance: Server) => (host: string, port: number) =>
  serverInstance.listen(port, host, () => {
    // process.env.ENV === "development" &&
    console.table({
      port,
      host,
      env: process.env.ENV,
      status: "UP",
    });
  });

const server = compose(startServer, createHttpServer, createApp);

export { server, startServer };
