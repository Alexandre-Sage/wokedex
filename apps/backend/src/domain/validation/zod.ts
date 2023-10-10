import { ZodObject, ZodRawShape } from "zod";

const zoddValidation = async <T extends ZodRawShape, Input>(
  schema: ZodObject<T>,
  data: Input
): Promise<Input> => {
  return (await schema.parseAsync(data)) as Input;
};

/* const zoddPartialApplication = async <T extends ZodRawShape>(
  schema: ZodObject<T>
) => {
  return async <U>(arg: U) => {
    try {
      return await zoddValidation<T, U>(schema, arg);
    } catch (error) {
      throw new Error(
        //        "ZOD",
        `The field ${error.issues[0].path[0]} is empty`
      );
    }
  };
}; */

export {  zoddValidation };
