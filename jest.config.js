module.exports = {
  preset: "jest-expo",
  testPathIgnorePatterns: ["/node_modules/", "/openspec/", "/.claude/"],
  roots: ["<rootDir>/__tests__"],
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
  ],
  coverageDirectory: "coverage",
};
