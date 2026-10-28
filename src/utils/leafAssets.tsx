import React from 'react';

export interface SampleLeaf {
  id: string;
  name: string;
  scientificName: string;
  defaultDisease: string;
  confidence: number;
  severity: 'Mild' | 'Moderate' | 'Severe';
  affectedArea: number;
  description: string;
  colorScheme: string;
  probabilities: { name: string; probability: number }[];
}

export const SAMPLE_LEAVES: SampleLeaf[] = [
  {
    id: 'early-blight',
    name: 'Tomato Leaf with Early Blight (Alternaria solani)',
    scientificName: 'Solanum lycopersicum - Alternaria solani',
    defaultDisease: 'Early Blight',
    confidence: 91.3,
    severity: 'Moderate',
    affectedArea: 34,
    description: 'Characteristic dark concentric rings (target-like spots) surrounded by chlorotic yellow halos on lower foliage.',
    colorScheme: 'from-amber-900 to-amber-600',
    probabilities: [
      { name: 'Early Blight', probability: 91.3 },
      { name: 'Late Blight', probability: 4.8 },
      { name: 'Leaf Mold', probability: 2.1 },
      { name: 'Bacterial Spot', probability: 1.2 },
      { name: 'Healthy', probability: 0.6 }
    ]
  },
  {
    id: 'healthy',
    name: 'Healthy Tomato Leaf',
    scientificName: 'Solanum lycopersicum - Pristine',
    defaultDisease: 'Healthy',
    confidence: 98.7,
    severity: 'Mild',
    affectedArea: 0,
    description: 'Vibrant green chlorophyll pigment with intact cuticle, well-defined veins, and zero necrotic lesions.',
    colorScheme: 'from-emerald-800 to-emerald-500',
    probabilities: [
      { name: 'Healthy', probability: 98.7 },
      { name: 'Early Blight', probability: 0.6 },
      { name: 'Bacterial Spot', probability: 0.3 },
      { name: 'Leaf Mold', probability: 0.2 },
      { name: 'Late Blight', probability: 0.2 }
    ]
  },
  {
    id: 'bacterial-spot',
    name: 'Tomato Bacterial Spot (Xanthomonas spp.)',
    scientificName: 'Solanum lycopersicum - Xanthomonas campestris',
    defaultDisease: 'Bacterial Spot',
    confidence: 88.4,
    severity: 'Severe',
    affectedArea: 48,
    description: 'Small water-soaked circular lesions that turn dark brown with translucent greasy borders on leaf margins.',
    colorScheme: 'from-yellow-950 to-amber-700',
    probabilities: [
      { name: 'Bacterial Spot', probability: 88.4 },
      { name: 'Early Blight', probability: 6.2 },
      { name: 'Late Blight', probability: 3.1 },
      { name: 'Leaf Mold', probability: 1.5 },
      { name: 'Healthy', probability: 0.8 }
    ]
  },
  {
    id: 'late-blight',
    name: 'Tomato Late Blight (Phytophthora infestans)',
    scientificName: 'Solanum lycopersicum - Phytophthora infestans',
    defaultDisease: 'Late Blight',
    confidence: 94.1,
    severity: 'Severe',
    affectedArea: 62,
    description: 'Irregular water-soaked pale green lesions rapidly enlarging into dark purplish-brown necrotic patches with white fungal sporulation.',
    colorScheme: 'from-stone-900 to-amber-900',
    probabilities: [
      { name: 'Late Blight', probability: 94.1 },
      { name: 'Early Blight', probability: 3.5 },
      { name: 'Leaf Mold', probability: 1.2 },
      { name: 'Bacterial Spot', probability: 0.8 },
      { name: 'Healthy', probability: 0.4 }
    ]
  },
  {
    id: 'leaf-mold',
    name: 'Tomato Leaf Mold (Passalora fulva)',
    scientificName: 'Solanum lycopersicum - Passalora fulva',
    defaultDisease: 'Leaf Mold',
    confidence: 86.9,
    severity: 'Moderate',
    affectedArea: 29,
    description: 'Pale greenish-yellow spots on upper surface with dense olive-brown velvety mould growth on leaf undersides under high humidity.',
    colorScheme: 'from-lime-900 to-yellow-800',
    probabilities: [
      { name: 'Leaf Mold', probability: 86.9 },
      { name: 'Early Blight', probability: 5.7 },
      { name: 'Bacterial Spot', probability: 4.2 },
      { name: 'Late Blight', probability: 2.1 },
      { name: 'Healthy', probability: 1.1 }
    ]
  }
];

