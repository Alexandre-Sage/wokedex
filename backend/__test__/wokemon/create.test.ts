import { suite, test, expect, beforeEach } from "vitest";
import { connection } from "../../src/infra/database";
import { server } from "../../src/server";
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
import { setName } from "../../src/modules/lens";
import { testEnv } from "../helpers/env";
import { compose } from "ramda";
import { objectToDbRow } from "../../src/modules/database/mapper";
import { WokemonBuilder } from "../helpers/builders";
import { getDbWokemeonByName } from "../helpers/dbHelpers";





suite("Create wokemon suite", () => {
  let env: Awaited<ReturnType<typeof testEnv>>;
  beforeEach(async () => {
    env = await testEnv();
  });
  const newWokemon = WokemonBuilder.buildCreatePayload({}) as Wokemon;
  test("Create wokemon without error", async () => {
    const { databaseTransaction, server, serverRequest } = env;
    const { status, body } = await serverRequest.post("/wokemons").send({
      payload: { ...newWokemon },
    });
    const databaseEntry = await getDbWokemeonByName(
      newWokemon.name,
      databaseTransaction
    );
    expect(databaseEntry.name).toEqual(newWokemon.name);
  });
  test("No name error", async () => {
    const { databaseTransaction, server, serverRequest } = env;

    const {
      status,
      body: {
        success,
        payload: { error, message },
      },
    } = await serverRequest.post("/wokemons").send({
      payload: { ...setName(newWokemon as Wokemon, "") },
    });
    const databaseEntry = await getDbWokemeonByName(
      newWokemon.name,
      databaseTransaction
    );
    expect(success).toBeFalsy();
    expect(status).toEqual(500);
    expect(databaseEntry).toBeUndefined();
    expect(error).toBeTruthy();
    expect(message).toEqual("name can't be empty");
  });
  test("Undefined name error", async () => {
    const { databaseTransaction, server, serverRequest } = env;
    const {
      status,
      body: {
        success,
        payload: { error, message },
      },
    } = await serverRequest.post("/wokemons").send({
      payload: { ...setName(newWokemon, undefined as unknown as string) },
    });
    const databaseEntry = await getDbWokemeonByName(
      newWokemon.name,
      databaseTransaction
    );
    expect(success).toBeFalsy();
    expect(status).toEqual(500);
    expect(databaseEntry).toBeUndefined();
    expect(error).toBeTruthy();
    expect(message).toEqual("Invalid name");
  });
  /* test("duplicate wokemon name", async () => {
    const { databaseTransaction, server, serverRequest } = env;
    const {
      status,
      body: {
        success,
        payload: { error, message },
      },
    } = await serverRequest.post("/wokemons").send({
      payload: { ...newWokemon },
    });
  }); */
});
