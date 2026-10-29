import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Bell,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  WifiOff,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export default function NotificationsScreen({ onClose }) {
  const {
    isBudgetWarning,
    isBudgetReached,
    isDailyLimitCrossed,
    monthlySpent,
    monthlyBudget,
    dailySpent,
    dailyLimit,
    pendingOfflineExpenses,
    setCurrentScreen
  } = useApp();

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col justify-between overflow-hidden animate-slide-up safe-pt safe-pb">
      {/* Header */}
      <div className="px-5 py-3 border-b border-[#E6EAF2] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#2155F5]" />
          <h2 className="text-base font-bold text-[#101828]">Alerts & Notifications</h2>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-[#F5F7FB] flex items-center justify-center text-[#7B8497] hover:text-[#101828]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {/* Budget Reached Alert (if active) */}
        {isBudgetReached && (
          <div className="bg-[#FEF2F2] border border-[#E5484D] rounded-2xl p-3.5 space-y-2">
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#E5484D]/15 flex items-center justify-center text-[#E5484D] flex-shrink-0">
                <AlertOctagon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-[#E5484D]">100% Monthly Budget Reached</h4>
                <p className="text-[11px] text-[#525d73] mt-0.5">
                  Spent ₹{monthlySpent.toLocaleString('en-IN')} of ₹{monthlyBudget.toLocaleString('en-IN')}.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Budget Warning Alert (if active) */}
        {isBudgetWarning && (
          <div className="bg-[#FFF8E6] border border-[#F5A623] rounded-2xl p-3.5 space-y-2">
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#F5A623]/20 flex items-center justify-center text-[#F5A623] flex-shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-[#071438]">80% Budget Warning</h4>
                <p className="text-[11px] text-[#525d73] mt-0.5">
                  Your budget is getting close. ₹{(monthlyBudget - monthlySpent).toLocaleString('en-IN')} remaining.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Daily Spending Limit Alert (if active) */}
        {isDailyLimitCrossed && (
          <div className="bg-[#FFF5F5] border border-[#E5484D]/40 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#E5484D]/15 flex items-center justify-center text-[#E5484D] flex-shrink-0">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-[#E5484D]">Daily Spending Limit Exceeded</h4>
                <p className="text-[11px] text-[#525d73] mt-0.5">
                  Spent ₹{dailySpent.toLocaleString('en-IN')} today (₹{dailySpent - dailyLimit} over ₹{dailyLimit} limit).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Offline items waiting to sync */}
        {pendingOfflineExpenses.length > 0 && (
          <div className="bg-[#FFF8E6] border border-[#F5A623]/40 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#F5A623]/20 flex items-center justify-center text-[#F5A623] flex-shrink-0">
                <WifiOff className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-[#071438]">Offline Queue Active</h4>
                <p className="text-[11px] text-[#525d73] mt-0.5">
                  {pendingOfflineExpenses.length} expense(s) waiting to sync once connection is restored.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Standard Info Notification */}
        <div className="bg-[#F5F7FB] border border-[#E6EAF2] rounded-2xl p-3.5 space-y-2">
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-[#2155F5] flex-shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-[#101828]">MoneyWise Guard Active</h4>
              <p className="text-[11px] text-[#7B8497] mt-0.5">
                Duplicate detection, smart categorization, and undo safety are protecting your ledger.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[#E6EAF2] bg-white">
        <button
          onClick={onClose}
          className="w-full bg-[#071438] hover:bg-[#101e4a] text-white text-xs font-semibold py-3 rounded-xl transition-colors"
        >
          Dismiss All
        </button>
      </div>
    </div>
  );
}

