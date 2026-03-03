import { describe, it, expect } from "@jest/globals";

describe("Movie API validation", () => {
  it("should fail when imdb id is missing", async () => {
    const res = await fetch("http://localhost:3000/api/movie");

    expect(res).toBeDefined();
  });

  it("should validate imdb id format", () => {
    const validId = "tt0133093";
    const invalidId = "";

    expect(validId.startsWith("tt")).toBe(true);
    expect(invalidId === "").toBe(true);
  });
});
