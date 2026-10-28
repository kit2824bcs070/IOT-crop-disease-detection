import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Droplets,
  Zap,
  Cpu,
  Power,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Terminal
} from 'lucide-react';

export const SmartIrrigation: React.FC = () => {
  const {
    sensorData,
    soilMoistureThreshold,
    setSoilMoistureThreshold,
    pumpStatus,
    isAutoMode,
    setIsAutoMode,
    setPumpStatusManual,
    updateManualSensor,
    irrigationLogs
  } = useApp();

  const isLowMoisture = sensorData.soilMoisture < soilMoistureThreshold;

  return (
    <div className="space-y-6">
      {/* Title & Status Header */}
      <div className="p-5 rounded-2xl bg-[#09150d] border border-blue-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-widest text-blue-400 font-bold">
              Autonomous Edge Actuation Loop
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-950 border border-blue-500/40 text-blue-300 font-bold">
              SIMULATED RELAY / PUMP CONTROL
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 flex items-center gap-2">
            <Droplets className="w-6 h-6 text-blue-400" />
            <span>SMART IRRIGATION CONTROL</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Automated threshold feedback control via ESP32 GPIO 26 relay driver, protecting root zones against drought and water-logging.
          </p>
        </div>

        {/* Current State Indicator */}
        <div className="flex items-center gap-3">
          <div
            className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 font-mono text-xs font-bold ${
              pumpStatus === 'ON'
                ? 'bg-blue-600/30 border-blue-400 text-blue-300 animate-pulse'
                : 'bg-emerald-950/40 border-emerald-600/40 text-emerald-300'
            }`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                pumpStatus === 'ON' ? 'bg-blue-400 animate-ping' : 'bg-emerald-400'
              }`}
            />
            <span>PUMP: {pumpStatus}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Telemetry, Threshold & Pump Illustration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Readouts, Sliders & Decision Pipeline (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Main 3 Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-[#0c1810]/90 border border-emerald-900/40">
              <span className="text-xs font-mono text-slate-400">Current Soil Moisture</span>
              <div className="text-3xl font-black font-mono text-teal-300 mt-1">
                {sensorData.soilMoisture}%
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {isLowMoisture ? '🔴 Below Threshold' : '🟢 Nominal Range'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#0c1810]/90 border border-emerald-900/40">
              <span className="text-xs font-mono text-slate-400">Moisture Threshold</span>
              <div className="text-3xl font-black font-mono text-amber-300 mt-1">
                {soilMoistureThreshold}%
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Auto trigger setpoint</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0c1810]/90 border border-emerald-900/40">
              <span className="text-xs font-mono text-slate-400">Pump Actuator Status</span>
              <div
                className={`text-2xl font-black font-mono mt-1 ${
                  pumpStatus === 'ON' ? 'text-blue-400 animate-pulse' : 'text-slate-400'
                }`}
              >
                {pumpStatus}
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {pumpStatus === 'ON' ? 'GPIO 26 [HIGH]' : 'GPIO 26 [LOW]'}
              </span>
            </div>
          </div>

          {/* System Status Banner */}
          <div
            className={`p-4 rounded-xl border flex items-center justify-between text-xs sm:text-sm font-semibold ${
              isLowMoisture
                ? 'bg-red-950/40 border-red-500/50 text-red-200'
                : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {isLowMoisture ? (
                <>
                  <AlertTriangle className="w-5 h-5 text-red-400 animate-bounce" />
                  <span>🔴 LOW SOIL MOISTURE — Automatic Irrigation Activated</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>🟢 No irrigation required — Soil moisture within optimal buffer</span>
                </>
              )}
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-black/40 border border-current">
              {isAutoMode ? 'AUTO MODE ACTIVE' : 'MANUAL OVERRIDE'}
            </span>
          </div>

          {/* Requirement 10: Step-by-Step Decision -> ESP32 -> Relay -> Water Pump Flow */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-blue-900/40 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-300 font-bold">
              Autonomous Trigger Sequence
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
              <div
                className={`p-2.5 rounded-lg border transition-all ${
                  isLowMoisture
                    ? 'bg-red-950/50 border-red-500 text-red-200'
                    : 'bg-slate-900/60 border-slate-800 text-slate-500'
                }`}
              >
                <div className="font-bold">1. Decision</div>
                <div className="text-[10px] opacity-80 mt-1">Moisture &lt; {soilMoistureThreshold}%</div>
              </div>

              <div
                className={`p-2.5 rounded-lg border transition-all ${
                  isLowMoisture
                    ? 'bg-blue-950/50 border-blue-500 text-blue-200'
                    : 'bg-slate-900/60 border-slate-800 text-slate-500'
                }`}
              >
                <div className="font-bold">2. ESP32</div>
                <div className="text-[10px] opacity-80 mt-1">GPIO 26 = HIGH</div>
              </div>

              <div
                className={`p-2.5 rounded-lg border transition-all ${
                  isLowMoisture
                    ? 'bg-amber-950/50 border-amber-500 text-amber-200'
                    : 'bg-slate-900/60 border-slate-800 text-slate-500'
                }`}
              >
                <div className="font-bold">3. Relay</div>
                <div className="text-[10px] opacity-80 mt-1">Contacts Closed</div>
              </div>

              <div
                className={`p-2.5 rounded-lg border transition-all ${
                  pumpStatus === 'ON'
                    ? 'bg-cyan-950/50 border-cyan-400 text-cyan-200 animate-pulse'
                    : 'bg-slate-900/60 border-slate-800 text-slate-500'
                }`}
              >
                <div className="font-bold">4. Water Pump</div>
                <div className="text-[10px] opacity-80 mt-1">Discharging Flow</div>
              </div>
            </div>
          </div>

          {/* Interactive Sliders for Evaluator Testing */}
          <div className="p-4 rounded-xl bg-black/40 border border-emerald-900/30 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-teal-400" />
                  Simulate Soil Moisture Slider
                </span>
                <span className="text-teal-300 font-bold">{sensorData.soilMoisture}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                value={sensorData.soilMoisture}
                onChange={e => updateManualSensor('soil', parseInt(e.target.value))}
                className="w-full accent-teal-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>10% (Dry wilt)</span>
                <span className="text-amber-400">Drag below 40% to test Auto-Pump</span>
                <span>90% (Saturated)</span>
              </div>
            </div>

            {/* Threshold Slider */}
            <div className="space-y-2 pt-2 border-t border-emerald-900/30">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <Power className="w-4 h-4 text-amber-400" />
                  Configure Trigger Threshold
                </span>
                <span className="text-amber-300 font-bold">{soilMoistureThreshold}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="60"
                value={soilMoistureThreshold}
                onChange={e => setSoilMoistureThreshold(parseInt(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Action Buttons: Manual Pump ON, Manual Pump OFF, AUTO MODE */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => {
                setIsAutoMode(false);
                setPumpStatusManual('ON');
              }}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-900/40 transition-all"
            >
              <Power className="w-4 h-4" />
              <span>Manual Pump ON</span>
            </button>

            <button
              onClick={() => {
                setIsAutoMode(false);
                setPumpStatusManual('OFF');
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 border border-slate-600 transition-all"
            >
              <Power className="w-4 h-4 text-red-400" />
              <span>Manual Pump OFF</span>
            </button>

            <button
              onClick={() => setIsAutoMode(!isAutoMode)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                isAutoMode
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40 border border-emerald-400'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>{isAutoMode ? 'AUTO MODE [ACTIVE]' : 'ENABLE AUTO MODE'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Animated Water Pump Visual & Live Actuation Terminal (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Animated Water Pump Illustration */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0b1b1f] to-[#071317] border-2 border-blue-500/30 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl">
            {/* Background water ripple effect when pump ON */}
            {pumpStatus === 'ON' && (
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-400 via-blue-600 to-transparent animate-pulse" />
            )}

            <div className="relative mb-4">
              <svg width="180" height="180" viewBox="0 0 200 200">
                <defs>
                  <linearGradient id="pumpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e3a8a" />
                    <stop offset="50%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                  <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#0284c7" />
                  </linearGradient>
                </defs>

                {/* Submersible casing */}
                <rect x="55" y="45" width="90" height="110" rx="16" fill="url(#pumpGrad)" stroke="#60a5fa" strokeWidth="3" />
                {/* Motor fins */}
                <line x1="65" y1="65" x2="65" y2="135" stroke="#93c5fd" strokeWidth="2" />
                <line x1="75" y1="65" x2="75" y2="135" stroke="#93c5fd" strokeWidth="2" />
                <line x1="85" y1="65" x2="85" y2="135" stroke="#93c5fd" strokeWidth="2" />

                {/* Outlet Pipe */}
                <path d="M 145 90 L 185 90 L 185 170" fill="none" stroke="url(#pipeGrad)" strokeWidth="12" strokeLinecap="round" />

                {/* Center Impeller circle */}
                <circle cx="115" cy="100" r="24" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />

                {/* Impeller blades that rotate if ON */}
                <g className={pumpStatus === 'ON' ? 'origin-[115px_100px] animate-spin' : ''}>
                  <path d="M 115 100 L 115 80" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
                  <path d="M 115 100 L 135 100" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
                  <path d="M 115 100 L 115 120" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
                  <path d="M 115 100 L 95 100" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
                </g>

                {/* Water drops discharge animation */}
                {pumpStatus === 'ON' && (
                  <g>
                    <circle cx="185" cy="175" r="4" fill="#38bdf8" className="animate-ping" />
                    <circle cx="185" cy="190" r="3" fill="#60a5fa" />
                    <circle cx="178" cy="182" r="2.5" fill="#93c5fd" />
                  </g>
                )}
              </svg>

              {/* Status Badge */}
              <div
                className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-mono font-bold border shadow ${
                  pumpStatus === 'ON'
                    ? 'bg-blue-600 text-white border-blue-400 animate-pulse'
                    : 'bg-slate-900 text-slate-400 border-slate-700'
                }`}
              >
                {pumpStatus === 'ON' ? 'DISCHARGING 4.2 L/MIN' : 'STANDBY 0.0 L/MIN'}
              </div>
            </div>

            <h4 className="text-sm font-bold text-white mt-3">
              12V DC Submersible Brushless Pump
            </h4>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Driven by 5V SPDT Relay module on Optocoupler isolation
            </p>
          </div>

          {/* ESP32 Relay Decision Log Console */}
          <div className="p-4 rounded-2xl bg-[#070e0a] border border-emerald-950 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-950 text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Terminal className="w-3.5 h-3.5" />
                <span>ESP32 Edge Actuator Log</span>
              </span>
              <span className="text-[10px]">Baud: 115200</span>
            </div>

            <div className="space-y-1.5 h-36 overflow-y-auto pr-1 text-[11px] leading-relaxed">
              {irrigationLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={
                    log.includes('🔴') || log.includes('ACTIVATED')
                      ? 'text-cyan-300'
                      : log.includes('🟢')
                      ? 'text-emerald-400'
                      : 'text-slate-400'
                  }
                >
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
