const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  coverageProvider: "v8",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // セットアップファイルを指定
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!(jose)/)"], // jose モジュールをトランスフォームの対象にする
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

module.exports = async () => {
  const baseConfig = await createJestConfig(customJestConfig)();
  return {
    ...baseConfig,
    transformIgnorePatterns: ["node_modules/(?!(jose)/)"], // next/jestの設定を上書き
  };
};
