import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'pie.css';

const chartData = {
    labels: ['Label 1', 'Label 2', 'Label 3'],
    values: [30, 40, 30], 
    colors: ['#FF5733', '#33FF57', '#5733FF'], 
  };

  return (
    <div className="pie">
      <h1>Pie Chart</h1>
      <PieChart data={chartData} />
    </div>
  );
}

const PieChart = ({ data }) => {
  return (
    <div>
      <Pie
        data={{
          labels: data.labels, // An array of labels
          datasets: [
            {
              data: data.values, // An array of data values
              backgroundColor: data.colors, // An array of colors
            },
          ],
        }}
      />
    </div>
  );
};

export default PieChart;
