/** @type {import('jest').Config} */
const config = {
  testEnvironment: "node",

  transform: {
    "^.+\\.(t|j)sx?$": ["ts-jest", {}],
  },

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};

export default config;
