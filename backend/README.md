# Vinea AI Flower Journal

A proof-of-concept journaling app where users describe their emotions in text, and an AI-powered "trellis" visualizes those feelings as flowers.

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Project Structure](#project-structure)
4. [Environment Variables](#environment-variables)
5. [Backend Setup & Run](#backend-setup--run)
6. [Frontend (Expo) Setup & Run](#frontend-expo-setup--run)
7. [Usage](#usage)
8. [Future Work & Notes](#future-work--notes)

---

## Overview

This repository contains two parts:

- **Backend**: A small Express server in `/backend` that proxies requests to the OpenAI API using your private `OPENAI_API_KEY`.
- **Frontend**: An Expo-managed React Native app (including web support) in the project root that consumes the backend, allows users to journal their emotions, previews a flower trellis visualization, and navigates to a full-screen trellis view.


## Prerequisites

- Node.js (v16+ recommended)
- npm or Yarn
- (Optional) iOS Simulator / Xcode for `npm run ios`
- (Optional) Android SDK or Expo Go for Android testing


## Project Structure

```
/ (root)
├─ /backend           # Express proxy server
│   ├─ .env           # Your private OPENAI_API_KEY
│   └─ index.mjs      # Express entrypoint
│
├─ App.tsx            # Expo entrypoint for mobile & web
├─ metro.config.js    # (Removed for Expo-managed; not used)
├─ src/api/sentiment.ts  # Frontend helpers (fetch to /backend/analyze)
├─ components/        # Shared UI components (Trellis, DreamInput, etc.)
├─ screens/           # Screen components (DreamScreen, TrellisScreen)
├─ navigation/        # React Navigation setup
├─ assets/            # Images & icons (trellis.png, flower icons)
└─ package.json       # Frontend dependencies & scripts
```


## Environment Variables

### Backend

Create a file `/backend/.env`:

```
OPENAI_API_KEY=sk-...your-secret-key...
```

This is used by `backend/index.mjs` via `dotenv` to authenticate your OpenAI SDK calls.

### Frontend

The frontend calls the backend via `fetch('http://localhost:3001/analyze', ...)`. No secret is stored in the client.


## Backend Setup & Run

1. **Enter the backend folder**
   ```bash
   cd backend
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start the server**
   ```bash
   npm start
   ```

The server listens on **http://localhost:3001** and exposes:

- `POST /analyze` → accepts `{ text: string }` and returns `{ joy, sadness, anger, fear, surprise, neutral }`.


## Frontend (Expo) Setup & Run

> **Important**: Be in the project root, **not** in `/backend`.

1. **Install dependencies**
   ```bash
   cd ..          # back to project root
   npm install
   ```

2. **Start Web build**
   ```bash
   npm run web -- --clear
   ```
   Opens http://localhost:8081 by default.

3. **Run on iOS Simulator** (requires Xcode)
   ```bash
   npm run ios
   ```

4. **Run on Android** (requires Android SDK)
   ```bash
   npm run android
   ```


## Usage

- **DreamScreen**: Type your journal text and hit **Preview** to see flowers arranged on the trellis preview. Hit **Continue** (or swipe up) to navigate to the full TrellisScreen.
- **TrellisScreen**: Scrollable full-screen view of your flower trellis, editable by re-navigating back.


## Future Work & Notes

- The current API only classifies a single text input into six emotion scores.  
- To support incremental edits or history-based modifications, extend the backend with new endpoints (e.g. `/modify`) that accept prior counts and new instructions.  
- Art & design are in progress: replace placeholder graphics with polished assets in `/assets`.  
- When you return, implement session state persistence (e.g. AsyncStorage) and richer prompts for more interactive trellis manipulation.

---

_Last updated: proof-of-concept complete – ready for UI/UX polish._

