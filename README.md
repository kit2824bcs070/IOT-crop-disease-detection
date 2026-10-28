# AI-Powered Smart Crop Health Monitoring Dashboard
> **An IoT-Based Smart Crop Disease Detection and Generative AI-Powered Agricultural Advisory System Using Deep Neural Networks**

[![React](https://img.shields.io/badge/React-19-61dafb.svg?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38bdf8.svg?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646cff.svg?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![IoT Architecture](https://img.shields.io/badge/IoT-ESP32%20|%20MQTT-10b981.svg?style=for-the-badge&logo=espressif)](https://www.espressif.com/)

---

## 📌 Project Overview

This project is a modern, fully interactive simulation and decision-support dashboard for smart precision agriculture. It demonstrates an end-to-end autonomous crop health pipeline:
1. **Perception**: Real-time multi-sensor telemetry (DHT22 Temperature & Humidity, Capacitive Soil Moisture, BH1750 Ambient Light, Canopy Leaf Wetness).
2. **Edge Communication**: ESP32 microcontroller with FreeRTOS, MQTT telemetry streaming over TLS, and GPIO relay actuation.
3. **Computer Vision & DNN Inference**: EfficientNet-B0 Deep Convolutional Neural Network classifying foliar crop pathologies with Softmax probability distributions.
4. **Explainable AI (Grad-CAM)**: Gradient-weighted Class Activation Mapping highlighting exact convolutional receptive fields and pathogen lesions.
5. **Multimodal Risk Fusion**: Real-time cross-modal fusion combining foliar image diagnosis with ambient microclimate indices to calculate dynamic disease spore germination risks.
6. **Generative AI Agricultural Advisor**: Domain-specific advisory chatbot supporting both **English 🇬🇧** and **Tamil தமிழ்** languages for contextual agronomic advice.
7. **Autonomous Actuation**: Closed-loop smart irrigation activating relay pumps when soil moisture breaches safety thresholds.

---

## 🏗️ 4-Tier System Architecture

```text
┌─────────────────────────────────────────────────────────────────┐
│                        1. EDGE — FARM                           │
│  Camera + Sensors (DHT22, Capacitive Soil, BH1750, Wetness)     │
│        ──► ESP32 Microcontroller ──► Relay ──► Water Pump       │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                       2. CONNECTIVITY                           │
│          Wi-Fi 802.11 b/g/n ──► MQTT Broker ──► Internet        │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                 3. BACKEND / INTELLIGENCE                       │
│  FastAPI Backend ──► EfficientNet-B0 DNN ──► Grad-CAM XAI       │
│  Multimodal Risk Engine ──► Generative AI RAG Advisor           │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      4. USER / ACTION                           │
│    Web Dashboard ◄──► Farmer Decision Support ◄──► Actuation    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Key Modules & Interactive Features

- **🎤 Project Review Demo Mode**: Automated 14-step presentation sequence that demonstrates the complete system pipeline from sensor acquisition to automated relay pump actuation, featuring integrated Web Speech API narration.
- **Real-Time IoT Sensor Monitoring**: Interactive live telemetry with dynamic physical fluctuation modeling, historical trend sparklines, and sensor calibration.
- **Deep Neural Network Vision**: Simulated 7-stage tensor pipeline showing preprocessing, $224 \times 224 \times 3$ resizing, ImageNet normalization, MBConv feature extraction, and multi-class classification (Early Blight, Late Blight, Bacterial Spot, Leaf Mold, Healthy).
- **Explainable AI (Grad-CAM)**: Interactive heatmap overlay with toggle comparison illustrating convolutional gradient attention hotspots over necrotic target-spot lesions.
- **Multimodal AI Risk Engine**: Cross-modal fusion combining image diagnosis with weather telemetry, including interactive sliders for temperature, humidity, soil moisture, and leaf wetness.
- **Generative AI Agronomist**: Bilingual (English / Tamil) conversational interface with context-injected RAG prompt synthesis and quick recommendation chips.
- **Smart Irrigation Automation**: Dynamic threshold setpoint control, hydraulic pump animation with rotating impeller, and real-time edge decision logging.
- **ESP32 Hardware Pinout Inspector**: Microcontroller schematic displaying GPIO bindings and Wi-Fi / MQTT communication links.
- **Sector Monitoring (Farm Zones)**: Geographical monitoring of Zones A, B, and C with deep-diagnostic modals.

---

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Canvas Confetti |
| **Build & Tooling** | Vite 8, Node.js |
| **Edge Hardware (Modeled)** | ESP32-WROOM-32D, DHT22, Capacitive Soil V1.2, BH1750, Leaf Wetness Grid, 5V SPDT Relay |
| **Communication Protocols** | MQTT v3.1.1 (QoS 1), WebSockets, REST, I2C, 1-Wire, ADC |
| **AI / ML Architectures** | EfficientNet-B0 (PyTorch / ONNX), Grad-CAM, Multimodal Fusion, LLM RAG Prompting |

---

## 💻 Getting Started Locally

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* [Git](https://git-scm.com/)

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd <your-repo-name>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📄 License & Academic Attribution
* **Project**: An IoT-Based Smart Crop Disease Detection and Generative AI-Powered Agricultural Advisory System Using Deep Neural Networks
* **Academic Review Prototype**: 2026–2027
