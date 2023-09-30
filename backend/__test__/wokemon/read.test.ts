import { includes, map, prop } from "ramda";
import { beforeEach, expect, suite, test } from "vitest";
import { Wokemon } from "../../src/domain/types";
import { WokemonBuilder } from "../helpers/builders";
import { createDbWokemon } from "../helpers/dbHelpers";
import { testEnv } from "../helpers/env";

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
    expect(payload.id).toEqual(insertedIds[2]);
  });
});
