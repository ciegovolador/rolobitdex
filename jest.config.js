module.exports = {
  preset: "jest-expo",
  testPathIgnorePatterns: ["/node_modules/", "/openspec/", "/.claude/"],
  roots: ["<rootDir>/src"],
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.test.{ts,tsx}",
    "!src/test/**",
  ],
  coverageDirectory: "coverage",
};
