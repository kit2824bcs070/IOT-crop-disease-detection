import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Activity,
  Cpu,
  Wifi,
  Radio,
  PlayCircle,
  Clock,
  MapPin,
  Menu,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const Header: React.FC<{ onMobileMenuToggle: () => void }> = ({ onMobileMenuToggle }) => {
  const {
    isDemoMode,
    setIsDemoMode,
    startFullDemo,
    sensorData,
    zones
  } = useApp();

  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-[#08120b]/90 backdrop-blur-md border-b border-emerald-900/40 px-4 lg:px-6 py-3">
      {/* Top Banner / Breadcrumb row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-emerald-950/70">
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 hover:bg-emerald-900/60"
            aria-label="Toggle navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-400 flex items-center justify-center shadow-lg shadow-emerald-900/40 border border-emerald-400/40">
              <Sparkles className="w-5 h-5 text-emerald-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
                  Smart Farm Control Center
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  System Online
                </span>
              </div>
              <h1 className="text-lg lg:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                AI-POWERED SMART CROP HEALTH MONITORING
              </h1>
            </div>
          </div>
        </div>

        {/* Center / Right Control Center Quick Indicators */}
        <div className="flex items-center flex-wrap gap-2 lg:gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-950/50 border border-emerald-800/30 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{time || '00:00:00'}</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-950/50 border border-emerald-800/30 text-slate-300">
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span>5 Sensors Online</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-950/50 border border-emerald-800/30 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>{zones.length} Active Zones</span>
          </div>

          {/* Project Review Demo Mode Button */}
          <button
            onClick={() => {
              if (isDemoMode) {
                setIsDemoMode(false);
              } else {
                startFullDemo();
              }
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-sans font-bold text-xs uppercase tracking-wide bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-slate-950 shadow-md shadow-emerald-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] border border-emerald-300/40"
          >
            <PlayCircle className="w-4 h-4 fill-slate-950 text-emerald-300 animate-spin-slow" />
            <span>🎤 {isDemoMode ? 'Exit Demo Review' : 'PROJECT REVIEW DEMO MODE'}</span>
          </button>
        </div>
      </div>

      {/* Subtitle & Technology Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2.5">
        <p className="text-xs sm:text-sm text-emerald-200/80 font-medium">
          IoT-Based Crop Disease Detection & Generative AI Agricultural Advisory System
        </p>

        {/* Badges */}
        <div className="flex items-center flex-wrap gap-1.5">
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-900/40 border border-emerald-600/30 text-emerald-300">
            IoT
          </span>
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-900/40 border border-emerald-600/30 text-emerald-300">
            Deep Neural Networks
          </span>
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-cyan-900/40 border border-cyan-600/30 text-cyan-300">
            Computer Vision
          </span>
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-900/40 border border-indigo-600/30 text-indigo-300">
            Generative AI
          </span>
        </div>
      </div>
    </header>
  );
};
