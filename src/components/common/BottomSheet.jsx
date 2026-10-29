import React, { useEffect } from 'react';

export default function BottomSheet({ isOpen, onClose, title, children, showHandle = true }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-40 overflow-hidden flex flex-col justify-end">
      {/* Dimmed Backdrop */}
      <div
        className="absolute inset-0 bg-[#071438]/50 backdrop-blur-[2px] transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />

      {/* Sheet Container */}
      <div className="relative bg-white rounded-t-[28px] max-h-[85%] w-full shadow-modal overflow-hidden flex flex-col z-10 animate-slide-up border-t border-[#E6EAF2]">
        {showHandle && (
          <div className="w-full flex justify-center pt-3 pb-1 cursor-grab" onClick={onClose}>
            <div className="w-10 h-1 bg-[#D1D5DB] rounded-full" />
          </div>
        )}

        {title && (
          <div className="px-5 pt-2 pb-3 border-b border-[#F0F3F8] flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#101828]">{title}</h3>
            <button
              onClick={onClose}
              className="text-xs text-[#7B8497] hover:text-[#101828] font-medium px-2 py-1 rounded-md"
            >
              Close
            </button>
          </div>
        )}

        <div className="overflow-y-auto px-5 py-4 safe-pb flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

