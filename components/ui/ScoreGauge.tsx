'use client';

import React from 'react';

interface ScoreGaugeProps {
  score: number | null;
  size?: 'sm' | 'md' | 'lg';
}

export function ScoreGauge({ score, size = 'md' }: ScoreGaugeProps) {
  const sizes = {
    sm: { width: 40, stroke: 4, font: 'text-xs' },
    md: { width: 60, stroke: 6, font: 'text-sm' },
    lg: { width: 80, stroke: 8, font: 'text-lg' },
  };
  
  const { width, stroke, font } = sizes[size];
  const radius = (width - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = score !== null ? (score / 100) * circumference : 0;
  
  const getColor = () => {
    if (score === null) return '#9ca3af';
    if (score <= 30) return '#22c55e';
    if (score <= 60) return '#eab308';
    return '#ef4444';
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={width} height={width} className="transform -rotate-90">
        <circle
          cx={width / 2}
          cy={width / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={stroke}
        />
        {score !== null && (
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        )}
      </svg>
      <span className={`absolute ${font} font-semibold ${score !== null ? '' : 'text-gray-400'}`}>
        {score !== null ? score : '-'}
      </span>
    </div>
  );
}
