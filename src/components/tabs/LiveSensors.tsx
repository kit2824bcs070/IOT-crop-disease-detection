import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Thermometer,
  Droplets,
  Sprout,
  Sun,
  Waves,
  Play,
  Pause,
  RotateCcw,
  Cpu,
  Activity,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const LiveSensors: React.FC = () => {
  const {
    sensorData,
    sensorHistory,
    isSimulating,
    toggleSimulation,
    resetSensorData,
    updateManualSensor,
    pumpStatus
  } = useApp();

  // Helper to render responsive SVG Chart with grid lines and gradient fill
  const renderSensorChart = (
    data: number[],
    color: string,
    min: number,
    max: number,
    unit: string
  ) => {
    if (!data.length) return null;
    const width = 360;
    const height = 90;
    const padding = 10;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const points = data.map((val, idx) => {
      const x = padding + (idx / (data.length - 1)) * chartWidth;
      const normalized = (val - min) / (max - min || 1);
      const y = height - padding - Math.max(0, Math.min(chartHeight, normalized * chartHeight));
      return { x, y, val };
    });

    const pointsStr = points.map(p => `${p.x},${p.y}`).join(' ');
    const areaStr = `${padding},${height - padding} ${pointsStr} ${width - padding},${height - padding}`;

    return (
      <div className="w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-24">
          <defs>
            <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.4" />
              <stop offset="100%" stopColor={color} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1={padding}
            y1={padding}
            x2={width - padding}
            y2={padding}
            stroke="#1e3a29"
            strokeDasharray="2 3"
            strokeWidth="0.8"
          />
          <line
            x1={padding}
            y1={height / 2}
            x2={width - padding}
            y2={height / 2}
            stroke="#1e3a29"
            strokeDasharray="2 3"
            strokeWidth="0.8"
          />
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={height - padding}
            stroke="#1e3a29"
            strokeWidth="1"
          />

          {/* Area Fill */}
          <polygon points={areaStr} fill={`url(#grad-${color})`} />

          {/* Line Path */}
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={pointsStr}
          />

          {/* Glowing Current Point */}
          {points.length > 0 && (
            <circle
              cx={points[points.length - 1].x}
              cy={points[points.length - 1].y}
              r="4.5"
              fill={color}
              stroke="#07110a"
              strokeWidth="2"
              className="animate-ping"
            />
          )}
        </svg>

        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1 pt-1">
          <span>T - 15 readings</span>
          <span className="text-emerald-400 font-semibold">Latest: {data[data.length - 1]} {unit}</span>
        </div>
      </div>
    );
  };

  const tempHistory = sensorHistory.map(h => h.temperature);
  const humHistory = sensorHistory.map(h => h.humidity);
  const soilHistory = sensorHistory.map(h => h.soilMoisture);
  const lightHistory = sensorHistory.map(h => h.lightIntensity);
  const wetnessHistory = sensorHistory.map(h => h.leafWetness);

  return (
    <div className="space-y-6">
      {/* Title & Simulation Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#09150d] border border-emerald-500/30">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold">
              Edge IoT Telemetry Loop
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 border border-emerald-500/40 text-emerald-300">
              SIMULATED IoT DATA
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            REAL-TIME IoT SENSOR MONITORING
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Real-time multi-channel telemetry streams from ESP32 edge microcontroller with continuous physical fluctuation modeling.
          </p>
        </div>

        {/* Buttons: Start Live Simulation and Reset Sensor Data */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={toggleSimulation}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-md ${
              isSimulating
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
            }`}
          >
            {isSimulating ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>⏸ Pause Live Simulation</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>▶ Start Live Simulation</span>
              </>
            )}
          </button>

          <button
            onClick={resetSensorData}
            className="px-4 py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600/40 text-emerald-300 font-bold text-xs flex items-center gap-2 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>⟳ Reset Sensor Data</span>
          </button>
        </div>
      </div>

      {/* Sensor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: DHT22 (Temperature & Humidity) */}
        <div className="p-5 rounded-2xl bg-[#0c1810]/90 border border-emerald-600/30 hover:border-emerald-400/50 transition-all shadow-xl shadow-black/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                  <Thermometer className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">DHT22 / AM2302</h3>
                  <span className="text-xs text-slate-400 font-mono">Digital Thermo-Hygrometer (GPIO 4)</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">
                ACTIVE
              </span>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4 my-4">
              <div className="p-3 rounded-xl bg-black/40 border border-emerald-900/30">
                <span className="text-[11px] font-mono text-slate-400">Temperature</span>
                <div className="text-2xl sm:text-3xl font-black font-mono text-amber-300 mt-1">
                  {sensorData.temperature.toFixed(1)} <span className="text-sm font-normal text-slate-400">°C</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">Range: 27°C–34°C</span>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-emerald-900/30">
                <span className="text-[11px] font-mono text-slate-400">Humidity</span>
                <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-300 mt-1">
                  {sensorData.humidity} <span className="text-sm font-normal text-slate-400">%</span>
                </div>
                <span className="text-[10px] text-cyan-400 font-mono">Range: 65%–90%</span>
              </div>
            </div>

            {/* Mini Chart */}
            <div className="pt-2">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">
                Recent DHT22 Temperature Trend:
              </span>
              {renderSensorChart(tempHistory, '#f59e0b', 25, 36, '°C')}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-900/30 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Sampling: 0.5 Hz (2-sec cycle)</span>
            <span className="text-emerald-400">Accuracy: ±0.5°C / ±2% RH</span>
          </div>
        </div>

        {/* Card 2: Capacitive Soil Moisture Sensor */}
        <div className="p-5 rounded-2xl bg-[#0c1810]/90 border border-teal-600/30 hover:border-teal-400/50 transition-all shadow-xl shadow-black/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300">
                  <Sprout className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Capacitive Soil Moisture V1.2</h3>
                  <span className="text-xs text-slate-400 font-mono">Corrosion-Resistant ADC (GPIO 34 / ADC1_CH6)</span>
                </div>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                  sensorData.soilMoisture < 40
                    ? 'bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                }`}
              >
                {sensorData.soilMoisture < 40 ? 'LOW MOISTURE' : 'OPTIMAL'}
              </span>
            </div>

            {/* Soil Moisture Value */}
            <div className="my-4 p-4 rounded-xl bg-black/40 border border-emerald-900/30 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-slate-400">Soil Moisture Reading</span>
                <div className="text-3xl sm:text-4xl font-black font-mono text-teal-300 mt-1">
                  {sensorData.soilMoisture} <span className="text-lg font-normal text-slate-400">%</span>
                </div>
                <div className="text-[11px] font-mono text-slate-400 mt-1">
                  Raw ADC: ~{Math.round(4095 - (sensorData.soilMoisture / 100) * 2800)} mV
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono text-slate-400">Irrigation Relay:</span>
                <div className="text-sm font-mono font-bold text-white mt-1">
                  {pumpStatus === 'ON' ? (
                    <span className="text-blue-400 animate-pulse">WATER FLOWING (ON)</span>
                  ) : (
                    <span className="text-slate-400">PUMP IDLE (OFF)</span>
                  )}
                </div>
                <span className="text-[10px] text-slate-500">Auto threshold: 40%</span>
              </div>
            </div>

            {/* Mini Chart */}
            <div className="pt-2">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">
                Recent Soil Moisture Dynamics:
              </span>
              {renderSensorChart(soilHistory, '#14b8a6', 20, 90, '%')}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-900/30 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Dynamic: Slowly evaporates, auto-refills when pump ON</span>
            <span className="text-teal-400">Capacitance Mode</span>
          </div>
        </div>

        {/* Card 3: BH1750 / LDR (Light Intensity) */}
        <div className="p-5 rounded-2xl bg-[#0c1810]/90 border border-yellow-600/30 hover:border-yellow-400/50 transition-all shadow-xl shadow-black/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/20 border border-yellow-400/40 flex items-center justify-center text-yellow-300">
                  <Sun className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">BH1750 / LDR Ambient Sensor</h3>
                  <span className="text-xs text-slate-400 font-mono">I2C Illuminance (SDA 21 / SCL 22, 0x23)</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-yellow-500/20 border border-yellow-400/40 text-yellow-300">
                ILLUMINATED
              </span>
            </div>

            {/* Value */}
            <div className="my-4 p-4 rounded-xl bg-black/40 border border-emerald-900/30 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-slate-400">Ambient Illuminance</span>
                <div className="text-3xl sm:text-4xl font-black font-mono text-yellow-300 mt-1">
                  {sensorData.lightIntensity} <span className="text-lg font-normal text-slate-400">lux</span>
                </div>
                <div className="text-[11px] font-mono text-slate-400 mt-1">
                  Solar PAR (Photosynthetically Active Radiation): Normal
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono text-slate-400">Photoperiod Cycle:</span>
                <div className="text-sm font-mono font-bold text-emerald-400 mt-1">
                  Daylight Phase
                </div>
                <span className="text-[10px] text-slate-500">Tomato requirement: 400-800 lux</span>
              </div>
            </div>

            {/* Mini Chart */}
            <div className="pt-2">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">
                Recent Light Intensity Log:
              </span>
              {renderSensorChart(lightHistory, '#eab308', 350, 750, 'lux')}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-900/30 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Range: 1 – 65535 lx</span>
            <span className="text-yellow-400">I2C High-Resolution Mode</span>
          </div>
        </div>

        {/* Card 4: Leaf Wetness Sensor */}
        <div className="p-5 rounded-2xl bg-[#0c1810]/90 border border-cyan-600/30 hover:border-cyan-400/50 transition-all shadow-xl shadow-black/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                  <Waves className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Canopy Leaf Wetness Grid</h3>
                  <span className="text-xs text-slate-400 font-mono">Dielectric Grid Sensor (GPIO 35 / ADC1_CH7)</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-red-500/20 border border-red-400/40 text-red-300">
                HIGH RISK
              </span>
            </div>

            {/* Value */}
            <div className="my-4 p-4 rounded-xl bg-black/40 border border-emerald-900/30 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-slate-400">Canopy Surface Wetness</span>
                <div className="text-3xl sm:text-4xl font-black font-mono text-cyan-300 mt-1">
                  {sensorData.leafWetnessStatus} <span className="text-lg font-normal text-slate-400">({sensorData.leafWetness}%)</span>
                </div>
                <div className="text-[11px] font-mono text-red-400 mt-1">
                  Foliar Water Film Duration: &gt; 4.2 Hours
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono text-slate-400">Fungal Infection Risk:</span>
                <div className="text-sm font-mono font-bold text-red-400 mt-1">
                  CRITICAL
                </div>
                <span className="text-[10px] text-slate-500">Alternaria solani threshold exceeded</span>
              </div>
            </div>

            {/* Mini Chart */}
            <div className="pt-2">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">
                Recent Leaf Wetness Index:
              </span>
              {renderSensorChart(wetnessHistory, '#06b6d4', 30, 100, '%')}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-900/30 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>High humidity (&gt;80%) directly promotes dew condensation</span>
            <span className="text-cyan-400">Canopy Grid Array</span>
          </div>
        </div>
      </div>
    </div>
  );
};
