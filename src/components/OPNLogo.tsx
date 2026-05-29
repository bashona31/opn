"use client";

interface OPNLogoProps {
  size?: number;
  className?: string;
}

export default function OPNLogo({ size = 32, className = "" }: OPNLogoProps) {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Glow effect behind logo */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full blur-md animate-glow-pulse"
        style={{
          width: size * 0.7,
          height: size * 0.4,
          background:
            "radial-gradient(ellipse, rgba(0, 180, 255, 0.6) 0%, transparent 70%)",
        }}
      />

      {/* SVG Logo - Arch/Portal "n" shape with blue glow */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        <defs>
          <linearGradient id="archGlow" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#00CFFF" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#0077FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="topGlowEffect" cx="50%" cy="15%" r="35%">
            <stop offset="0%" stopColor="#00CFFF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <filter id="softBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
          </filter>
        </defs>

        {/* Dark background circle */}
        <circle cx="50" cy="50" r="48" fill="#0B0B0F" />
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          stroke="rgba(0, 200, 255, 0.1)"
          strokeWidth="1"
        />

        {/* Top blue glow */}
        <ellipse
          cx="50"
          cy="16"
          rx="26"
          ry="10"
          fill="url(#topGlowEffect)"
          filter="url(#softBlur)"
        />

        {/* Main "n" arch shape - white */}
        <path
          d="M 33 82 L 33 44 C 33 28 40 18 50 18 C 60 18 67 28 67 44 L 67 82"
          fill="none"
          stroke="white"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Glow overlay on arch */}
        <path
          d="M 33 82 L 33 44 C 33 28 40 18 50 18 C 60 18 67 28 67 44 L 67 82"
          fill="none"
          stroke="url(#archGlow)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />

        {/* Subtle inner glow line */}
        <path
          d="M 38 80 L 38 45 C 38 32 42 24 50 24 C 58 24 62 32 62 45 L 62 80"
          fill="none"
          stroke="rgba(0, 200, 255, 0.1)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
