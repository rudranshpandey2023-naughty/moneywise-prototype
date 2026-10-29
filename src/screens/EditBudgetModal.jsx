import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import AnimatedCheckmark from '../components/common/AnimatedCheckmark';
import {
  X,
  RotateCw,
  AlertOctagon,
  Check,
  Sliders,
  DollarSign,
  Utensils,
  Car,
  Film,
  ShoppingBag,
  Zap,
  HeartPulse,
  MoreHorizontal
} from 'lucide-react';

export default function EditBudgetModal({ onClose }) {
  const {
    monthlyBudget,
    updateMonthlyBudget,
    categories,
    setCategories,
    simulateErrorOnBudgetEdit,
    setSimulateErrorOnBudgetEdit,
    showToast
  } = useApp();

  const [newBudget, setNewBudget] = useState(monthlyBudget.toString());
  // 'form' | 'saving' | 'saved' | 'error'
  const [saveState, setSaveState] = useState('form');
  const [errorMessage, setErrorMessage] = useState('');

  // Editable category allocations
  const [categoryBudgets, setCategoryBudgets] = useState(
    categories.map(c => ({ id: c.id, name: c.name, allocated: c.allocated }))
  );

  const handleAllocationChange = (id, val) => {
    const num = parseFloat(val) || 0;
    setCategoryBudgets(prev => prev.map(item => item.id === id ? { ...item, allocated: num } : item));
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    const parsed = parseFloat(newBudget);
    if (isNaN(parsed) || parsed <= 0) {
      setErrorMessage("Please enter a valid monthly budget amount.");
      return;
    }

    setSaveState('saving');

    // Simulate saving roundtrip (750ms)
    setTimeout(() => {
      if (simulateErrorOnBudgetEdit) {
        setSaveState('error');
        setErrorMessage("Couldn't update your budget. Connection timed out.");
      } else {
        // Apply changes
        updateMonthlyBudget(parsed);
        setCategories(prev => prev.map(cat => {
          const match = categoryBudgets.find(b => b.id === cat.id);
          return match ? { ...cat, allocated: match.allocated } : cat;
        }));
        setSaveState('saved');
        setTimeout(() => {
          onClose();
        }, 1200);
      }
    }, 800);
  };

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col justify-between overflow-hidden animate-slide-up safe-pt safe-pb">
      {/* Header */}
      <div className="px-5 py-3 border-b border-[#E6EAF2] flex items-center justify-between">
        <h2 className="text-base font-bold text-[#101828]">Edit Monthly Budget</h2>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-[#F5F7FB] flex items-center justify-center text-[#7B8497] hover:text-[#101828]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
        {/* ================= STATE A: EDIT FORM ================= */}
        {(saveState === 'form' || saveState === 'saving') && (
          <form onSubmit={handleSave} className="space-y-4">
            {/* Monthly Budget Input Card */}
            <div className="bg-[#F5F7FB] border border-[#E6EAF2] rounded-2xl p-4 text-center">
              <label className="block text-xs font-semibold text-[#7B8497] mb-1">
                Total Monthly Budget Limit
              </label>
              <div className="flex items-center justify-center gap-1">
                <span className="text-2xl font-bold text-[#101828]">₹</span>
                <input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="w-44 text-3xl font-extrabold text-[#101828] bg-transparent text-center focus:outline-none"
                  autoFocus
                />
              </div>
              <p className="text-[11px] text-[#7B8497] mt-1">
                Previous budget: ₹{monthlyBudget.toLocaleString('en-IN')}
              </p>
            </div>

            {/* Quick Adjustment Presets */}
            <div className="flex gap-2 justify-center">
              {[20000, 22000, 25000, 30000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setNewBudget(amt.toString())}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                    newBudget === amt.toString()
                      ? 'bg-[#2155F5] text-white border-[#2155F5]'
                      : 'bg-white text-[#7B8497] border-[#E6EAF2] hover:border-[#CBD5E1]'
                  }`}
                >
                  ₹{amt.toLocaleString('en-IN')}
                </button>
              ))}
            </div>

            {/* Category Level Allocations */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7B8497]">
                Category Budget Allocations
              </span>

              <div className="space-y-2">
                {categoryBudgets.map((cat) => (
                  <div
                    key={cat.id}
                    className="bg-white border border-[#E6EAF2] rounded-xl p-3 flex items-center justify-between"
                  >
                    <span className="text-xs font-semibold text-[#101828]">{cat.name}</span>
                    <div className="flex items-center gap-1 w-28 bg-[#F5F7FB] border border-[#E6EAF2] rounded-lg px-2 py-1">
                      <span className="text-xs text-[#7B8497]">₹</span>
                      <input
                        type="number"
                        value={cat.allocated}
                        onChange={(e) => handleAllocationChange(cat.id, e.target.value)}
                        className="w-full text-xs font-bold text-[#101828] bg-transparent text-right focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {errorMessage && (
              <div className="text-xs text-[#E5484D] bg-[#FEF2F2] p-2.5 rounded-xl border border-[#FEE2E2]">
                {errorMessage}
              </div>
            )}
          </form>
        )}

        {/* ================= STATE C: SAVED (INTERACTION 07 - STATE C) ================= */}
        {saveState === 'saved' && (
          <div className="h-full flex flex-col items-center justify-center py-16 space-y-4 animate-fade-in text-center">
            <AnimatedCheckmark size={68} strokeWidth={3.5} color="#16A085" />
            <div>
              <h3 className="text-xl font-bold text-[#071438]">Budget Saved!</h3>
              <p className="text-xs text-[#7B8497] mt-1">
                Updated to ₹{parseFloat(newBudget).toLocaleString('en-IN')}
              </p>
            </div>
            <div className="bg-[#F5F7FB] border border-[#E6EAF2] rounded-xl px-4 py-2 text-xs font-semibold text-[#16A085]">
              Dashboard recalculated successfully
            </div>
          </div>
        )}

        {/* ================= STATE D: SAVE ERROR (INTERACTION 07 - STATE D) ================= */}
        {saveState === 'error' && (
          <div className="h-full flex flex-col items-center justify-center py-12 space-y-4 animate-fade-in text-center">
            <div className="w-16 h-16 rounded-full bg-[#FEF2F2] border-2 border-[#E5484D] flex items-center justify-center text-[#E5484D] mx-auto shadow-sm animate-scale-spring">
              <AlertOctagon className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#E5484D]">Couldn't update your budget</h3>
              <p className="text-xs text-[#7B8497]">
                We preserved your edited values. You can retry immediately.
              </p>
            </div>

            <div className="bg-[#FFF5F5] border border-[#FEE2E2] rounded-xl p-3 text-xs text-left text-[#525d73]">
              <div>• Edited Amount: <strong className="text-[#101828]">₹{newBudget}</strong></div>
              <div>• Current Active Budget: <strong className="text-[#101828]">₹{monthlyBudget}</strong></div>
            </div>

            <div className="w-full space-y-2 pt-2">
              <button
                onClick={() => {
                  setSimulateErrorOnBudgetEdit(false);
                  setSaveState('saving');
                  setTimeout(() => {
                    updateMonthlyBudget(parseFloat(newBudget));
                    setSaveState('saved');
                    setTimeout(() => onClose(), 1000);
                  }, 700);
                }}
                className="w-full bg-[#2155F5] hover:bg-[#1645D8] text-white text-xs font-semibold py-3 rounded-xl transition-all shadow-float flex items-center justify-center gap-1.5"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
              <button
                onClick={() => setSaveState('form')}
                className="w-full bg-white border border-[#E6EAF2] hover:bg-gray-50 text-[#101828] text-xs font-semibold py-2.5 rounded-xl transition-colors"
              >
                Continue Editing
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {(saveState === 'form' || saveState === 'saving') && (
        <div className="p-5 border-t border-[#E6EAF2] bg-white">
          <button
            onClick={handleSave}
            disabled={saveState === 'saving'}
            className="w-full bg-[#2155F5] hover:bg-[#1645D8] active:scale-98 text-white font-semibold text-sm py-3.5 rounded-xl shadow-float transition-all flex items-center justify-center gap-2 disabled:opacity-75"
          >
            {saveState === 'saving' ? (
              <>
                <RotateCw className="w-4 h-4 animate-spin" />
                <span>Saving…</span>
              </>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

