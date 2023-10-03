import knex from "knex";
import { server } from "./src/server";
import "dotenv/config";

server(
  knex({
    client: "better-sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./dev.sqlite3",
    },
  })
)("0.0.0.0", parseInt(process.env.PORT!));
