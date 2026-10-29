import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import AnimatedCheckmark from '../components/common/AnimatedCheckmark';
import BottomSheet from '../components/common/BottomSheet';
import {
  X,
  Sparkles,
  AlertTriangle,
  AlertCircle,
  WifiOff,
  Calendar,
  CreditCard,
  FileText,
  Check,
  ChevronDown,
  Car,
  Utensils,
  Film,
  ShoppingBag,
  Zap,
  HeartPulse,
  MoreHorizontal,
  RotateCw,
  ArrowRight
} from 'lucide-react';
import { INITIAL_DATA } from '../data/mockData';

export default function AddExpenseScreen({ onClose }) {
  const {
    addExpense,
    transactions,
    isOnline,
    setIsOnline,
    simulateErrorOnAdd,
    setSimulateErrorOnAdd,
    savedExpenseDraft,
    setSavedExpenseDraft,
    categories,
    setActiveModal,
    setSelectedTransaction,
    setCurrentScreen,
    showToast
  } = useApp();

  // Form States (pre-filled with sample data or saved draft)
  const [amount, setAmount] = useState(savedExpenseDraft?.amount || '850');
  const [merchant, setMerchant] = useState(savedExpenseDraft?.merchant || 'Groceries');
  const [category, setCategory] = useState(savedExpenseDraft?.category || 'Food & Dining');
  const [date, setDate] = useState(savedExpenseDraft?.date || 'Today');
  const [paymentMethod, setPaymentMethod] = useState(savedExpenseDraft?.paymentMethod || 'UPI');
  const [notes, setNotes] = useState(savedExpenseDraft?.note || '');

  // Sub-interaction states
  // 'form' | 'processing' | 'success' | 'error' | 'offline_queued'
  const [formState, setFormState] = useState('form');
  const [createdTransaction, setCreatedTransaction] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Category Picker Sheet State
  const [showCategorySheet, setShowCategorySheet] = useState(false);

  // Duplicate Modal State (Interaction 04)
  const [duplicateMatch, setDuplicateMatch] = useState(null);
  const [showDuplicateSheet, setShowDuplicateSheet] = useState(false);

  // Suggested Category (Interaction 09)
  const [suggestedCategory, setSuggestedCategory] = useState(null);
  const [suggestionAccepted, setSuggestionAccepted] = useState(false);

  // Smart merchant matching effect
  useEffect(() => {
    if (!merchant) {
      setSuggestedCategory(null);
      return;
    }
    const clean = merchant.trim().toLowerCase();
    const match = INITIAL_DATA.merchantCategoryMap[clean];
    if (match && match !== category) {
      setSuggestedCategory(match);
      setSuggestionAccepted(false);
    } else {
      setSuggestedCategory(null);
    }
  }, [merchant, category]);

  // Handle Save Expense Submission
  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorMessage("Please enter a valid amount greater than ₹0");
      return;
    }
    if (!merchant.trim()) {
      setErrorMessage("Please enter a merchant or description");
      return;
    }

    // INTERACTION 04: Check for Duplicate Expense
    // Matches if same merchant, same amount, and same date & payment method
    const existingDuplicate = transactions.find(tx =>
      tx.merchant.toLowerCase() === merchant.trim().toLowerCase() &&
      tx.amount === parsedAmount &&
      tx.paymentMethod === paymentMethod &&
      (tx.date.includes("Today") || tx.rawDate === new Date().toISOString().split("T")[0])
    );

    if (existingDuplicate) {
      setDuplicateMatch(existingDuplicate);
      setShowDuplicateSheet(true);
      return;
    }

    proceedWithSave();
  };

  const proceedWithSave = () => {
    setShowDuplicateSheet(false);
    setFormState('processing');

    // Simulate network roundtrip (800ms)
    setTimeout(() => {
      // Check if evaluator has error simulation enabled
      if (simulateErrorOnAdd) {
        setFormState('error');
        setErrorMessage("Your expense couldn't be saved. Your details are still here.");
        return;
      }

      const res = addExpense({
        amount,
        merchant,
        category: category || "Other",
        paymentMethod,
        date,
        note: notes
      });

      setCreatedTransaction(res.transaction);

      if (res.status === 'offline') {
        setFormState('offline_queued');
      } else {
        setFormState('success');
      }
    }, 850);
  };

  const getCategoryIcon = (catName) => {
    switch ((catName || "").toLowerCase()) {
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

  return (
    <div className="absolute inset-0 z-40 bg-white flex flex-col overflow-hidden animate-slide-up">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-[#E6EAF2] flex items-center justify-between safe-pt bg-white">
        <h2 className="text-lg font-bold text-[#101828]">Add Expense</h2>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-[#F5F7FB] flex items-center justify-center text-[#7B8497] hover:text-[#101828] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Offline Status Notice (Interaction 08) */}
      {!isOnline && (
        <div className="bg-[#FFF8E6] border-b border-[#F5A623]/30 px-5 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WifiOff className="w-4 h-4 text-[#F5A623]" />
            <span className="text-xs text-[#071438] font-medium">You're offline. You can still add expenses.</span>
          </div>
          <span className="text-[10px] bg-[#F5A623]/20 text-[#9E6404] px-2 py-0.5 rounded font-semibold">Local Sync</span>
        </div>
      )}

      {/* BODY CONTENT - MULTI STATE */}
      <div className="flex-1 overflow-y-auto px-5 py-4 safe-pb relative">
        {/* ================= STATE A: FORM ENTRY ================= */}
        {formState === 'form' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Amount Field with Big ₹ Symbol */}
            <div className="bg-[#F5F7FB] border border-[#E6EAF2] rounded-2xl p-4 text-center focus-within:border-[#2155F5] focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <label className="block text-xs font-semibold text-[#7B8497] mb-1">Expense Amount</label>
              <div className="flex items-center justify-center gap-1">
                <span className="text-2xl font-bold text-[#101828]">₹</span>
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-44 text-3xl font-extrabold text-[#101828] bg-transparent text-center focus:outline-none"
                  autoFocus
                />
              </div>
            </div>

            {/* Merchant / Description Field */}
            <div>
              <label className="block text-xs font-semibold text-[#101828] mb-1.5">Description / Merchant</label>
              <input
                type="text"
                placeholder="e.g. Groceries, Uber, Netflix"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
                className="w-full bg-white border border-[#E6EAF2] rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#101828] focus:border-[#2155F5] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            {/* INTERACTION 09: CATEGORY SUGGESTION CARD */}
            {suggestedCategory && !suggestionAccepted && (
              <div className="bg-[#EEF4FF] border border-[#2155F5]/30 rounded-xl p-3 flex items-center justify-between animate-slide-up shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#2155F5]/10 flex items-center justify-center text-[#2155F5]">
                    {getCategoryIcon(suggestedCategory)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-[#2155F5] uppercase tracking-wider">Suggested Category</span>
                      <Sparkles className="w-3 h-3 text-[#2155F5]" />
                    </div>
                    <div className="text-xs font-bold text-[#071438]">{suggestedCategory}</div>
                    <div className="text-[10px] text-[#7B8497]">Based on merchant name</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCategory(suggestedCategory);
                      setSuggestionAccepted(true);
                      showToast(`Applied ${suggestedCategory}`, "success");
                    }}
                    className="bg-[#2155F5] hover:bg-[#1645D8] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
                  >
                    Use {suggestedCategory}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCategorySheet(true)}
                    className="text-xs font-medium text-[#7B8497] hover:text-[#101828] px-1.5 py-1"
                  >
                    Choose another
                  </button>
                </div>
              </div>
            )}

            {/* Category Selector */}
            <div>
              <label className="block text-xs font-semibold text-[#101828] mb-1.5">Category</label>
              <button
                type="button"
                onClick={() => setShowCategorySheet(true)}
                className="w-full bg-white border border-[#E6EAF2] hover:border-[#CBD5E1] rounded-xl px-3.5 py-2.5 flex items-center justify-between text-left transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-[#F5F7FB] flex items-center justify-center">
                    {getCategoryIcon(category)}
                  </div>
                  <span className="text-sm font-medium text-[#101828]">
                    {category || "Choose category"}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-[#7B8497]" />
              </button>
            </div>

            {/* Date and Payment Method Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#101828] mb-1.5">Date</label>
                <div className="relative">
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white border border-[#E6EAF2] rounded-xl pl-8 pr-3 py-2.5 text-xs font-medium text-[#101828] focus:border-[#2155F5] focus:outline-none"
                  />
                  <Calendar className="w-3.5 h-3.5 text-[#7B8497] absolute left-2.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#101828] mb-1.5">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full bg-white border border-[#E6EAF2] rounded-xl px-3 py-2.5 text-xs font-medium text-[#101828] focus:border-[#2155F5] focus:outline-none"
                >
                  <option value="UPI">UPI (Google Pay / PhonePe)</option>
                  <option value="Card">Debit / Credit Card</option>
                  <option value="NetBanking">Net Banking</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
            </div>

            {/* Notes (Optional) */}
            <div>
              <label className="block text-xs font-semibold text-[#101828] mb-1.5">Notes (Optional)</label>
              <textarea
                rows="2"
                placeholder="Add context or split details..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-white border border-[#E6EAF2] rounded-xl px-3.5 py-2 text-xs font-medium text-[#101828] focus:border-[#2155F5] focus:outline-none"
              />
            </div>

            {/* Error banner if validation fails */}
            {errorMessage && (
              <div className="bg-[#FEF2F2] border border-[#FEE2E2] rounded-xl p-3 flex items-center gap-2 text-xs text-[#E5484D]">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#2155F5] hover:bg-[#1645D8] active:scale-[0.98] text-white font-semibold text-sm py-3.5 px-4 rounded-xl shadow-float transition-all duration-150 flex items-center justify-center gap-2"
              >
                <span>Save Expense</span>
              </button>
            </div>
          </form>
        )}

        {/* ================= STATE B: PROCESSING ================= */}
        {formState === 'processing' && (
          <div className="h-full flex flex-col items-center justify-center py-16 space-y-4 animate-fade-in">
            <div className="w-14 h-14 rounded-full border-4 border-[#2155F5]/20 border-t-[#2155F5] animate-spin" />
            <div className="text-center">
              <h3 className="text-base font-bold text-[#101828]">Saving expense…</h3>
              <p className="text-xs text-[#7B8497] mt-1">
                Updating budget & ledger records
              </p>
            </div>
            <div className="bg-[#F5F7FB] border border-[#E6EAF2] rounded-xl px-4 py-2 text-xs text-[#525d73] font-medium">
              ₹{amount} • {merchant} • {category}
            </div>
          </div>
        )}

        {/* ================= STATE C: SUCCESS (INTERACTION 01 - STATE C) ================= */}
        {formState === 'success' && (
          <div className="h-full flex flex-col items-center justify-center py-10 space-y-5 animate-fade-in text-center">
            <AnimatedCheckmark size={72} strokeWidth={3.5} color="#16A085" />

            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-[#071438]">Expense Added!</h3>
              <p className="text-sm text-[#7B8497]">
                ₹{amount} has been added to your expenses.
              </p>
            </div>

            {/* Transaction Receipt Card */}
            <div className="w-full bg-[#F5F7FB] border border-[#E6EAF2] rounded-2xl p-4 text-left space-y-2.5">
              <div className="flex items-center justify-between border-b border-[#E6EAF2] pb-2">
                <span className="text-xs text-[#7B8497]">Merchant</span>
                <span className="text-xs font-bold text-[#101828]">{merchant}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#E6EAF2] pb-2">
                <span className="text-xs text-[#7B8497]">Amount</span>
                <span className="text-sm font-extrabold text-[#101828]">₹{amount}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#E6EAF2] pb-2">
                <span className="text-xs text-[#7B8497]">Category</span>
                <span className="text-xs font-semibold text-[#2155F5]">{category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#7B8497]">Method</span>
                <span className="text-xs font-medium text-[#101828]">{paymentMethod}</span>
              </div>
            </div>

            <div className="w-full space-y-2 pt-2">
              <button
                onClick={() => {
                  if (createdTransaction) {
                    setSelectedTransaction(createdTransaction);
                    setActiveModal('transaction-details');
                  }
                }}
                className="w-full bg-[#2155F5] hover:bg-[#1645D8] active:scale-95 text-white font-semibold text-sm py-3 px-4 rounded-xl transition-all shadow-float"
              >
                View Transaction
              </button>
              <button
                onClick={onClose}
                className="w-full bg-white border border-[#E6EAF2] hover:bg-gray-50 text-[#101828] font-semibold text-sm py-3 px-4 rounded-xl transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}

        {/* ================= STATE D: ERROR RECOVERY (INTERACTION 01 - STATE D) ================= */}
        {formState === 'error' && (
          <div className="h-full flex flex-col items-center justify-center py-10 space-y-5 animate-fade-in text-center">
            <div className="w-16 h-16 rounded-full bg-[#FEF2F2] border-2 border-[#E5484D] flex items-center justify-center text-[#E5484D] shadow-sm animate-scale-spring">
              <AlertOctagon className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#E5484D]">Couldn't Save Expense</h3>
              <p className="text-xs text-[#7B8497] max-w-[280px]">
                Your expense couldn't be saved. Your details are still here.
              </p>
            </div>

            {/* Preserved Data Confirmation Card */}
            <div className="w-full bg-[#FFF5F5] border border-[#FEE2E2] rounded-2xl p-4 text-left text-xs space-y-1 text-[#525d73]">
              <div className="font-semibold text-[#101828] mb-1">Preserved Input:</div>
              <div>• Amount: <strong className="text-[#101828]">₹{amount}</strong></div>
              <div>• Merchant: <strong className="text-[#101828]">{merchant}</strong></div>
              <div>• Category: <strong className="text-[#101828]">{category}</strong></div>
              <div>• Payment: <strong className="text-[#101828]">{paymentMethod}</strong></div>
            </div>

            <div className="w-full space-y-2 pt-2">
              <button
                onClick={() => {
                  setSimulateErrorOnAdd(false); // Clear error toggle for recovery
                  setFormState('form'); // Restore form with all data intact
                }}
                className="w-full bg-[#2155F5] hover:bg-[#1645D8] active:scale-95 text-white font-semibold text-sm py-3 px-4 rounded-xl transition-all shadow-float flex items-center justify-center gap-2"
              >
                <RotateCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
              <button
                onClick={onClose}
                className="w-full bg-white border border-[#E6EAF2] hover:bg-gray-50 text-[#7B8497] font-semibold text-sm py-3 px-4 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ================= STATE E: OFFLINE QUEUED (INTERACTION 08 - STATE B) ================= */}
        {formState === 'offline_queued' && (
          <div className="h-full flex flex-col items-center justify-center py-10 space-y-5 animate-fade-in text-center">
            <div className="w-16 h-16 rounded-full bg-[#FFF8E6] border-2 border-[#F5A623] flex items-center justify-center text-[#F5A623] shadow-sm animate-scale-spring">
              <WifiOff className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#071438]">Expense saved offline</h3>
              <p className="text-xs text-[#7B8497] max-w-[280px]">
                Your expense is stored on this device and will sync when you're back online.
              </p>
            </div>

            {/* Offline Queued Card */}
            <div className="w-full bg-[#F5F7FB] border border-[#E6EAF2] rounded-2xl p-4 text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#7B8497]">Status</span>
                <span className="text-[11px] font-bold bg-[#F5A623]/20 text-[#9E6404] px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-ping" />
                  Waiting to sync
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#7B8497]">Amount</span>
                <span className="text-sm font-bold text-[#101828]">₹{amount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#7B8497]">Merchant</span>
                <span className="text-xs font-semibold text-[#101828]">{merchant}</span>
              </div>
            </div>

            <div className="w-full space-y-2 pt-2">
              <button
                onClick={() => {
                  setCurrentScreen('activity');
                  onClose();
                }}
                className="w-full bg-[#2155F5] hover:bg-[#1645D8] active:scale-95 text-white font-semibold text-sm py-3 px-4 rounded-xl transition-all shadow-float"
              >
                View in Pending Sync
              </button>
              <button
                onClick={onClose}
                className="w-full bg-white border border-[#E6EAF2] hover:bg-gray-50 text-[#101828] font-semibold text-sm py-3 px-4 rounded-xl transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>

      {/* INTERACTION 04: DUPLICATE BOTTOM SHEET MODAL */}
      <BottomSheet
        isOpen={showDuplicateSheet}
        onClose={() => setShowDuplicateSheet(false)}
        title="Possible Duplicate"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF8E6] border border-[#F5A623]/40 flex items-center justify-center text-[#F5A623] flex-shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[#525d73] leading-relaxed">
                You already added a similar expense today. Are you sure you want to add this again?
              </p>
            </div>
          </div>

          {/* Existing Transaction Preview */}
          {duplicateMatch && (
            <div className="bg-[#F5F7FB] border border-[#E6EAF2] rounded-2xl p-3.5 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#7B8497]">
                Existing Transaction
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E6EAF2] flex items-center justify-center">
                    {getCategoryIcon(duplicateMatch.category)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#101828]">{duplicateMatch.merchant}</h4>
                    <span className="text-[11px] text-[#7B8497]">{duplicateMatch.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-extrabold text-[#101828]">₹{duplicateMatch.amount}</span>
                  <div className="text-[10px] text-[#2155F5] font-semibold">{duplicateMatch.category}</div>
                </div>
              </div>
            </div>
          )}

          {/* 3 Required Actions */}
          <div className="space-y-2 pt-1">
            <button
              onClick={() => {
                setShowDuplicateSheet(false);
                onClose();
                showToast("Duplicate prevented. Kept existing expense.", "info");
              }}
              className="w-full bg-[#071438] hover:bg-[#101e4a] active:scale-95 text-white font-semibold text-xs py-3 rounded-xl transition-all shadow-sm"
            >
              Keep Existing (Discard New)
            </button>

            <button
              onClick={() => proceedWithSave()}
              className="w-full bg-[#2155F5] hover:bg-[#1645D8] active:scale-95 text-white font-semibold text-xs py-3 rounded-xl transition-all shadow-float"
            >
              Add Anyway (Create Duplicate)
            </button>

            <button
              onClick={() => setShowDuplicateSheet(false)}
              className="w-full bg-white border border-[#E6EAF2] hover:bg-gray-50 text-[#101828] font-semibold text-xs py-2.5 rounded-xl transition-colors"
            >
              Edit Details
            </button>
          </div>
        </div>
      </BottomSheet>

      {/* CATEGORY PICKER BOTTOM SHEET (INTERACTION 09 - STATE D) */}
      <BottomSheet
        isOpen={showCategorySheet}
        onClose={() => setShowCategorySheet(false)}
        title="Select Category"
      >
        <div className="grid grid-cols-1 gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategory(cat.name);
                setShowCategorySheet(false);
                showToast(`Category updated to ${cat.name}`, "info");
              }}
              className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                category === cat.name
                  ? 'border-[#2155F5] bg-blue-50/50'
                  : 'border-[#E6EAF2] hover:bg-gray-50 bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F5F7FB] flex items-center justify-center">
                  {getCategoryIcon(cat.name)}
                </div>
                <span className="text-xs font-semibold text-[#101828]">{cat.name}</span>
              </div>
              {category === cat.name && <Check className="w-4 h-4 text-[#2155F5]" />}
            </button>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
}

