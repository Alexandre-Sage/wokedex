import { randomUUID } from "crypto";
import { compose } from "ramda";
import { Wokemon, WokemonRow } from "../../../src/domain/types";
import { objectToDbRow } from "../../../src/modules/database/mapper";

export class WokemonBuilder {
  private readonly now = new Date();
  constructor() {}
  public static buildCreatePayload = ({
    name,
    description,
  }: Partial<Wokemon>): Partial<Wokemon> => ({
    description: description || "WOKEMON TEST",
    height: 1.2,
    name: name || "TESTOMON",
    number: 0,
    weight: 12.0,
  });
  public static build = ({
    id,
    name,
    description,
  }: Partial<Wokemon>): Wokemon => ({
    id: randomUUID(),
    createdAt: new Date(),
    description: description || "TEST WOKEMON",
    height: 1.2,
    name: name || "TEST WOKEMON",
    number: 100,
    weight: 1.5,
  });
  public static buildForDb = (wokemon: Partial<Wokemon>) =>
    compose(objectToDbRow, this.build)(wokemon);
  public static buildManyForDb = (number: number) => {
    const toInsert: WokemonRow[] = [];
    for (let index = 0; index < number; index++) {
      toInsert.push(
        WokemonBuilder.buildForDb({
          name: `WOEKMON TEST ${index}`,
        })
      );
    }
    return toInsert;
  };
}
