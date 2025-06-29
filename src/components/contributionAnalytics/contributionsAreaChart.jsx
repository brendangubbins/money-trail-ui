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
  Title
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler, Title);

export default function ContributionsStackedAreaChart({ data }) {
  // Prepare labels (months) sorted

  const labels = useMemo(() => {
    const monthsSet = new Set(data.map(d => {
      const dateSlice = d.date.slice(0, 7).split("-");
      return dateSlice[1] + "-" + dateSlice[0];
    }));
    return Array.from(monthsSet).sort();
  }, [data]);


  const entityTypes = useMemo(() => {
    const entityTypeSet = new Set(data.map(d => d.entity_tp || 'Unknown'));
    return Array.from(entityTypeSet).sort();
  }, [data]);

  const entityColors = {
    CAN: '#4e79a7',
    CCM: '#f28e2b',
    COM: '#e15759',
    IND: '#76b7b2',
    ORG: '#59a14f',
    PAC: '#edc948',
    PTY: '#b07aa1',
    Unknown: '#bab0ac',
  };

  const datasets = entityTypes.map(tp => ({
    label: tp,
    data: labels.map(month => {
      const item = data.find(d => {
        const dateSlice = d.date.slice(0, 7).split("-"); 
        return (dateSlice[1] + "-" + dateSlice[0]) === month && (d.entity_tp ||'Unknown') === tp;
      });
      return item ? item.total_contributions : 0;
    }),
    fill: true,
    tension: 0.3,
    backgroundColor: entityColors[tp],
    borderColor: entityColors[tp],
  }));

  const chartData = {
    labels,
    datasets,
    data
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: ctx => {
            const val = ctx.parsed.y;
            return `${ctx.dataset.label}: $${val.toLocaleString()}`;
          },
        },
      },
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Political Contributions by Entity'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date (MM-YYYY)',
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'Contribution Amount ($)',
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
