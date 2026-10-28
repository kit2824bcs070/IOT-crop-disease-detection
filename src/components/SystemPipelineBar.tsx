import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export const SystemPipelineBar: React.FC = () => {
  const { isSimulating, pumpStatus } = useApp();

  const pipelineStages = [
    { name: 'Sensors Connected', status: 'online', detail: 'DHT22, Soil, LDR, Wetness' },
    { name: 'ESP32 Online', status: 'online', detail: 'Xtensa Dual-Core 240MHz' },
    { name: 'MQTT Connected', status: 'online', detail: 'broker:1883 QoS-1' },
    { name: 'Backend Online', status: 'online', detail: 'REST/WS FastAPI' },
    { name: 'DNN Ready', status: 'online', detail: 'EfficientNet-B0 Weights' },
    { name: 'Risk Analysis Ready', status: 'online', detail: 'Multimodal Fusion Engine' },
    { name: 'Generative AI Ready', status: 'online', detail: 'Advisory LLM Pipeline' },
    { name: 'Automation Ready', status: pumpStatus === 'ON' ? 'active' : 'online', detail: 'Relay GPIO 26 Contactor' }
  ];

  return (
    <footer className="mt-8 border-t border-emerald-950/80 bg-[#07110a] text-slate-400">
      {/* Pipeline Status Ribbon */}
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold">
                SYSTEM PIPELINE
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                (End-to-End Architectural Linkage)
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-300 font-mono text-[11px]">All 8 Pipeline Stages Synchronized</span>
            </div>
          </div>

          {/* Interactive horizontally scrollable pipeline strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-1">
            {pipelineStages.map((stage, idx) => (
              <div
                key={idx}
                className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-800/30 flex flex-col justify-between group hover:border-emerald-500/50 transition-colors"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span className="text-xs font-semibold text-slate-200 truncate">
                    {stage.name}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400/80 truncate">
                  {stage.detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Credits & Academic Review Notice */}
        <div className="mt-6 pt-4 border-t border-emerald-950 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 font-mono">
          <div>
            AI-Powered Smart Crop Health Monitoring | College Project Prototype | 2026–2027
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-500/70">Edge IoT + Deep Learning + Generative AI</span>
            <span>•</span>
            <span className="text-slate-400">Department of Computer Science & Engineering</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
