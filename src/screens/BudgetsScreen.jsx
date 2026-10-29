import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ProgressBar from '../components/common/ProgressBar';
import BottomSheet from '../components/common/BottomSheet';
import {
  SlidersHorizontal,
  ChevronRight,
  AlertTriangle,
  AlertOctagon,
  Utensils,
  Car,
  Film,
  ShoppingBag,
  Zap,
  HeartPulse,
  MoreHorizontal,
  Info
} from 'lucide-react';

export default function BudgetsScreen() {
  const {
    monthlyBudget,
    monthlySpent,
    remainingBudget,
    budgetPercentage,
    categories,
    isBudgetWarning,
    isBudgetReached,
    setActiveModal,
    transactions
  } = useApp();

  const [inspectCategory, setInspectCategory] = useState(null);

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

  const getCategoryTransactions = (catName) => {
    return transactions.filter(t => t.category.toLowerCase() === (catName || "").toLowerCase());
  };

  return (
    <div className="flex-1 overflow-y-auto pb-28 pt-2 px-4 space-y-4">
      {/* Title & Action */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-xl font-bold text-[#101828]">Budgets</h1>
          <p className="text-xs text-[#7B8497]">Monthly allowances & caps</p>
        </div>
        <button
          onClick={() => setActiveModal('edit-budget')}
          className="bg-white border border-[#E6EAF2] hover:bg-gray-50 text-[#101828] text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#2155F5]" />
          <span>Edit Budget</span>
        </button>
      </div>

      {/* Monthly Overview Card */}
      <div className="bg-[#071438] text-white rounded-2xl p-5 shadow-card space-y-3">
        <div className="flex justify-between items-center text-xs text-[#8c9bbb]">
          <span>Total Monthly Spending</span>
          <span className="font-semibold text-white">{budgetPercentage}% used</span>
        </div>

        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-extrabold text-white">
            ₹{monthlySpent.toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-[#8c9bbb]">
            Cap: ₹{monthlyBudget.toLocaleString('en-IN')}
          </span>
        </div>

        <ProgressBar
          percentage={budgetPercentage}
          height="h-2.5"
          warningThreshold={80}
          dangerThreshold={100}
        />

        <div className="flex justify-between items-center text-xs text-[#8c9bbb] pt-1">
          <span>Remaining: ₹{Math.max(0, remainingBudget).toLocaleString('en-IN')}</span>
          <span>{isBudgetReached ? 'Limit exceeded' : 'On Track'}</span>
        </div>
      </div>

      {/* Warning State Banner if active */}
      {isBudgetWarning && (
        <div className="bg-[#FFF8E6] border border-[#F5A623] rounded-2xl p-3.5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#F5A623]/20 flex items-center justify-center text-[#F5A623] flex-shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="text-xs text-[#525d73]">
            <strong className="text-[#071438] block">80% Budget Warning Active</strong>
            ₹{remainingBudget.toLocaleString('en-IN')} left for the rest of the month.
          </div>
        </div>
      )}

      {/* Categories Drilldown */}
      <div className="bg-white rounded-2xl p-4 border border-[#E6EAF2] shadow-card space-y-3">
        <div className="flex items-center justify-between border-b border-[#F0F3F8] pb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7B8497]">
            Category Breakdown
          </span>
          <span className="text-xs text-[#7B8497]">Tap for details</span>
        </div>

        <div className="divide-y divide-[#F0F3F8]">
          {categories.filter(c => c.allocated > 0).map((cat) => {
            const catPercentage = Math.min(100, Math.round((cat.spent / cat.allocated) * 100));
            return (
              <div
                key={cat.id}
                onClick={() => setInspectCategory(cat)}
                className="py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50/70 -mx-2 px-2 rounded-xl transition-colors group"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0 pr-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F5F7FB] border border-[#E6EAF2] flex items-center justify-center flex-shrink-0">
                    {getCategoryIcon(cat.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-bold text-[#101828] group-hover:text-[#2155F5] transition-colors truncate">
                        {cat.name}
                      </h4>
                      <span className="text-xs font-semibold text-[#101828]">
                        ₹{cat.spent.toLocaleString('en-IN')} / ₹{cat.allocated.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <ProgressBar
                      percentage={catPercentage}
                      height="h-1.5"
                      warningThreshold={80}
                      dangerThreshold={100}
                    />
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-[#7B8497] flex-shrink-0" />
              </div>
            );
          })}
        </div>
      </div>

      {/* SCREEN 10: BUDGET DETAILS BOTTOM SHEET */}
      <BottomSheet
        isOpen={Boolean(inspectCategory)}
        onClose={() => setInspectCategory(null)}
        title={inspectCategory ? `${inspectCategory.name} Budget` : ''}
      >
        {inspectCategory && (
          <div className="space-y-4">
            <div className="bg-[#F5F7FB] border border-[#E6EAF2] rounded-2xl p-4 text-center">
              <div className="text-xs text-[#7B8497]">Monthly Allocated Cap</div>
              <div className="text-2xl font-bold text-[#101828] mt-0.5">
                ₹{inspectCategory.allocated.toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-[#2155F5] font-semibold mt-1">
                Spent so far: ₹{inspectCategory.spent.toLocaleString('en-IN')} (
                {Math.round((inspectCategory.spent / inspectCategory.allocated) * 100)}%)
              </div>
            </div>

            {/* Category Transactions */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7B8497]">
                Transactions in this category
              </span>

              <div className="divide-y divide-[#F0F3F8] bg-white border border-[#E6EAF2] rounded-xl px-3">
                {getCategoryTransactions(inspectCategory.name).length === 0 ? (
                  <div className="py-4 text-center text-xs text-[#7B8497]">
                    No transactions recorded for this category yet.
                  </div>
                ) : (
                  getCategoryTransactions(inspectCategory.name).map((tx) => (
                    <div key={tx.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-[#101828]">{tx.merchant}</div>
                        <div className="text-[11px] text-[#7B8497]">{tx.date}</div>
                      </div>
                      <div className="font-bold text-[#101828]">-₹{tx.amount}</div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <button
              onClick={() => {
                setInspectCategory(null);
                setActiveModal('edit-budget');
              }}
              className="w-full bg-[#2155F5] hover:bg-[#1645D8] text-white font-semibold text-xs py-3 rounded-xl transition-all shadow-float"
            >
              Adjust {inspectCategory.name} Allocation
            </button>
          </div>
        )}
      </BottomSheet>
    </div>
  );
}

