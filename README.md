# MoneyWise — Personal Finance Micro-Interactions Prototype

A mobile-first personal finance application prototype for **MoneyWise**, focused on expense tracking, budgets, transactions, and spending alerts with rich, functional micro-interactions.

Designed with a minimal banking aesthetic inspired by modern fintech (Monzo, Revolut, Cash App). Built with **React**, **Vite**, **Tailwind CSS**, and **Lucide Icons**.

---

## Features & Micro-Interactions

### 10 Fully Interactive Micro-Interactions
1. **Add Expense (Multi-State)**: Form entry (₹850 Groceries UPI) → Button spinner & "Saving expense…" → 350ms animated SVG checkmark & receipt → Error recovery retaining user inputs.
2. **Budget Warning (80% Threshold)**: Spending reaches ₹16,000 / ₹20,000 → Progress bar fills and tweens from Royal Blue (`#2155F5`) to Warning Amber (`#F5A623`) → Slide-down warning alert banner.
3. **Transaction Processing (Payment Simulator)**: Urban Cafe ₹450 UPI simulated payment → Circular loader sequence → Success checkmark with demo reference code `DEMO-UPI-8819203` or Failure with retry. Includes live outcome switcher.
4. **Duplicate Expense Detection**: Entering Uber ₹150 Today UPI (matches existing 9:41 AM expense) triggers a bottom sheet modal with dimmed backdrop and 3 paths: *Keep Existing*, *Add Anyway*, *Edit Details*.
5. **Delete Transaction & Undo**: Tap transaction → Red delete prompt → Vertical row collapse (`max-height: 80px → 0px` over 320ms) with fade-out → Balance recalculation → Persistent bottom toast with working **Undo**.
6. **Budget Reached (100% & Overbudget)**: Spending reaches ₹20,000 or exceeds it (₹20,500) → Progress bar halts at 100% without container overflow, transitions to Ruby Crimson (`#E5484D`), and displays cautionary alert with overspent counter.
7. **Budget Saved / Edit Budget**: Change budget (₹20,000 to ₹25,000) → Saving spinner → Saved checkmark & toast notification → Recalculates remaining budget on home card.
8. **Offline Expense & Local Queue Sync**: Network drop activates offline banner → Saves locally to "Pending Sync" with cloud-off badge → Reconnecting triggers auto-sync animation and toast.
9. **Category Suggestion (Smart Merchant Match)**: Typing "Uber" generates *"Suggested: Transport"* card → 1-tap accept or custom category picker.
10. **Daily Spending Limit Exceeded**: Daily limit ₹1,000; spending ₹850 + ₹250 = ₹1,100 → Progress bar turns red and displays *"₹100 over your daily limit"* banner.

### 15 Connected Screens
- **01. Welcome / Sign In**: Brand introduction & demo profile login.
- **02. Home Dashboard**: "Hi, Alex!", Monthly Budget Progress (₹15,897 / ₹20,000), Remaining ₹4,103, Daily limit ₹1,000, Weekly spending chart, Recent transactions.
- **03. Add Expense Form**: Amount input with ₹ prefix, merchant, category picker, date, payment method, notes.
- **04. Expense Processing**: Non-blocking overlay with disabled button and spinner.
- **05. Expense Success**: Animated checkmark, ₹850 receipt, view transaction action.
- **06. Expense Error**: Failure state retaining all user inputs with recovery retry.
- **07. Activity / Ledger**: Search, filter, transaction ledger, and dedicated **Pending Sync** section for offline records.
- **08. Transaction Details**: Deep dive into reference ID, payment method, category, and delete action.
- **09. Budgets Overview**: Overall progress bar, category limits, 80% & 100% threshold indicators.
- **10. Budget Details**: Category allocation breakdown and category-specific transactions.
- **11. Edit Budget**: Dynamic budget adjustment, category allocations, saving spinner, saved checkmark.
- **12. Notification Hub**: Central alerts for budget warnings, daily limit alerts, and sync updates.
- **13. Offline Queue**: Offline status banner, local queueing, auto-sync upon reconnection.
- **14. Category Suggestion**: Smart merchant-to-category matcher with 1-tap accept.
- **15. User Testing & Design Iterations**: Usability test templates for 3 participants, improvement log, and Version 01 vs Version 02 comparisons.

---

## Design System

### Color Palette
- **Primary Blue**: `#2155F5`
- **Deep Blue**: `#1645D8`
- **Midnight Navy**: `#071438`
- **Canvas Background**: `#F5F7FB`
- **Surface**: `#FFFFFF`
- **Primary Text**: `#101828`
- **Secondary Text**: `#7B8497`
- **Success Green**: `#16A085`
- **Warning Amber**: `#F5A623`
- **Error Red**: `#E5484D`
- **Border**: `#E6EAF2`

### Typography & Viewport
- **Font**: Inter
- **Target Viewport**: 393 × 852 px mobile viewport (responsive, with desktop evaluator dock)

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm / pnpm / yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/rudranshpandey2023-naughty/moneywise-prototype.git

# Navigate to project directory
cd moneywise-prototype

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
