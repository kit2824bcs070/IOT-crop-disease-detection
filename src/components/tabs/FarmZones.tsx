import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FarmZone } from '../../types';
import {
  MapPin,
  HeartPulse,
  AlertTriangle,
  ShieldAlert,
  Sprout,
  Thermometer,
  Droplets,
  Calendar,
  Layers,
  ChevronRight,
  X,
  Sparkles,
  Droplet
} from 'lucide-react';

export const FarmZones: React.FC = () => {
  const { zones, selectedZone, setSelectedZone, setActiveTab } = useApp();
  const [modalZone, setModalZone] = useState<FarmZone | null>(null);

  const getStatusBadge = (status: FarmZone['status']) => {
    switch (status) {
      case 'HEALTHY':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            HEALTHY
          </span>
        );
      case 'WARNING':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            WARNING
          </span>
        );
      case 'HIGH RISK':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-500/20 text-red-300 border border-red-400/40 flex items-center gap-1.5 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            HIGH RISK
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="p-5 rounded-2xl bg-[#09150d] border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold">
              Multi-Sector Crop Topography
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold">
              GPS GEO-REFERENCED
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-emerald-400" />
            <span>FARM ZONE MONITORING & MICROCLIMATE DIAGNOSTICS</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Spatial breakdown of smart agriculture sectors. Click any zone card to inspect localized telemetry, soil profiles, and disease containment protocols.
          </p>
        </div>

        <div className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-700/40">
          Total Area: 3.5 Acres • 7,100 Solanaceae Plants
        </div>
      </div>

      {/* 3 Main Farm Zones Cards (Requirement 13) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {zones.map(zone => {
          const isHighRisk = zone.status === 'HIGH RISK';
          const isWarning = zone.status === 'WARNING';

          return (
            <div
              key={zone.id}
              onClick={() => setModalZone(zone)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between shadow-xl ${
                isHighRisk
                  ? 'bg-[#1b100d]/90 border-red-500/40 hover:border-red-400/80 shadow-red-950/40'
                  : isWarning
                  ? 'bg-[#1a170c]/90 border-amber-500/40 hover:border-amber-400/80 shadow-amber-950/40'
                  : 'bg-[#0c1810]/90 border-emerald-600/30 hover:border-emerald-400/70 shadow-emerald-950/40'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    {zone.id.toUpperCase()}
                  </span>
                  {getStatusBadge(zone.status)}
                </div>

                <div className="my-4">
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {zone.name}
                  </h3>
                  <div className="text-xs text-slate-300 font-mono mt-0.5">
                    Crop: <span className="text-white font-bold">{zone.crop}</span> ({zone.variety})
                  </div>
                  {zone.disease && (
                    <div className="mt-2 text-xs font-mono px-2.5 py-1 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{zone.disease}</span>
                    </div>
                  )}
                </div>

                {/* Telemetries */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-black/40 border border-white/5 text-center text-xs font-mono my-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Risk</span>
                    <span
                      className={`font-black ${
                        isHighRisk ? 'text-red-400' : isWarning ? 'text-amber-400' : 'text-emerald-400'
                      }`}
                    >
                      {zone.riskScore}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Temp</span>
                    <span className="font-bold text-slate-200">{zone.temperature}°C</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Soil</span>
                    <span className="font-bold text-slate-200">{zone.soilMoisture}%</span>
                  </div>
                </div>
              </div>

              {/* Action Prompt */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-emerald-300 transition-colors">
                <span>View Deep Diagnostics</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Deep Zone Diagnostics when clicked */}
      {modalZone && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0c1911] border border-emerald-500/40 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-900/40 pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">{modalZone.name}</h3>
              </div>
              <button
                onClick={() => setModalZone(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-emerald-950/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Current Health Status:</span>
                {getStatusBadge(modalZone.status)}
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-emerald-900/30 grid grid-cols-2 gap-3 font-mono">
                <div>
                  <span className="text-slate-400 text-[10px] block">Crop Cultivar</span>
                  <span className="font-bold text-white">{modalZone.crop} ({modalZone.variety})</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Calculated Disease Risk</span>
                  <span className="font-bold text-red-400">{modalZone.riskScore}% (HIGH)</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Sector Canopy Area</span>
                  <span className="font-bold text-white">{modalZone.area}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Total Monitored Plants</span>
                  <span className="font-bold text-white">{modalZone.plantsCount.toLocaleString()} Stems</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-emerald-300 font-mono">
                  Recommended Agronomic Intervention:
                </span>
                <p className="text-slate-300 text-xs leading-relaxed p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40">
                  {modalZone.status === 'HIGH RISK'
                    ? 'Deploy targeted bio-fungicide spray immediately. Hold overhead water lines and enable polyhouse ventilation fans to limit spore proliferation.'
                    : modalZone.status === 'WARNING'
                    ? 'Monitor leaf wetness levels. Ensure soil moisture does not drop below 40% before scheduling the next irrigation cycle.'
                    : 'Sector conditions optimal. Maintain routine automated soil sensor checks and periodic camera scanning.'}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setModalZone(null)}
                className="px-4 py-2 rounded-xl bg-emerald-950 border border-emerald-700/40 text-slate-300 text-xs font-semibold hover:bg-emerald-900"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setModalZone(null);
                  setActiveTab('disease');
                }}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-md shadow-emerald-500/20"
              >
                Run Disease Inspection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
