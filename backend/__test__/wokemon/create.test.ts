import { suite, test, expect } from "vitest";
import { connection } from "../../src/infra/database";
import {  server } from "../../src/server";
import chai from "chai";
import chaiHttp from "chai-http";
import {
  DbTransaction,
  Transaction,
  Wokemon,
  WokemonRow,
} from "../../src/domain/types";
import { randomUUID } from "crypto";
import knex from "knex";

const testEnv = () => {
  chai.use(chaiHttp);
  const sqlite = knex({
    client: "better-sqlite3",
    useNullAsDefault:true,
    connection: {
      filename: "./test.sqlite3",
    },
  });
  const db = connection(sqlite);
  const app = server(sqlite)("0.0.0.0", 0);
  app;
  return {
    databaseTransaction: db,
    server: app,
    serverRequest: chai.request(app),
  };
};

class WokemonBuilder {
  private readonly now = new Date();
  constructor() {}
  public static buildCreatePayload = ({
    name,
    description,
  }: Partial<Wokemon>): Partial<Wokemon> => ({
    description: description || "WOKEMON TEST",
    createdAt: new Date(),
    height: 1.2,
    name: name || "TESTOMON",
    number: 0,
    weight: 12.0,
  });
}

suite("Create wokemon suite", () => {
  const { databaseTransaction, server, serverRequest } = testEnv();
  test("Create wokemon without error", async () => {
    const newWokemon = WokemonBuilder.buildCreatePayload({});
    console.log
    const { status, body } = await serverRequest.post("/wokemons").send({
      payload: { ...newWokemon },
    });
    const databaseEntry: WokemonRow = await databaseTransaction((tsx) =>
      tsx
        .table("wokemons")
        .select("*")
        .where({
          name: newWokemon.name,
        })
        .first()
    );
    expect(databaseEntry.name).toEqual(newWokemon.name);
    console.log(/* status, body, */ databaseEntry);
  });
});
