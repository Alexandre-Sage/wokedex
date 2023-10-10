import { beforeEach, expect, suite, test } from "vitest";
import { Wokemon } from "../../src/domain/types";
import { setName } from "../../src/modules/lens";
import { WokemonBuilder } from "../helpers/builders";
import { createDbWokemon, getDbWokemeonByName } from "../helpers/dbHelpers";
import { testEnv } from "../helpers/env";
import { getTypesIds } from "../helpers/dbHelpers/types";
import { includes } from "ramda";
import { createReadStream, createWriteStream } from "fs";
import { fetch } from "cross-fetch";
import { baseType } from "../../src/infra/database/base/baseType";
suite("Create wokemon suite", () => {
  let env: Awaited<ReturnType<typeof testEnv>>;
  beforeEach(async () => {
    env = await testEnv();
  });
  const newWokemon = WokemonBuilder.buildCreatePayload({}) as Wokemon;

  test.only("Create wokemon without error", async () => {
    const { databaseTransaction, server, serverRequest } = env;
    const typeIds = await getTypesIds(databaseTransaction);
    
    const { status, body } = await serverRequest.post("/wokemons").send({
      payload: { wokemon: newWokemon, types: [typeIds[1], typeIds[2]] },
    });
    const databaseEntry = await getDbWokemeonByName(
      newWokemon.name,
      databaseTransaction
    );
    console.log({ body  })
    expect(databaseEntry.name).toEqual(newWokemon.name);
    expect(databaseEntry.encounter_place).toEqual(newWokemon.encounterPlace);
   expect(body.payload).toHaveProperty("id");
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
      payload: { wokemon: setName(newWokemon as Wokemon, ""), types: [] },
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
      payload: {
        wokemon: setName(newWokemon, undefined as unknown as string),
        types: [],
      },
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
  test("duplicate wokemon name", async () => {
    const { databaseTransaction, server, serverRequest } = env;
    const name = "TEST DUPLICATE";
    await createDbWokemon(
      WokemonBuilder.buildForDb({
        name,
      }),
      databaseTransaction
    );
    const {
      status,
      body: {
        success,
        payload: { error, message },
      },
    } = await serverRequest.post("/wokemons").send({
      payload: { wokemon: setName(newWokemon, name), types: [] },
    });
    expect(message).toEqual("The name already exist");
  });
  test("Create wokemon with type", async () => {
    const { databaseTransaction, server, serverRequest } = env;
    const typeIds = await getTypesIds(databaseTransaction);
    const { status, body } = await serverRequest.post("/wokemons").send({
      payload: { wokemon: newWokemon, types: [typeIds[1], typeIds[2]] },
    });
    const databaseEntry = await getDbWokemeonByName(
      newWokemon.name,
      databaseTransaction
    );
    expect(databaseEntry.name).toEqual(newWokemon.name);
    const wokemonTypes: any = await databaseTransaction((tsx) =>
      tsx
        .table("wokemons_types")
        .select("*")
        .where("wokemon_id", "=", databaseEntry.id)
    );
    expect(wokemonTypes).toHaveLength(2);
    const ok = wokemonTypes.every((types: any) =>
      includes(types.typeId, typeIds)
    );
  });
});
