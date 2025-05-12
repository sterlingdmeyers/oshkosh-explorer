import { useState, useEffect } from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TelemetryData {
  timestamp: string;
  speed: number;
  rpm: number;
  fuel: number;
  temperature: number;
  latitude: number;
  longitude: number;
}

function App() {
  const [telemetryData, setTelemetryData] = useState<TelemetryData[]>([]);
  const [currentData, setCurrentData] = useState<TelemetryData | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');

    ws.onmessage = (event) => {
      const data: TelemetryData = JSON.parse(event.data);
      setCurrentData(data);
      setTelemetryData((prev) => [...prev.slice(-50), data]);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Current Status */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Current Status
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="subtitle1">Speed</Typography>
                <Typography variant="h4">{currentData?.speed.toFixed(1)} km/h</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1">RPM</Typography>
                <Typography variant="h4">{currentData?.rpm.toFixed(0)}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1">Fuel</Typography>
                <Typography variant="h4">{currentData?.fuel.toFixed(1)}%</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1">Temperature</Typography>
                <Typography variant="h4">{currentData?.temperature.toFixed(1)}°C</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Speed Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300 }}>
            <Typography variant="h6" gutterBottom>
              Speed Over Time
            </Typography>
            <ResponsiveContainer>
              <LineChart data={telemetryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="speed" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* RPM Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300 }}>
            <Typography variant="h6" gutterBottom>
              RPM Over Time
            </Typography>
            <ResponsiveContainer>
              <LineChart data={telemetryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="rpm" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Location */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Current Location
            </Typography>
            <Typography>
              Latitude: {currentData?.latitude.toFixed(6)}, Longitude: {currentData?.longitude.toFixed(6)}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App; 