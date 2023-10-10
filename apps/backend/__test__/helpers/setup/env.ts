import { beforeEach } from "vitest";
import { testEnv } from "../env";

const suiteSetup = async () => {
  let env: Awaited<ReturnType<typeof testEnv>>;
  beforeEach(async () => {
    env = await testEnv();
  });
  //@ts-expect-error
  if (env) return Promise.resolve(env);
};

export { suiteSetup };
