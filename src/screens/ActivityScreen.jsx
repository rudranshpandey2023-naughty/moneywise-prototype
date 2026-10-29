import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Filter,
  WifiOff,
  RotateCw,
  Trash2,
  ChevronRight,
  Utensils,
  Car,
  Film,
  ShoppingBag,
  Zap,
  HeartPulse,
  MoreHorizontal,
  CloudCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function ActivityScreen() {
  const {
    transactions,
    pendingOfflineExpenses,
    isSyncing,
    syncFailed,
    syncOfflineExpenses,
    isOnline,
    setIsOnline,
    setSelectedTransaction,
    setActiveModal,
    deleteTransaction,
    deletingTxId
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

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

  const categories = ['All', 'Food & Dining', 'Transport', 'Entertainment', 'Shopping', 'Health & Wellness'];

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tx.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategoryFilter === 'All' || tx.category === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 overflow-y-auto pb-28 pt-2 px-4 space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-xl font-bold text-[#101828]">Activity</h1>
          <p className="text-xs text-[#7B8497]">Transaction history & synced records</p>
        </div>
        <div className="text-xs font-semibold text-[#2155F5] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
          {transactions.length + pendingOfflineExpenses.length} Records
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search merchant or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#E6EAF2] rounded-xl pl-9 pr-3.5 py-2.5 text-xs font-medium text-[#101828] focus:border-[#2155F5] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
          />
          <Search className="w-4 h-4 text-[#7B8497] absolute left-3 top-3" />
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategoryFilter(cat)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                selectedCategoryFilter === cat
                  ? 'bg-[#071438] text-white shadow-2xs'
                  : 'bg-white border border-[#E6EAF2] text-[#7B8497] hover:text-[#101828]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ================= INTERACTION 08: PENDING SYNC SECTION ================= */}
      {pendingOfflineExpenses.length > 0 && (
        <div className="bg-[#FFF8E6] border border-[#F5A623]/40 rounded-2xl p-4 shadow-sm space-y-3 animate-slide-up">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#F5A623]/20 flex items-center justify-center text-[#F5A623]">
                <WifiOff className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#071438]">Pending Sync ({pendingOfflineExpenses.length})</h3>
                <span className="text-[10px] text-[#7B8497]">Stored locally on device</span>
              </div>
            </div>

            <button
              onClick={syncOfflineExpenses}
              disabled={isSyncing}
              className="bg-[#2155F5] hover:bg-[#1645D8] active:scale-95 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-2xs disabled:opacity-50"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing…' : 'Sync Now'}</span>
            </button>
          </div>

          {syncFailed && (
            <div className="bg-[#FEF2F2] border border-[#FEE2E2] rounded-xl p-2.5 flex items-center justify-between text-xs text-[#E5484D]">
              <div className="flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>Couldn't sync this expense. Data preserved safely.</span>
              </div>
              <button
                onClick={syncOfflineExpenses}
                className="font-bold underline text-xs ml-2 hover:text-red-700"
              >
                Retry
              </button>
            </div>
          )}

          {/* Pending items list */}
          <div className="space-y-2">
            {pendingOfflineExpenses.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#E6EAF2] rounded-xl p-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F7FB] flex items-center justify-center">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#101828]">{item.merchant}</h4>
                    <div className="flex items-center gap-1.5 text-[10px] text-[#F5A623] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                      <span>Waiting to sync</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-[#101828]">-₹{item.amount}</span>
                  <div className="text-[10px] text-[#7B8497]">{item.paymentMethod}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Transactions List */}
      <div className="bg-white rounded-2xl p-4 border border-[#E6EAF2] shadow-card space-y-3">
        <div className="flex items-center justify-between border-b border-[#F0F3F8] pb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7B8497]">Recent Ledger</span>
          <span className="text-xs text-[#7B8497]">Tap to view / delete</span>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#7B8497]">
            No transactions found matching your filter.
          </div>
        ) : (
          <div className="divide-y divide-[#F0F3F8]">
            {filteredTransactions.map((tx) => {
              const isDeleting = deletingTxId === tx.id;
              return (
                <div
                  key={tx.id}
                  className={`py-3 flex items-center justify-between group transition-all duration-300 ${
                    isDeleting ? 'animate-row-collapse overflow-hidden' : ''
                  }`}
                >
                  {/* Left: Icon & Info */}
                  <div
                    onClick={() => {
                      setSelectedTransaction(tx);
                      setActiveModal('transaction-details');
                    }}
                    className="flex items-center gap-3 flex-1 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#F5F7FB] border border-[#E6EAF2] flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 transition-colors">
                      {getCategoryIcon(tx.category)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#101828] group-hover:text-[#2155F5] transition-colors">
                        {tx.merchant}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-[#7B8497]">
                        <span>{tx.category}</span>
                        <span>•</span>
                        <span>{tx.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Amount & Quick Delete Action */}
                  <div className="flex items-center gap-3">
                    <div
                      onClick={() => {
                        setSelectedTransaction(tx);
                        setActiveModal('transaction-details');
                      }}
                      className="text-right cursor-pointer"
                    >
                      <span className="text-xs font-extrabold text-[#101828]">
                        -₹{tx.amount.toLocaleString('en-IN')}
                      </span>
                      <div className="text-[10px] text-[#7B8497] font-medium">
                        {tx.paymentMethod}
                      </div>
                    </div>

                    {/* INTERACTION 05: Delete button triggering confirmation modal */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmDeleteId(tx.id);
                      }}
                      aria-label="Delete"
                      className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-[#E5484D] flex items-center justify-center transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* INTERACTION 05: CONFIRMATION MODAL */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071438]/50 backdrop-blur-[2px] animate-fade-in">
          <div className="bg-white rounded-2xl p-5 max-w-[340px] w-full shadow-modal border border-[#E6EAF2] space-y-4 animate-scale-spring text-center">
            <div className="w-12 h-12 rounded-full bg-[#FEF2F2] border border-[#E5484D]/30 flex items-center justify-center text-[#E5484D] mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#101828]">Delete this transaction?</h3>
              <p className="text-xs text-[#7B8497] leading-relaxed">
                This expense will be removed from your transaction history. You can undo this immediately from the toast.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="bg-white border border-[#E6EAF2] hover:bg-gray-50 text-[#101828] font-semibold text-xs py-2.5 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const id = confirmDeleteId;
                  setConfirmDeleteId(null);
                  deleteTransaction(id);
                }}
                className="bg-[#E5484D] hover:bg-red-700 active:scale-95 text-white font-semibold text-xs py-2.5 rounded-xl transition-all shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

