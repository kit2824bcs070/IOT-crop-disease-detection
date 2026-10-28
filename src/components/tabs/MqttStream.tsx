import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Share2,
  Radio,
  Cpu,
  Globe,
  Server,
  Activity,
  LayoutDashboard,
  Terminal,
  ArrowRight,
  ShieldCheck,
  Send
} from 'lucide-react';

export const MqttStream: React.FC = () => {
  const { sensorData, mqttPackets } = useApp();

  const flowNodes = [
    { name: 'Sensors', icon: <Radio className="w-5 h-5 text-amber-400" />, detail: 'DHT22 / Soil / LDR' },
    { name: 'ESP32', icon: <Cpu className="w-5 h-5 text-emerald-400" />, detail: 'Client Publisher' },
    { name: 'MQTT', icon: <Share2 className="w-5 h-5 text-cyan-400" />, detail: 'EMQX Broker :1883' },
    { name: 'Internet', icon: <Globe className="w-5 h-5 text-blue-400" />, detail: 'TLS Gateway' },
    { name: 'Backend', icon: <Server className="w-5 h-5 text-purple-400" />, detail: 'FastAPI Microservice' },
    { name: 'AI Engine', icon: <Activity className="w-5 h-5 text-pink-400" />, detail: 'DNN & GenAI' },
    { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5 text-emerald-400" />, detail: 'Client UI' }
  ];

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="p-5 rounded-2xl bg-[#09150d] border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-bold">
              Publish-Subscribe Telemetry Fabric
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold">
              MQTT v3.1.1 / QoS 1
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 flex items-center gap-2">
            <Share2 className="w-6 h-6 text-cyan-400" />
            <span>IoT DATA COMMUNICATION & PACKET TRAVERSAL</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            End-to-end data pipeline from physical transducer sampling to edge MQTT publishing, cloud broker routing, and real-time frontend ingestion.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 bg-cyan-950/60 px-3 py-1.5 rounded-xl border border-cyan-700/40">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Broker: mqtt.smartfarm.io : 1883</span>
        </div>
      </div>

      {/* Requirement 12: 7-Step Traversal Architecture with Animated Packets */}
      <div className="p-6 rounded-2xl bg-[#0a150e]/95 border border-emerald-900/40 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
            Telemetry Packet Pipeline
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            Current Telemetry Payload: <span className="text-emerald-400">temp: {sensorData.temperature}°C, hum: {sensorData.humidity}%, soil: {sensorData.soilMoisture}%</span>
          </span>
        </div>

        {/* Pipeline Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {flowNodes.map((node, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-950/70 border border-emerald-900/40 flex flex-col justify-between items-center text-center relative group hover:border-emerald-400/50 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-black/50 border border-emerald-800/40 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                {node.icon}
              </div>

              <div className="space-y-0.5">
                <div className="text-xs font-bold text-white flex items-center justify-center gap-1">
                  <span>{node.name}</span>
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  {node.detail}
                </div>
              </div>

              <div className="mt-2 text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ONLINE</span>
              </div>
            </div>
          ))}
        </div>

        {/* Animated Flying Packet Banner */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/40 via-cyan-950/60 to-emerald-950/40 border border-cyan-500/30 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-slate-300">Live Wire Payload:</span>
            <code className="text-cyan-300 font-bold bg-black/50 px-2 py-0.5 rounded border border-cyan-800/40">
              {`{"temp": ${sensorData.temperature.toFixed(1)}, "humidity": ${sensorData.humidity}, "soil": ${sensorData.soilMoisture}, "light": ${sensorData.lightIntensity}}`}
            </code>
          </div>
          <span className="text-emerald-400 font-semibold hidden md:inline">
            Latency: ~18ms • ACK Received
          </span>
        </div>
      </div>

      {/* Live MQTT Terminal Logger */}
      <div className="p-5 rounded-2xl bg-[#070e0a] border border-emerald-950 font-mono text-xs">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-950">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <Terminal className="w-4 h-4" />
            <span>Real-Time MQTT Stream Packet Inspector</span>
          </div>
          <span className="text-[11px] text-slate-500">
            Buffer: {mqttPackets.length} Packets Captured
          </span>
        </div>

        <div className="space-y-2 h-64 overflow-y-auto pr-1">
          {mqttPackets.map(pkt => (
            <div
              key={pkt.id}
              className="p-2.5 rounded-lg bg-black/40 border border-emerald-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500">{pkt.timestamp}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-700/40">
                  {pkt.topic}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">QoS {pkt.qos}</span>
              </div>
              <div className="text-emerald-300 font-mono text-[11px] truncate max-w-md">
                {pkt.payload}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
