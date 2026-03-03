type Movie = {
  title: string;
  rating: number;
  poster: string;
  year: string;
  language?: string;
};

type Props = {
  movie: Movie;
};

export default function MovieCard({ movie }: Props) {
  const { title, rating, poster, year, language } = movie;

  return (
    <div className="movie-card">
      <img src={poster || "/no-movie.png"} alt={title} />

      <div className="mt-4">
        <h3>{title}</h3>

        <div className="content">
          <div className="rating">
            <img src="/star.svg" alt="Star Icon" />
            <p>{rating ? rating.toFixed(1) : "N/A"}</p>

            <span>•</span>
            <p className="lang">{language || "N/A"}</p>

            <span>•</span>
            <p className="year">{year || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
