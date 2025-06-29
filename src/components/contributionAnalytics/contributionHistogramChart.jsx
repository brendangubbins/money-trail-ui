import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  Title,
  BarElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

export default function ContributionsHistogramChart ({ data }) {

  const chartData = {
    labels: data.map(bucket => bucket.range),
    datasets: [
      {
        label: 'Number of Contributions',
        data: data.map(bucket => bucket.count),
        backgroundColor: '#3182bd',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.parsed.y} contributions`
        }
      },
      title: {
        display: true,
        text: '# of Political Contributions by Amount'
      }
    },
    scales: {
      x: {
        title: { display: true, text: 'Contribution Amount Range' }
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Count' }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
}
