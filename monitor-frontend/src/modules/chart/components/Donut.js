import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const d = ({labels,data}) => ({
  labels,
  datasets: [
    {
      label: '# of Votes',
      data,
      backgroundColor: [
        'rgba(83, 197, 191, 1)',
        'rgba(197, 64, 89, 1)'
      ],
      borderColor: [
        'rgba(83, 197, 191, 1)',
        'rgba(197, 89, 89, 1)'
      ],
      borderWidth: 1,
    },
  ],
});

const Donut = ({labels,data}) => <Doughnut data={d({labels,data})} />;

export default Donut;