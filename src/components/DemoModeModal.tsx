import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  ExternalLink,
  Layers,
  CheckCircle2
} from 'lucide-react';

export const DemoModeModal: React.FC = () => {
  const {
    isDemoMode,
    setIsDemoMode,
    currentDemoStep,
    isDemoPlaying,
    demoSteps,
    startFullDemo,
    pauseDemo,
    resumeDemo,
    restartDemo,
    goToDemoStep,
    nextDemoStep,
    prevDemoStep,
    setActiveTab
  } = useApp();

  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);

  const currentStepData = demoSteps.find(s => s.step === currentDemoStep) || demoSteps[0];

  // Optional voice narration using Web Speech API
  useEffect(() => {
    if (voiceEnabled && isDemoMode && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        `Step ${currentStepData.step}. ${currentStepData.title}. ${currentStepData.description}`
      );
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }, [currentDemoStep, isDemoMode, voiceEnabled, currentStepData]);

  if (!isDemoMode) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 lg:left-auto lg:right-6 lg:bottom-6 z-50 lg:w-[480px] bg-[#0c1810]/95 backdrop-blur-xl border border-emerald-500/50 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden transition-all duration-300">
      {/* Header bar */}
      <div className="px-4 py-3 bg-gradient-to-r from-emerald-950 via-[#0f2316] to-emerald-950 border-b border-emerald-800/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-emerald-300" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
              Project Review Walkthrough
            </div>
            <div className="text-xs text-slate-200 font-semibold">
              Automated 14-Step System Tour
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Voice Narration toggle */}
          <button
            onClick={() => setVoiceEnabled(v => !v)}
            title={voiceEnabled ? 'Mute AI voice narration' : 'Enable AI voice narration for faculty review'}
            className={`p-1.5 rounded-lg border text-xs transition-colors ${
              voiceEnabled
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                : 'bg-emerald-950/40 border-emerald-800/40 text-slate-400 hover:text-slate-200'
            }`}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Close button */}
          <button
            onClick={() => {
              pauseDemo();
              setIsDemoMode(false);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-emerald-900/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-emerald-950 h-1.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-emerald-500 via-teal-400 to-green-400 h-full transition-all duration-500"
          style={{ width: `${(currentDemoStep / 14) * 100}%` }}
        />
      </div>

      {/* Step details content */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-700/50 text-emerald-300">
            Step {currentStepData.step} of 14
          </span>
          <span className="text-[11px] font-mono text-emerald-400/90 flex items-center gap-1">
            Target: <span className="capitalize font-semibold underline">{currentStepData.targetTab}</span>
          </span>
        </div>

        <div>
          <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {currentStepData.title}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {currentStepData.description}
          </p>
        </div>

        {/* Action Callout */}
        <div className="p-2.5 rounded-lg bg-emerald-950/50 border border-emerald-800/30 text-[11px] font-mono text-emerald-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="truncate">{currentStepData.actionMessage}</span>
        </div>

        {/* Step quick jumps pill selector */}
        <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
          {demoSteps.map(s => (
            <button
              key={s.step}
              onClick={() => goToDemoStep(s.step)}
              className={`w-6 h-6 flex-shrink-0 rounded-md text-[10px] font-mono font-bold transition-all ${
                s.step === currentDemoStep
                  ? 'bg-emerald-400 text-slate-950 scale-110 shadow'
                  : s.step < currentDemoStep
                  ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/40'
                  : 'bg-slate-900 text-slate-500 border border-slate-800'
              }`}
            >
              {s.step}
            </button>
          ))}
        </div>

        {/* Controls footer */}
        <div className="pt-2 border-t border-emerald-900/40 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <button
              onClick={restartDemo}
              title="Restart from Step 1"
              className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-slate-300 hover:text-white hover:bg-emerald-900/60 text-xs font-medium flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>↻ Restart</span>
            </button>

            {isDemoPlaying ? (
              <button
                onClick={pauseDemo}
                className="px-3 py-2 rounded-lg bg-amber-600/30 border border-amber-500/40 text-amber-200 hover:bg-amber-600/40 text-xs font-semibold flex items-center gap-1.5"
              >
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>⏸ Pause</span>
              </button>
            ) : (
              <button
                onClick={resumeDemo}
                className="px-3 py-2 rounded-lg bg-emerald-600/40 border border-emerald-500/50 text-emerald-200 hover:bg-emerald-600/60 text-xs font-semibold flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>▶ Resume</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={prevDemoStep}
              disabled={currentDemoStep === 1}
              className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-slate-300 hover:text-white disabled:opacity-40 disabled:hover:text-slate-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextDemoStep}
              disabled={currentDemoStep === 14}
              className="px-3 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 disabled:opacity-40 shadow-sm"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
