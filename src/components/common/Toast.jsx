import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toast, hideToast } = useApp();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-[#16A085] flex-shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-[#F5A623] flex-shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-[#E5484D] flex-shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-[#2155F5] flex-shrink-0" />;
    }
  };

  return (
    <div className="absolute bottom-20 left-4 right-4 z-50 pointer-events-none flex justify-center">
      <div className="pointer-events-auto max-w-[360px] w-full bg-[#071438] text-white rounded-2xl px-4 py-3 shadow-modal flex items-center justify-between gap-3 border border-[#162758] animate-slide-up">
        <div className="flex items-center gap-3 min-w-0">
          {getIcon()}
          <span className="text-sm font-medium leading-snug truncate text-white">
            {toast.message}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {toast.actionLabel && (
            <button
              onClick={() => {
                if (toast.onAction) toast.onAction();
                hideToast();
              }}
              className="bg-[#2155F5] hover:bg-[#1645D8] active:scale-95 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
            >
              {toast.actionLabel}
            </button>
          )}
          <button
            onClick={hideToast}
            className="p-1 text-[#7B8497] hover:text-white rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

