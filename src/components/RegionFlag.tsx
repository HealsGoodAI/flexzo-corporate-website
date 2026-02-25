interface RegionFlagProps {
  region: "uk" | "us";
  className?: string;
}

const RegionFlag = ({ region, className = "w-5 h-3.5" }: RegionFlagProps) => {
  if (region === "uk") {
    return (
      <svg viewBox="0 0 60 30" className={className} aria-label="UK flag">
        <clipPath id="ukClip"><rect width="60" height="30" /></clipPath>
        <g clipPath="url(#ukClip)">
          <rect width="60" height="30" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#ukClip)" />
          <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 60 30" className={className} aria-label="US flag">
      <rect width="60" height="30" fill="#B22234" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} y={i * 30 / 13 * 2 + 30 / 13} width="60" height={30 / 13} fill="#fff" />
      ))}
      <rect width="24" height={30 * 7 / 13} fill="#3C3B6E" />
      {/* Simplified stars pattern */}
      {[0, 1, 2, 3, 4].map((row) =>
        Array.from({ length: row % 2 === 0 ? 6 : 5 }, (_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={2 + (row % 2 === 0 ? col * 4 : 2 + col * 4)}
            cy={1.5 + row * 3}
            r={0.8}
            fill="#fff"
          />
        ))
      )}
    </svg>
  );
};

export default RegionFlag;
