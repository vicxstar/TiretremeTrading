import express from 'express';
import { WebSocketServer } from 'ws'; // Corrected import
import axios from 'axios'; // `get` is part of axios, but importing axios gives you more flexibility

const app = express();
const PORT = process.env.PORT || 3000;

// Serve the static files from the React app
app.use(express.static('public')); // Fixed static middleware

// Create HTTP server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Create WebSocket server and attach it to the HTTP server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    // Fetch data from the Bybit API (initial data)
    axios.get('https://api.bybit.com/v2/public/tickers?symbol=SOLUSDT')
        .then(response => {
            ws.send(JSON.stringify({ type: 'initial', data: response.data.result }));
        })
        .catch(error => console.error('Error fetching data:', error));

    // Example real-time update (mocking WebSocket data for the purpose of this demo)
    setInterval(() => {
        ws.send(JSON.stringify({ type: 'update', data: 'Real-time data here' }));
    }, 2000);
});
