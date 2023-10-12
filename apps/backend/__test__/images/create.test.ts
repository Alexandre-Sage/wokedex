import { includes, map, prop } from "ramda";
import { beforeEach, expect, suite, test } from "vitest";
import { Wokemon, WokemonImage, WokemonImageRow } from "../../src/domain/types";
import { WokemonBuilder } from "../helpers/builders";
import { createDbWokemon } from "../helpers/dbHelpers";
import { testEnv } from "../helpers/env";

suite("create images suite", () => {
  let env: Awaited<ReturnType<typeof testEnv>>;
  const toInsert = WokemonBuilder.buildManyForDb(10);
  const insertedIds = map(prop("id"), toInsert);
  beforeEach(async () => {
    env = await testEnv();
    await createDbWokemon(toInsert, env.databaseTransaction);
  });
  test("Create wokemon images", async () => {
    const { serverRequest, databaseTransaction } = env;
    const {
      status,
      body: { payload, success },
    } = await serverRequest
      .post(`/wokemons/images/${insertedIds[0]}`)
      .attach("wokemonImage", "./tmp/jojo.png");
    expect(status).toEqual(200);
    expect(success).toBeTruthy();
    const images: any = await databaseTransaction((tsx) =>
      tsx.table("images").select("*")
    );
    const wokemonImage: WokemonImageRow = await databaseTransaction((tsx) =>
      tsx
        .table("wokemons_images")
        .select("*")
        .where("wokemon_id", "=", insertedIds[0])
        .first()
    );
    expect(images).toHaveLength(1);
    expect(wokemonImage.image_id).toEqual(images[0].id);
  });
});
