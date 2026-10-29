import React from 'react';

export default function AnimatedCheckmark({ size = 64, strokeWidth = 3.5, color = "#16A085" }) {
  return (
    <div className="relative flex items-center justify-center animate-scale-spring" style={{ width: size, height: size }}>
      <svg
        className="w-full h-full transform -rotate-90"
        viewBox="0 0 54 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Subtle Ring */}
        <circle
          cx="27"
          cy="27"
          r="25"
          stroke="#E6EAF2"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Animated Success Circle */}
        <circle
          className="animate-checkmark-circle"
          cx="27"
          cy="27"
          r="25"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      {/* Animated Check Path */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 54 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="animate-checkmark-check"
          d="M17 27.5L24 34.5L37 19.5"
          stroke={color}
          strokeWidth={strokeWidth + 0.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

