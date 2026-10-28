import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Activity,
  Layers,
  Thermometer,
  Droplets,
  Sprout,
  Waves,
  ScanLine,
  Sliders,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  HeartPulse
} from 'lucide-react';

export const MultimodalRisk: React.FC = () => {
  const {
    sliderTemp,
    sliderHumidity,
    sliderSoilMoisture,
    sliderLeafWetness,
    setSliderTemp,
    setSliderHumidity,
    setSliderSoilMoisture,
    setSliderLeafWetness,
    resetRiskSliders,
    riskAnalysis,
    detectionResult
  } = useApp();

  // Circular Gauge Helper
  const renderCircularGauge = (
    value: number,
    label: string,
    subLabel: string,
    color: string,
    size: number = 220
  ) => {
    const strokeWidth = 16;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    // 270 degree arc
    const arcCircumference = circumference * 0.75;
    const strokeDashoffset = arcCircumference - (value / 100) * arcCircumference;

    return (
      <div className="relative flex flex-col items-center justify-center">
        <svg width={size} height={size} className="transform rotate-[135deg]">
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#13261a"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${arcCircumference} ${circumference}`}
            strokeLinecap="round"
          />
          {/* Active Value Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${arcCircumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Center Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pt-2">
          <span className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight">
            {value}
          </span>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            / 100
          </span>
          <span
            className="text-xs font-bold font-mono px-2 py-0.5 rounded-full mt-1 border"
            style={{ color, borderColor: `${color}60`, backgroundColor: `${color}20` }}
          >
            {label}
          </span>
          <span className="text-[10px] text-slate-500 font-mono mt-0.5">{subLabel}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="p-5 rounded-2xl bg-[#09150d] border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold">
              Cross-Modal Intelligence Fusion
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold">
              DEMO RISK MODEL
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            MULTIMODAL DISEASE-RISK ANALYSIS
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
            Multimodal AI combines crop image information with IoT/environmental data to estimate crop health and disease risk.
          </p>
        </div>

        <button
          onClick={resetRiskSliders}
          className="px-4 py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600/40 text-emerald-300 font-bold text-xs flex items-center gap-2 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Demo Parameters</span>
        </button>
      </div>

      {/* Multimodal Flow Architecture: 5 Inputs -> Central Fusion Engine -> Outputs */}
      <div className="p-6 rounded-2xl bg-[#0b1710]/90 border border-emerald-900/40">
        <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-4 text-center">
          Multimodal Feature Fusion Architecture
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* 5 Input Nodes (5 cols) */}
          <div className="lg:col-span-4 space-y-2.5">
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ScanLine className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-white">🍃 Leaf Image Diagnosis</span>
              </div>
              <span className="font-mono text-cyan-300 font-bold">{detectionResult.diseaseName}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-amber-500/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-white">🌡 Temperature</span>
              </div>
              <span className="font-mono text-amber-300 font-bold">{sliderTemp.toFixed(1)}°C</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-blue-500/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-400" />
                <span className="font-semibold text-white">💧 Humidity</span>
              </div>
              <span className="font-mono text-blue-300 font-bold">{sliderHumidity}%</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-teal-500/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Sprout className="w-4 h-4 text-teal-400" />
                <span className="font-semibold text-white">🌱 Soil Moisture</span>
              </div>
              <span className="font-mono text-teal-300 font-bold">{sliderSoilMoisture}%</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Waves className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-white">🍃 Leaf Wetness</span>
              </div>
              <span className="font-mono text-cyan-300 font-bold">{sliderLeafWetness}%</span>
            </div>
          </div>

          {/* Central Arrow / Junction (1 col) */}
          <div className="lg:col-span-1 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <ArrowRight className="w-4 h-4 animate-pulse hidden lg:block" />
              <span className="lg:hidden text-[10px] font-mono">↓</span>
            </div>
          </div>

          {/* Central Fusion Core (3 cols) */}
          <div className="lg:col-span-3 p-5 rounded-2xl bg-gradient-to-b from-emerald-950 via-[#0e2115] to-emerald-950 border-2 border-emerald-500/50 shadow-lg shadow-emerald-900/30 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-300 shadow-md">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">
                AI RISK ANALYSIS ENGINE
              </h3>
              <p className="text-[11px] text-emerald-300/80 font-mono mt-0.5">
                Deep Multimodal Feature Concatenation
              </p>
            </div>
            <div className="text-[10px] font-mono p-2 rounded-lg bg-black/40 text-slate-300 border border-emerald-800/30">
              Vector: [Embeddings_Image ⊕ IoT_Telemetry_Tensor]
            </div>
          </div>

          {/* Central Arrow / Junction (1 col) */}
          <div className="lg:col-span-1 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <ArrowRight className="w-4 h-4 animate-pulse hidden lg:block" />
              <span className="lg:hidden text-[10px] font-mono">↓</span>
            </div>
          </div>

          {/* Primary Gauge Output (3 cols) */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center p-3 rounded-2xl bg-black/30 border border-red-500/30">
            {renderCircularGauge(
              riskAnalysis.diseaseRisk,
              riskAnalysis.diseaseRiskStatus,
              'Disease Risk Score',
              riskAnalysis.diseaseRisk > 75 ? '#ef4444' : riskAnalysis.diseaseRisk > 45 ? '#f59e0b' : '#10b981'
            )}
          </div>
        </div>
      </div>

      {/* 5 Risk Indicators Breakdown Cards (Requirement 7) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Disease Risk */}
        <div className="p-3.5 rounded-xl bg-[#1f100c]/80 border border-red-500/40">
          <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold">Disease Risk</div>
          <div className="text-2xl font-black font-mono text-red-400 mt-1">
            {riskAnalysis.diseaseRisk} <span className="text-xs text-slate-500 font-normal">/ 100</span>
          </div>
          <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 mt-1 inline-block">
            {riskAnalysis.diseaseRiskStatus}
          </span>
        </div>

        {/* Crop Health */}
        <div className="p-3.5 rounded-xl bg-[#0c1c11]/80 border border-emerald-500/40">
          <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold">Crop Health</div>
          <div className="text-2xl font-black font-mono text-emerald-400 mt-1">
            {riskAnalysis.cropHealth} <span className="text-xs text-slate-500 font-normal">/ 100</span>
          </div>
          <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mt-1 inline-block">
            {riskAnalysis.cropHealthStatus}
          </span>
        </div>

        {/* Water Stress */}
        <div className="p-3.5 rounded-xl bg-[#0e1d1d]/80 border border-teal-500/40">
          <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold">Water Stress</div>
          <div className="text-2xl font-black font-mono text-teal-400 mt-1">
            {riskAnalysis.waterStress} <span className="text-xs text-slate-500 font-normal">/ 100</span>
          </div>
          <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 mt-1 inline-block">
            {riskAnalysis.waterStress > 60 ? 'HIGH' : 'NORMAL'}
          </span>
        </div>

        {/* Heat Stress */}
        <div className="p-3.5 rounded-xl bg-[#1d190c]/80 border border-amber-500/40">
          <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold">Heat Stress</div>
          <div className="text-2xl font-black font-mono text-amber-400 mt-1">
            {riskAnalysis.heatStress} <span className="text-xs text-slate-500 font-normal">/ 100</span>
          </div>
          <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 mt-1 inline-block">
            {riskAnalysis.heatStress > 60 ? 'HIGH' : 'SAFE'}
          </span>
        </div>

        {/* Environmental Risk */}
        <div className="p-3.5 rounded-xl bg-[#18111e]/80 border border-purple-500/40">
          <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold">Environmental Risk</div>
          <div className="text-2xl font-black font-mono text-purple-400 mt-1">
            {riskAnalysis.environmentalRisk} <span className="text-xs text-slate-500 font-normal">/ 100</span>
          </div>
          <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 mt-1 inline-block">
            {riskAnalysis.environmentalRisk > 70 ? 'ELEVATED' : 'MODERATE'}
          </span>
        </div>
      </div>

      {/* Requirement 8: Interactive Sliders Simulation */}
      <div className="p-5 rounded-2xl bg-[#0c1810]/90 border border-emerald-900/40 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-emerald-900/40">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base text-white">
              Dynamic Environmental Risk Simulation Sliders
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Simulate Weather Shocks & Pathogen Pressure
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Slider 1: Temperature */}
          <div className="space-y-2 p-3.5 rounded-xl bg-black/30 border border-emerald-900/30">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-amber-400" />
                Temperature (°C)
              </span>
              <span className="text-amber-300 font-bold text-sm">{sliderTemp.toFixed(1)}°C</span>
            </div>
            <input
              type="range"
              min="15"
              max="45"
              step="0.5"
              value={sliderTemp}
              onChange={e => setSliderTemp(parseFloat(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>15°C (Cool)</span>
              <span>28°C (Optimal)</span>
              <span>45°C (Extreme Heat)</span>
            </div>
          </div>

          {/* Slider 2: Humidity */}
          <div className="space-y-2 p-3.5 rounded-xl bg-black/30 border border-emerald-900/30">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-blue-400" />
                Relative Humidity (%)
              </span>
              <span className="text-blue-300 font-bold text-sm">{sliderHumidity}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              step="1"
              value={sliderHumidity}
              onChange={e => setSliderHumidity(parseInt(e.target.value))}
              className="w-full accent-blue-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>20% (Arid)</span>
              <span>65% (Balanced)</span>
              <span>100% (Saturated)</span>
            </div>
          </div>

          {/* Slider 3: Soil Moisture */}
          <div className="space-y-2 p-3.5 rounded-xl bg-black/30 border border-emerald-900/30">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Sprout className="w-4 h-4 text-teal-400" />
                Soil Moisture Content (%)
              </span>
              <span className="text-teal-300 font-bold text-sm">{sliderSoilMoisture}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="1"
              value={sliderSoilMoisture}
              onChange={e => setSliderSoilMoisture(parseInt(e.target.value))}
              className="w-full accent-teal-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>10% (Wilting Point)</span>
              <span>40% (Threshold)</span>
              <span>100% (Waterlogged)</span>
            </div>
          </div>

          {/* Slider 4: Leaf Wetness */}
          <div className="space-y-2 p-3.5 rounded-xl bg-black/30 border border-emerald-900/30">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Waves className="w-4 h-4 text-cyan-400" />
                Foliar Leaf Wetness (%)
              </span>
              <span className="text-cyan-300 font-bold text-sm">{sliderLeafWetness}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={sliderLeafWetness}
              onChange={e => setSliderLeafWetness(parseInt(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>0% (Bone Dry)</span>
              <span>50% (Dew)</span>
              <span>100% (Persistent Film)</span>
            </div>
          </div>
        </div>

        {/* Biological Rules Rationale Footer */}
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-slate-300 space-y-1">
          <span className="font-bold text-emerald-300 font-mono uppercase text-[11px]">
            Biological Pathogen Rules Engine:
          </span>
          <p className="text-[11px] leading-relaxed text-slate-400">
            • High humidity + high leaf wetness (&gt;75%) triggers high fungal spore germination risk (Early Blight / Late Blight).<br />
            • Soil moisture below 40% spikes root water stress, prompting autonomous irrigation relays.<br />
            • Ambient temperature above 32°C elevates stomatal closure and thermal stress.
          </p>
        </div>
      </div>
    </div>
  );
};
