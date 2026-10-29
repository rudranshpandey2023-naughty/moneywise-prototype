import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Trash2,
  Share2,
  Calendar,
  CreditCard,
  Tag,
  FileText,
  Hash,
  CheckCircle,
  AlertOctagon,
  Utensils,
  Car,
  Film,
  ShoppingBag,
  Zap,
  HeartPulse,
  MoreHorizontal
} from 'lucide-react';

export default function TransactionDetailsModal({ onClose }) {
  const {
    selectedTransaction,
    deleteTransaction,
    showToast
  } = useApp();

  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!selectedTransaction) return null;

  const getCategoryIcon = (categoryName) => {
    switch ((categoryName || "").toLowerCase()) {
      case 'food & dining':
      case 'food':
        return <Utensils className="w-5 h-5 text-[#F59E0B]" />;
      case 'transport':
        return <Car className="w-5 h-5 text-[#2155F5]" />;
      case 'entertainment':
        return <Film className="w-5 h-5 text-[#8B5CF6]" />;
      case 'shopping':
        return <ShoppingBag className="w-5 h-5 text-[#EC4899]" />;
      case 'bills & utilities':
      case 'bills':
        return <Zap className="w-5 h-5 text-[#10B981]" />;
      case 'health & wellness':
      case 'health':
        return <HeartPulse className="w-5 h-5 text-[#EF4444]" />;
      default:
        return <MoreHorizontal className="w-5 h-5 text-[#7B8497]" />;
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col justify-between overflow-hidden animate-slide-up safe-pt safe-pb">
      {/* Header */}
      <div className="px-5 py-3 border-b border-[#E6EAF2] flex items-center justify-between">
        <h2 className="text-base font-bold text-[#101828]">Transaction Details</h2>
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              showToast("Receipt link copied to clipboard", "info");
            }}
            className="w-8 h-8 rounded-full bg-[#F5F7FB] flex items-center justify-center text-[#7B8497] hover:text-[#101828]"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F5F7FB] flex items-center justify-center text-[#7B8497] hover:text-[#101828]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
        {/* Merchant Hero */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-[#F5F7FB] border border-[#E6EAF2] mx-auto flex items-center justify-center shadow-2xs">
            {getCategoryIcon(selectedTransaction.category)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#101828]">{selectedTransaction.merchant}</h3>
            <span className="text-xs text-[#7B8497]">{selectedTransaction.date}</span>
          </div>
          <div className="text-3xl font-extrabold text-[#101828] tracking-tight">
            -₹{selectedTransaction.amount.toLocaleString('en-IN')}
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#16A085]/10 text-[#16A085]">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Completed & Recorded</span>
          </div>
        </div>

        {/* Detailed Attribute Breakdown */}
        <div className="bg-[#F5F7FB] border border-[#E6EAF2] rounded-2xl p-4 space-y-3.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[#7B8497] flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#2155F5]" /> Category
            </span>
            <span className="font-semibold text-[#101828]">{selectedTransaction.category}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#7B8497] flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#2155F5]" /> Payment Method
            </span>
            <span className="font-semibold text-[#101828]">{selectedTransaction.paymentMethod}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#7B8497] flex items-center gap-2">
              <Hash className="w-4 h-4 text-[#2155F5]" /> Reference ID
            </span>
            <span className="font-mono text-[#101828] font-medium">{selectedTransaction.referenceId}</span>
          </div>

          {selectedTransaction.note && (
            <div className="pt-2 border-t border-[#E6EAF2]">
              <span className="text-[#7B8497] flex items-center gap-2 mb-1">
                <FileText className="w-4 h-4 text-[#2155F5]" /> Note
              </span>
              <p className="text-[#101828] font-medium pl-6">{selectedTransaction.note}</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Delete Action */}
      <div className="p-5 border-t border-[#E6EAF2] bg-white space-y-2">
        {!confirmDelete ? (
          <button
            onClick={() => setConfirmDelete(true)}
            className="w-full bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#E5484D] active:scale-98 font-semibold text-xs py-3.5 rounded-xl border border-[#FEE2E2] transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Transaction</span>
          </button>
        ) : (
          <div className="bg-[#FEF2F2] border border-[#FEE2E2] rounded-xl p-3 space-y-2.5 animate-fade-in text-center">
            <p className="text-xs font-semibold text-[#E5484D]">
              Confirm removal? Balance will update immediately.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setConfirmDelete(false)}
                className="bg-white border border-[#E6EAF2] text-[#101828] text-xs font-semibold py-2 rounded-lg"
              >
                Keep
              </button>
              <button
                onClick={() => {
                  deleteTransaction(selectedTransaction.id);
                  onClose();
                }}
                className="bg-[#E5484D] hover:bg-red-700 text-white text-xs font-semibold py-2 rounded-lg"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

