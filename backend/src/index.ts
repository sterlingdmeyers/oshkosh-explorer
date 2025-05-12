import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Create HTTP server
const server = createServer(app);

// Create WebSocket server
const wss = new WebSocketServer({ server });

// Helper function to generate random number within range
const randomInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Simulate vehicle telemetry data
  const interval = setInterval(() => {
    const telemetryData = {
      timestamp: new Date().toISOString(),
      speed: randomInRange(0, 100), // 0-100 km/h
      rpm: randomInRange(0, 8000), // RPM
      fuel: randomInRange(0, 100), // 0-100%
      temperature: randomInRange(60, 120), // 60-120°C
      latitude: 37.7749 + (Math.random() - 0.5) * 0.01,
      longitude: -122.4194 + (Math.random() - 0.5) * 0.01
    };

    ws.send(JSON.stringify(telemetryData));
  }, 2000); // Send data every 2 seconds

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 