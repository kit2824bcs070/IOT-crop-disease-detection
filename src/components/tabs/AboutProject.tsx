import React from 'react';
import {
  Info,
  GraduationCap,
  Layers,
  Cpu,
  Target,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Code2,
  Terminal,
  Award
} from 'lucide-react';

export const AboutProject: React.FC = () => {
  const technologies = [
    { name: 'IoT (Internet of Things)', desc: 'Multi-node edge telemetry network' },
    { name: 'ESP32 Microcontroller', desc: 'Xtensa Dual-Core 240MHz MCU' },
    { name: 'MQTT Protocol', desc: 'Lightweight telemetry publish/subscribe' },
    { name: 'Computer Vision', desc: 'Canopy foliar feature segmentation' },
    { name: 'Deep Neural Networks (DNN)', desc: 'Convolutional feature hierarchies' },
    { name: 'EfficientNet-B0', desc: 'Compound scaling convolutional backbone' },
    { name: 'Grad-CAM', desc: 'Gradient-weighted Class Activation Mapping' },
    { name: 'Multimodal AI', desc: 'Visual diagnosis fused with weather telemetry' },
    { name: 'Generative AI', desc: 'Domain LLM & RAG agronomic advisory' },
    { name: 'Smart Irrigation', desc: 'Threshold-actuated relay & pump closed loop' }
  ];

  const objectives = [
    'Continuous and autonomous microclimate monitoring using calibrated IoT sensors (DHT22, Soil Moisture, BH1750, Leaf Wetness).',
    'High-accuracy early detection of foliar crop diseases (Early Blight, Late Blight, Bacterial Spot, Leaf Mold) via transfer-learned EfficientNet-B0.',
    'Explainable AI transparency using Grad-CAM heatmaps to visually explain DNN convolutional activations to farmers and evaluators.',
    'Multimodal disease-risk modeling fusing real-time environmental stress indices (humidity, leaf wetness duration, heat stress) with image diagnosis.',
    'Personalized generative AI agricultural advisory in multiple languages (English & Tamil) for actionable bio-pesticide and cultural practice recommendations.',
    'Autonomous closed-loop smart irrigation preventing root water stress and waterlogging through dynamic ESP32 relay actuation.'
  ];

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="p-6 rounded-2xl bg-[#09150d] border border-emerald-500/30">
        <div className="flex items-center gap-2 mb-2">
          <GraduationCap className="w-5 h-5 text-emerald-400" />
          <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold">
            Academic Project Review & Viva Documentation
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug">
          An IoT-Based Smart Crop Disease Detection and Generative AI-Powered Agricultural Advisory System Using Deep Neural Networks
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-4xl">
          A comprehensive smart agriculture prototype bridging edge Internet of Things telemetry, deep convolutional vision architectures, and generative large language models to enable precision crop stewardship.
        </p>

        <div className="mt-4 flex items-center flex-wrap gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-600/40 text-emerald-300">
            Academic Year: 2026–2027
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-600/40 text-emerald-300">
            Degree: B.E. / B.Tech Computer Science & Engineering
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-600/40 text-emerald-300">
            Domain: Edge AI & Smart Agriculture
          </span>
        </div>
      </div>

      {/* Main Objectives */}
      <div className="p-6 rounded-2xl bg-[#0c1810]/90 border border-emerald-900/40 space-y-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-base text-white">Main Objectives</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {objectives.map((obj, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-black/40 border border-emerald-900/30 flex items-start gap-3 text-xs leading-relaxed"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span className="text-slate-300">{obj}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Technologies Used Grid */}
      <div className="p-6 rounded-2xl bg-[#0c1810]/90 border border-emerald-900/40 space-y-4">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-base text-white">Technologies & Core Frameworks</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {technologies.map((tech, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-950/70 border border-emerald-900/40 hover:border-emerald-500/50 transition-all flex flex-col justify-between"
            >
              <span className="text-xs font-bold text-white mb-1">{tech.name}</span>
              <span className="text-[11px] font-mono text-emerald-400/80">{tech.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Viva / Project Presentation Quick Q&A Reference */}
      <div className="p-6 rounded-2xl bg-[#0c1810]/90 border border-emerald-900/40 space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-base text-white">Viva Examination & Evaluator Quick Reference</h3>
        </div>

        <div className="space-y-3 text-xs leading-relaxed">
          <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-900/30 space-y-1">
            <span className="font-bold text-emerald-300 font-mono">
              Q1: Why choose EfficientNet-B0 over ResNet50 or VGG16?
            </span>
            <p className="text-slate-300 text-[11px]">
              EfficientNet-B0 utilizes compound coefficient scaling across network depth, width, and input resolution. With only ~5.3M parameters compared to ResNet50 (~25.6M), it yields 84% lower FLOPs while retaining &gt;91% top-1 accuracy on PlantVillage leaf benchmarks, making it ideal for edge deployment.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-900/30 space-y-1">
            <span className="font-bold text-cyan-300 font-mono">
              Q2: What is the purpose of Grad-CAM in agricultural disease detection?
            </span>
            <p className="text-slate-300 text-[11px]">
              Gradient-weighted Class Activation Mapping (Grad-CAM) uses the gradients of the target disease score flowing into the final convolutional feature maps to produce a coarse localization map. This guarantees that the DNN is focusing on actual foliar lesions (such as Alternaria concentric rings) rather than background dirt or illumination artifacts.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-900/30 space-y-1">
            <span className="font-bold text-indigo-300 font-mono">
              Q3: How does Multimodal Fusion enhance simple image-based diagnosis?
            </span>
            <p className="text-slate-300 text-[11px]">
              Visual symptoms appear only after fungal mycelium has already colonized leaf tissue. By fusing physical sensor telemetry (continuous relative humidity &gt;80% and prolonged leaf wetness &gt;4 hours), the system computes pre-symptomatic spore germination risks before irreversible canopy necrosis takes place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
