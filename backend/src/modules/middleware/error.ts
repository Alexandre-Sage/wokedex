import express, { NextFunction as Next, Request, Response } from "express";
import { ZodError } from "zod";
import { handleZodError } from "../../domain/validation";
import { DatabaseError } from "pg";
//@ts-expect-error
interface TheFuckingError<T> extends Error, ZodError<T>, DatabaseError {
  message: string;
}

const handleDatabaseError = (err: DatabaseError) => {
  switch (err.code) {
    case "23505":
      return `The ${err.constraint?.split("_")[1]} already exist`;
    default:
      return "Va savoir";
  }
};

const errorMiddleware = (
  error: TheFuckingError<any>,
  _: Request,
  res: Response,
  __: Next
) => {
  console.log({ error: error.name });
  let message: string = "";
  switch (error.name) {
    case "ZodError":
      message = handleZodError(error);
    case "error":
      if (error.table) message = handleDatabaseError(error as DatabaseError);
  }
  res.status(500).json({
    success: false,
    payload: {
      error: true,
      message,
    },
  });
};
export { errorMiddleware };
