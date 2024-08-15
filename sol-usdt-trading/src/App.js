import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // WebSocket logic here to receive candlestick data
  }, []);

  const chartData = {
    labels: data.map(d => d.time),
    datasets: [{
      label: 'SOL/USDT',
      data: data.map(d => d.value),
    }],
  };

  return (
    <div>
      <h1>SOL/USDT Trading</h1>
      <Line data={chartData} />
    </div>
  );
}

export default App;
