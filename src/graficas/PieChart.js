import React from 'react';
import {Pie} from 'react-chartjs-2';

export const PieChart = ({chartData}) => {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Grafica de incidencia</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: ""
            }
          }
        }}
      />
    </div>
  )
}
