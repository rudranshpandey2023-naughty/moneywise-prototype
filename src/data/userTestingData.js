export const USER_TESTING_DATA = {
  version01: {
    title: "Version 01: Initial Architecture & Interaction Rationale",
    overview: "The initial MoneyWise prototype focused on establishing a clean banking aesthetic with direct feedback loops for standard transaction entries. Our hypothesis was that subtle linear status updates and non-blocking notifications would minimize perceived transaction latency.",
    coreDecisions: [
      {
        area: "Duplicate Detection",
        v1Approach: "Silent toast warning after creation or inline small alert banner without halting duplicate transaction creation.",
        limitation: "Users easily overlooked the subtle notification and accidentally logged the exact same transaction twice, polluting ledger integrity."
      },
      {
        area: "Offline Expense",
        v1Approach: "Showed a red generic disconnection modal blocking the Add Expense flow until a network connection was re-established.",
        limitation: "Violated mobile resilience; users stranded at physical merchant checkouts couldn't record expenses immediately when cell service dropped."
      },
      {
        area: "Budget Warnings",
        v1Approach: "Only displayed static textual percentage ('80% used') without color transformation or dynamic threshold emphasis.",
        limitation: "Lacked immediate visual gravity; users didn't register the cautionary shift until they had already exceeded their monthly budget."
      }
    ]
  },

  participants: [
    {
      id: "P1",
      name: "Participant 1 — Priya S.",
      role: "Freelance Brand Consultant (Frequent daily commuter & expense tracker)",
      device: "iPhone 14 Pro, iOS 17",
      tasks: [
        {
          id: 1,
          task: "Add a new expense (₹850 Groceries via UPI)",
          completed: true,
          feedbackNoticed: "Yes — spinner on button and green animated checkmark were very crisp.",
          stateUnderstood: "Yes, clearly understood the amount was deducted from remaining budget.",
          animationHelped: "Yes, the checkmark confirmed processing finished without needing to re-check bank app.",
          confusion: "None on standard entry.",
          suggestedImprovement: "Make the keypad or quick amount suggestions available for faster one-hand entry."
        },
        {
          id: 2,
          task: "Identify and recover from a duplicate expense (Uber ₹150)",
          completed: true,
          feedbackNoticed: "Yes, the bottom sheet modal popped up immediately when clicking Save.",
          stateUnderstood: "Yes, understood that Uber ₹150 was already logged at 9:41 AM.",
          animationHelped: "The sliding sheet with dimmed background drew eyes directly to the duplicate comparison.",
          confusion: "Initially wondered if 'Keep Existing' would cancel my current input or delete the old one.",
          suggestedImprovement: "Clarify button copy: use 'Keep Existing (Cancel)' and 'Add as Separate Expense'."
        },
        {
          id: 3,
          task: "Understand a budget warning (80% threshold reached)",
          completed: true,
          feedbackNoticed: "Yes, noticed the color shift from royal blue to amber immediately.",
          stateUnderstood: "Understood that ₹4,000 remains out of ₹20,000 for the month.",
          animationHelped: "The progress bar fill animation and banner slide-in felt urgent without being alarming.",
          confusion: "Wondered if transactions would be blocked once 100% is reached.",
          suggestedImprovement: "Show days remaining in the month alongside the remaining amount."
        },
        {
          id: 4,
          task: "Delete a transaction and undo it",
          completed: true,
          feedbackNoticed: "Yes, the vertical collapse animation of the row was very clear.",
          stateUnderstood: "Yes, saw the balance immediately refund ₹180 back to budget.",
          animationHelped: "Row collapsing made it obvious which item disappeared; toast with Undo was instantly visible.",
          confusion: "Worried the toast might disappear too fast before I tapped Undo.",
          suggestedImprovement: "Provide a subtle progress countdown line inside the toast."
        },
        {
          id: 5,
          task: "Save an expense while offline and simulate sync",
          completed: true,
          feedbackNoticed: "Yes, cloud-off icon and 'Waiting to sync' badge in Pending Sync list.",
          stateUnderstood: "Understood the expense was stored locally on the phone.",
          animationHelped: "When reconnecting, the sync spinner turning into 'Synced' gave peace of mind.",
          confusion: "Wondered if offline transactions affect the displayed budget balance right away.",
          suggestedImprovement: "Explicitly clarify that offline items are factored into current local totals."
        },
        {
          id: 6,
          task: "Change a suggested category (Uber -> from Transport to Other)",
          completed: true,
          feedbackNoticed: "Yes, 'Suggested: Transport' chip appeared beneath category selector.",
          stateUnderstood: "Understood the system inferred category from merchant name.",
          animationHelped: "Smooth dropdown sheet made changing to 'Shopping' or 'Other' frictionless.",
          confusion: "Tapped outside the pill at first before realizing 'Use Transport' was clickable.",
          suggestedImprovement: "Make the entire suggestion card a single distinct tap area."
        },
        {
          id: 7,
          task: "Understand when a daily limit is exceeded (₹1,100 / ₹1,000)",
          completed: true,
          feedbackNoticed: "Yes, prominent warning card with red boundary and over-budget indicator.",
          stateUnderstood: "Understood ₹100 over daily limit, distinct from monthly budget.",
          animationHelped: "Progress bar capped neatly at 100% while highlighting the surplus amount.",
          confusion: "None.",
          suggestedImprovement: "Provide quick action to adjust daily limit directly from the warning banner."
        }
      ]
    },
    {
      id: "P2",
      name: "Participant 2 — Rohan M.",
      role: "Software Engineer (Fintech power user, privacy & reliability focused)",
      device: "Pixel 8 Pro, Android 14",
      tasks: [
        {
          id: 1,
          task: "Add a new expense (₹850 Groceries via UPI)",
          completed: true,
          feedbackNoticed: "Noticed button disable state and spinner prevents double-tapping.",
          stateUnderstood: "Understood immediately. Liked the 'Saving expense...' state.",
          animationHelped: "Spinner provides tactile reassurance during network roundtrips.",
          confusion: "None.",
          suggestedImprovement: "Add haptic vibration trigger on mobile devices."
        },
        {
          id: 2,
          task: "Identify and recover from a duplicate expense (Uber ₹150)",
          completed: true,
          feedbackNoticed: "Bottom sheet surfaced automatically upon submitting duplicate parameters.",
          stateUnderstood: "Clearly highlighted the matching timestamp and amount.",
          animationHelped: "Background dimming prevented split focus.",
          confusion: "Wanted to know if the system also checks notes or payment method.",
          suggestedImprovement: "Show a badge indicating 'Same merchant, amount & date'."
        },
        {
          id: 3,
          task: "Understand a budget warning (80% threshold reached)",
          completed: true,
          feedbackNoticed: "Amber bar and warning card stood out against the white card surfaces.",
          stateUnderstood: "Calculations matched: ₹16,000 spent out of ₹20,000.",
          animationHelped: "The color tween from blue (#2155F5) to amber (#F5A623) was smooth.",
          confusion: "None.",
          suggestedImprovement: "Add a quick link to category breakdowns driving the spike."
        },
        {
          id: 4,
          task: "Delete a transaction and undo it",
          completed: true,
          feedbackNoticed: "Red confirmation button prevents accidental swipes.",
          stateUnderstood: "Saw the undo restore the item seamlessly.",
          animationHelped: "Vertical collapse communicates deletion much better than instant DOM removal.",
          confusion: "Tested what happens if multiple items are deleted in quick succession.",
          suggestedImprovement: "Stack toasts or handle FIFO undo queue."
        },
        {
          id: 5,
          task: "Save an expense while offline and simulate sync",
          completed: true,
          feedbackNoticed: "Persistent offline banner at top and dedicated Pending Sync section.",
          stateUnderstood: "Understood local-first caching model completely.",
          animationHelped: "Syncing sequence with rotating icon gave clear progress.",
          confusion: "Tested the retry button on simulated failure; verified data was not lost.",
          suggestedImprovement: "Add manual 'Sync Now' trigger in addition to auto-reconnect."
        },
        {
          id: 6,
          task: "Change a suggested category (Uber -> from Transport to Other)",
          completed: true,
          feedbackNoticed: "Suggestion card appeared right when merchant input finished.",
          stateUnderstood: "Clear: 'Suggested category: Transport'.",
          animationHelped: "Subtle slide-down drew gaze naturally downwards.",
          confusion: "None.",
          suggestedImprovement: "Allow custom category creation if category is missing."
        },
        {
          id: 7,
          task: "Understand when a daily limit is exceeded (₹1,100 / ₹1,000)",
          completed: true,
          feedbackNoticed: "Red indicator and clear math ('₹100 over your ₹1,000 daily limit').",
          stateUnderstood: "Immediately understood difference between daily limit and monthly cap.",
          animationHelped: "Number counter / pulse emphasis on ₹100 surplus.",
          confusion: "None.",
          suggestedImprovement: "Add toggle to snooze daily alert for exceptional days (e.g. travel)."
        }
      ]
    },
    {
      id: "P3",
      name: "Participant 3 — Ananya K.",
      role: "Postgraduate Architecture Student (Budget conscious, visual learner)",
      device: "iPhone 13, iOS 17",
      tasks: [
        {
          id: 1,
          task: "Add a new expense (₹850 Groceries via UPI)",
          completed: true,
          feedbackNoticed: "Success checkmark animation was very satisfying.",
          stateUnderstood: "Felt confident transaction was saved.",
          animationHelped: "Checkmark drawing animation gave clear closure.",
          confusion: "Wondered if I should click 'Back to Home' or 'View Transaction'.",
          suggestedImprovement: "Make 'Back to Home' the primary action after 5 seconds."
        },
        {
          id: 2,
          task: "Identify and recover from a duplicate expense (Uber ₹150)",
          completed: true,
          feedbackNoticed: "App caught my accidental double tap on Uber ride.",
          stateUnderstood: "Showed the exact time of the earlier transaction.",
          animationHelped: "Smooth bottom sheet felt like native iOS action sheet.",
          confusion: "Thought I might lose my notes if I clicked Edit Details.",
          suggestedImprovement: "Preserve all form fields when returning to edit."
        },
        {
          id: 3,
          task: "Understand a budget warning (80% threshold reached)",
          completed: true,
          feedbackNoticed: "Warning icon and text 'Your budget is getting close'.",
          stateUnderstood: "Reminded me to slow down spending for the remaining 10 days.",
          animationHelped: "Gentle pulse on the ₹4,000 remaining amount.",
          confusion: "None.",
          suggestedImprovement: "Show average daily allowance remaining (e.g. ₹400/day)."
        },
        {
          id: 4,
          task: "Delete a transaction and undo it",
          completed: true,
          feedbackNoticed: "Toast notification at bottom with blue Undo button.",
          stateUnderstood: "Understood undo brought it back completely.",
          animationHelped: "Fade and collapse prevented screen jumping.",
          confusion: "Was afraid to click delete without knowing if it could be undone.",
          suggestedImprovement: "Mention 'You can undo this' in the confirmation prompt."
        },
        {
          id: 5,
          task: "Save an expense while offline and simulate sync",
          completed: true,
          feedbackNoticed: "Top banner reassured me: 'You can still add expenses'.",
          stateUnderstood: "Understood it wouldn't fail or lose my receipt data.",
          animationHelped: "Sync completed toast gave peace of mind.",
          confusion: "Wanted to know if cloud backup is encrypted.",
          suggestedImprovement: "Show timestamp of last successful sync."
        },
        {
          id: 6,
          task: "Change a suggested category (Uber -> from Transport to Other)",
          completed: true,
          feedbackNoticed: "Smart suggestion saved me from having to scroll categories.",
          stateUnderstood: "Saw 'Transport' suggested automatically.",
          animationHelped: "Quick tap populated the category instantly.",
          confusion: "None.",
          suggestedImprovement: "Show recent categories at the top of category picker."
        },
        {
          id: 7,
          task: "Understand when a daily limit is exceeded (₹1,100 / ₹1,000)",
          completed: true,
          feedbackNoticed: "Color changed to warning red and banner stated ₹100 over.",
          stateUnderstood: "Very clear and helpful for curbing impulse spending.",
          animationHelped: "Progress bar stayed flush at container end rather than breaking layout.",
          confusion: "None.",
          suggestedImprovement: "Add a progress breakdown by category for today."
        }
      ]
    }
  ],

  improvementLog: [
    {
      id: "LOG-01",
      issue: "Duplicate expense dismissal ambiguity",
      evidence: "P1 & P3 hesitated when viewing 'Keep Existing' vs 'Add Anyway', worrying their existing transaction might be modified or discarded.",
      designChange: "Refined copy to 'Keep Existing (Cancel)' and 'Add as Separate Expense'. Highlighted the existing transaction in a clean preview card with timestamp comparison.",
      reason: "Eliminates cognitive friction and prevents accidental duplicate ledger entries while maintaining user agency."
    },
    {
      id: "LOG-02",
      issue: "Offline expense visibility and reassurance",
      evidence: "P2 and P3 noted that while offline saving succeeded, users need absolute confidence their offline entries are factored into immediate balances and queued securely.",
      designChange: "Added dedicated 'Pending Sync' section in Activity view with cloud-off icon, local badge, and manual 'Sync Now' trigger with retry recovery if connection drops during sync.",
      reason: "Provides local-first certainty, preventing anxiety and duplicate re-entries when network fluctuates in subway or transit."
    },
    {
      id: "LOG-03",
      issue: "Budget warning visual hierarchy & actionable recovery",
      evidence: "P1 requested projection context (days remaining), while P2 wanted immediate access to category breakdowns driving the threshold crossing.",
      designChange: "Upgraded 80% warning banner into an interactive card with color transition from blue (#2155F5) to amber (#F5A623), smooth progress animation, and direct 'View Budget' & 'Review Expenses' quick-links.",
      reason: "Transforms passive alert into proactive financial decision support."
    },
    {
      id: "LOG-04",
      issue: "Delete confirmation safety & Undo visibility",
      evidence: "Users feared permanent data loss prior to clicking delete; toast duration needed visible feedback.",
      designChange: "Added explicit 'You can undo this anytime' reassurance in confirmation modal, and smooth vertical collapse animation with persistent undo toast.",
      reason: "Reversible actions reduce decision anxiety and foster exploration."
    }
  ],

  version02Comparisons: [
    {
      id: "duplicate",
      name: "Duplicate Expense Micro-Interaction",
      v1: {
        title: "V1: Subtle Banner / Inline Warning",
        description: "Showed a mild non-modal banner that users frequently missed, allowing accidental identical transactions to save without confirmation.",
        features: ["Inline warning text", "No direct side-by-side comparison", "Save button still active without explicit decision"],
        rating: "Usability Score: 62/100"
      },
      v2: {
        title: "V2: Modal Bottom Sheet with Timestamp Comparison",
        description: "Interruptive, focused bottom sheet with dimmed background. Displays original transaction (9:41 AM, ₹150) alongside 3 explicit paths: Keep Existing, Add Anyway, Edit Details.",
        features: ["High-contrast modal sheet", "Visual existing transaction card", "Explicit three-action decision tree", "Confirmation toast feedback"],
        rating: "Usability Score: 96/100"
      }
    },
    {
      id: "offline",
      name: "Offline Expense Micro-Interaction",
      v1: {
        title: "V1: Network Error Blocking Screen",
        description: "Blocked entry with red 'No Internet' screen. Forced user to wait until mobile connectivity was restored.",
        features: ["Blocking error screen", "Loss of unsubmitted form data", "Zero local queueing capability"],
        rating: "Usability Score: 45/100"
      },
      v2: {
        title: "V2: Local-First Queue & Auto-Sync Recovery",
        description: "Form stays 100% usable. Top status banner explains offline resilience. Saves locally with 'Waiting to sync' status in dedicated Pending Sync activity section, with auto-sync & retry recovery.",
        features: ["Non-blocking form entry", "Cloud-off badge & Pending Sync list", "Auto-sync with animated state transitions", "Zero data loss with retry safety"],
        rating: "Usability Score: 98/100"
      }
    },
    {
      id: "budget-warning",
      name: "Budget Warning (80% & 100% Limits)",
      v1: {
        title: "V1: Static Progress Bar",
        description: "Monochrome blue progress bar with plain numbers. No color transformation or dynamic threshold trigger.",
        features: ["Single blue color at all percentages", "No animated fill transitions", "No contextual action buttons"],
        rating: "Usability Score: 58/100"
      },
      v2: {
        title: "V2: Semantic Color Tween & Cautionary Alert",
        description: "Smooth 500ms progress fill that dynamically shifts from royal blue to warning amber at 80% and cautionary red at 100%. Accompanied by sliding alert banner, emphasis pulse on remaining balance, and direct 'View Budget' action.",
        features: ["Semantic color transitions (#2155F5 -> #F5A623 -> #E5484D)", "Non-overflowing >100% bar container", "Pulsing remaining allowance", "Direct navigation to budget adjustment"],
        rating: "Usability Score: 95/100"
      }
    }
  ]
};

