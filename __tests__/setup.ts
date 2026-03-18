// Mock expo-sqlite for tests
const mockRows: Record<string, any[]> = {};

function initMockDb() {
  // Clear all tables
  for (const key of Object.keys(mockRows)) {
    delete mockRows[key];
  }
}

const mockDb = {
  execAsync: jest.fn(async (sql: string) => {
    // Parse CREATE TABLE statements to init empty arrays
    const tableMatches = sql.matchAll(/CREATE TABLE IF NOT EXISTS (\w+)/g);
    for (const m of tableMatches) {
      if (!mockRows[m[1]]) mockRows[m[1]] = [];
    }
  }),
  runAsync: jest.fn(async (sql: string, params: any[]) => {
    const insertMatch = sql.match(/INSERT INTO (\w+)\s*\(([^)]+)\)\s*VALUES/i);
    if (insertMatch) {
      const table = insertMatch[1];
      const columns = insertMatch[2].split(",").map((c: string) => c.trim());
      const row: Record<string, any> = {};
      columns.forEach((col: string, i: number) => {
        row[col] = params[i];
      });
      // Add defaults
      if (!row.created_at) row.created_at = new Date().toISOString();
      if (!row.updated_at) row.updated_at = new Date().toISOString();
      if (!row.status) row.status = "pending";
      if (!mockRows[table]) mockRows[table] = [];
      mockRows[table].push(row);
      return { changes: 1 };
    }
    const updateMatch = sql.match(/UPDATE (\w+) SET (.+) WHERE (\w+) = \?/i);
    if (updateMatch) {
      const table = updateMatch[1];
      const id = params[params.length - 1];
      const rows = mockRows[table] || [];
      const idx = rows.findIndex((r: any) => r.id === id || r[updateMatch[3]] === id);
      if (idx >= 0) {
        const setClauses = updateMatch[2].split(",").map((c: string) => c.trim());
        let paramIdx = 0;
        for (const clause of setClauses) {
          const eqMatch = clause.match(/(\w+)\s*=\s*\?/);
          if (eqMatch) {
            rows[idx][eqMatch[1]] = params[paramIdx];
            paramIdx++;
          } else {
            // Handle datetime('now') etc - skip param
          }
        }
      }
      return { changes: idx >= 0 ? 1 : 0 };
    }
    const deleteMatch = sql.match(/DELETE FROM (\w+) WHERE (\w+) = \?/i);
    if (deleteMatch) {
      const table = deleteMatch[1];
      const col = deleteMatch[2];
      const val = params[0];
      if (mockRows[table]) {
        mockRows[table] = mockRows[table].filter((r: any) => r[col] !== val);
      }
      return { changes: 1 };
    }
    return { changes: 0 };
  }),
  getAllAsync: jest.fn(async (sql: string, params?: any[]) => {
    const fromMatch = sql.match(/FROM (\w+)/i);
    if (!fromMatch) return [];
    const table = fromMatch[1];
    let rows = mockRows[table] || [];
    const whereMatch = sql.match(/WHERE (\w+)\s*(=|LIKE)\s*\?/i);
    if (whereMatch && params?.length) {
      const col = whereMatch[1];
      const op = whereMatch[2];
      if (op === "LIKE") {
        const pattern = params[0].replace(/%/g, "");
        rows = rows.filter((r: any) => r[col]?.toLowerCase().includes(pattern.toLowerCase()));
      } else {
        rows = rows.filter((r: any) => r[col] === params[0]);
      }
    }
    if (sql.includes("ORDER BY") && sql.includes("DESC")) {
      rows = [...rows].reverse();
    }
    return rows;
  }),
  getFirstAsync: jest.fn(async (sql: string, params?: any[]) => {
    const results = await mockDb.getAllAsync(sql, params);
    return results[0] || null;
  }),
};

jest.mock("expo-sqlite", () => ({
  openDatabaseAsync: jest.fn(async () => mockDb),
}));

jest.mock("expo-secure-store", () => ({
  getItemAsync: jest.fn(async () => null),
  setItemAsync: jest.fn(async () => {}),
}));

const mockFileStorage: Record<string, string> = {};

jest.mock("expo-file-system", () => {
  class MockFile {
    uri: string;
    exists: boolean;
    constructor(...args: any[]) {
      this.uri = args.join("/");
      this.exists = this.uri in mockFileStorage;
    }
    create() {
      mockFileStorage[this.uri] = "";
      this.exists = true;
    }
    write(content: string) {
      mockFileStorage[this.uri] = content;
    }
    text() {
      return Promise.resolve(mockFileStorage[this.uri] ?? "");
    }
  }
  return {
    File: MockFile,
    Paths: { document: "/mock" },
  };
});

export { mockFileStorage };

jest.mock("expo-sharing", () => ({
  isAvailableAsync: jest.fn(async () => false),
  shareAsync: jest.fn(async () => {}),
}));

export { initMockDb, mockDb, mockRows };
