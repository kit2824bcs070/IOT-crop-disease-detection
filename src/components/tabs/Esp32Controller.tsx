import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Cpu,
  Wifi,
  Radio,
  Server,
  Zap,
  Camera,
  Thermometer,
  Sprout,
  Sun,
  Waves,
  ArrowRight,
  Activity,
  CheckCircle2,
  Share2
} from 'lucide-react';

export const Esp32Controller: React.FC = () => {
  const { sensorData, pumpStatus } = useApp();
  const [selectedPin, setSelectedPin] = useState<string | null>(null);

  const peripherals = [
    {
      name: 'DHT22 Temp & Humidity',
      type: 'Sensor',
      pin: 'GPIO 4',
      protocol: 'One-Wire Digital',
      icon: <Thermometer className="w-5 h-5 text-amber-400" />,
      status: 'Active',
      value: `${sensorData.temperature.toFixed(1)}°C / ${sensorData.humidity}%`
    },
    {
      name: 'Capacitive Soil Moisture',
      type: 'Sensor',
      pin: 'GPIO 34 (ADC1_CH6)',
      protocol: 'Analog 12-bit ADC',
      icon: <Sprout className="w-5 h-5 text-teal-400" />,
      status: 'Active',
      value: `${sensorData.soilMoisture}%`
    },
    {
      name: 'BH1750 Ambient Light',
      type: 'Sensor',
      pin: 'GPIO 21 (SDA) / 22 (SCL)',
      protocol: 'I2C (0x23)',
      icon: <Sun className="w-5 h-5 text-yellow-400" />,
      status: 'Active',
      value: `${sensorData.lightIntensity} lux`
    },
    {
      name: 'Leaf Wetness Grid',
      type: 'Sensor',
      pin: 'GPIO 35 (ADC1_CH7)',
      protocol: 'Analog Dielectric ADC',
      icon: <Waves className="w-5 h-5 text-cyan-400" />,
      status: 'Active',
      value: `${sensorData.leafWetnessStatus} (${sensorData.leafWetness}%)`
    },
    {
      name: 'OV2640 Foliage Camera',
      type: 'Imaging',
      pin: 'DVP 8-bit Bus + I2C SCCB',
      protocol: 'DMA Parallel',
      icon: <Camera className="w-5 h-5 text-emerald-400" />,
      status: 'Active',
      value: '2MP UXGA Snap'
    }
  ];

  const outputs = [
    {
      name: 'Wi-Fi 802.11 b/g/n',
      target: 'Local Gateway',
      detail: 'SSID: SmartFarm_Mesh_5G (RSSI: -58 dBm)',
      status: 'Connected',
      icon: <Wifi className="w-5 h-5 text-emerald-400" />
    },
    {
      name: 'MQTT Protocol',
      target: 'Broker (Port 1883)',
      detail: 'Topic: farm/zones/telemetry (QoS 1)',
      status: 'Connected',
      icon: <Share2 className="w-5 h-5 text-emerald-400" />
    },
    {
      name: 'Backend REST / WS',
      target: 'FastAPI AI Gateway',
      detail: 'Latency: 24ms | TLS 1.3 encrypted',
      status: 'Online',
      icon: <Server className="w-5 h-5 text-emerald-400" />
    },
    {
      name: '5V Optocoupler Relay',
      target: 'Submersible Water Pump',
      detail: `GPIO 26 -> Contactor [State: ${pumpStatus}]`,
      status: 'Ready',
      icon: <Zap className="w-5 h-5 text-blue-400" />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="p-5 rounded-2xl bg-[#09150d] border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold">
              Edge Hardware Architecture
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold">
              SIMULATED HARDWARE TOPOLOGY
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 flex items-center gap-2">
            <Cpu className="w-6 h-6 text-emerald-400" />
            <span>ESP32 IoT CONTROLLER & PINOUT BUS</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Hardware schematic view illustrating sensor transduction, analog-to-digital conversion, and MQTT publisher pipeline on the Xtensa dual-core MCU.
          </p>
        </div>

        {/* 5 Status Indicators (Requirement 11) */}
        <div className="flex items-center flex-wrap gap-2 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>ESP32: 🟢 Connected</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
            <span>Wi-Fi: 🟢 Connected</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
            <span>MQTT: 🟢 Connected</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
            <span>Backend: 🟢 Online</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
            <span>Relay: 🟢 Ready</span>
          </div>
        </div>
      </div>

      {/* Main Schematic Diagram: Peripherals -> ESP32 -> Outputs */}
      <div className="p-6 rounded-2xl bg-[#0a150e]/95 border border-emerald-900/40 relative overflow-hidden">
        {/* Animated circuit lines background */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: 5 Connected Sensors (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold pb-1 flex items-center justify-between">
              <span>Input Peripherals & Probes</span>
              <span className="text-[10px] text-slate-500">5 Active</span>
            </div>

            {peripherals.map((sensor, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPin(sensor.pin)}
                className="p-3 rounded-xl bg-slate-950/70 border border-emerald-900/40 hover:border-emerald-400/60 transition-all cursor-pointer group flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-black/40 border border-emerald-900/40 group-hover:scale-105 transition-transform">
                    {sensor.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {sensor.name}
                    </h4>
                    <div className="text-[10px] font-mono text-slate-400">
                      {sensor.pin} • {sensor.protocol}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-emerald-300 block">
                    {sensor.value}
                  </span>
                  <span className="text-[9px] font-mono text-emerald-500">
                    🟢 {sensor.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Center Column: Central ESP32 Board Card (4 cols) */}
          <div className="lg:col-span-4 p-5 rounded-2xl bg-gradient-to-b from-[#14261a] via-[#0d1e13] to-[#0a160e] border-2 border-emerald-500/50 shadow-2xl shadow-emerald-950/80 text-center relative">
            {/* Glowing top chip notch */}
            <div className="w-16 h-2 bg-emerald-400/60 rounded-full mx-auto mb-4 animate-pulse" />

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-400 flex items-center justify-center mx-auto text-slate-950 shadow-xl shadow-emerald-900/50 border border-emerald-300/50 mb-3">
              <Cpu className="w-9 h-9" />
            </div>

            <h3 className="text-base font-bold text-white tracking-wide">
              ESP32-WROOM-32D
            </h3>
            <p className="text-xs text-emerald-300 font-mono mt-0.5">
              Xtensa® Dual-Core 32-bit LX6 MCU @ 240 MHz
            </p>

            {/* Board Spec Matrix */}
            <div className="mt-4 p-3 rounded-xl bg-black/50 border border-emerald-900/50 text-[11px] font-mono text-slate-300 space-y-1.5 text-left">
              <div className="flex justify-between">
                <span className="text-slate-400">SRAM:</span>
                <span className="text-emerald-400">520 KB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Flash Memory:</span>
                <span className="text-emerald-400">4 MB SPI Flash</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">ADC Resolution:</span>
                <span className="text-emerald-400">12-bit (0-4095)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Operating Voltage:</span>
                <span className="text-emerald-400">3.3V DC (AMS1117 Reg)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Firmware:</span>
                <span className="text-emerald-400">FreeRTOS v10.4.3</span>
              </div>
            </div>

            <div className="mt-3 text-[10px] font-mono text-emerald-400/80 bg-emerald-950/60 px-2 py-1 rounded border border-emerald-800/40">
              ⚡ GPIO 26 Relay Driver: {pumpStatus === 'ON' ? 'HIGH (3.3V)' : 'LOW (0V)'}
            </div>
          </div>

          {/* Right Column: 4 Outputs / Communication Interfaces (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold pb-1 flex items-center justify-between">
              <span>Outputs & Protocol Links</span>
              <span className="text-[10px] text-slate-500">4 Channels</span>
            </div>

            {outputs.map((out, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950/70 border border-emerald-900/40 hover:border-emerald-400/60 transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-black/40 border border-emerald-900/40 group-hover:scale-105 transition-transform">
                    {out.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {out.name}
                    </h4>
                    <div className="text-[10px] font-mono text-slate-400">
                      {out.detail}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-emerald-300 block">
                    {out.status}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">
                    {out.target}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
