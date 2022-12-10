import React from 'react';
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
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '운동 그래프',
    },
  },
};

const data = {
  labels: ['08.16', '08.22', '08.24', '08.26', '08.28', '08.30', '09.01'],
  datasets: [
    {
      label: 'PushUp',
      data: ['50', '43', '44', '46', '51', '56', '63'],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'PullUp',
      data: ['20', '21', '22', '24', '25', '26', '26'],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

function DashboradPage() {
  return <Line options={options} data={data} />;
}

export default DashboradPage;
