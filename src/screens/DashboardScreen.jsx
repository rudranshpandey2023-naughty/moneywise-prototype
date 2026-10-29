import React from 'react';
import { useApp } from '../context/AppContext';
import ProgressBar from '../components/common/ProgressBar';
import {
  Bell,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  AlertOctagon,
  WifiOff,
  ChevronRight,
  Plus,
  Utensils,
  Car,
  Film,
  ShoppingBag,
  Zap,
  HeartPulse,
  MoreHorizontal,
  CreditCard,
  Smartphone,
  Eye,
  SlidersHorizontal
} from 'lucide-react';

export default function DashboardScreen() {
  const {
    user,
    monthlyBudget,
    monthlySpent,
    dailyLimit,
    dailySpent,
    remainingBudget,
    budgetPercentage,
    isBudgetWarning,
    isBudgetReached,
    isDailyLimitCrossed,
    highlightRemaining,
    budgetWarningDismissed,
    setBudgetWarningDismissed,
    dailyWarningDismissed,
    setDailyWarningDismissed,
    transactions,
    weeklySpending,
    isOnline,
    setIsOnline,
    pendingOfflineExpenses,
    setActiveModal,
    setSelectedTransaction,
    setSavedExpenseDraft,
    setCurrentScreen,
    triggerInteraction
  } = useApp();

  const getCategoryIcon = (categoryName) => {
    switch ((categoryName || "").toLowerCase()) {
      case 'food & dining':
      case 'food':
        return <Utensils className="w-4 h-4 text-[#F59E0B]" />;
      case 'transport':
        return <Car className="w-4 h-4 text-[#2155F5]" />;
      case 'entertainment':
        return <Film className="w-4 h-4 text-[#8B5CF6]" />;
      case 'shopping':
        return <ShoppingBag className="w-4 h-4 text-[#EC4899]" />;
      case 'bills & utilities':
      case 'bills':
        return <Zap className="w-4 h-4 text-[#10B981]" />;
      case 'health & wellness':
      case 'health':
        return <HeartPulse className="w-4 h-4 text-[#EF4444]" />;
      default:
        return <MoreHorizontal className="w-4 h-4 text-[#7B8497]" />;
    }
  };

  const dailyPercentage = Math.round((dailySpent / dailyLimit) * 100);

  return (
    <div className="flex-1 overflow-y-auto pb-28 pt-2 px-4 space-y-4">
      {/* Offline Status Banner (Interaction 08 - State A) */}
      {!isOnline && (
        <div className="bg-[#FFF8E6] border border-[#F5A623]/30 rounded-2xl p-3 flex items-center justify-between shadow-sm animate-slide-up">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#F5A623]/15 flex items-center justify-center text-[#F5A623]">
              <WifiOff className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#071438]">You're offline</p>
              <p className="text-[11px] text-[#7B8497]">You can still add expenses safely</p>
            </div>
          </div>
          <button
            onClick={() => setIsOnline(true)}
            className="text-xs font-semibold bg-white border border-[#E6EAF2] text-[#2155F5] px-2.5 py-1.5 rounded-lg hover:bg-blue-50 transition-colors shadow-2xs"
          >
            Reconnect
          </button>
        </div>
      )}

      {/* Header Profile Greeting */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-[#E6EAF2] overflow-hidden bg-white shadow-2xs">
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-[#7B8497]">{user.greeting}</span>
              <span className="text-[10px] bg-blue-100 text-[#2155F5] font-semibold px-1.5 py-0.5 rounded-full">Pro</span>
            </div>
            <h1 className="text-lg font-bold text-[#101828] leading-tight">{user.name}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveModal('notifications')}
            aria-label="Notifications"
            className="w-9 h-9 rounded-full bg-white border border-[#E6EAF2] flex items-center justify-center text-[#101828] hover:bg-gray-50 active:scale-95 transition-all shadow-2xs relative"
          >
            <Bell className="w-4 h-4" />
            {(isBudgetWarning || isBudgetReached || isDailyLimitCrossed) && (
              <span className="w-2 h-2 rounded-full bg-[#E5484D] absolute top-2 right-2 ring-2 ring-white" />
            )}
          </button>
        </div>
      </div>

      {/* Main Budget Card - Banking Aesthetic */}
      <div className="bg-[#071438] text-white rounded-[24px] p-5 shadow-card relative overflow-hidden">
        {/* Subtle geometric circles inspired by premium banking cards */}
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-gradient-to-br from-[#2155F5]/20 to-transparent pointer-events-none" />
        <div className="absolute right-12 top-4 w-28 h-28 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between text-xs text-[#8c9bbb]">
            <span>Monthly Budget Balance</span>
            <span className="font-mono text-[11px] bg-white/10 px-2 py-0.5 rounded text-white">{user.accountNumber}</span>
          </div>

          <div>
            <div className="text-xs text-[#8c9bbb] mb-0.5">Remaining this month</div>
            <div className="flex items-baseline gap-2">
              <span
                className={`text-3xl font-extrabold tracking-tight transition-all duration-300 ${
                  highlightRemaining ? 'text-[#F5A623] scale-105' : 'text-white'
                }`}
              >
                ₹{remainingBudget.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-[#8c9bbb]">
                of ₹{monthlyBudget.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Budget Progress Bar */}
          <div className="space-y-1.5 pt-1">
            <ProgressBar
              percentage={budgetPercentage}
              height="h-2.5"
              warningThreshold={80}
              dangerThreshold={100}
            />
            <div className="flex justify-between items-center text-[11px] text-[#8c9bbb]">
              <span>Spent ₹{monthlySpent.toLocaleString('en-IN')}</span>
              <span className={`font-semibold ${
                budgetPercentage >= 100 ? 'text-[#E5484D]' : budgetPercentage >= 80 ? 'text-[#F5A623]' : 'text-white'
              }`}>
                {budgetPercentage}%
              </span>
            </div>
          </div>

          {/* Quick Actions inside Card */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
            <button
              onClick={() => {
                setSavedExpenseDraft(null);
                setActiveModal('add-expense');
              }}
              className="bg-[#2155F5] hover:bg-[#1645D8] active:scale-95 text-white text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Expense</span>
            </button>
            <button
              onClick={() => setActiveModal('edit-budget')}
              className="bg-white/10 hover:bg-white/15 active:scale-95 text-white text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#8c9bbb]" />
              <span>Edit Budget</span>
            </button>
          </div>
        </div>
      </div>

      {/* INTERACTION 02: 80% BUDGET WARNING BANNER */}
      {isBudgetWarning && !budgetWarningDismissed && (
        <div className="bg-[#FFF8E6] border border-[#F5A623] rounded-2xl p-4 shadow-sm animate-slide-up flex flex-col gap-2">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F5A623]/20 flex items-center justify-center text-[#F5A623] flex-shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-[#071438]">Your budget is getting close</h4>
              <p className="text-xs text-[#525d73] mt-0.5 leading-relaxed">
                You've spent ₹{monthlySpent.toLocaleString('en-IN')} of your ₹{monthlyBudget.toLocaleString('en-IN')} monthly budget. ₹{remainingBudget.toLocaleString('en-IN')} left for the rest of the month.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              onClick={() => setBudgetWarningDismissed(true)}
              className="text-xs font-medium text-[#7B8497] hover:text-[#101828] px-2.5 py-1.5"
            >
              Dismiss
            </button>
            <button
              onClick={() => setCurrentScreen('budgets')}
              className="text-xs font-semibold bg-[#F5A623] hover:bg-[#d98f18] text-[#071438] px-3.5 py-1.5 rounded-lg transition-colors shadow-2xs"
            >
              View Budget
            </button>
          </div>
        </div>
      )}

      {/* INTERACTION 06: 100% BUDGET REACHED / OVERBUDGET CAUTIONARY ALERT */}
      {isBudgetReached && !budgetWarningDismissed && (
        <div className="bg-[#FEF2F2] border border-[#E5484D] rounded-2xl p-4 shadow-sm animate-slide-up flex flex-col gap-2.5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E5484D]/15 flex items-center justify-center text-[#E5484D] flex-shrink-0 mt-0.5">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-[#E5484D]">You've reached your monthly budget</h4>
              <p className="text-xs text-[#525d73] mt-0.5 leading-relaxed">
                {monthlySpent > monthlyBudget
                  ? `You are ₹${(monthlySpent - monthlyBudget).toLocaleString('en-IN')} over budget! Review your spending before making more purchases.`
                  : `You've used your full ₹${monthlyBudget.toLocaleString('en-IN')} budget. Review your spending before making more purchases.`}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 bg-white rounded-xl p-2.5 border border-[#FEE2E2] text-center">
            <div>
              <div className="text-[10px] text-[#7B8497]">Total Budget</div>
              <div className="text-xs font-bold text-[#101828]">₹{monthlyBudget.toLocaleString('en-IN')}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#7B8497]">Total Spent</div>
              <div className="text-xs font-bold text-[#E5484D]">₹{monthlySpent.toLocaleString('en-IN')}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#7B8497]">Remaining</div>
              <div className="text-xs font-bold text-[#101828]">₹{Math.max(0, remainingBudget).toLocaleString('en-IN')}</div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              onClick={() => setCurrentScreen('activity')}
              className="text-xs font-semibold bg-white border border-[#E6EAF2] hover:bg-gray-50 text-[#101828] px-3 py-1.5 rounded-lg transition-colors"
            >
              Review Expenses
            </button>
            <button
              onClick={() => setActiveModal('edit-budget')}
              className="text-xs font-semibold bg-[#2155F5] hover:bg-[#1645D8] text-white px-3.5 py-1.5 rounded-lg transition-colors shadow-2xs"
            >
              Adjust Budget
            </button>
          </div>
        </div>
      )}

      {/* INTERACTION 10: DAILY SPENDING LIMIT CARD */}
      <div className={`rounded-2xl p-4 border transition-all ${
        isDailyLimitCrossed
          ? 'bg-[#FFF5F5] border-[#E5484D]/40 shadow-sm'
          : 'bg-white border-[#E6EAF2] shadow-card'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7B8497]">Daily Spending Limit</span>
            {isDailyLimitCrossed && (
              <span className="text-[10px] font-bold bg-[#E5484D] text-white px-1.5 py-0.5 rounded">Exceeded</span>
            )}
          </div>
          <span className="text-xs font-medium text-[#7B8497]">Limit: ₹{dailyLimit.toLocaleString('en-IN')}</span>
        </div>

        <div className="flex items-baseline justify-between mb-2">
          <div>
            <span className={`text-xl font-extrabold ${isDailyLimitCrossed ? 'text-[#E5484D]' : 'text-[#101828]'}`}>
              ₹{dailySpent.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-[#7B8497] ml-1.5">spent today</span>
          </div>
          <div className="text-xs text-right">
            {isDailyLimitCrossed ? (
              <span className="font-semibold text-[#E5484D]">₹{(dailySpent - dailyLimit).toLocaleString('en-IN')} over limit</span>
            ) : (
              <span className="text-[#16A085] font-semibold">₹{(dailyLimit - dailySpent).toLocaleString('en-IN')} remaining</span>
            )}
          </div>
        </div>

        <ProgressBar
          percentage={dailyPercentage}
          height="h-2"
          warningThreshold={80}
          dangerThreshold={100}
        />

        {/* When limit is crossed, show alert details & actions */}
        {isDailyLimitCrossed && (
          <div className="mt-3 pt-3 border-t border-[#FEE2E2] flex items-center justify-between">
            <p className="text-xs text-[#525d73]">
              You spent ₹{dailySpent.toLocaleString('en-IN')} today, which is ₹{(dailySpent - dailyLimit).toLocaleString('en-IN')} over your limit.
            </p>
            <button
              onClick={() => setCurrentScreen('activity')}
              className="text-xs font-semibold text-[#2155F5] hover:underline flex-shrink-0 ml-2"
            >
              Review Today
            </button>
          </div>
        )}
      </div>

      {/* Weekly Spending Bar Chart */}
      <div className="bg-white rounded-2xl p-4 border border-[#E6EAF2] shadow-card">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-[#101828]">Weekly Activity</h3>
            <span className="text-xs text-[#7B8497]">Daily expense breakdown</span>
          </div>
          <span className="text-xs font-semibold text-[#2155F5] flex items-center gap-0.5">
            Avg ₹838/day <TrendingUp className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="flex items-end justify-between h-24 pt-2 px-1">
          {weeklySpending.map((item, idx) => {
            const maxVal = 1600;
            const barHeight = Math.max(12, Math.round((item.amount / maxVal) * 80));
            return (
              <div key={idx} className="flex flex-col items-center gap-1.5 flex-1">
                <span className="text-[10px] text-[#7B8497] font-medium">₹{item.amount}</span>
                <div className="w-6 bg-[#F0F3F8] rounded-t-md h-20 flex items-end justify-center overflow-hidden">
                  <div
                    style={{ height: `${barHeight}px` }}
                    className={`w-full rounded-t-md transition-all duration-500 ${
                      item.active ? 'bg-[#2155F5]' : 'bg-[#D6E0FB] hover:bg-[#2155F5]'
                    }`}
                  />
                </div>
                <span className={`text-[11px] font-medium ${item.active ? 'text-[#071438] font-bold' : 'text-[#7B8497]'}`}>
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Transactions List with Working Interactions */}
      <div className="bg-white rounded-2xl p-4 border border-[#E6EAF2] shadow-card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#101828]">Recent Transactions</h3>
          <button
            onClick={() => setCurrentScreen('activity')}
            className="text-xs font-semibold text-[#2155F5] hover:text-[#1645D8] flex items-center gap-0.5"
          >
            View all <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-[#F0F3F8]">
          {transactions.slice(0, 4).map((tx) => (
            <div
              key={tx.id}
              onClick={() => {
                setSelectedTransaction(tx);
                setActiveModal('transaction-details');
              }}
              className="py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50/70 -mx-2 px-2 rounded-xl transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F5F7FB] border border-[#E6EAF2] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  {getCategoryIcon(tx.category)}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#101828] group-hover:text-[#2155F5] transition-colors">
                    {tx.merchant}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-[#7B8497]">
                    <span>{tx.category}</span>
                    <span>•</span>
                    <span>{tx.date}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-sm font-bold text-[#101828]">
                  -₹{tx.amount.toLocaleString('en-IN')}
                </span>
                <div className="text-[10px] text-[#7B8497] font-medium">
                  {tx.paymentMethod}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulated Payment Quick Demo Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/70 rounded-2xl p-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#2155F5]">Interaction 03 Demo</span>
          <h4 className="text-xs font-bold text-[#071438] mt-0.5">Urban Cafe UPI Payment (₹450)</h4>
          <p className="text-[11px] text-[#525d73]">Test payment processing & success/error transitions</p>
        </div>
        <button
          onClick={() => setActiveModal('payment-processing')}
          className="bg-[#2155F5] hover:bg-[#1645D8] active:scale-95 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all shadow-sm"
        >
          Pay ₹450
        </button>
      </div>
    </div>
  );
}

