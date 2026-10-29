import React from 'react';

export default function ProgressBar({
  percentage,
  height = 'h-2.5',
  showLabel = false,
  customColor = null,
  rounded = 'rounded-full',
  warningThreshold = 80,
  dangerThreshold = 100
}) {
  // Clamp visually between 0 and 100% so it never overflows its container
  const visualPercentage = Math.min(Math.max(percentage, 0), 100);

  // Dynamic semantic color determination
  const getColor = () => {
    if (customColor) return customColor;
    if (percentage >= dangerThreshold) {
      return 'bg-[#E5484D]'; // Error Red
    }
    if (percentage >= warningThreshold) {
      return 'bg-[#F5A623]'; // Warning Amber
    }
    return 'bg-[#2155F5]'; // Primary Blue
  };

  const getShadowColor = () => {
    if (percentage >= dangerThreshold) return 'shadow-[0_0_10px_rgba(229,72,77,0.35)]';
    if (percentage >= warningThreshold) return 'shadow-[0_0_10px_rgba(245,166,35,0.35)]';
    return 'shadow-[0_0_10px_rgba(33,85,245,0.25)]';
  };

  return (
    <div className="w-full">
      <div className={`w-full bg-[#E6EAF2] ${rounded} ${height} overflow-hidden relative`}>
        <div
          className={`${height} ${rounded} ${getColor()} ${getShadowColor()} transition-all duration-500 ease-out`}
          style={{ width: `${visualPercentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between items-center text-xs mt-1.5 font-medium text-[#7B8497]">
          <span>{percentage}% used</span>
          <span>{100 - percentage > 0 ? `${100 - percentage}% left` : 'Limit reached'}</span>
        </div>
      )}
    </div>
  );
}

