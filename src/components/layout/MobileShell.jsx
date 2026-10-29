import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import BottomNav from './BottomNav';
import Toast from '../common/Toast';
import InteractionLabPanel from '../common/InteractionLabPanel';
import DashboardScreen from '../../screens/DashboardScreen';
import ActivityScreen from '../../screens/ActivityScreen';
import BudgetsScreen from '../../screens/BudgetsScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import WelcomeScreen from '../../screens/WelcomeScreen';
import UserTestingScreen from '../../screens/UserTestingScreen';
import AddExpenseScreen from '../../screens/AddExpenseScreen';
import PaymentProcessingModal from '../../screens/PaymentProcessingModal';
import TransactionDetailsModal from '../../screens/TransactionDetailsModal';
import EditBudgetModal from '../../screens/EditBudgetModal';
import NotificationsScreen from '../../screens/NotificationsScreen';
import {
  Wifi,
  WifiOff,
  Battery,
  Signal,
  FlaskConical,
  Smartphone,
  Maximize2,
  Minimize2,
  RotateCcw,
  Layers,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';

export default function MobileShell() {
  const {
    currentScreen,
    setCurrentScreen,
    activeModal,
    setActiveModal,
    isOnline,
    setIsOnline,
    resetDemoData,
    v2Mode,
    reducedMotion
  } = useApp();

  const [hasStarted, setHasStarted] = useState(true);
  const [showLabModal, setShowLabModal] = useState(false);
  const [deviceFrameMode, setDeviceFrameMode] = useState(true); // true = 393x852 px frame, false = full viewport

  // Active Screen Renderer
  const renderCurrentScreen = () => {
    if (!hasStarted) {
      return <WelcomeScreen onStart={() => setHasStarted(true)} />;
    }
    switch (currentScreen) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'activity':
        return <ActivityScreen />;
      case 'budgets':
        return <BudgetsScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'testing':
        return <UserTestingScreen onBack={() => setCurrentScreen('dashboard')} />;
      case 'welcome':
        return <WelcomeScreen onStart={() => setHasStarted(true)} />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <div className={`min-h-screen bg-[#070e20] flex flex-col items-center justify-center p-0 md:p-6 select-none ${reducedMotion ? 'reduce-motion' : ''}`}>
      {/* Top Desktop Evaluator Toolbar */}
      <div className="w-full max-w-5xl mb-3 hidden md:flex items-center justify-between bg-[#0b1738] border border-[#162758] rounded-2xl px-5 py-2.5 text-white shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#2155F5] flex items-center justify-center text-white shadow-float">
            <span className="font-extrabold text-sm tracking-tight">MW</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-sm text-white">MoneyWise Prototype</h1>
              <span className="text-[10px] font-semibold bg-[#2155F5]/20 text-[#6ea0ff] px-2 py-0.5 rounded-full border border-[#2155F5]/30">
                10 Micro-Interactions
              </span>
              <span className="text-[10px] font-semibold bg-[#16A085]/20 text-[#16A085] px-2 py-0.5 rounded-full border border-[#16A085]/30">
                {v2Mode ? 'Version 02 (Active)' : 'Version 01'}
              </span>
            </div>
            <p className="text-[11px] text-[#7B8497]">
              Minimal banking-app aesthetic • Inter typography • Safe-area responsive
            </p>
          </div>
        </div>

        {/* Quick Toolbar Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Launch Lab */}
          <button
            onClick={() => setShowLabModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2155F5] hover:bg-[#1645D8] active:scale-95 text-xs font-semibold rounded-xl text-white shadow-float transition-all"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Interaction Lab (10 Scenarios)</span>
          </button>

          {/* User Testing Section Link */}
          <button
            onClick={() => setCurrentScreen('testing')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              currentScreen === 'testing'
                ? 'bg-white text-[#071438] border-white'
                : 'bg-[#122452] border-[#1c3372] text-[#8c9bbb] hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>User Testing & Iteration</span>
          </button>

          {/* Online/Offline Toggle */}
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              isOnline
                ? 'bg-[#16A085]/20 text-[#16A085] border-[#16A085]/40'
                : 'bg-[#F5A623]/20 text-[#F5A623] border-[#F5A623]/40'
            }`}
            title="Toggle network connection to test offline expense queue"
          >
            {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
            <span>{isOnline ? 'Online' : 'Offline'}</span>
          </button>

          {/* Reset Demo State */}
          <button
            onClick={resetDemoData}
            title="Reset prototype state to initial values"
            className="p-1.5 bg-[#122452] hover:bg-[#1c3372] text-[#8c9bbb] hover:text-white rounded-xl transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Frame Toggle */}
          <button
            onClick={() => setDeviceFrameMode(!deviceFrameMode)}
            title="Toggle Device Frame vs Full Viewport"
            className="p-1.5 bg-[#122452] hover:bg-[#1c3372] text-[#8c9bbb] hover:text-white rounded-xl transition-colors"
          >
            {deviceFrameMode ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Container Layout */}
      <div className="w-full flex justify-center items-center gap-6">
        {/* Mobile Viewport Shell (393 × 852 px default) */}
        <div
          className={`relative bg-[#F5F7FB] overflow-hidden flex flex-col transition-all duration-300 ${
            deviceFrameMode
              ? 'w-full max-w-[393px] h-[852px] rounded-[52px] shadow-[0_25px_70px_rgba(0,0,0,0.65)] border-[9px] border-[#1f293d] ring-1 ring-white/10'
              : 'w-full max-w-md h-[95vh] rounded-3xl shadow-2xl border border-gray-700'
          }`}
        >
          {/* iOS Dynamic Island & Status Bar */}
          <div className="pt-3 pb-1 px-7 flex items-center justify-between text-[#101828] text-xs font-semibold select-none z-30">
            {/* Clock */}
            <span className="tracking-tight text-[13px] font-bold">9:41</span>

            {/* Dynamic Island Pill */}
            <div className="w-24 h-6 bg-black rounded-full flex items-center justify-center -mt-1 shadow-inner relative">
              <div className="absolute right-2.5 w-2.5 h-2.5 rounded-full bg-[#101828]/80 border border-neutral-700" />
            </div>

            {/* Icons: Signal, Wifi, Battery */}
            <div className="flex items-center gap-1.5 text-[#101828]">
              <Signal className="w-3.5 h-3.5" />
              {isOnline ? (
                <Wifi className="w-3.5 h-3.5" />
              ) : (
                <WifiOff className="w-3.5 h-3.5 text-[#F5A623]" />
              )}
              <Battery className="w-4 h-4 text-[#101828]" />
            </div>
          </div>

          {/* Quick Mobile Lab Trigger Ribbon */}
          <div className="px-4 py-1.5 bg-[#071438] text-white flex items-center justify-between text-[11px] z-20 border-b border-[#162758]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#16A085] animate-pulse" />
              <span className="font-semibold text-white">MoneyWise</span>
              <span className="text-[#8c9bbb]">• 10 Interactions Active</span>
            </div>
            <button
              onClick={() => setShowLabModal(true)}
              className="text-[#6ea0ff] hover:text-white font-bold flex items-center gap-0.5 bg-[#162758] px-2 py-0.5 rounded-md"
            >
              <span>Test Lab</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Render Active Screen Content */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {renderCurrentScreen()}
          </div>

          {/* Persistent Bottom Navigation (Hidden on Welcome Screen or when Modals take over) */}
          {hasStarted && currentScreen !== 'welcome' && <BottomNav />}

          {/* Toast Notification Layer */}
          <Toast />

          {/* Bottom Home Indicator Bar */}
          <div className="w-full flex justify-center pb-2 pt-1 pointer-events-none z-30 bg-white/70 backdrop-blur-[2px]">
            <div className="w-32 h-1 bg-black/40 rounded-full" />
          </div>

          {/* ACTIVE MODAL LAYERS */}
          {activeModal === 'add-expense' && (
            <AddExpenseScreen onClose={() => setActiveModal(null)} />
          )}

          {activeModal === 'payment-processing' && (
            <PaymentProcessingModal onClose={() => setActiveModal(null)} />
          )}

          {activeModal === 'transaction-details' && (
            <TransactionDetailsModal onClose={() => setActiveModal(null)} />
          )}

          {activeModal === 'edit-budget' && (
            <EditBudgetModal onClose={() => setActiveModal(null)} />
          )}

          {activeModal === 'notifications' && (
            <NotificationsScreen onClose={() => setActiveModal(null)} />
          )}

          {/* Interaction Lab Mobile Bottom Sheet / Modal */}
          {showLabModal && (
            <div className="absolute inset-0 z-50 bg-[#071438] flex flex-col animate-slide-up">
              <InteractionLabPanel
                isOpen={showLabModal}
                onClose={() => setShowLabModal(false)}
              />
            </div>
          )}
        </div>

        {/* Desktop Quick-Launch Side Panel (Visible on Desktop for Evaluator Convenience) */}
        <div className="hidden lg:block w-80 h-[852px] bg-[#071438] rounded-3xl border border-[#162758] shadow-2xl overflow-hidden flex flex-col">
          <InteractionLabPanel
            isOpen={true}
            onClose={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

