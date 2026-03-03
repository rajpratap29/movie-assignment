import { NextResponse } from "next/server";

const TMDB_BASE = "https://api.themoviedb.org/3";

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const imdbId = searchParams.get("id");

  if (!imdbId) {
    return NextResponse.json({ success: false });
  }

  try {
    const findRes = await fetch(
      `${TMDB_BASE}/find/${imdbId}?external_source=imdb_id`,
      API_OPTIONS,
    );
    const findData = await findRes.json();

    const movieId = findData.movie_results?.[0]?.id;

    if (!movieId) {
      return NextResponse.json({ success: false });
    }

    const movieRes = await fetch(`${TMDB_BASE}/movie/${movieId}`, API_OPTIONS);
    const movie = await movieRes.json();

    const creditRes = await fetch(
      `${TMDB_BASE}/movie/${movieId}/credits`,
      API_OPTIONS,
    );
    const credits = await creditRes.json();

    const reviewRes = await fetch(
      `${TMDB_BASE}/movie/${movieId}/reviews`,
      API_OPTIONS,
    );
    const reviewsData = await reviewRes.json();

    const reviewsText = reviewsData.results
      ?.slice(0, 5)
      ?.map((r: any) => r.content)
      ?.join("\n\n");

let aiSummary = "Not enough audience reviews available for AI analysis.";
let sentiment = "Mixed";

if (reviewsText && reviewsText.length > 50) {
  try {
    const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "nvidia/nemotron-3-nano-30b-a3b:free",
        messages: [
          {
            role: "system",
            content:
              "You analyze movie audience sentiment. Always return valid JSON.",
          },
          {
            role: "user",
            content: `
                      Analyze the following movie audience reviews.

                      Return STRICT JSON in this format:

                      {
                        "summary": "3-4 line audience summary",
                        "sentiment": "Positive | Mixed | Negative"
                      }

                      Reviews:
                      ${reviewsText}
                      `,
          },
        ],
        temperature: 0.3,
      }),
    });

    const aiData = await aiRes.json();
    const text = aiData.choices?.[0]?.message?.content || "{}";

    const parsed = JSON.parse(text);

    aiSummary = parsed.summary;
    sentiment = parsed.sentiment;
  } catch (err) {
    console.error("OpenRouter AI failed:", err);
  }
}

    return NextResponse.json({
      success: true,
      movie: {
        title: movie.title,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        year: movie.release_date?.split("-")[0],
        rating: movie.vote_average,
        language: movie.original_language,
        plot: movie.overview,
        cast: credits.cast
          ?.slice(0, 5)
          .map((c: any) => c.name)
          .join(", "),
      },
      reviewsText,
      aiSummary,
      sentiment,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}
