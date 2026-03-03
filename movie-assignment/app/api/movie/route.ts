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

    // 🔥 TEMP AI (next step we make real)
    const fakeSummary =
      "Audience reactions are generally positive with praise for performances and story.";
    const fakeSentiment = "Positive";

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
      aiSummary: fakeSummary,
      sentiment: fakeSentiment,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}
