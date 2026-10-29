import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { INITIAL_DATA } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Financial State
  const [user, setUser] = useState(INITIAL_DATA.user);
  const [monthlyBudget, setMonthlyBudget] = useState(INITIAL_DATA.budget.monthlyTotal);
  const [monthlySpent, setMonthlySpent] = useState(INITIAL_DATA.budget.monthlySpent);
  const [dailyLimit, setDailyLimit] = useState(INITIAL_DATA.budget.dailyLimit);
  const [dailySpent, setDailySpent] = useState(INITIAL_DATA.budget.dailySpent);
  const [categories, setCategories] = useState(INITIAL_DATA.categories);
  const [transactions, setTransactions] = useState(INITIAL_DATA.transactions);
  const [weeklySpending, setWeeklySpending] = useState(INITIAL_DATA.weeklySpending);
  const [pendingOfflineExpenses, setPendingOfflineExpenses] = useState([]);

  // Network & Environment Simulation
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFailed, setSyncFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [v2Mode, setV2Mode] = useState(true); // V2 has improved duplicate sheet, offline queue, animated alerts

  // Simulation outcome toggles for evaluators/testers
  const [simulateErrorOnAdd, setSimulateErrorOnAdd] = useState(false);
  const [simulateErrorOnPayment, setSimulateErrorOnPayment] = useState(false);
  const [simulateErrorOnBudgetEdit, setSimulateErrorOnBudgetEdit] = useState(false);
  const [simulateSyncError, setSimulateSyncError] = useState(false);

  // Navigation & Modal State
  const [currentScreen, setCurrentScreen] = useState('dashboard'); // 'welcome' | 'dashboard' | 'activity' | 'budgets' | 'profile' | 'testing'
  const [activeModal, setActiveModal] = useState(null); // 'add-expense' | 'payment-processing' | 'transaction-details' | 'budget-details' | 'edit-budget' | 'notifications'
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Notifications & Undo
  const [toast, setToast] = useState(null);
  const [undoStack, setUndoStack] = useState([]);
  const [deletingTxId, setDeletingTxId] = useState(null);
  const [highlightRemaining, setHighlightRemaining] = useState(false);
  const [budgetWarningDismissed, setBudgetWarningDismissed] = useState(false);
  const [dailyWarningDismissed, setDailyWarningDismissed] = useState(false);

  // Stored form draft for error recovery
  const [savedExpenseDraft, setSavedExpenseDraft] = useState(null);

  // Duplicate bottom sheet state
  const [duplicateModalData, setDuplicateModalData] = useState(null);

  // Show Toast helper
  const showToast = useCallback((message, type = 'info', actionLabel = null, onAction = null, duration = 4000) => {
    const id = Date.now();
    setToast({ id, message, type, actionLabel, onAction });
    if (duration > 0) {
      setTimeout(() => {
        setToast((current) => (current && current.id === id ? null : current));
      }, duration);
    }
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  // Calculate Remaining
  const remainingBudget = monthlyBudget - monthlySpent;
  const budgetPercentage = Math.min(Math.round((monthlySpent / monthlyBudget) * 100), 100);
  const isBudgetWarning = monthlySpent >= monthlyBudget * 0.8 && monthlySpent < monthlyBudget;
  const isBudgetReached = monthlySpent >= monthlyBudget;
  const isDailyLimitCrossed = dailySpent > dailyLimit;

  // Pulse effect when budget state changes
  useEffect(() => {
    if (isBudgetWarning || isBudgetReached || isDailyLimitCrossed) {
      setHighlightRemaining(true);
      const timer = setTimeout(() => setHighlightRemaining(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [monthlySpent, dailySpent, isBudgetWarning, isBudgetReached, isDailyLimitCrossed]);

  // ADD EXPENSE ACTION
  const addExpense = useCallback((expenseData) => {
    const { amount, merchant, category, paymentMethod, date, note } = expenseData;
    const numAmount = parseFloat(amount);

    const newTx = {
      id: `tx-${Date.now()}`,
      merchant: merchant || "Expense",
      amount: numAmount,
      category: category || "Other",
      categoryId: category ? category.toLowerCase().replace(/[^a-z]/g, '') : "other",
      date: date || "Today",
      rawDate: new Date().toISOString().split("T")[0],
      paymentMethod: paymentMethod || "UPI",
      note: note || "",
      status: isOnline ? "completed" : "pending_sync",
      referenceId: `MW-${paymentMethod || 'UPI'}-${Math.floor(1000000 + Math.random() * 9000000)}`
    };

    if (!isOnline) {
      // Offline mode: queue locally
      setPendingOfflineExpenses(prev => [newTx, ...prev]);
      // Update local balances immediately for local-first consistency
      setMonthlySpent(prev => prev + numAmount);
      setDailySpent(prev => prev + numAmount);
      showToast("Expense saved offline. Waiting to sync.", "warning", "Sync Now", () => syncOfflineExpenses());
      return { status: "offline", transaction: newTx };
    }

    // Online mode: immediate update
    setTransactions(prev => [newTx, ...prev]);
    setMonthlySpent(prev => prev + numAmount);
    setDailySpent(prev => prev + numAmount);

    // Update category spent
    setCategories(prev => prev.map(cat => {
      if (cat.name.toLowerCase() === (category || "").toLowerCase()) {
        return { ...cat, spent: cat.spent + numAmount };
      }
      return cat;
    }));

    return { status: "success", transaction: newTx };
  }, [isOnline, showToast]);

  // DELETE TRANSACTION ACTION WITH UNDO
  const deleteTransaction = useCallback((txId) => {
    const txToDelete = transactions.find(t => t.id === txId) || pendingOfflineExpenses.find(t => t.id === txId);
    if (!txToDelete) return;

    // Start vertical collapse animation
    setDeletingTxId(txId);

    setTimeout(() => {
      // Remove from list
      setTransactions(prev => prev.filter(t => t.id !== txId));
      setPendingOfflineExpenses(prev => prev.filter(t => t.id !== txId));

      // Deduct from spending
      setMonthlySpent(prev => Math.max(0, prev - txToDelete.amount));
      if (txToDelete.date.includes("Today")) {
        setDailySpent(prev => Math.max(0, prev - txToDelete.amount));
      }

      // Update category
      setCategories(prev => prev.map(cat => {
        if (cat.name.toLowerCase() === txToDelete.category.toLowerCase()) {
          return { ...cat, spent: Math.max(0, cat.spent - txToDelete.amount) };
        }
        return cat;
      }));

      setDeletingTxId(null);
      if (activeModal === 'transaction-details') {
        setActiveModal(null);
        setSelectedTransaction(null);
      }

      // Push to undo stack
      setUndoStack(prev => [{ ...txToDelete, timestamp: Date.now() }, ...prev]);

      // Show Toast with Undo action
      showToast(`Deleted ${txToDelete.merchant} (₹${txToDelete.amount})`, "info", "Undo", () => {
        undoDelete(txToDelete);
      }, 5500);

    }, 320); // 320ms matching vertical collapse animation
  }, [transactions, pendingOfflineExpenses, activeModal, showToast]);

  // UNDO ACTION
  const undoDelete = useCallback((txToRestore) => {
    if (!txToRestore) return;

    if (txToRestore.status === 'pending_sync') {
      setPendingOfflineExpenses(prev => [txToRestore, ...prev]);
    } else {
      setTransactions(prev => [txToRestore, ...prev]);
    }

    setMonthlySpent(prev => prev + txToRestore.amount);
    if (txToRestore.date.includes("Today")) {
      setDailySpent(prev => prev + txToRestore.amount);
    }

    setCategories(prev => prev.map(cat => {
      if (cat.name.toLowerCase() === txToRestore.category.toLowerCase()) {
        return { ...cat, spent: cat.spent + txToRestore.amount };
      }
      return cat;
    }));

    setUndoStack(prev => prev.filter(item => item.id !== txToRestore.id));
    showToast(`Restored ${txToRestore.merchant} (₹${txToRestore.amount})`, "success");
  }, [showToast]);

  // SYNC OFFLINE EXPENSES ACTION
  const syncOfflineExpenses = useCallback(() => {
    if (pendingOfflineExpenses.length === 0) {
      showToast("All expenses are already synced", "info");
      return;
    }

    setIsSyncing(true);
    setSyncFailed(false);

    setTimeout(() => {
      if (simulateSyncError) {
        setIsSyncing(false);
        setSyncFailed(true);
        showToast("Couldn't sync expenses. Preserved locally.", "error", "Retry Sync", () => syncOfflineExpenses());
      } else {
        // Move all pending to completed
        const syncedItems = pendingOfflineExpenses.map(item => ({
          ...item,
          status: 'completed'
        }));
        setTransactions(prev => [...syncedItems, ...prev]);
        setPendingOfflineExpenses([]);
        setIsSyncing(false);
        setSyncFailed(false);
        showToast("Expense synced successfully!", "success");
      }
    }, 1200);
  }, [pendingOfflineExpenses, simulateSyncError, showToast]);

  // EDIT BUDGET ACTION
  const updateMonthlyBudget = useCallback((newBudgetAmount) => {
    setMonthlyBudget(newBudgetAmount);
    showToast("Budget updated successfully", "success");
  }, [showToast]);

  // RESET DEMO STATE
  const resetDemoData = useCallback(() => {
    setUser(INITIAL_DATA.user);
    setMonthlyBudget(INITIAL_DATA.budget.monthlyTotal);
    setMonthlySpent(INITIAL_DATA.budget.monthlySpent);
    setDailyLimit(INITIAL_DATA.budget.dailyLimit);
    setDailySpent(INITIAL_DATA.budget.dailySpent);
    setCategories(INITIAL_DATA.categories);
    setTransactions(INITIAL_DATA.transactions);
    setWeeklySpending(INITIAL_DATA.weeklySpending);
    setPendingOfflineExpenses([]);
    setIsOnline(true);
    setIsSyncing(false);
    setSyncFailed(false);
    setSimulateErrorOnAdd(false);
    setSimulateErrorOnPayment(false);
    setSimulateErrorOnBudgetEdit(false);
    setSimulateSyncError(false);
    setActiveModal(null);
    setSelectedTransaction(null);
    setToast(null);
    setSavedExpenseDraft(null);
    setDuplicateModalData(null);
    setBudgetWarningDismissed(false);
    setDailyWarningDismissed(false);
    showToast("Demo state reset to initial values", "info");
  }, [showToast]);

  // DIRECT QUICK LAUNCHER FOR ALL 10 MICRO-INTERACTIONS
  const triggerInteraction = useCallback((interactionId) => {
    switch(interactionId) {
      case 'int-1': // Add Expense
        setSavedExpenseDraft(null);
        setActiveModal('add-expense');
        break;

      case 'int-2': // Budget Warning (80% threshold: ₹16,000 / ₹20,000)
        setMonthlyBudget(20000);
        setMonthlySpent(16000);
        setBudgetWarningDismissed(false);
        setCurrentScreen('dashboard');
        showToast("Budget at 80% threshold (₹16,000 / ₹20,000)", "warning");
        break;

      case 'int-3': // Transaction Processing Flow (Urban Cafe ₹450 UPI)
        setActiveModal('payment-processing');
        break;

      case 'int-4': // Duplicate Expense Detection (Uber ₹150 Today UPI)
        setSavedExpenseDraft({
          amount: "150",
          merchant: "Uber",
          category: "Transport",
          date: "Today",
          paymentMethod: "UPI",
          note: "Ride to design studio"
        });
        setActiveModal('add-expense');
        break;

      case 'int-5': // Delete Transaction & Undo
        if (transactions.length > 0) {
          setSelectedTransaction(transactions[0]);
          setActiveModal('transaction-details');
        }
        break;

      case 'int-6': // Budget Reached (100% threshold: ₹20,000 / ₹20,000)
        setMonthlyBudget(20000);
        setMonthlySpent(20000);
        setBudgetWarningDismissed(false);
        setCurrentScreen('dashboard');
        showToast("100% Budget reached (₹20,000 / ₹20,000)", "error");
        break;

      case 'int-7': // Edit Budget (₹20,000 -> ₹25,000)
        setActiveModal('edit-budget');
        break;

      case 'int-8': // Offline Expense & Sync
        setIsOnline(false);
        setSavedExpenseDraft({
          amount: "320",
          merchant: "Subway Express",
          category: "Food & Dining",
          date: "Today",
          paymentMethod: "UPI",
          note: "Lunch combo during commute"
        });
        setActiveModal('add-expense');
        showToast("Simulating offline mode. Add an expense to test offline queue.", "warning");
        break;

      case 'int-9': // Category Suggestion (Uber -> Transport auto-suggest)
        setSavedExpenseDraft({
          amount: "150",
          merchant: "Uber",
          category: "",
          date: "Today",
          paymentMethod: "UPI",
          note: ""
        });
        setActiveModal('add-expense');
        break;

      case 'int-10': // Daily Spending Limit (₹1,000 limit, spent ₹850 + ₹250 = ₹1,100)
        setDailyLimit(1000);
        setDailySpent(1100);
        setDailyWarningDismissed(false);
        setCurrentScreen('dashboard');
        showToast("Daily limit exceeded (₹1,100 / ₹1,000)", "warning");
        break;

      default:
        break;
    }
  }, [transactions, showToast]);

  return (
    <AppContext.Provider
      value={{
        // Data
        user,
        monthlyBudget,
        setMonthlyBudget,
        monthlySpent,
        setMonthlySpent,
        dailyLimit,
        setDailyLimit,
        dailySpent,
        setDailySpent,
        categories,
        setCategories,
        transactions,
        weeklySpending,
        pendingOfflineExpenses,
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

        // Status
        isOnline,
        setIsOnline,
        isSyncing,
        syncFailed,
        reducedMotion,
        setReducedMotion,
        v2Mode,
        setV2Mode,

        // Error Simulation Flags
        simulateErrorOnAdd,
        setSimulateErrorOnAdd,
        simulateErrorOnPayment,
        setSimulateErrorOnPayment,
        simulateErrorOnBudgetEdit,
        setSimulateErrorOnBudgetEdit,
        simulateSyncError,
        setSimulateSyncError,

        // Navigation
        currentScreen,
        setCurrentScreen,
        activeModal,
        setActiveModal,
        selectedTransaction,
        setSelectedTransaction,
        selectedCategory,
        setSelectedCategory,

        // Form Draft & Duplicates
        savedExpenseDraft,
        setSavedExpenseDraft,
        duplicateModalData,
        setDuplicateModalData,

        // Toast & Undo
        toast,
        showToast,
        hideToast,
        undoStack,
        deletingTxId,

        // Actions
        addExpense,
        deleteTransaction,
        undoDelete,
        syncOfflineExpenses,
        updateMonthlyBudget,
        resetDemoData,
        triggerInteraction
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

