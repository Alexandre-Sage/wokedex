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
import { compose, includes, map, prop } from "ramda";
import { objectToDbRow } from "../../src/modules/database/mapper";
import { WokemonBuilder } from "../helpers/builders";
import { createDbWokemon, getDbWokemeonByName } from "../helpers/dbHelpers";

suite("Read wokemon suite", () => {
  let env: Awaited<ReturnType<typeof testEnv>>;
  const toInsert = WokemonBuilder.buildManyForDb(10);
  const insertedIds = map(prop("id"), toInsert);
  beforeEach(async () => {
    env = await testEnv();
    await createDbWokemon(toInsert, env.databaseTransaction);
  });
  test("Get all", async () => {
    const { serverRequest } = env;
    const {
      status,
      body: { payload, success },
    } = await serverRequest.get("/wokemons");
    expect(payload).toHaveLength(toInsert.length);
    expect(status).toEqual(200);
    expect(success).toBeTruthy();
    const ok = payload.every((wokemon: Wokemon) =>
      includes(wokemon.id, insertedIds)
    );
    expect(ok).toBeTruthy();
  });
  test("Get by id", async () => {
    const { serverRequest } = env;
    const {
      status,
      body: { payload, success },
    } = await serverRequest.get(`/wokemons/${insertedIds[2]}`);
    expect(status).toEqual(200);
    expect(success).toBeTruthy();
    expect(payload.id).toEqual(insertedIds[2])
  });
});
