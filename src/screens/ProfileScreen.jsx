import React from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Shield,
  Layers,
  Sparkles,
  RotateCcw,
  Sliders,
  ChevronRight,
  Palette,
  ExternalLink
} from 'lucide-react';

export default function ProfileScreen() {
  const {
    user,
    resetDemoData,
    v2Mode,
    setV2Mode,
    reducedMotion,
    setReducedMotion,
    setCurrentScreen
  } = useApp();

  return (
    <div className="flex-1 overflow-y-auto pb-28 pt-2 px-4 space-y-4">
      {/* Title */}
      <div className="pt-1">
        <h1 className="text-xl font-bold text-[#101828]">Profile & Settings</h1>
        <p className="text-xs text-[#7B8497]">Prototype configuration & testing lab</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-4 border border-[#E6EAF2] shadow-card flex items-center gap-3.5">
        <div className="w-14 h-14 rounded-full border-2 border-[#2155F5]/30 overflow-hidden bg-white shadow-2xs">
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h2 className="text-base font-bold text-[#101828] truncate">{user.name}</h2>
            <span className="text-[10px] bg-blue-100 text-[#2155F5] font-bold px-2 py-0.5 rounded-full">
              {user.tier}
            </span>
          </div>
          <p className="text-xs text-[#7B8497] mt-0.5">Account ID: {user.accountNumber}</p>
        </div>
      </div>

      {/* User Testing & Iterations Deep Dive Banner */}
      <button
        onClick={() => setCurrentScreen('testing')}
        className="w-full bg-gradient-to-r from-[#071438] to-[#122861] text-white rounded-2xl p-4 text-left shadow-card hover:opacity-95 transition-all flex items-center justify-between group"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#2155F5]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#6ea0ff]">Section 7</span>
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-blue-200 transition-colors">
            User Testing & Design Iterations
          </h3>
          <p className="text-[11px] text-[#8c9bbb]">
            Review 3 participant test templates, improvement logs & V1 vs V2 comparisons
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-[#6ea0ff] flex-shrink-0 ml-2" />
      </button>

      {/* Prototype Controls */}
      <div className="bg-white rounded-2xl p-4 border border-[#E6EAF2] shadow-card space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#7B8497] block border-b border-[#F0F3F8] pb-2">
          Prototype Preferences
        </span>

        {/* V1 vs V2 Mode Toggle */}
        <div className="flex items-center justify-between py-1">
          <div>
            <div className="text-xs font-semibold text-[#101828]">Design System Iteration</div>
            <div className="text-[11px] text-[#7B8497]">
              {v2Mode ? 'Version 02: Refined sheets & local queue' : 'Version 01: Baseline interaction set'}
            </div>
          </div>
          <button
            onClick={() => setV2Mode(!v2Mode)}
            className="px-3 py-1.5 bg-[#2155F5] hover:bg-[#1645D8] text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Switch to {v2Mode ? 'V01' : 'V02'}
          </button>
        </div>

        {/* Reduced Motion Toggle */}
        <div className="flex items-center justify-between py-1 border-t border-[#F0F3F8] pt-2">
          <div>
            <div className="text-xs font-semibold text-[#101828]">Reduced Motion</div>
            <div className="text-[11px] text-[#7B8497]">Accessibility animation preferences</div>
          </div>
          <button
            onClick={() => setReducedMotion(!reducedMotion)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              reducedMotion ? 'bg-[#2155F5] text-white' : 'bg-gray-100 text-[#7B8497]'
            }`}
          >
            {reducedMotion ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        {/* Reset State Button */}
        <div className="flex items-center justify-between py-1 border-t border-[#F0F3F8] pt-2">
          <div>
            <div className="text-xs font-semibold text-[#101828]">Reset Prototype State</div>
            <div className="text-[11px] text-[#7B8497]">Restore initial ₹15,897 / ₹20,000 ledger</div>
          </div>
          <button
            onClick={resetDemoData}
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-[#071438] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Visual Design System Palette Card */}
      <div className="bg-white rounded-2xl p-4 border border-[#E6EAF2] shadow-card space-y-3">
        <div className="flex items-center justify-between border-b border-[#F0F3F8] pb-2">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#2155F5]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#7B8497]">Color System</span>
          </div>
          <span className="text-[11px] text-[#7B8497]">Inter Typography</span>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
          <div className="space-y-1">
            <div className="w-full h-8 rounded-lg bg-[#2155F5] shadow-xs" />
            <span className="text-[#101828] font-bold">#2155F5</span>
            <div className="text-[#7B8497]">Primary</div>
          </div>
          <div className="space-y-1">
            <div className="w-full h-8 rounded-lg bg-[#071438] shadow-xs" />
            <span className="text-[#101828] font-bold">#071438</span>
            <div className="text-[#7B8497]">Navy</div>
          </div>
          <div className="space-y-1">
            <div className="w-full h-8 rounded-lg bg-[#16A085] shadow-xs" />
            <span className="text-[#101828] font-bold">#16A085</span>
            <div className="text-[#7B8497]">Success</div>
          </div>
          <div className="space-y-1">
            <div className="w-full h-8 rounded-lg bg-[#F5A623] shadow-xs" />
            <span className="text-[#101828] font-bold">#F5A623</span>
            <div className="text-[#7B8497]">Warning</div>
          </div>
        </div>
      </div>
    </div>
  );
}

