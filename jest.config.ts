import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  modulePathIgnorePatterns: ["dist", "helpers"],
};
export default config;
