import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import AnimatedCheckmark from '../components/common/AnimatedCheckmark';
import {
  X,
  Coffee,
  AlertOctagon,
  RotateCw,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function PaymentProcessingModal({ onClose }) {
  const {
    addExpense,
    simulateErrorOnPayment,
    setSimulateErrorOnPayment,
    showToast
  } = useApp();

  // 'ready' | 'processing' | 'success' | 'failure'
  const [paymentState, setPaymentState] = useState('ready');
  const [outcomeOverride, setOutcomeOverride] = useState(simulateErrorOnPayment ? 'fail' : 'success');

  const merchant = "Urban Cafe";
  const amount = 450;
  const paymentMethod = "UPI";
  const referenceId = "DEMO-UPI-8819203";
  const dateStr = "Today, " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleConfirmPayment = () => {
    setPaymentState('processing');

    setTimeout(() => {
      if (outcomeOverride === 'fail') {
        setPaymentState('failure');
      } else {
        // Log to ledger
        addExpense({
          amount: amount.toString(),
          merchant: merchant,
          category: "Food & Dining",
          paymentMethod: paymentMethod,
          date: "Today",
          note: "Demo Payment Simulation"
        });
        setPaymentState('success');
      }
    }, 1100);
  };

  return (
    <div className="absolute inset-0 z-40 bg-white flex flex-col justify-between overflow-hidden animate-slide-up safe-pt safe-pb">
      {/* Header */}
      <div className="px-5 py-3 border-b border-[#E6EAF2] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#2155F5]" />
          <h2 className="text-base font-bold text-[#101828]">Simulated Payment Gateway</h2>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-[#F5F7FB] flex items-center justify-center text-[#7B8497] hover:text-[#101828]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Outcome Selector Pill Bar (Demo Control) */}
      <div className="bg-[#F5F7FB] px-5 py-2.5 border-b border-[#E6EAF2] flex items-center justify-between">
        <span className="text-[11px] font-semibold text-[#7B8497]">Simulation Outcome:</span>
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#E6EAF2]">
          <button
            onClick={() => {
              setOutcomeOverride('success');
              setSimulateErrorOnPayment(false);
            }}
            className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
              outcomeOverride === 'success'
                ? 'bg-[#16A085] text-white shadow-2xs'
                : 'text-[#7B8497] hover:text-[#101828]'
            }`}
          >
            Success
          </button>
          <button
            onClick={() => {
              setOutcomeOverride('fail');
              setSimulateErrorOnPayment(true);
            }}
            className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
              outcomeOverride === 'fail'
                ? 'bg-[#E5484D] text-white shadow-2xs'
                : 'text-[#7B8497] hover:text-[#101828]'
            }`}
          >
            Fail (Error)
          </button>
        </div>
      </div>

      {/* Dynamic State View */}
      <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col justify-center items-center">
        {/* ================= STATE A: READY TO PROCESS ================= */}
        {paymentState === 'ready' && (
          <div className="w-full max-w-sm space-y-6 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-[#EEF4FF] border border-[#2155F5]/30 mx-auto flex items-center justify-center text-[#2155F5] shadow-sm">
              <Coffee className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold text-[#7B8497] uppercase tracking-wider">Payment Request</span>
              <h3 className="text-2xl font-extrabold text-[#071438] mt-1">{merchant}</h3>
              <div className="text-4xl font-extrabold text-[#2155F5] mt-2 tracking-tight">₹{amount}</div>
            </div>

            <div className="bg-[#F5F7FB] border border-[#E6EAF2] rounded-2xl p-4 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#7B8497]">Payment Channel</span>
                <span className="font-semibold text-[#101828] flex items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5 text-[#2155F5]" /> {paymentMethod} FastPay
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7B8497]">Reference Code</span>
                <span className="font-mono font-medium text-[#101828]">{referenceId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7B8497]">Security</span>
                <span className="text-[#16A085] font-semibold">256-Bit Encrypted Simulated</span>
              </div>
            </div>

            <p className="text-[11px] text-[#7B8497] italic">
              Simulated sandbox payment. No real money will be transferred.
            </p>
          </div>
        )}

        {/* ================= STATE B: PROCESSING ================= */}
        {paymentState === 'processing' && (
          <div className="w-full max-w-sm space-y-5 text-center animate-fade-in py-8">
            <div className="w-16 h-16 mx-auto rounded-full border-4 border-[#2155F5]/20 border-t-[#2155F5] animate-spin" />

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#071438]">Processing transaction…</h3>
              <p className="text-xs text-[#7B8497]">Connecting with payment gateway</p>
            </div>

            <div className="bg-[#F5F7FB] border border-[#E6EAF2] rounded-2xl p-4 text-center">
              <div className="text-xs text-[#7B8497]">Transferring</div>
              <div className="text-2xl font-bold text-[#101828] mt-0.5">₹{amount}</div>
              <div className="text-xs font-semibold text-[#2155F5] mt-0.5">to {merchant}</div>
            </div>
          </div>
        )}

        {/* ================= STATE C: SUCCESS ================= */}
        {paymentState === 'success' && (
          <div className="w-full max-w-sm space-y-5 text-center animate-fade-in">
            <AnimatedCheckmark size={72} strokeWidth={3.5} color="#16A085" />

            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-[#071438]">Transaction Successful</h3>
              <p className="text-xs text-[#16A085] font-semibold">
                Paid ₹{amount} to {merchant}
              </p>
            </div>

            <div className="bg-[#F5F7FB] border border-[#E6EAF2] rounded-2xl p-4 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#7B8497]">Amount Paid</span>
                <span className="font-extrabold text-sm text-[#101828]">₹{amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7B8497]">Merchant</span>
                <span className="font-semibold text-[#101828]">{merchant}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7B8497]">Date & Time</span>
                <span className="font-medium text-[#101828]">{dateStr}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7B8497]">Demo Reference ID</span>
                <span className="font-mono text-[#2155F5] font-semibold">{referenceId}</span>
              </div>
            </div>
          </div>
        )}

        {/* ================= STATE D: FAILURE ================= */}
        {paymentState === 'failure' && (
          <div className="w-full max-w-sm space-y-5 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#FEF2F2] border-2 border-[#E5484D] flex items-center justify-center text-[#E5484D] mx-auto shadow-sm animate-scale-spring">
              <AlertOctagon className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#E5484D]">Transaction Failed</h3>
              <p className="text-xs text-[#7B8497]">
                The transaction couldn't be completed. Please try again.
              </p>
            </div>

            <div className="bg-[#FFF5F5] border border-[#FEE2E2] rounded-2xl p-4 text-xs text-left text-[#525d73]">
              <div className="font-semibold text-[#E5484D] mb-1">Reason (Simulated):</div>
              <p>Simulated bank switch timeout. No amount has been deducted from your account.</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Action Buttons */}
      <div className="p-5 border-t border-[#E6EAF2] bg-white">
        {paymentState === 'ready' && (
          <button
            onClick={handleConfirmPayment}
            className="w-full bg-[#2155F5] hover:bg-[#1645D8] active:scale-98 text-white font-semibold text-sm py-3.5 rounded-xl shadow-float transition-all"
          >
            Confirm Payment (₹{amount})
          </button>
        )}

        {paymentState === 'processing' && (
          <button
            disabled
            className="w-full bg-[#CBD5E1] text-[#64748B] font-semibold text-sm py-3.5 rounded-xl cursor-not-allowed"
          >
            Processing…
          </button>
        )}

        {paymentState === 'success' && (
          <button
            onClick={() => {
              onClose();
              showToast("Transaction saved to activity", "success");
            }}
            className="w-full bg-[#2155F5] hover:bg-[#1645D8] active:scale-98 text-white font-semibold text-sm py-3.5 rounded-xl shadow-float transition-all"
          >
            Done
          </button>
        )}

        {paymentState === 'failure' && (
          <div className="space-y-2">
            <button
              onClick={() => {
                setOutcomeOverride('success');
                handleConfirmPayment();
              }}
              className="w-full bg-[#2155F5] hover:bg-[#1645D8] active:scale-98 text-white font-semibold text-sm py-3.5 rounded-xl shadow-float transition-all flex items-center justify-center gap-2"
            >
              <RotateCw className="w-4 h-4" />
              <span>Retry Transaction</span>
            </button>
            <button
              onClick={onClose}
              className="w-full bg-white border border-[#E6EAF2] hover:bg-gray-50 text-[#7B8497] font-semibold text-xs py-2.5 rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

