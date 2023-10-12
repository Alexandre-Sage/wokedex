import { includes } from "ramda";
import { beforeEach, expect, suite, test } from "vitest";
import { Attack } from "../../src/domain/types/Attack";
import { getAttacksIds } from "../helpers/dbHelpers/attacks";
import { testEnv } from "../helpers/env";


suite("Read Attack suite", async () => {
  let env: Awaited<ReturnType<typeof testEnv>>;
  beforeEach(async () => {
    env = await testEnv();
  });
  test("get all wokemon Attack", async () => {
    const { serverRequest } = env;
    const attackIds = await getAttacksIds(env.databaseTransaction);
    const {
      status,
      body: { payload, success },
    } = await serverRequest.get("/attacks");
    expect(status).toEqual(200);
    expect(success).toBeTruthy();
    expect(Array.isArray(payload)).toBeTruthy();
    const ok = payload.every((attack: Attack) => includes(attack.id, attackIds));
  });
  test("get wokemon Attack by id", async () => {
   const attackIds = await getAttacksIds(env.databaseTransaction);
   const { serverRequest } = env;
    const {
      status,
      body: { payload, success },
    } = await serverRequest.get(`/attacks/${attackIds[2]}`);
    expect(status).toEqual(200);
    expect(success).toBeTruthy();
    expect(includes(payload.id, attackIds)).toBeTruthy();
  });
});
