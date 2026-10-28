import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  HeartPulse,
  AlertTriangle,
  Thermometer,
  Droplets,
  Sprout,
  Sun,
  ShieldAlert,
  ArrowUpRight,
  TrendingUp,
  CheckCircle,
  Wind,
  Layers,
  Sparkles,
  ChevronRight,
  Bell
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const {
    sensorData,
    riskAnalysis,
    alerts,
    resolveAlert,
    setActiveTab,
    sensorHistory,
    pumpStatus
  } = useApp();

  const unresolvedAlerts = alerts.filter(a => !a.resolved);

  // SVG Sparkline generator
  const renderSparkline = (
    data: number[],
    strokeColor: string,
    fillColor: string,
    minVal: number,
    maxVal: number
  ) => {
    if (!data.length) return null;
    const width = 120;
    const height = 36;
    const points = data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const normalized = (val - minVal) / (maxVal - minVal || 1);
      const y = height - Math.max(4, Math.min(height - 4, normalized * height));
      return `${x},${y}`;
    });
    const pointsStr = points.join(' ');
    const areaStr = `0,${height} ${pointsStr} ${width},${height}`;

    return (
      <svg width={width} height={height} className="overflow-visible">
        <polygon points={areaStr} fill={fillColor} opacity="0.2" />
        <polyline
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={pointsStr}
        />
      </svg>
    );
  };

  const tempVals = sensorHistory.map(h => h.temperature);
  const humVals = sensorHistory.map(h => h.humidity);
  const soilVals = sensorHistory.map(h => h.soilMoisture);
  const lightVals = sensorHistory.map(h => h.lightIntensity);

  return (
    <div className="space-y-6">
      {/* Top Banner Quick Summary */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-[#0d2215]/80 to-emerald-950/70 border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-300 font-bold">
              Autonomous Crop Surveillance Active
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Integrated Farm Telemetry & AI Diagnosis
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Simultaneous Edge IoT acquisition, EfficientNet-B0 feature classification, and Generative AI advisory pipeline operating in closed loop.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveTab('disease')}
            className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>Diagnose Leaf</span>
          </button>
          <button
            onClick={() => setActiveTab('irrigation')}
            className="px-3.5 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600/40 text-emerald-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Droplets className="w-4 h-4 text-emerald-400" />
            <span>Irrigation Controls ({pumpStatus})</span>
          </button>
        </div>
      </div>

      {/* 6 Main Metric Summary Cards (Requirement 3) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 1. Crop Health */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0e1d13]/80 border border-emerald-500/30 hover:border-emerald-400/50 transition-all flex flex-col justify-between group shadow-lg shadow-black/40">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Crop Health
                </div>
                <div className="text-xs text-emerald-400 font-medium">
                  Multimodal Index
                </div>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold font-mono bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">
              Good / Monitor
            </span>
          </div>

          <div className="flex items-end justify-between my-2">
            <div>
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
                {riskAnalysis.cropHealth} <span className="text-lg text-slate-400 font-normal">/ 100</span>
              </div>
              <div className="text-[11px] text-emerald-300/80 font-mono mt-1">
                Status: <span className="font-bold text-white">{riskAnalysis.cropHealthStatus}</span>
              </div>
            </div>
            <div className="w-24">
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden mb-1">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${riskAnalysis.cropHealth}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-slate-400">Tolerance 80%</span>
            </div>
          </div>
        </div>

        {/* 2. Disease Risk */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#1d120e]/80 border border-red-500/40 hover:border-red-400/60 transition-all flex flex-col justify-between group shadow-lg shadow-black/40">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-red-500/20 border border-red-400/40 flex items-center justify-center text-red-300">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Disease Risk
                </div>
                <div className="text-xs text-red-400 font-medium">
                  Fungal Vulnerability
                </div>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold font-mono bg-red-500/20 border border-red-400/40 text-red-300 animate-pulse">
              HIGH
            </span>
          </div>

          <div className="flex items-end justify-between my-2">
            <div>
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-red-100">
                {riskAnalysis.diseaseRisk} <span className="text-lg text-red-300/60 font-normal">/ 100</span>
              </div>
              <div className="text-[11px] text-red-300/80 font-mono mt-1">
                Spore Germination Rate: <span className="font-bold text-white">Elevated</span>
              </div>
            </div>
            <div className="w-24">
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden mb-1">
                <div
                  className="bg-red-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${riskAnalysis.diseaseRisk}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-red-300">Target &lt; 35%</span>
            </div>
          </div>
        </div>

        {/* 3. Temperature */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0e1d13]/80 border border-emerald-500/30 hover:border-emerald-400/50 transition-all flex flex-col justify-between group shadow-lg shadow-black/40">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                <Thermometer className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Temperature
                </div>
                <div className="text-xs text-amber-400 font-medium">
                  DHT22 Digital Probe
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-950/60 border border-emerald-700/40 text-emerald-300">
              Optimal (22-30°C)
            </span>
          </div>

          <div className="flex items-end justify-between my-2">
            <div>
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
                {sensorData.temperature.toFixed(1)} <span className="text-lg text-slate-400 font-normal">°C</span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-1">
                Heat Stress Index: {riskAnalysis.heatStress}%
              </div>
            </div>
            <div>
              {renderSparkline(tempVals, '#f59e0b', '#d97706', 25, 35)}
            </div>
          </div>
        </div>

        {/* 4. Humidity */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0e1d13]/80 border border-emerald-500/30 hover:border-emerald-400/50 transition-all flex flex-col justify-between group shadow-lg shadow-black/40">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Humidity
                </div>
                <div className="text-xs text-cyan-400 font-medium">
                  Relative Ambient (RH)
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-950/60 border border-cyan-700/40 text-cyan-300">
              High Moisture
            </span>
          </div>

          <div className="flex items-end justify-between my-2">
            <div>
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
                {sensorData.humidity} <span className="text-lg text-slate-400 font-normal">%</span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-1">
                Dew point: ~26.1°C
              </div>
            </div>
            <div>
              {renderSparkline(humVals, '#06b6d4', '#0891b2', 60, 95)}
            </div>
          </div>
        </div>

        {/* 5. Soil Moisture */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0e1d13]/80 border border-emerald-500/30 hover:border-emerald-400/50 transition-all flex flex-col justify-between group shadow-lg shadow-black/40">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Soil Moisture
                </div>
                <div className="text-xs text-teal-400 font-medium">
                  Capacitive V1.2
                </div>
              </div>
            </div>
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                sensorData.soilMoisture < 40
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                  : 'bg-emerald-950/60 border border-emerald-700/40 text-emerald-300'
              }`}
            >
              {sensorData.soilMoisture < 40 ? 'CRITICAL DRY' : 'SUFFICIENT'}
            </span>
          </div>

          <div className="flex items-end justify-between my-2">
            <div>
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
                {sensorData.soilMoisture} <span className="text-lg text-slate-400 font-normal">%</span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-1">
                Water Stress: {riskAnalysis.waterStress}%
              </div>
            </div>
            <div>
              {renderSparkline(soilVals, '#14b8a6', '#0d9488', 30, 85)}
            </div>
          </div>
        </div>

        {/* 6. Light Intensity */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0e1d13]/80 border border-emerald-500/30 hover:border-emerald-400/50 transition-all flex flex-col justify-between group shadow-lg shadow-black/40">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-yellow-500/20 border border-yellow-400/40 flex items-center justify-center text-yellow-300">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Light Intensity
                </div>
                <div className="text-xs text-yellow-400 font-medium">
                  BH1750 Ambient Sensor
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-yellow-950/60 border border-yellow-700/40 text-yellow-300">
              Photoperiod Active
            </span>
          </div>

          <div className="flex items-end justify-between my-2">
            <div>
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
                {sensorData.lightIntensity} <span className="text-lg text-slate-400 font-normal">lux</span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-1">
                Photosynthetic PAR: Active
              </div>
            </div>
            <div>
              {renderSparkline(lightVals, '#eab308', '#ca8a04', 300, 800)}
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Active Alerts & AI Recommendations (Requirements 14 & 15) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Alerts Panel (Requirement 14) */}
        <div className="p-5 rounded-2xl bg-[#0b1710]/90 border border-emerald-900/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base text-white">Active Alerts</h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-red-500/20 border border-red-500/40 text-red-300">
                  {unresolvedAlerts.length} Active
                </span>
              </div>
              <button
                onClick={() => setActiveTab('zones')}
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
              >
                <span>View Zones</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {unresolvedAlerts.map(alert => (
                <div
                  key={alert.id}
                  className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 transition-all ${
                    alert.severity === 'critical'
                      ? 'bg-red-950/30 border-red-500/40 text-red-200'
                      : alert.severity === 'warning'
                      ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                      : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/40 border border-current">
                        {alert.zone}
                      </span>
                      <h4 className="text-sm font-bold text-white">
                        {alert.title}
                      </h4>
                    </div>
                    <p className="text-xs opacity-90 leading-relaxed">
                      {alert.message}
                    </p>
                    <span className="text-[10px] font-mono opacity-70 block pt-1">
                      Reported: {alert.timestamp}
                    </span>
                  </div>

                  <button
                    onClick={() => resolveAlert(alert.id)}
                    className="p-1.5 rounded-lg bg-black/40 hover:bg-black/60 border border-white/20 text-xs font-mono text-white flex-shrink-0"
                    title="Mark resolved"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </button>
                </div>
              ))}

              {unresolvedAlerts.length === 0 && (
                <div className="p-6 text-center text-slate-400 text-xs font-mono">
                  🟢 All farm alerts acknowledged and resolved.
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-900/30 text-xs text-slate-400 flex items-center justify-between font-mono">
            <span>Sensors continuously polled via MQTT</span>
            <span className="text-emerald-400">Autonomous Edge Detection</span>
          </div>
        </div>

        {/* AI Recommendations Panel (Requirement 15) */}
        <div className="p-5 rounded-2xl bg-[#0b1710]/90 border border-emerald-900/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-base text-white">AI Recommendations</h3>
                <span className="text-xs font-mono text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-700/40">
                  Generative RAG Engine
                </span>
              </div>
              <button
                onClick={() => setActiveTab('genai')}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
              >
                <span>Ask Advisor</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              {/* Rec 1 */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-emerald-800/30 flex items-start gap-3">
                <Wind className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">1. Improve ventilation in high-risk zones</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                      HIGH
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Activate lateral polyhouse exhaust fans to decrease canopy relative humidity below 75% to inhibit Alternaria conidia germination.
                  </p>
                </div>
              </div>

              {/* Rec 2 */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-emerald-800/30 flex items-start gap-3">
                <Droplets className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">2. Adjust irrigation according to soil moisture</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                      HIGH
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Hold automated irrigation in Zone B and C until topsoil moisture drops below 40% to prevent root hypoxia and collar rot.
                  </p>
                </div>
              </div>

              {/* Rec 3 */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-emerald-800/30 flex items-start gap-3">
                <Sprout className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">3. Monitor nearby plants</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      MEDIUM
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Inspect adjacent tomato rows in Zone C within a 3-meter radius for early chlorotic foliar halos.
                  </p>
                </div>
              </div>

              {/* Rec 4 */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-emerald-800/30 flex items-start gap-3">
                <Layers className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">4. Avoid unnecessary overhead irrigation</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      MEDIUM
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Switch strictly to sub-canopy drip lines to maintain leaf surface dry time (&lt;3 hours/day).
                  </p>
                </div>
              </div>

              {/* Rec 5 */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-emerald-800/30 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">5. Apply preventive treatment if risk increases</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                      ACTION
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Prepare organic copper hydroxide (2.5 g/L) or neem oil bio-formulation if disease risk remains &gt;75% for 12 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-900/30 text-xs text-slate-400 flex items-center justify-between font-mono">
            <span>Synthesized with RAG Agronomy Knowledge</span>
            <span className="text-indigo-400">Contextual Prompt: Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
