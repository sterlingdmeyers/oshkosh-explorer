# Vehicle Telemetry Dashboard

A real-time vehicle telemetry dashboard built with React, Node.js, and WebSocket.

## Features

- Real-time vehicle telemetry data visualization
- Speed and RPM charts
- Current status display
- Location tracking
- WebSocket-based real-time updates

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
cd ..
```

3. Install backend dependencies:
```bash
cd backend
npm install
cd ..
```

## Running the Application

1. Start both frontend and backend in development mode:
```bash
npm run dev
```

This will start:
- Frontend on http://localhost:5173
- Backend on http://localhost:3001

## Development

- Frontend: React with TypeScript, Material-UI, and Recharts
- Backend: Node.js with Express and WebSocket
- Real-time data updates via WebSocket
- Simulated vehicle telemetry data

## Project Structure

```
vehicle-telemetry-dashboard/
├── frontend/           # React frontend application
├── backend/           # Node.js backend server
└── package.json       # Root package.json for workspace management
``` 