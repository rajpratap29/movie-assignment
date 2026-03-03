"use client";

import { useState } from "react";
import Search from "@/components/Search";

export default function Home() {
  const [imdbId, setImdbId] = useState("");
  const [error, setError] = useState("");

  const isValidImdbId = (id: string) => /^tt\d{6,}$/.test(id.trim());

  const handleSearch = () => {
    const trimmed = imdbId.trim();
    if (!trimmed) {
      setError("Please enter an IMDb ID");
      return;
    }

    if (!isValidImdbId(trimmed)) {
      setError("Enter a valid IMDb ID (e.g., tt4154796)");
      return;
    }

    setError("");
    window.location.href = `/movie/${trimmed}`;
  };

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>

          <Search
            searchTerm={imdbId}
            setSearchTerm={setImdbId}
            onEnter={handleSearch}
          />

          {error && (
            <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
          )}

          <button
            onClick={handleSearch}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg mx-auto block"
          >
            Analyze Movie
          </button>
        </header>
      </div>
    </main>
  );
}
