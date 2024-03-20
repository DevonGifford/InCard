import nextJest from "next/jest.js";

//FIXME: remove dead code + clean up 

const createJestConfig = nextJest({
  dir: "./",
});

// 👇 Setup overlap - both ssr & csr 
/** @type {import('jest').Config} */
const sharedConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: { "^.+\\.ts?$": "ts-jest" },
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/"],
  preset: "ts-jest",
};
//👇 Setup for client side rendered components
const clientTestConfig = {
  ...sharedConfig,
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["**/__tests__/*.test.tsx", "**/__tests__/page-*"],
};
//👇 Setup for server side rendered components
const serverTestConfig = {
  ...sharedConfig,
  testEnvironment: "jest-environment-node",
  testMatch: ["**/__tests__/*.ssr-test.tsx"],
};

const config = {
  projects: [
    await createJestConfig(clientTestConfig)(),
    await createJestConfig(serverTestConfig)(),
  ],
};

export default config;
