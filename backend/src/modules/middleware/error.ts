import express, { NextFunction as Next, Request, Response } from "express";
import { ZodError } from "zod";
import { handleZodError } from "../../domain/validation";
interface TheFuckingError<T> extends Error, ZodError<T> {
  message: string;
}
const errorMiddleware = (
  error: TheFuckingError<any>,
  _: Request,
  res: Response,
  __: Next
) => {
  let message: string = "";
  switch (error.name) {
    case "ZodError":
      message = handleZodError(error);
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
