import React from 'react';

interface KontaProLogoProps {
  variant?: 'full' | 'mark-only';
  theme?: 'light' | 'dark';
  className?: string;
  height?: number | string;
}

export const KontaProLogo: React.FC<KontaProLogoProps> = ({
  variant = 'full',
  theme = 'light',
  className = '',
  height = 36,
}) => {
  const isDark = theme === 'dark';
  const navyColor = isDark ? '#FFFFFF' : '#0B2046';
  const blueColor = '#0A78FC';

  if (variant === 'mark-only') {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height, width: 'auto', display: 'block' }}
        className={className}
        aria-label="KontaPro"
      >
        {/* Base Left Vertical Stem */}
        <rect x="18" y="12" width="22" height="76" rx="5" fill={navyColor} />
        {/* Lower Diagonal Leg */}
        <path d="M40 50 L75 88 H96 L53 38 Z" fill={navyColor} />
        {/* Dynamic Diagonal Slash with Ascending Arrow */}
        <path d="M22 66 L68 25 L79 34 L94 8 L54 13 L63 21 L16 62 Z" fill={blueColor} />
      </svg>
    );
  }

  return (
    <div
      style={{ display: 'inline-flex', alignItems: 'center', height }}
      className={className}
    >
      <svg
        viewBox="0 0 380 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: '100%', width: 'auto', display: 'block' }}
        aria-label="KontaPro Logo"
      >
        {/* Icon Mark K */}
        <g transform="translate(5, 0)">
          <rect x="16" y="10" width="20" height="70" rx="4" fill={navyColor} />
          <path d="M36 45 L67 80 H87 L47 35 Z" fill={navyColor} />
          <path d="M20 60 L62 24 L72 32 L86 10 L50 14 L58 21 L15 56 Z" fill={blueColor} />
        </g>
        {/* Wordmark */}
        <text
          x="115"
          y="62"
          fontFamily="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif"
          fontSize="44"
          fontWeight="800"
          letterSpacing="-1px"
        >
          <tspan fill={navyColor}>Konta</tspan>
          <tspan fill={blueColor}>Pro</tspan>
        </text>
      </svg>
    </div>
  );
};

export default KontaProLogo;
