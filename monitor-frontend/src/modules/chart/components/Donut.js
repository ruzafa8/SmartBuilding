import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const d = ({labels,data}) => ({
  labels,
  datasets: [
    {
      label: '# of Votes',
      data,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)'
      ],
      borderWidth: 1,
    },
  ],
});

const Donut = ({labels,data}) => <Doughnut data={d({labels,data})} />;

export default Donut;