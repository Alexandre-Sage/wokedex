import { ZodError } from "zod";

const handleZodError = (error: ZodError<any>) => {
  const { code, path, ...zodErr } = error.issues[0];
  switch (code) {
    case "too_small":
      return `${path[0]} can't be empty`;
     case "invalid_type":
      return `Invalid ${path[0]}`;
    default:
      console.log({ zoddError: error });
      return "Va savoir";
  }
};

export { handleZodError };
