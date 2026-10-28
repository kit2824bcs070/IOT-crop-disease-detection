import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { LeafIllustration, SAMPLE_LEAVES } from '../../utils/leafAssets';
import {
  Upload,
  Play,
  RotateCcw,
  Sparkles,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Cpu,
  Sliders,
  Maximize2,
  FileCheck
} from 'lucide-react';

export const DiseaseDetection: React.FC = () => {
  const {
    selectedLeafType,
    setSelectedLeafType,
    customImage,
    setCustomImage,
    isAnalyzing,
    dnnStageIndex,
    detectionResult,
    showGradCam,
    setShowGradCam,
    runDnnAnalysis
  } = useApp();

  const [viewMode, setViewMode] = useState<'overlay' | 'original' | 'split'>('overlay');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stages = [
    { id: 1, name: 'Image Uploaded', detail: 'RGB matrix ingested from camera / upload' },
    { id: 2, name: 'Preprocessing', detail: 'Color balance & Gaussian blur denoising' },
    { id: 3, name: 'Resize', detail: 'Bilinear interpolation to 224 × 224 × 3' },
    { id: 4, name: 'Normalization', detail: 'ImageNet mean=[0.485,0.456,0.406] std=[0.229,0.224,0.225]' },
    { id: 5, name: 'EfficientNet-B0', detail: '16 MBConv blocks + Squeeze-and-Excitation' },
    { id: 6, name: 'Classification', detail: 'Global Average Pooling + Dense Softmax Layer' },
    { id: 7, name: 'Disease Prediction', detail: 'Final argmax classification & confidence' }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        const url = event.target?.result as string;
        setCustomImage(url);
        runDnnAnalysis(selectedLeafType, url);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        const url = event.target?.result as string;
        setCustomImage(url);
        runDnnAnalysis(selectedLeafType, url);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Header with Mandatory College Review Notice */}
      <div className="p-5 rounded-2xl bg-[#09150d] border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-bold">
              Computer Vision & Deep Neural Network Pipeline
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold">
              SIMULATED DNN RESULT
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            AI CROP DISEASE DETECTION & EXPLAINABLE GRAD-CAM
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Automated visual diagnosis via transfer-learned EfficientNet-B0 deep convolutional neural network with gradient-weighted class activation mapping.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => runDnnAnalysis()}
            disabled={isAnalyzing}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-cyan-500/20 disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isAnalyzing ? 'Inferencing...' : 'Run DNN Simulation'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Upload & Inspection vs Pipeline Execution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Image Selector / Upload Area (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-[#0c1810]/90 border border-emerald-900/40">
            <h3 className="font-bold text-sm text-white mb-2 flex items-center gap-2">
              <Upload className="w-4 h-4 text-emerald-400" />
              <span>Upload Leaf Image / Select Sample</span>
            </h3>

            {/* Drag & Drop Upload Box */}
            <div
              onDragOver={e => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="mt-3 p-6 border-2 border-dashed border-emerald-700/50 hover:border-emerald-400/80 rounded-xl bg-emerald-950/20 text-center cursor-pointer transition-all hover:bg-emerald-950/40 group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Upload className="w-8 h-8 text-emerald-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-semibold text-white">
                Drag and drop your leaf photo here, or <span className="text-emerald-400 underline">browse</span>
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Supports JPG, PNG, WEBP (Tomato foliage recommended)
              </p>
            </div>

            {/* Quick Sample Selector for immediate Faculty Demo */}
            <div className="mt-4 pt-3 border-t border-emerald-900/40">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400 uppercase font-semibold">
                  Or Click Built-in Sample Foliage:
                </span>
                {customImage && (
                  <button
                    onClick={() => setCustomImage(null)}
                    className="text-[11px] text-emerald-400 underline"
                  >
                    Clear Upload
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {SAMPLE_LEAVES.map(leaf => {
                  const isSelected = !customImage && selectedLeafType === leaf.id;
                  return (
                    <button
                      key={leaf.id}
                      onClick={() => {
                        setCustomImage(null);
                        setSelectedLeafType(leaf.id);
                        runDnnAnalysis(leaf.id);
                      }}
                      className={`p-2 rounded-xl text-left border transition-all text-xs font-medium flex flex-col justify-between ${
                        isSelected
                          ? 'bg-emerald-600/30 border-emerald-400 text-white shadow-md shadow-emerald-900/30'
                          : 'bg-black/30 border-emerald-900/30 text-slate-300 hover:bg-emerald-950/40'
                      }`}
                    >
                      <span className="font-bold truncate">{leaf.defaultDisease}</span>
                      <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {leaf.id === 'healthy' ? '0% lesions' : `${leaf.affectedArea}% affected`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Leaf Visualizer & Grad-CAM Frame */}
          <div className="p-5 rounded-2xl bg-[#0c1810]/90 border border-emerald-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono uppercase font-bold text-white">
                  Visual Feature Inspector
                </span>
              </div>

              {/* Toggle: Original / Heatmap */}
              <div className="flex items-center gap-1 bg-black/50 p-1 rounded-lg border border-emerald-900/40">
                <button
                  onClick={() => {
                    setViewMode('original');
                    setShowGradCam(false);
                  }}
                  className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                    !showGradCam ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Original
                </button>
                <button
                  onClick={() => {
                    setViewMode('overlay');
                    setShowGradCam(true);
                  }}
                  className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                    showGradCam ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  AI Heatmap
                </button>
              </div>
            </div>

            {/* Illustration Container */}
            <div className="relative">
              <LeafIllustration
                type={selectedLeafType}
                showGradCam={showGradCam}
                customImageUrl={customImage}
                className="w-full h-72 sm:h-80"
              />
            </div>

            {/* Grad-CAM Label & Explanation (Requirement 6) */}
            <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-700/40 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-cyan-300 uppercase">
                  EXPLAINABLE AI — Grad-CAM
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-900/50 text-cyan-200 border border-cyan-500/30">
                  SIMULATED GRAD-CAM VISUALIZATION
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <span className="font-semibold text-white">AI Attention Region: </span>
                Grad-CAM visualization shows the regions that contributed most to the DNN prediction.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: 7-Stage Pipeline & Results (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Section 17: Interactive 7-Stage DNN Pipeline */}
          <div className="p-5 rounded-2xl bg-[#0c1810]/90 border border-emerald-900/40">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm text-white">
                  EfficientNet-B0 DNN Inference Pipeline
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Stage {dnnStageIndex} of 7
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden mb-4 border border-emerald-950">
              <div
                className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 h-full transition-all duration-300"
                style={{ width: `${(dnnStageIndex / 7) * 100}%` }}
              />
            </div>

            {/* Stage Cards */}
            <div className="space-y-2">
              {stages.map(s => {
                const isCurrent = dnnStageIndex === s.id && isAnalyzing;
                const isCompleted = dnnStageIndex >= s.id;
                return (
                  <div
                    key={s.id}
                    className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                      isCurrent
                        ? 'bg-cyan-950/50 border-cyan-400 shadow-md shadow-cyan-900/30 scale-[1.01]'
                        : isCompleted
                        ? 'bg-emerald-950/30 border-emerald-800/40 text-slate-200'
                        : 'bg-black/20 border-slate-800/40 text-slate-500 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                          isCurrent
                            ? 'bg-cyan-400 text-slate-950 animate-bounce'
                            : isCompleted
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                            : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {s.id}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>{s.name}</span>
                          {isCurrent && <span className="text-[10px] text-cyan-300 font-mono animate-pulse">[PROCESSING]</span>}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {s.detail}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-slate-700" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Diagnostic Result Card (Requirement 5) */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#122217] via-[#0d1d13] to-[#0c1810] border-2 border-emerald-500/40 shadow-xl shadow-black/50 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/40">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <h3 className="text-base font-bold text-white uppercase tracking-wide">
                  Simulated DNN Classification Output
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 border border-amber-400/40 text-amber-300">
                PROTOTYPE EVALUATION
              </span>
            </div>

            {/* 4 Main Output Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-black/40 border border-emerald-900/40">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Disease Prediction</span>
                <div className="text-base sm:text-lg font-black text-amber-300 mt-1">
                  {detectionResult.diseaseName}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-emerald-900/40">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Confidence</span>
                <div className="text-base sm:text-lg font-black text-emerald-300 mt-1">
                  {detectionResult.confidence}%
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-emerald-900/40">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Severity</span>
                <div className="text-base sm:text-lg font-black text-white mt-1">
                  {detectionResult.severity}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-emerald-900/40">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Affected Area</span>
                <div className="text-base sm:text-lg font-black text-cyan-300 mt-1">
                  {detectionResult.affectedArea}%
                </div>
              </div>
            </div>

            {/* Possible Classes Probability Distribution Bar */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono uppercase text-slate-400 font-semibold block">
                Multi-Class Softmax Probability Distribution:
              </span>
              <div className="space-y-1.5">
                {detectionResult.classProbabilities.map((cls, idx) => (
                  <div key={idx} className="space-y-1 text-xs font-mono">
                    <div className="flex justify-between text-slate-300">
                      <span className={cls.name === detectionResult.diseaseName ? 'font-bold text-emerald-300' : ''}>
                        {cls.name}
                      </span>
                      <span>{cls.probability.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          cls.name === detectionResult.diseaseName
                            ? 'bg-emerald-400'
                            : 'bg-slate-700'
                        }`}
                        style={{ width: `${cls.probability}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pathogen Agronomic Context */}
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-slate-300 leading-relaxed font-sans">
              <span className="font-bold text-emerald-300 font-mono">Diagnosis Summary: </span>
              {detectionResult.description}
            </div>

            <div className="text-[11px] font-mono text-slate-500 text-center">
              ⚠️ Clearly labeled: SIMULATED DNN RESULT for academic review demonstration.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
