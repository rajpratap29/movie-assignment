"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MovieCard from "@/components/MovieCard";
import Spinner from "@/components/Spinner";
import SentimentBadge from "@/components/SentimentBadge";

export default function MoviePage() {
  const params = useParams();
  const id = params.id as string;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/movie?id=${id}`)
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Spinner />
      </main>
    );
  }

  if (!data?.success) return <div className="p-6">Movie not found.</div>;

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-stretch">
        <MovieCard movie={data.movie} />

        <div className="flex-1">
          <div className="bg-dark-100 border border-light-100/10 rounded-2xl p-6 shadow-inner shadow-light-100/5">
            <h2 className="text-2xl font-bold text-white">Description</h2>
            <p className="mt-3 leading-relaxed text-light-200">
              {data.movie.plot}
            </p>

            <h2 className="mt-6 text-2xl font-bold text-white">Cast</h2>
            <p className="mt-2 text-light-200">{data.movie.cast}</p>

            <div className="mt-6 p-4 border border-light-100/30 rounded-lg bg-dark-100/60">
              <h2 className="font-semibold text-white">AI Audience Insight</h2>

              <p className="mt-2 text-light-200">{data.aiSummary}</p>

              <div className="mt-3 flex items-center gap-3 flex-wrap">
                <p className="font-bold text-white">Overall Sentiment:</p>
                <SentimentBadge sentiment={data.sentiment} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
