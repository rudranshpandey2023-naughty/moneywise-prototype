import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ArrowRight, Wallet, Bell, Sparkles } from 'lucide-react';

export default function WelcomeScreen({ onStart }) {
  const { user } = useApp();

  return (
    <div className="flex-1 flex flex-col justify-between px-6 py-8 safe-pt safe-pb bg-white text-[#101828]">
      {/* Top Brand Logo */}
      <div className="space-y-4 pt-6">
        <div className="w-14 h-14 rounded-2xl bg-[#2155F5] flex items-center justify-center text-white shadow-float">
          <Wallet className="w-7 h-7" />
        </div>

        <div>
          <span className="text-xs font-bold text-[#2155F5] uppercase tracking-wider">
            Personal Finance Micro-Interactions
          </span>
          <h1 className="text-2xl font-extrabold text-[#071438] mt-1 tracking-tight">
            MoneyWise
          </h1>
          <p className="text-xs text-[#7B8497] mt-1 leading-relaxed">
            Every transaction, budget shift, and spending limit is paired with responsive, purposeful micro-feedback.
          </p>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="space-y-3 py-6">
        <div className="bg-[#F5F7FB] border border-[#E6EAF2] rounded-2xl p-3.5 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#2155F5] flex items-center justify-center flex-shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#101828]">10 Functional Micro-Interactions</h4>
            <p className="text-[11px] text-[#7B8497] leading-relaxed">
              Duplicate detection, offline queues, semantic color budget transitions, and instant undo.
            </p>
          </div>
        </div>

        <div className="bg-[#F5F7FB] border border-[#E6EAF2] rounded-2xl p-3.5 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-green-100 text-[#16A085] flex items-center justify-center flex-shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#101828]">Error Recovery & Resilience</h4>
            <p className="text-[11px] text-[#7B8497] leading-relaxed">
              Every failure state retains your input for seamless one-tap recovery without data loss.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Profile Quick Start */}
      <div className="space-y-3">
        <button
          onClick={onStart}
          className="w-full bg-[#2155F5] hover:bg-[#1645D8] active:scale-98 text-white font-semibold text-sm py-3.5 rounded-xl shadow-float flex items-center justify-center gap-2 transition-all"
        >
          <span>Continue as {user.name}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[11px] text-center text-[#7B8497]">
          Demo profile: ₹20,000 monthly budget • 393 × 852 px
        </p>
      </div>
    </div>
  );
}

