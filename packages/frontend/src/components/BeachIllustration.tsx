export default function BeachIllustration({
  className,
}: {
  className: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden bg-linear-to-br from-[#7CC7E5] via-[#9ED1D4] to-[#D5BE82] ${className}`}
    >
      <div className="absolute right-9 top-7 h-14 w-14 rounded-full bg-[#FFFDF2]/45" />
      <svg
        viewBox="0 0 480 180"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 h-2/3 w-full"
      >
        <path
          d="M0 105 C75 58 135 48 205 80 C275 112 325 115 392 84 C425 69 452 61 480 57 L480 180 L0 180 Z"
          fill="#B8AD8F"
        />
        <path
          d="M0 135 C90 105 150 100 225 116 C295 131 365 129 480 102 L480 180 L0 180 Z"
          fill="#C9BE9F"
        />
      </svg>
    </div>
  );
}
