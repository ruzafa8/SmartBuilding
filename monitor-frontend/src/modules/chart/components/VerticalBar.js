import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = (values) => {

  const max = Math.max.apply(null,values);
  const colors = values.map(value => `rgba(255, 99, 132, ${value/max})`);
  
  return ({
  labels: ['0:00 - 0:59', '1:00 - 1:59', '2:00 - 2:59', '3:00 - 3:59', '4:00 - 4:59'
  , '5:00 - 5:59', '6:00 - 6:59', '7:00 - 7:59', '8:00 - 8:59', '9:00 - 9:59', '10:00 - 10:59'
  , '11:00 - 11:59', '12:00 - 12:59', '13:00 - 13:59', '14:00 - 14:59', '15:00 - 15:59'
  , '16:00 - 16:59', '17:00 - 17:59', '18:00 - 18:59', '19:00 - 19:59', '20:00 - 20:59'
  , '21:00 - 21:59', '22:00 - 22:59', '23:00 - 23:59'],
  datasets: [
    {
      label: '# of detections',
      data: values,
      backgroundColor: colors,
      borderColor: [
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1,
    },
  ],
});
}
const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const VerticalBar = ({values}) => <Bar data={data(values)} options={options} />;

export default VerticalBar;