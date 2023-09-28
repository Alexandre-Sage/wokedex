import { ObjectValue } from "../../domain/types";

const httpStatus = {
  CREATE: 201,
  GET: 200,
  DELETE: 200,
  PUT: 200,
  INTERNAL_ERROR: 500,
  INPUT_ERROR: 422,
  AUTH_ERROR: 403,
  DUPLICATE: 409,
} as const;

type HttpStatus = ObjectValue<typeof httpStatus>;

export { httpStatus, HttpStatus };
