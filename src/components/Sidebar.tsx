import React from 'react';
import { TabType } from '../types';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Radio,
  ScanLine,
  Activity,
  Bot,
  Droplets,
  MapPin,
  Network,
  Info,
  Cpu,
  Share2,
  X,
  AlertTriangle,
  Leaf
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { activeTab, setActiveTab, alerts, riskAnalysis, pumpStatus } = useApp();

  const unresolvedAlerts = alerts.filter(a => !a.resolved).length;

  const navItems: {
    id: TabType;
    label: string;
    icon: React.ReactNode;
    badge?: string | number;
    badgeColor?: string;
  }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />
    },
    {
      id: 'sensors',
      label: 'Live Sensors',
      icon: <Radio className="w-4 h-4" />,
      badge: 'LIVE',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
    },
    {
      id: 'disease',
      label: 'Disease Detection',
      icon: <ScanLine className="w-4 h-4" />,
      badge: 'DNN',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
    },
    {
      id: 'risk',
      label: 'AI Risk Analysis',
      icon: <Activity className="w-4 h-4" />,
      badge: `${riskAnalysis.diseaseRisk}%`,
      badgeColor: riskAnalysis.diseaseRisk > 70 ? 'bg-red-500/20 text-red-300 border-red-500/40' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
    },
    {
      id: 'genai',
      label: 'Generative AI Advisor',
      icon: <Bot className="w-4 h-4" />,
      badge: 'AI',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
    },
    {
      id: 'irrigation',
      label: 'Smart Irrigation',
      icon: <Droplets className="w-4 h-4" />,
      badge: pumpStatus === 'ON' ? 'PUMP ON' : 'AUTO',
      badgeColor: pumpStatus === 'ON' ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 animate-pulse' : 'bg-slate-700/40 text-slate-300 border-slate-600/40'
    },
    {
      id: 'zones',
      label: 'Farm Zones',
      icon: <MapPin className="w-4 h-4" />,
      badge: unresolvedAlerts > 0 ? `${unresolvedAlerts} Alert` : undefined,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
    },
    {
      id: 'architecture',
      label: 'System Architecture',
      icon: <Network className="w-4 h-4" />
    },
    {
      id: 'esp32',
      label: 'ESP32 Controller',
      icon: <Cpu className="w-4 h-4" />,
      badge: 'IoT',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
    },
    {
      id: 'mqtt',
      label: 'IoT / MQTT Stream',
      icon: <Share2 className="w-4 h-4" />
    },
    {
      id: 'about',
      label: 'About Project',
      icon: <Info className="w-4 h-4" />
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-[85px] z-50 lg:z-10 h-screen lg:h-[calc(100vh-85px)] w-64 bg-[#0a150e]/95 lg:bg-[#09140d]/80 backdrop-blur-md border-r border-emerald-900/30 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header on Mobile */}
        <div className="p-4 flex items-center justify-between border-b border-emerald-900/30 lg:hidden">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm text-emerald-200">System Navigation</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-emerald-950/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-mono uppercase tracking-wider text-emerald-500/70 font-semibold">
            Core Modules
          </div>

          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-emerald-600/25 border border-emerald-500/40 text-emerald-200 shadow-sm shadow-emerald-900/40'
                    : 'text-slate-300 hover:bg-emerald-950/40 hover:text-emerald-300 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`transition-colors ${
                      isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-emerald-400'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Hardware / ESP32 Status Pill */}
        <div className="p-3 border-t border-emerald-900/30">
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/30">
            <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
              <span className="font-semibold text-emerald-300">ESP32 Node 01</span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                240 MHz
              </span>
            </div>
            <div className="text-[11px] text-slate-400 space-y-1 font-mono">
              <div className="flex justify-between">
                <span>Wi-Fi RSSI:</span>
                <span className="text-emerald-400">-58 dBm</span>
              </div>
              <div className="flex justify-between">
                <span>MQTT Broker:</span>
                <span className="text-emerald-400">Connected</span>
              </div>
              <div className="flex justify-between">
                <span>Relay GPIO:</span>
                <span className={pumpStatus === 'ON' ? 'text-blue-400 font-bold' : 'text-slate-400'}>
                  {pumpStatus === 'ON' ? 'PIN 26 [HIGH]' : 'PIN 26 [LOW]'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
