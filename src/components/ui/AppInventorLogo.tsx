export function AppInventorLogo({
  className = "w-6 h-6",
  size = 28,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 1000 1000"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left Purple Block */}
      <polygon points="293,103 500,223 500,530 86,530 86,223" fill="#801A79" />
      {/* Right Green Block */}
      <polygon points="707,103 914,223 914,530 500,530 500,223" fill="#8CC63F" />

      {/* Left Wing */}
      <path d="M300,530 C180,450 70,455 0,480 C90,430 220,430 330,490 Z" fill="#F58220" />
      {/* Right Wing */}
      <path d="M700,530 C820,450 930,455 1000,480 C910,430 780,430 670,490 Z" fill="#F58220" />

      {/* Left Leg */}
      <path d="M294,740 C215,800 185,820 185,820 C245,780 295,755 350,750 Z" fill="#F58220" />
      {/* Right Leg */}
      <path d="M706,740 C785,800 815,820 815,820 C755,780 705,755 650,750 Z" fill="#F58220" />

      {/* Pointed Lower Abdomen */}
      <polygon points="294,740 500,900 706,740" fill="#F58220" />

      {/* Torso Base */}
      <rect x="294" y="575" width="412" height="165" fill="#F58220" />
      {/* Torso Stripes */}
      <rect x="294" y="618" width="412" height="42" fill="#505050" />
      <rect x="294" y="698" width="412" height="42" fill="#505050" />

      {/* Head Dome */}
      <path
        d="M294,575 C294,461 386,369 500,369 C614,369 706,461 706,575 Z"
        fill="#FFFFFF"
      />

      {/* Left Antenna */}
      <polygon points="405,360 365,392 443,430 405,360" fill="#FFFFFF" />
      <polygon points="320,360 405,360 405,392 345,392 320,360" fill="#FFFFFF" />

      {/* Right Antenna */}
      <polygon points="595,360 635,392 557,430 595,360" fill="#FFFFFF" />
      <polygon points="680,360 595,360 595,392 655,392 680,360" fill="#FFFFFF" />

      {/* Eyes */}
      <circle cx="448" cy="515" r="21" fill="#505050" />
      <circle cx="552" cy="515" r="21" fill="#505050" />
    </svg>
  );
}
