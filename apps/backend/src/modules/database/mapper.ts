import { ObjectToDbTypeMapper } from "../../domain/types";

const fromCamelToSnake = (string: string) =>
  string
    .split("")
    .map((letter) =>
      letter.toUpperCase() === letter ? `_${letter.toLowerCase()}` : letter
    )
    .join("");

const fromSnakeToCamel = (string: string) =>
  string
    .split("_")
    .map((string, idx) =>
      idx > 0
        ? `${string.split("")[0].toUpperCase()}${string
            .split("")
            .splice(1, string.length)
            .join("")}`
        : string
    )
    .join("");
const objectToDbRow = <
  Type extends Object,
  RowType extends ObjectToDbTypeMapper<Type>
>(
  object: Type
) =>
  Object.entries(object)
    .map(([key, value]) => ({ [fromCamelToSnake(key)]: value }))
    .reduce((acc, cur) => (acc = { ...acc, ...cur })) as RowType;

const dbRowToObject = <
  Type,
  RowType extends ObjectToDbTypeMapper<Type>
>(
  row: RowType
) =>
  Object.entries(row)
    .map(([key, value]) => ({
      [fromSnakeToCamel(key)]: value,
    }))
    .reduce((acc, cur) => ({ ...acc, ...cur })) as unknown as Type;

export { dbRowToObject, objectToDbRow };