export const LeafIllustration: React.FC<{
  type: string;
  showGradCam?: boolean;
  className?: string;
  customImageUrl?: string | null;
}> = ({ type, showGradCam = false, className = 'w-full h-64', customImageUrl }) => {
  if (customImageUrl) {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center ${className}`}>
        <img
          src={customImageUrl}
          alt="Uploaded Crop Leaf"
          className="w-full h-full object-cover"
        />
        {showGradCam && (
          <div className="absolute inset-0 pointer-events-none mix-blend-screen bg-radial from-red-600/80 via-yellow-400/40 via-cyan-500/20 to-transparent">
            {/* Attention region indicators */}
            <div className="absolute top-1/3 left-1/3 w-32 h-32 rounded-full border-2 border-dashed border-red-400 animate-pulse" />
            <div className="absolute top-2 right-2 px-2.5 py-1 bg-red-950/80 border border-red-500 text-red-200 text-xs font-mono font-semibold rounded-md shadow">
              Grad-CAM Focus Peak: (x: 142, y: 98)
            </div>
          </div>
        )}
      </div>
    );
  }

  // Render high-fidelity SVG Tomato Leaf with realistic diseased spots
  const isHealthy = type === 'healthy';
  const isLateBlight = type === 'late-blight';
  const isBacterial = type === 'bacterial-spot';
  const isLeafMold = type === 'leaf-mold';

  return (
    <div className={`relative overflow-hidden rounded-xl bg-slate-950/80 border border-emerald-900/50 flex items-center justify-center p-2 ${className}`}>
      <svg
        viewBox="0 0 400 320"
        className="w-full h-full filter drop-shadow-lg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main Leaf Gradient */}
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="50%" stopColor="#166534" />
            <stop offset="100%" stopColor="#14532d" />
          </linearGradient>

          {/* Early Blight Target Rings Gradient */}
          <radialGradient id="targetSpot1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#291206" />
            <stop offset="25%" stopColor="#542409" />
            <stop offset="45%" stopColor="#2c1407" />
            <stop offset="65%" stopColor="#78350f" />
            <stop offset="85%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#166534" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="targetSpot2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1c0c04" />
            <stop offset="35%" stopColor="#451a03" />
            <stop offset="70%" stopColor="#a16207" />
            <stop offset="100%" stopColor="#166534" stopOpacity="0" />
          </radialGradient>

          {/* Grad-CAM Jet/Turbo Color Colormap */}
          <radialGradient id="gradCamHotspot1" cx="48%" cy="42%" r="45%">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.88" />
            <stop offset="25%" stopColor="#ea580c" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#eab308" stopOpacity="0.65" />
            <stop offset="75%" stopColor="#06b6d4" stopOpacity="0.35" />
            <stop offset="90%" stopColor="#3b82f6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="gradCamHotspot2" cx="70%" cy="65%" r="35%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.82" />
            <stop offset="30%" stopColor="#f59e0b" stopOpacity="0.6" />
            <stop offset="65%" stopColor="#10b981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Stem */}
        <path
          d="M 50 280 C 110 240 180 190 220 150 C 260 110 320 60 360 40"
          stroke="#4d7c0f"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Lateral leaflet stems */}
        <path d="M 160 195 C 120 170 80 175 60 170" stroke="#4d7c0f" strokeWidth="3" fill="none" />
        <path d="M 220 150 C 260 180 290 210 310 230" stroke="#4d7c0f" strokeWidth="3" fill="none" />
        <path d="M 280 100 C 250 80 220 70 200 60" stroke="#4d7c0f" strokeWidth="3" fill="none" />

        {/* Central Terminal Leaflet */}
        <path
          d="M 210 160 C 170 140 160 100 190 70 C 210 50 230 40 250 30 C 280 35 310 55 330 80 C 350 110 330 150 290 160 C 260 170 230 170 210 160 Z"
          fill="url(#leafGrad)"
          stroke="#22c55e"
          strokeWidth="1.5"
        />

        {/* Left Sub-Leaflet */}
        <path
          d="M 160 195 C 130 180 90 170 70 150 C 50 130 60 110 80 115 C 110 120 130 140 155 170 Z"
          fill="url(#leafGrad)"
          stroke="#22c55e"
          strokeWidth="1"
          opacity="0.9"
        />

        {/* Right Sub-Leaflet */}
        <path
          d="M 220 150 C 250 170 290 190 320 210 C 340 225 335 245 315 245 C 285 240 255 210 220 170 Z"
          fill="url(#leafGrad)"
          stroke="#22c55e"
          strokeWidth="1"
          opacity="0.9"
        />

        {/* Leaf Veins */}
        <g stroke="#86efac" strokeWidth="1.2" opacity="0.4" strokeLinecap="round">
          <path d="M 210 160 Q 250 100 320 45" />
          <path d="M 230 135 Q 260 130 285 140" />
          <path d="M 245 115 Q 215 100 200 95" />
          <path d="M 260 95 Q 295 90 315 105" />
          <path d="M 280 75 Q 265 65 245 60" />
          <path d="M 295 60 Q 315 65 325 75" />
        </g>

        {/* Disease Lesion Graphics */}
        {!isHealthy && (
          <g>
            {/* Early Blight Bullseye Rings */}
            {!isBacterial && !isLateBlight && !isLeafMold && (
              <>
                {/* Main Bullseye Spot */}
                <ellipse cx="240" cy="110" rx="36" ry="32" fill="url(#targetSpot1)" />
                {/* Concentric rings */}
                <circle cx="240" cy="110" r="28" stroke="#78350f" strokeWidth="1.5" fill="none" opacity="0.8" />
                <circle cx="240" cy="110" r="20" stroke="#451a03" strokeWidth="1.5" fill="none" opacity="0.9" />
                <circle cx="240" cy="110" r="12" stroke="#291206" strokeWidth="2" fill="#1c0c04" />
                <circle cx="240" cy="110" r="4" fill="#0c0a09" />
                {/* Chlorotic yellow halo */}
                <ellipse cx="240" cy="110" rx="42" ry="38" stroke="#eab308" strokeWidth="2" fill="none" opacity="0.6" />

                {/* Secondary smaller lesion */}
                <ellipse cx="280" cy="140" rx="20" ry="18" fill="url(#targetSpot2)" />
                <circle cx="280" cy="140" r="14" stroke="#78350f" strokeWidth="1" fill="none" opacity="0.8" />
                <circle cx="280" cy="140" r="7" fill="#1c0c04" />
                <ellipse cx="280" cy="140" rx="24" ry="22" stroke="#eab308" strokeWidth="1.5" fill="none" opacity="0.5" />

                {/* Marginal lesion */}
                <circle cx="190" cy="85" r="12" fill="#451a03" opacity="0.9" />
                <circle cx="190" cy="85" r="16" stroke="#ca8a04" strokeWidth="1" fill="none" opacity="0.7" />
              </>
            )}

            {/* Bacterial Spot */}
            {isBacterial && (
              <g fill="#292524" stroke="#ca8a04" strokeWidth="1">
                <circle cx="220" cy="110" r="8" />
                <circle cx="245" cy="95" r="6" />
                <circle cx="270" cy="120" r="7" />
                <circle cx="260" cy="145" r="9" />
                <circle cx="205" cy="85" r="5" />
                <circle cx="290" cy="100" r="6" />
                <circle cx="120" cy="140" r="5" />
                <circle cx="140" cy="155" r="7" />
                <circle cx="280" cy="195" r="6" />
              </g>
            )}

            {/* Late Blight Water Soaked Dark Patches */}
            {isLateBlight && (
              <g>
                <path
                  d="M 215 90 Q 250 70 280 90 Q 300 120 280 145 Q 235 150 215 125 Z"
                  fill="#1c1917"
                  opacity="0.85"
                />
                <path
                  d="M 220 95 Q 248 78 275 95 Q 290 118 275 140 Q 240 142 220 125 Z"
                  stroke="#a8a29e"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                  fill="#292524"
                  opacity="0.9"
                />
                <circle cx="130" cy="145" r="18" fill="#1c1917" opacity="0.8" />
              </g>
            )}

            {/* Leaf Mold Olive-Yellow Spots */}
            {isLeafMold && (
              <g opacity="0.85">
                <ellipse cx="235" cy="105" rx="25" ry="20" fill="#a16207" />
                <ellipse cx="270" cy="130" rx="18" ry="14" fill="#854d0e" />
                <ellipse cx="205" cy="85" rx="14" ry="10" fill="#713f12" />
                <circle cx="240" cy="110" r="10" fill="#4d7c0f" opacity="0.7" />
              </g>
            )}
          </g>
        )}

        {/* Grad-CAM Heatmap Overlay */}
        {showGradCam && (
          <g style={{ mixBlendMode: 'screen' }}>
            <ellipse cx="240" cy="110" rx="65" ry="60" fill="url(#gradCamHotspot1)" />
            <ellipse cx="280" cy="140" rx="45" ry="40" fill="url(#gradCamHotspot2)" />
            {/* Attention Grid Overlay */}
            <g stroke="#38bdf8" strokeWidth="0.5" opacity="0.25">
              <line x1="170" y1="50" x2="170" y2="170" />
              <line x1="210" y1="50" x2="210" y2="170" />
              <line x1="250" y1="50" x2="250" y2="170" />
              <line x1="290" y1="50" x2="290" y2="170" />
              <line x1="330" y1="50" x2="330" y2="170" />
              <line x1="170" y1="60" x2="330" y2="60" />
              <line x1="170" y1="90" x2="330" y2="90" />
              <line x1="170" y1="120" x2="330" y2="120" />
              <line x1="170" y1="150" x2="330" y2="150" />
            </g>
            {/* Focal Crosshairs */}
            <g stroke="#ef4444" strokeWidth="1.5">
              <circle cx="240" cy="110" r="6" fill="none" />
              <line x1="228" y1="110" x2="252" y2="110" />
              <line x1="240" y1="98" x2="240" y2="122" />
            </g>
          </g>
        )}
      </svg>

      {/* Grad-CAM floating badges */}
      {showGradCam && (
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-red-500/40 text-red-200">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span>Grad-CAM Hotspot: Target-Lesion Activation Layer (conv_head)</span>
          </div>
          <span className="text-emerald-400 font-bold">α_k = 0.941</span>
        </div>
      )}
    </div>
  );
};
