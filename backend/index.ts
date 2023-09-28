import knex from "knex";
import { server } from "./src/server";
import "dotenv/config";

server(knex({}))("0.0.0.0", parseInt(process.env.PORT!));
