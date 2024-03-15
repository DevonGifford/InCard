import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  projects: [
    await createJestConfig({
      setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
      transform: { "^.+\\.ts?$": "ts-jest" },
      coveragePathIgnorePatterns: ["<rootDir>/node_modules/"],
      preset: "ts-jest",
      testEnvironment: "jest-environment-jsdom",
      testMatch: ["**/__tests__/*.test.tsx", "**/__tests__/*.tests.tsx"],
    })(),
  ],
};

export default config;
