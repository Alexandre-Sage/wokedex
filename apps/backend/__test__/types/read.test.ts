import { includes } from "ramda";
import { beforeEach, expect, suite, test } from "vitest";
import {
  Type
} from "../../src/domain/types";
import { getTypesIds } from "../helpers/dbHelpers/types";
import { testEnv } from "../helpers/env";


suite("Read types suite", async () => {
  let env: Awaited<ReturnType<typeof testEnv>>;
  beforeEach(async () => {
    env = await testEnv();
  });
  test("get all wokemon types", async () => {
    const { serverRequest } = env;
    const typeIds = await getTypesIds(env.databaseTransaction);
    const {
      status,
      body: { payload, success },
    } = await serverRequest.get("/types");
    expect(status).toEqual(200);
    expect(success).toBeTruthy();
    expect(Array.isArray(payload)).toBeTruthy();
    const ok = payload.every((type: Type) => includes(type.id, typeIds));
  });
  test("get wokemon type by id", async () => {
    const typeIds = await getTypesIds(env.databaseTransaction);
    const { serverRequest } = env;
    const {
      status,
      body: { payload, success },
    } = await serverRequest.get(`/types/${typeIds[2]}`);
    expect(status).toEqual(200);
    expect(success).toBeTruthy();
    expect(includes(payload.id, typeIds)).toBeTruthy();
  });
});
