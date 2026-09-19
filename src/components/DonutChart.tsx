import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import type { CountryCalculationResult } from '../types';

ChartJS.register(ArcElement, Tooltip);

interface DonutChartProps {
  items?: {
    label: string;
    amountUSD: number;
    color: string;
  }[];
  result?: CountryCalculationResult;
  baseCurrency?: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({ items, result, baseCurrency }) => {
  const chartItems =
    items ||
    (result
      ? [
          { label: 'Net Take-Home', amountUSD: result.netUSD, color: '#10B981' },
          { label: 'Income Tax', amountUSD: result.incomeTaxUSD, color: '#6366F1' },
          ...(result.stateTaxUSD > 0
            ? [{ label: 'State / Local Tax', amountUSD: result.stateTaxUSD, color: '#8B5CF6' }]
            : []),
          ...(result.socialContributionsUSD > 0
            ? [{ label: 'Social Security / NI', amountUSD: result.socialContributionsUSD, color: '#F59E0B' }]
            : []),
        ]
      : []);

  const data = {
    labels: chartItems.map((i) => i.label),
    datasets: [
      {
        data: chartItems.map((i) => i.amountUSD),
        backgroundColor: chartItems.map((i) => i.color),
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
            return ` ${label}: ${baseCurrency === 'USD' || !baseCurrency ? '$' : baseCurrency + ' '}${Math.round(value).toLocaleString()}`;
          },
        },
      },
    },
    cutout: '72%',
  };

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <Doughnut data={data} options={options} />
    </div>
  );
};
