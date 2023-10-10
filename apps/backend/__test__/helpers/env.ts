import chai from "chai";
import chaiHttp from "chai-http";
import knex from "knex";
import { connection } from "../../src/infra/database";
import { server } from "../../src/server";
import { appendFile, stat, rm, createWriteStream } from "fs";
import { GenericContainer } from "testcontainers";
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";

const getContainerEnv = (container: StartedPostgreSqlContainer) =>
  ({
    dbConnection: {
      user: container.getUsername(),
      password: container.getPassword(),
      database: container.getDatabase(),
      host: container.getHost(),
      port: container.getPort(),
    },
    container,
  } as const);

const postgresContainer = async () => {
  const container = await new PostgreSqlContainer().start();
  return getContainerEnv(container);
};

const getTestKnex = (connection: any) =>
  knex({
    client: "pg",
    migrations: {
      directory: "./dist/migrations",
    },
    connection,
  });

const testEnv = async () => {
  process.env.ENV = "test";
  chai.use(chaiHttp);
  const { dbConnection, container } = await postgresContainer();
  const postgres = getTestKnex(dbConnection);
  const db = connection(postgres);
  const app = server(postgres)("0.0.0.0", 0);
  await db((tsx) => tsx.migrate.latest({
    
  }));
  return {
    databaseTransaction: db,
    server: app,
    serverRequest: chai.request(app),
    container,
  };
};
export { testEnv };
