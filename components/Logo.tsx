import React from 'react';

interface LogoProps {
  className?: string;
  scrolled?: boolean;
  minimal?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-8", scrolled, minimal = false }) => {
  if (minimal) {
    // Minimal icon version - M in circle like the reference image
    return (
      <svg 
        viewBox="0 0 48 48" 
        className={`${className} transition-all duration-300`}
        fill="none"
      >
        {/* Outer circle */}
        <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" className="text-neutral-600"/>
        
        {/* M letter */}
        <text 
          x="24" 
          y="32" 
          fontFamily="Syne, sans-serif" 
          fontSize="22" 
          fontWeight="600" 
          fill="currentColor" 
          textAnchor="middle" 
          className="text-white"
        >
          M
        </text>
      </svg>
    );
  }

  return (
    <svg 
      viewBox="0 0 320 60" 
      className={`${className} transition-all duration-300`}
      fill="none"
    >
      {/* Wordmark - MOUVCON */}
      <text x="0" y="36" fontFamily="Syne, sans-serif" fontSize="28" fontWeight="600" letterSpacing="0" fill="currentColor" className="text-white">
        MOUVCON
      </text>

      {/* Subtitle - CONSULTING */}
      <text x="155" y="30" dominantBaseline="middle" fontFamily="Inter, sans-serif" fontSize="10" letterSpacing="3" fill="currentColor" className="text-neutral-500">
        CONSULTING
      </text>
    </svg>
  );
};
