import { Knex } from "knex";

export const config: { [key: string]: Knex.Config } = {
  development: {
    client: "better-sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./dev.sqlite3",
    },
  },
  test: {
    client: "better-sqlite3",
    connection: {
      filename: "./test.sqlite3",
    },
  },
  docker_back_dev: {
    client: "mysql2",
    connection: {
      port: parseInt(process.env.DB_PORT!),
      user: process.env.DB_USER!,
      password: process.env.DB_PASS!,
      host: process.env.DB_HOST!,
      database:process.env.DB_NAME!
      
    },
    migrations:{
     directory:"./dist/migrations"
    }
  },
};
