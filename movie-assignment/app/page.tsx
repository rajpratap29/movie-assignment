"use client";

import { useState } from "react";
import Search from "../components/Search";

export default function Home() {
  const [imdbId, setImdbId] = useState("");

  const handleSearch = () => {
    if (!imdbId.trim()) return;
    window.location.href = `/movie/${imdbId}`;
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
