import knex from "knex";
import { server } from "./src/server";
import { config } from "./src/infra/database/config";
import "dotenv/config";

server(knex(config[process.env.ENV!]))(
  process.env.HOST!,
  parseInt(process.env.PORT!)
);
