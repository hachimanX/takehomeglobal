import React, { useState } from 'react';

interface CountryFlagProps {
  code: string; // ISO 2-letter code (e.g. US, GB, SG, PK)
  name?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const CountryFlag: React.FC<CountryFlagProps> = ({
  code,
  name = '',
  className = '',
  size = 'md',
}) => {
  const [hasError, setHasError] = useState(false);
  const cleanCode = (code || 'US').toLowerCase().trim();

  // Size definitions
  const sizeClasses = {
    sm: 'w-4 h-3 rounded-[2px]',
    md: 'w-5 h-3.5 rounded-[3px]',
    lg: 'w-7 h-5 rounded-md',
    xl: 'w-10 h-7 rounded-lg shadow-md',
  };

  if (hasError || !cleanCode) {
    return (
      <span
        className={`inline-flex items-center justify-center font-mono text-[10px] font-bold bg-white/[0.08] text-slate-300 px-1 py-0.5 rounded ${className}`}
      >
        {cleanCode.toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={`https://flagcdn.com/w80/${cleanCode}.png`}
      srcSet={`https://flagcdn.com/w160/${cleanCode}.png 2x`}
      alt={name ? `${name} flag` : `${cleanCode.toUpperCase()} flag`}
      loading="lazy"
      onError={() => setHasError(true)}
      className={`inline-block object-cover shadow-sm border border-white/[0.1] shrink-0 ${sizeClasses[size]} ${className}`}
    />
  );
};
