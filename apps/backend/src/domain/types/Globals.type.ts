import { Transaction } from "./Database.type";

declare global {
  namespace Express {
    export interface Request {
      database: Transaction;
      tmp: any;
    }
  }
}

type ObjectValue<T> = T[keyof T];
type ObjectKeysToArray<T> = (keyof T)[];

type CamelCaseToSnakeCaseTypeKeys<T extends string> =
  T extends `${infer FirstWord}${infer UpperCaseWords}`
    ? `${FirstWord extends Lowercase<FirstWord>
        ? FirstWord
        : `_${Lowercase<FirstWord>}`}${CamelCaseToSnakeCaseTypeKeys<UpperCaseWords>}`
    : T;
type ObjectToDbTypeMapper<Object> = {
  [Property in keyof Object as CamelCaseToSnakeCaseTypeKeys<
    Property & string
  >]: Object[Property];
};
type ArrayInsideType<T> = T extends (infer U)[] ? U : T;
export {
  ObjectKeysToArray,
  ObjectValue,
  CamelCaseToSnakeCaseTypeKeys,
  ObjectToDbTypeMapper,
  ArrayInsideType,
};
