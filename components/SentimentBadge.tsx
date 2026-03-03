type Props = {
  sentiment: string;
};

export default function SentimentBadge({ sentiment }: Props) {
  const getStyles = () => {
    const s = sentiment?.toLowerCase();

    if (s === "positive")
      return "bg-green-500/20 text-green-400 border-green-500/30";

    if (s === "negative") return "bg-red-500/20 text-red-400 border-red-500/30";

    return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStyles()}`}
    >
      {sentiment}
    </span>
  );
}
