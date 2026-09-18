import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);

interface DonutChartProps {
  items: {
    label: string;
    amountUSD: number;
    color: string;
  }[];
}

export const DonutChart: React.FC<DonutChartProps> = ({ items }) => {
  const data = {
    labels: items.map((i) => i.label),
    datasets: [
      {
        data: items.map((i) => i.amountUSD),
        backgroundColor: items.map((i) => i.color),
        borderColor: '#12141e',
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#181b2a',
        titleColor: '#f1f5f9',
        bodyColor: '#94a3b8',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: function (context: any) {
            const label = context.label || '';
            const value = context.parsed || 0;
            return ` ${label}: $${Math.round(value).toLocaleString()}`;
          },
        },
      },
    },
    cutout: '75%',
  };

  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      <Doughnut data={data} options={options} />
    </div>
  );
};
