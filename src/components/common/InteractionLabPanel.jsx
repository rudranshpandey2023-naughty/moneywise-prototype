import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Play,
  RotateCcw,
  Wifi,
  WifiOff,
  AlertOctagon,
  CheckCircle,
  FlaskConical,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  Layers,
  ArrowRightLeft
} from 'lucide-react';

export default function InteractionLabPanel({ isOpen, onClose }) {
  const {
    triggerInteraction,
    resetDemoData,
    isOnline,
    setIsOnline,
    v2Mode,
    setV2Mode,
    simulateErrorOnAdd,
    setSimulateErrorOnAdd,
    simulateErrorOnPayment,
    setSimulateErrorOnPayment,
    simulateErrorOnBudgetEdit,
    setSimulateErrorOnBudgetEdit,
    simulateSyncError,
    setSimulateSyncError,
    reducedMotion,
    setReducedMotion,
    setCurrentScreen,
    setActiveModal
  } = useApp();

  const [activeTab, setActiveTab] = useState('scenarios'); // 'scenarios' | 'controls'

  const scenarios = [
    {
      id: 'int-1',
      title: '01. Add Expense',
      tag: 'Form & Validation',
      desc: 'Form (₹850 Groceries) → Spinner → Checkmark Success (or toggle Error state)',
      action: () => triggerInteraction('int-1')
    },
    {
      id: 'int-2',
      title: '02. Budget Warning',
      tag: '80% Threshold',
      desc: 'Spending reaches ₹16,000 / ₹20,000 → Bar turns Amber → Alert banner slides in',
      action: () => triggerInteraction('int-2')
    },
    {
      id: 'int-3',
      title: '03. Transaction Processing',
      tag: 'Simulated Payment',
      desc: 'Urban Cafe ₹450 UPI → Circular loader → Success checkmark or Retry Failure',
      action: () => triggerInteraction('int-3')
    },
    {
      id: 'int-4',
      title: '04. Duplicate Expense',
      tag: 'Duplicate Sheet',
      desc: 'Uber ₹150 Today UPI → Modal detects 9:41 AM expense → Keep Existing / Add Anyway',
      action: () => triggerInteraction('int-4')
    },
    {
      id: 'int-5',
      title: '05. Delete & Undo',
      tag: 'Collapse & Restore',
      desc: 'Delete modal → Vertical row collapse → Totals update → Toast with working Undo',
      action: () => triggerInteraction('int-5')
    },
    {
      id: 'int-6',
      title: '06. Budget Reached',
      tag: '100% & Overspent',
      desc: 'Spending reaches ₹20,000 / ₹20,000 (or ₹20,500) → Cautionary Red state',
      action: () => triggerInteraction('int-6')
    },
    {
      id: 'int-7',
      title: '07. Edit Budget',
      tag: 'Save & Recalculate',
      desc: 'Edit ₹20,000 to ₹25,000 → Saving spinner → Saved checkmark & card recalculation',
      action: () => triggerInteraction('int-7')
    },
    {
      id: 'int-8',
      title: '08. Offline Expense',
      tag: 'Local Queue & Sync',
      desc: 'Offline banner → Saves to Pending Sync → Reconnect → Syncing → Synced toast',
      action: () => triggerInteraction('int-8')
    },
    {
      id: 'int-9',
      title: '09. Category Suggestion',
      tag: 'Smart Merchant Match',
      desc: 'Uber → "Suggested: Transport" card appears → "Use Transport" or "Choose another"',
      action: () => triggerInteraction('int-9')
    },
    {
      id: 'int-10',
      title: '10. Daily Spending Limit',
      tag: 'Limit Exceeded',
      desc: 'Limit ₹1,000, spent ₹850 + ₹250 = ₹1,100 → Amber/Red bar & Over-limit banner',
      action: () => triggerInteraction('int-10')
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#071438] text-white">
      {/* Header */}
      <div className="p-4 border-b border-[#162758] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-[#2155F5]" />
          <div>
            <h2 className="font-bold text-base text-white">Interaction Lab</h2>
            <p className="text-xs text-[#7B8497]">10 Micro-Interactions & State Controls</p>
          </div>
        </div>
        <button
          onClick={resetDemoData}
          title="Reset to default ₹15,897 / ₹20,000"
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#162758] hover:bg-[#20346e] text-xs font-medium rounded-lg transition-colors text-white"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#2155F5]" />
          <span>Reset</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#162758] bg-[#050e26]">
        <button
          onClick={() => setActiveTab('scenarios')}
          className={`flex-1 py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === 'scenarios' ? 'text-[#2155F5] border-b-2 border-[#2155F5] bg-[#071438]' : 'text-[#7B8497] hover:text-white'
          }`}
        >
          <Play className="w-3.5 h-3.5" />
          <span>10 Scenarios</span>
        </button>
        <button
          onClick={() => setActiveTab('controls')}
          className={`flex-1 py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === 'controls' ? 'text-[#2155F5] border-b-2 border-[#2155F5] bg-[#071438]' : 'text-[#7B8497] hover:text-white'
          }`}
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          <span>Error / Success Toggles</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {activeTab === 'scenarios' ? (
          <>
            <div className="text-[11px] font-medium text-[#7B8497] px-1 uppercase tracking-wider mb-2">
              Select any scenario to run immediately:
            </div>
            {scenarios.map((sc) => (
              <button
                key={sc.id}
                onClick={() => {
                  sc.action();
                  if (onClose) onClose();
                }}
                className="w-full text-left bg-[#0c1e4c] hover:bg-[#122861] active:scale-[0.98] border border-[#162f6b] rounded-xl p-3 transition-all duration-150 group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-white group-hover:text-[#5d85ff] flex items-center gap-1.5">
                    {sc.title}
                  </span>
                  <span className="text-[10px] font-semibold bg-[#2155F5]/20 text-[#6ea0ff] px-2 py-0.5 rounded-full border border-[#2155F5]/30">
                    {sc.tag}
                  </span>
                </div>
                <p className="text-xs text-[#8c9bbb] leading-relaxed">
                  {sc.desc}
                </p>
              </button>
            ))}

            <div className="pt-2">
              <button
                onClick={() => {
                  setCurrentScreen('testing');
                  if (onClose) onClose();
                }}
                className="w-full bg-gradient-to-r from-[#2155F5] to-[#1645D8] hover:opacity-95 text-white font-semibold text-xs py-3 px-3 rounded-xl flex items-center justify-between shadow-float transition-all"
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>View User Testing & V1 vs V2 Report</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-4 p-1">
            <div className="text-[11px] font-medium text-[#7B8497] uppercase tracking-wider">
              Outcome Selectors (Simulate Error vs Success)
            </div>

            {/* Offline Simulation Toggle */}
            <div className="bg-[#0c1e4c] border border-[#162f6b] rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {isOnline ? (
                  <Wifi className="w-4 h-4 text-[#16A085]" />
                ) : (
                  <WifiOff className="w-4 h-4 text-[#F5A623]" />
                )}
                <div>
                  <div className="text-xs font-semibold text-white">Network Connection</div>
                  <div className="text-[11px] text-[#7B8497]">
                    {isOnline ? 'Online (Instant sync)' : 'Offline (Local queue)'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOnline(!isOnline)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  isOnline ? 'bg-[#16A085]/20 text-[#16A085] border border-[#16A085]/30' : 'bg-[#F5A623]/20 text-[#F5A623] border border-[#F5A623]/30'
                }`}
              >
                {isOnline ? 'Go Offline' : 'Go Online'}
              </button>
            </div>

            {/* Toggle Error on Add Expense */}
            <div className="bg-[#0c1e4c] border border-[#162f6b] rounded-xl p-3 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">Add Expense Outcome</div>
                <div className="text-[11px] text-[#7B8497]">
                  {simulateErrorOnAdd ? 'State D: Failure (Retains details)' : 'State C: Success Checkmark'}
                </div>
              </div>
              <button
                onClick={() => setSimulateErrorOnAdd(!simulateErrorOnAdd)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  simulateErrorOnAdd ? 'bg-[#E5484D]/20 text-[#E5484D] border border-[#E5484D]/40' : 'bg-[#16A085]/20 text-[#16A085] border border-[#16A085]/40'
                }`}
              >
                {simulateErrorOnAdd ? 'Fail State' : 'Success State'}
              </button>
            </div>

            {/* Toggle Error on Payment */}
            <div className="bg-[#0c1e4c] border border-[#162f6b] rounded-xl p-3 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">Simulated Payment Outcome</div>
                <div className="text-[11px] text-[#7B8497]">
                  {simulateErrorOnPayment ? 'State D: Transaction Failed' : 'State C: Transaction Successful'}
                </div>
              </div>
              <button
                onClick={() => setSimulateErrorOnPayment(!simulateErrorOnPayment)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  simulateErrorOnPayment ? 'bg-[#E5484D]/20 text-[#E5484D] border border-[#E5484D]/40' : 'bg-[#16A085]/20 text-[#16A085] border border-[#16A085]/40'
                }`}
              >
                {simulateErrorOnPayment ? 'Fail State' : 'Success State'}
              </button>
            </div>

            {/* Toggle Sync Error */}
            <div className="bg-[#0c1e4c] border border-[#162f6b] rounded-xl p-3 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">Offline Sync Outcome</div>
                <div className="text-[11px] text-[#7B8497]">
                  {simulateSyncError ? 'State D: Couldn\'t sync (Preserved)' : 'State C: Synced successfully'}
                </div>
              </div>
              <button
                onClick={() => setSimulateSyncError(!simulateSyncError)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  simulateSyncError ? 'bg-[#E5484D]/20 text-[#E5484D] border border-[#E5484D]/40' : 'bg-[#16A085]/20 text-[#16A085] border border-[#16A085]/40'
                }`}
              >
                {simulateSyncError ? 'Fail State' : 'Success State'}
              </button>
            </div>

            {/* Version 01 vs Version 02 Design Toggle */}
            <div className="bg-[#0c1e4c] border border-[#162f6b] rounded-xl p-3 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">Design Iteration Mode</div>
                <div className="text-[11px] text-[#7B8497]">
                  {v2Mode ? 'Version 02 (Polished feedback loops)' : 'Version 01 (Baseline architecture)'}
                </div>
              </div>
              <button
                onClick={() => setV2Mode(!v2Mode)}
                className="px-3 py-1.5 bg-[#2155F5] text-white rounded-lg text-xs font-semibold hover:bg-[#1645D8] transition-colors"
              >
                Switch to {v2Mode ? 'V01' : 'V02'}
              </button>
            </div>

            {/* Reduced Motion Toggle */}
            <div className="bg-[#0c1e4c] border border-[#162f6b] rounded-xl p-3 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">Reduced Motion</div>
                <div className="text-[11px] text-[#7B8497]">
                  Respects accessibility motion preferences
                </div>
              </div>
              <button
                onClick={() => setReducedMotion(!reducedMotion)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  reducedMotion ? 'bg-[#2155F5] text-white' : 'bg-[#162758] text-[#7B8497]'
                }`}
              >
                {reducedMotion ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-[#162758] bg-[#050e26] text-[11px] text-[#7B8497] flex items-center justify-between">
        <span>MoneyWise Design System</span>
        <span>Inter • 393 × 852 px</span>
      </div>
    </div>
  );
}

