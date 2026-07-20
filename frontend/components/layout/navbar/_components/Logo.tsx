export default function Logo() {
  return (
    <div className="flex items-center gap-0 lg:gap-3 font-sans select-none group">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        className="hidden lg:block group-hover:scale-105"
      >
        <rect width="32" height="32" rx="8" fill="#ffffff" />

        <g
          transform="matrix(1.066 0 0 1.066 3.2 3.2)"
          stroke="oklch(0.508 0.118 165.612)"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m12.296 3.464 3.02 3.956" />
          <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z" />
          <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <path d="m6.18 5.276 3.1 3.899" />
        </g>
      </svg>

      <div className="flex items-center text-lg sm:text-2xl tracking-tight text-white">
        <span className="font-black text-white">Next</span>
        <span className="font-light ml-0.5" style={{ color: "oklch(0.508 0.118 165.612)" }}>
          Watch
        </span>

        <span
          className="ml-2 px-1.5 sm:py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border"
          style={{
            backgroundColor: "oklch(0.508 0.118 165.612 / 0.1)",
            color: "oklch(0.508 0.118 165.612)",
            borderColor: "oklch(0.508 0.118 165.612 / 0.2)",
          }}
        >
          Beta
        </span>
      </div>
    </div>
  );
}
