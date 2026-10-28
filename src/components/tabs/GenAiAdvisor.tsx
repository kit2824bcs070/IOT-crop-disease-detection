import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bot,
  Send,
  Sparkles,
  Globe,
  Radio,
  ScanLine,
  Database,
  ArrowRight,
  User,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

export const GenAiAdvisor: React.FC = () => {
  const {
    chatMessages,
    chatLanguage,
    setChatLanguage,
    isAiTyping,
    sendMessage,
    sensorData,
    detectionResult,
    riskAnalysis
  } = useApp();

  const [inputQuery, setInputQuery] = useState<string>('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isAiTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || isAiTyping) return;
    sendMessage(inputQuery.trim());
    setInputQuery('');
  };

  const samplePromptsEn = [
    'Should I water my tomato plants now?',
    'What should I do about Early Blight?',
    'How does high humidity affect fungal spread?',
    'Recommend organic bio-pesticides for tomato crops.'
  ];

  const samplePromptsTa = [
    'தக்காளி பயிர்களுக்கு இப்போது தண்ணீர் பாய்ச்ச வேண்டுமா?',
    'Early Blight நோயை எவ்வாறு கட்டுப்படுத்துவது?',
    'அதிக ஈரப்பதத்தால் பயிரில் என்ன பாதிப்பு ஏற்படும்?'
  ];

  const activePrompts = chatLanguage === 'ta' ? samplePromptsTa : samplePromptsEn;

  return (
    <div className="space-y-6">
      {/* Title & Pipeline Header */}
      <div className="p-5 rounded-2xl bg-[#09150d] border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-widest text-indigo-400 font-bold">
              Generative AI & Retrieval-Augmented Generation (RAG)
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-950 border border-indigo-500/40 text-indigo-300 font-bold">
              GENERATIVE AI DEMO
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 flex items-center gap-2">
            <Bot className="w-6 h-6 text-indigo-400" />
            <span>GENERATIVE AI AGRICULTURAL ADVISOR</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Domain-specific multilingual advisory synthesized by feeding real-time IoT readings and DNN diagnostic outputs into an LLM context window.
          </p>
        </div>

        {/* English / Tamil Selector */}
        <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-xl border border-indigo-900/40">
          <Globe className="w-4 h-4 text-indigo-400 ml-1" />
          <button
            onClick={() => setChatLanguage('en')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              chatLanguage === 'en'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            English 🇬🇧
          </button>
          <button
            onClick={() => setChatLanguage('ta')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              chatLanguage === 'ta'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            தமிழ் 🇮🇳
          </button>
        </div>
      </div>

      {/* Visual Input Pipeline (Requirement 9 & 18) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0b161e]/90 border border-indigo-900/40">
        <div className="text-xs font-mono uppercase text-indigo-400 font-bold mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>Generative AI Context Assembly & Prompt Engineering Flow</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-xs">
          {/* Box 1 */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-800/40">
            <span className="text-[10px] font-mono text-slate-400 block">Input Source A</span>
            <div className="font-bold text-white mt-0.5">IoT Telemetry</div>
            <div className="text-[11px] text-emerald-300 font-mono mt-1">
              {sensorData.temperature.toFixed(1)}°C | {sensorData.humidity}% RH | {sensorData.soilMoisture}% Soil
            </div>
          </div>

          {/* Plus */}
          <div className="text-center font-bold text-slate-500 text-lg hidden md:block">+</div>

          {/* Box 2 */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-cyan-800/40">
            <span className="text-[10px] font-mono text-slate-400 block">Input Source B</span>
            <div className="font-bold text-white mt-0.5">DNN Diagnosis</div>
            <div className="text-[11px] text-cyan-300 font-mono mt-1">
              {detectionResult.diseaseName} ({detectionResult.confidence}%)
            </div>
          </div>

          {/* Arrow */}
          <div className="text-center font-bold text-indigo-400 text-lg hidden md:block">→</div>

          {/* Box 3 */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-950 to-indigo-900 border border-indigo-500/50 shadow-md">
            <span className="text-[10px] font-mono text-indigo-300 block">Generative Engine</span>
            <div className="font-bold text-white mt-0.5">Custom LLM / RAG</div>
            <div className="text-[11px] text-indigo-200 font-mono mt-1">
              Natural Language Advisory
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="p-5 rounded-2xl bg-[#0c1810]/95 border border-indigo-900/40 flex flex-col h-[520px]">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {chatMessages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[88%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600 text-white shadow-md shadow-indigo-900/50'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className="space-y-1.5">
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600/40 border border-emerald-400/40 text-emerald-100'
                      : 'bg-indigo-950/40 border border-indigo-700/40 text-slate-200'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                {msg.contextSnippet && (
                  <div className="text-[10px] font-mono text-indigo-300/80 px-2">
                    {msg.contextSnippet}
                  </div>
                )}
                <div className="text-[10px] font-mono text-slate-500 px-2">
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Animation */}
          {isAiTyping && (
            <div className="flex gap-3 max-w-[80%] mr-auto">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0 text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-700/40 text-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] font-mono text-indigo-300 ml-2">
                  Synthesizing domain knowledge...
                </span>
              </div>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="pt-3 pb-2 border-t border-emerald-900/30 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-mono text-slate-400 flex-shrink-0">
            Suggested Prompts:
          </span>
          {activePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(prompt)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-slate-900/80 hover:bg-indigo-950 border border-indigo-800/40 text-indigo-200 whitespace-nowrap transition-colors flex-shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="pt-2 flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            placeholder={
              chatLanguage === 'ta'
                ? 'உங்கள் விவசாய கேள்விகளை கேட்கவும் (எ.கா. தக்காளி நோய், பாசனம்)...'
                : 'Ask AI Agronomist (e.g., "Should I water now?", "How to cure Early Blight?")...'
            }
            className="flex-1 bg-black/50 border border-emerald-800/50 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isAiTyping}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-40 shadow-md shadow-indigo-900/40"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
