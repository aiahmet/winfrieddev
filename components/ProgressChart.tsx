"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ProgressChartProps {
  attempts: { [key: number]: number };
  completedExercises: number[];
}

export function ProgressChart({ attempts, completedExercises }: ProgressChartProps) {

  const data = {
    labels: ['Exercise 1', 'Exercise 2', 'Exercise 3', 'Exercise 4'],
    datasets: [
      {
        label: 'Attempts',
        data: [attempts[1] || 0, attempts[2] || 0, attempts[3] || 0, attempts[4] || 0],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Completed',
        data: [
          completedExercises.includes(1) ? 1 : 0,
          completedExercises.includes(2) ? 1 : 0,
          completedExercises.includes(3) ? 1 : 0,
          completedExercises.includes(4) ? 1 : 0
        ],
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Exercise Progress Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="w-full">
      <Bar data={data} options={options} />
    </div>
  );
}