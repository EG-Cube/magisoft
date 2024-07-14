import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../../styles/PieChart.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ sales, operations, accounting }) => {
  // Data for the pie chart
  const data = {
    labels: ["Sales", "Operations", "Accounting"],
    datasets: [
      {
        label: "",
        data: [sales, operations, accounting], // Use the passed props for data values
        backgroundColor: ["#652361", "#F3BF39", "#9E7C9C"],
        hoverBackgroundColor: ["#652361", "#F3BF39", "#9E7C9C"],
      },
    ],
  };

  // Options for the pie chart
  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 10, // Adjust the font size here
          },
        },
      },
    },
  };

  return (
    <div>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;