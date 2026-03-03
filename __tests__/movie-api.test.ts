import { GET } from "@/app/api/movie/route";

describe("Movie API validation", () => {
  it("should fail when imdb id is missing", async () => {
    const req = new Request("http://localhost/api/movie");

    const res = await GET(req);
    const json = await res.json();

    expect(json.success).toBe(false);
  });

  it("should validate imdb id format", async () => {
    const req = new Request("http://localhost/api/movie?id=invalid123");

    const res = await GET(req);
    const json = await res.json();

    expect(json.success).toBe(false);
  });
});
