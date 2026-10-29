import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, BarChart2, Plus, PieChart, User } from 'lucide-react';

export default function BottomNav() {
  const { currentScreen, setCurrentScreen, setActiveModal, setSavedExpenseDraft } = useApp();

  const handleAddClick = () => {
    setSavedExpenseDraft(null);
    setActiveModal('add-expense');
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E6EAF2] px-3 pt-2 pb-5 safe-pb flex items-center justify-around z-30 shadow-[0_-4px_20px_rgba(7,20,56,0.03)]">
      {/* 1. Home */}
      <button
        onClick={() => setCurrentScreen('dashboard')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
          currentScreen === 'dashboard' ? 'text-[#071438]' : 'text-[#7B8497] hover:text-[#101828]'
        }`}
      >
        <Home className={`w-5 h-5 transition-transform ${currentScreen === 'dashboard' ? 'scale-110 text-[#2155F5]' : ''}`} />
        <span className={`text-[11px] mt-1 font-medium ${currentScreen === 'dashboard' ? 'font-semibold text-[#071438]' : ''}`}>
          Home
        </span>
      </button>

      {/* 2. Activity */}
      <button
        onClick={() => setCurrentScreen('activity')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
          currentScreen === 'activity' ? 'text-[#071438]' : 'text-[#7B8497] hover:text-[#101828]'
        }`}
      >
        <BarChart2 className={`w-5 h-5 transition-transform ${currentScreen === 'activity' ? 'scale-110 text-[#2155F5]' : ''}`} />
        <span className={`text-[11px] mt-1 font-medium ${currentScreen === 'activity' ? 'font-semibold text-[#071438]' : ''}`}>
          Activity
        </span>
      </button>

      {/* 3. Add Expense — Prominent Blue FAB */}
      <div className="flex-1 flex justify-center -mt-6">
        <button
          onClick={handleAddClick}
          aria-label="Add Expense"
          className="w-14 h-14 rounded-full bg-[#2155F5] hover:bg-[#1645D8] active:scale-90 text-white shadow-float flex items-center justify-center transition-all duration-200 border-4 border-[#F5F7FB] focus:outline-none focus:ring-4 focus:ring-blue-100"
        >
          <Plus className="w-7 h-7" strokeWidth={2.5} />
        </button>
      </div>

      {/* 4. Budgets */}
      <button
        onClick={() => setCurrentScreen('budgets')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
          currentScreen === 'budgets' ? 'text-[#071438]' : 'text-[#7B8497] hover:text-[#101828]'
        }`}
      >
        <PieChart className={`w-5 h-5 transition-transform ${currentScreen === 'budgets' ? 'scale-110 text-[#2155F5]' : ''}`} />
        <span className={`text-[11px] mt-1 font-medium ${currentScreen === 'budgets' ? 'font-semibold text-[#071438]' : ''}`}>
          Budgets
        </span>
      </button>

      {/* 5. Profile */}
      <button
        onClick={() => setCurrentScreen('profile')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
          currentScreen === 'profile' ? 'text-[#071438]' : 'text-[#7B8497] hover:text-[#101828]'
        }`}
      >
        <User className={`w-5 h-5 transition-transform ${currentScreen === 'profile' ? 'scale-110 text-[#2155F5]' : ''}`} />
        <span className={`text-[11px] mt-1 font-medium ${currentScreen === 'profile' ? 'font-semibold text-[#071438]' : ''}`}>
          Profile
        </span>
      </button>
    </div>
  );
}

