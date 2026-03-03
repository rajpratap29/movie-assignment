type Props = {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  onEnter?: () => void;
};

const Search = ({ searchTerm, setSearchTerm, onEnter }: Props) => {
  return (
    <div className="search">
      <div>
        <img src="/search.svg" alt="search" />

        <input
          type="text"
          placeholder="Enter IMDb ID (e.g., tt4154796)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onEnter?.()}
        />
      </div>
    </div>
  );
};

export default Search;
