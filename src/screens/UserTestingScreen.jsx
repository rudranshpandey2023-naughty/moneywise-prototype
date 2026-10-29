import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { USER_TESTING_DATA } from '../data/userTestingData';
import {
  ChevronLeft,
  CheckCircle,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Layers,
  FileText,
  UserCheck,
  TrendingUp,
  Sliders,
  Check
} from 'lucide-react';

export default function UserTestingScreen({ onBack }) {
  const { setCurrentScreen, triggerInteraction } = useApp();

  // Active Sub-tab: 'v1' | 'testing' | 'changes' | 'v2'
  const [activeSection, setActiveSection] = useState('testing');
  const [activeParticipantIndex, setActiveParticipantIndex] = useState(0);
  const [selectedComparisonIndex, setSelectedComparisonIndex] = useState(0);

  const participant = USER_TESTING_DATA.participants[activeParticipantIndex];
  const activeComparison = USER_TESTING_DATA.version02Comparisons[selectedComparisonIndex];

  return (
    <div className="flex-1 overflow-y-auto pb-28 pt-2 px-4 space-y-4">
      {/* Top Navigation Back */}
      <div className="flex items-center justify-between pt-1 border-b border-[#E6EAF2] pb-3">
        <button
          onClick={onBack || (() => setCurrentScreen('dashboard'))}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#2155F5] hover:text-[#1645D8]"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to App</span>
        </button>
        <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-[#2155F5] px-2 py-0.5 rounded-full">
          Section 7 Documentation
        </span>
      </div>

      {/* Hero Header */}
      <div>
        <h1 className="text-xl font-extrabold text-[#071438]">User Testing & Iteration</h1>
        <p className="text-xs text-[#7B8497] mt-0.5">
          Usability testing logs, researcher templates & V1 vs V2 evolutions
        </p>
      </div>

      {/* Main Section Navigation Pills */}
      <div className="grid grid-cols-4 gap-1 bg-[#F0F3F8] p-1 rounded-xl text-xs font-semibold">
        <button
          onClick={() => setActiveSection('v1')}
          className={`py-2 rounded-lg transition-all text-center ${
            activeSection === 'v1' ? 'bg-white text-[#071438] shadow-2xs font-bold' : 'text-[#7B8497] hover:text-[#101828]'
          }`}
        >
          Version 01
        </button>
        <button
          onClick={() => setActiveSection('testing')}
          className={`py-2 rounded-lg transition-all text-center ${
            activeSection === 'testing' ? 'bg-white text-[#071438] shadow-2xs font-bold' : 'text-[#7B8497] hover:text-[#101828]'
          }`}
        >
          Testing (3 Users)
        </button>
        <button
          onClick={() => setActiveSection('changes')}
          className={`py-2 rounded-lg transition-all text-center ${
            activeSection === 'changes' ? 'bg-white text-[#071438] shadow-2xs font-bold' : 'text-[#7B8497] hover:text-[#101828]'
          }`}
        >
          Changes Log
        </button>
        <button
          onClick={() => setActiveSection('v2')}
          className={`py-2 rounded-lg transition-all text-center ${
            activeSection === 'v2' ? 'bg-white text-[#071438] shadow-2xs font-bold' : 'text-[#7B8497] hover:text-[#101828]'
          }`}
        >
          Version 02
        </button>
      </div>

      {/* ================= TAB 1: VERSION 01 ================= */}
      {activeSection === 'v1' && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-4 border border-[#E6EAF2] shadow-card space-y-2">
            <h2 className="text-sm font-bold text-[#101828]">{USER_TESTING_DATA.version01.title}</h2>
            <p className="text-xs text-[#525d73] leading-relaxed">
              {USER_TESTING_DATA.version01.overview}
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7B8497]">
              Initial Design Hypotheses & Identified Friction Points
            </span>

            {USER_TESTING_DATA.version01.coreDecisions.map((dec, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 border border-[#E6EAF2] shadow-card space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-[#2155F5] text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <h3 className="text-xs font-bold text-[#101828]">{dec.area}</h3>
                </div>

                <div className="text-xs space-y-1.5 pl-7">
                  <div className="text-[#525d73]">
                    <strong className="text-[#101828]">V1 Intended Behavior:</strong> {dec.v1Approach}
                  </div>
                  <div className="text-[#E5484D] bg-[#FEF2F2] p-2 rounded-lg border border-[#FEE2E2]">
                    <strong>User Barrier:</strong> {dec.limitation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 2: TESTING (3 PARTICIPANTS) ================= */}
      {activeSection === 'testing' && (
        <div className="space-y-4 animate-fade-in">
          {/* Participant Selector Tabs */}
          <div className="flex gap-2">
            {USER_TESTING_DATA.participants.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setActiveParticipantIndex(idx)}
                className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  activeParticipantIndex === idx
                    ? 'bg-[#071438] text-white border-[#071438] shadow-2xs'
                    : 'bg-white border-[#E6EAF2] text-[#7B8497] hover:border-[#CBD5E1]'
                }`}
              >
                {p.id}: {p.name.split('—')[1]?.trim() || p.id}
              </button>
            ))}
          </div>

          {/* Participant Profile Banner */}
          <div className="bg-[#F5F7FB] border border-[#E6EAF2] rounded-2xl p-3.5 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#101828]">{participant.name}</h3>
              <span className="text-[10px] bg-white border border-[#E6EAF2] px-2 py-0.5 rounded font-mono text-[#525d73]">
                {participant.device}
              </span>
            </div>
            <p className="text-[11px] text-[#7B8497]">{participant.role}</p>
          </div>

          {/* 7 Required Usability Testing Tasks Template */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7B8497] flex items-center justify-between">
              <span>Standard 7-Task Usability Template</span>
              <span className="text-[10px] text-[#16A085] font-semibold">100% Completion</span>
            </span>

            {participant.tasks.map((task) => (
              <div key={task.id} className="bg-white rounded-2xl p-4 border border-[#E6EAF2] shadow-card space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#071438] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {task.id}
                    </span>
                    <h4 className="text-xs font-bold text-[#101828]">{task.task}</h4>
                  </div>
                  <span className="text-[10px] font-bold bg-[#16A085]/15 text-[#16A085] px-2 py-0.5 rounded-full flex items-center gap-1 flex-shrink-0">
                    <Check className="w-3 h-3" /> Completed
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-1.5 text-xs bg-[#F5F7FB] p-2.5 rounded-xl border border-[#E6EAF2]">
                  <div>
                    <span className="font-semibold text-[#101828]">Feedback Noticed: </span>
                    <span className="text-[#525d73]">{task.feedbackNoticed}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#101828]">State Understood: </span>
                    <span className="text-[#525d73]">{task.stateUnderstood}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#101828]">Animation Helped: </span>
                    <span className="text-[#525d73]">{task.animationHelped}</span>
                  </div>
                  {task.confusion && task.confusion !== 'None' && task.confusion !== 'None on standard entry.' && (
                    <div className="text-[#E5484D] pt-0.5">
                      <span className="font-semibold">Point of Confusion: </span>
                      <span>{task.confusion}</span>
                    </div>
                  )}
                  <div className="text-[#2155F5] pt-0.5">
                    <span className="font-semibold">Suggested Improvement: </span>
                    <span>{task.suggestedImprovement}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 3: CHANGES / IMPROVEMENT LOG ================= */}
      {activeSection === 'changes' && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-4 border border-[#E6EAF2] shadow-card">
            <h2 className="text-sm font-bold text-[#101828]">System Improvement Log</h2>
            <p className="text-xs text-[#7B8497] mt-0.5">
              Synthesis of empirical friction points and implemented architecture enhancements
            </p>
          </div>

          <div className="space-y-3">
            {USER_TESTING_DATA.improvementLog.map((log) => (
              <div key={log.id} className="bg-white rounded-2xl p-4 border border-[#E6EAF2] shadow-card space-y-3">
                <div className="flex items-center justify-between border-b border-[#F0F3F8] pb-2">
                  <span className="font-mono text-xs font-bold text-[#2155F5]">{log.id}</span>
                  <span className="text-xs font-bold text-[#101828]">{log.issue}</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="bg-[#FFF8E6] p-2.5 rounded-xl border border-[#F5A623]/30 text-[#071438]">
                    <span className="font-bold text-[#F5A623] block mb-0.5">Evidence from Usability Testing:</span>
                    <p className="text-[#525d73] leading-relaxed">{log.evidence}</p>
                  </div>

                  <div className="bg-[#EEF4FF] p-2.5 rounded-xl border border-[#2155F5]/20 text-[#071438]">
                    <span className="font-bold text-[#2155F5] block mb-0.5">Design Change Implemented:</span>
                    <p className="text-[#525d73] leading-relaxed">{log.designChange}</p>
                  </div>

                  <div className="pl-1 text-[#525d73]">
                    <strong className="text-[#101828]">Reason for Change: </strong>
                    {log.reason}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 4: VERSION 02 BEFORE & AFTER ================= */}
      {activeSection === 'v2' && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-4 border border-[#E6EAF2] shadow-card">
            <h2 className="text-sm font-bold text-[#101828]">Version 02: Before & After Comparisons</h2>
            <p className="text-xs text-[#7B8497] mt-0.5">
              Side-by-side architectural comparison for 3 key micro-interactions
            </p>
          </div>

          {/* Comparison Selector */}
          <div className="flex gap-1.5">
            {USER_TESTING_DATA.version02Comparisons.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setSelectedComparisonIndex(i)}
                className={`flex-1 py-2 px-2 rounded-xl text-center text-xs font-semibold transition-all ${
                  selectedComparisonIndex === i
                    ? 'bg-[#2155F5] text-white shadow-2xs'
                    : 'bg-white border border-[#E6EAF2] text-[#7B8497] hover:border-[#CBD5E1]'
                }`}
              >
                {c.name.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Detailed Side-by-Side Card */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#7B8497]">
              {activeComparison.name}
            </h3>

            {/* V1 Baseline Box */}
            <div className="bg-[#FFF5F5] rounded-2xl p-4 border border-[#FEE2E2] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#E5484D] uppercase tracking-wider">
                  Version 01 (Initial)
                </span>
                <span className="text-[10px] font-mono text-[#E5484D]">{activeComparison.v1.rating}</span>
              </div>
              <h4 className="text-xs font-bold text-[#101828]">{activeComparison.v1.title}</h4>
              <p className="text-xs text-[#525d73] leading-relaxed">{activeComparison.v1.description}</p>
              <ul className="text-xs space-y-1 text-[#7B8497] pt-1">
                {activeComparison.v1.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5 text-[#E5484D] flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* V2 Enhanced Box */}
            <div className="bg-[#F0FDF4] rounded-2xl p-4 border border-[#BBF7D0] space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#16A085] uppercase tracking-wider">
                  Version 02 (Polished & Tested)
                </span>
                <span className="text-[10px] font-mono font-bold text-[#16A085]">{activeComparison.v2.rating}</span>
              </div>
              <h4 className="text-xs font-bold text-[#071438]">{activeComparison.v2.title}</h4>
              <p className="text-xs text-[#525d73] leading-relaxed">{activeComparison.v2.description}</p>
              <ul className="text-xs space-y-1 text-[#101828] font-medium pt-1">
                {activeComparison.v2.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#16A085] flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Launch in Prototype Button */}
            <button
              onClick={() => {
                if (activeComparison.id === 'duplicate') triggerInteraction('int-4');
                else if (activeComparison.id === 'offline') triggerInteraction('int-8');
                else if (activeComparison.id === 'budget-warning') triggerInteraction('int-2');
              }}
              className="w-full bg-[#071438] hover:bg-[#122861] active:scale-98 text-white font-semibold text-xs py-3 rounded-xl transition-all shadow-card flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#2155F5]" />
              <span>Launch {activeComparison.name} in App</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

