import React from "react";
import {
  Chart as ChartJs,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
ChartJs.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Charts = ({
  barChartData,
  pieChartData,
  carUser,
  pieChartColors,
  carMakerBrand,
  carCountModelCount,
  handleAgeChange,
}) => {
  const data = {
    labels: ["Mon", "Tue", "Wed"],
    datasets: [
      {
        label: "Number of Car in Country",
        data: barChartData,
        backgroundColor: "aqua",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };
  const pieData = {
    labels: "",
    datasets: [
      {
        label: "User Car Age",
        data: pieChartData,
        backgroundColor: pieChartColors,
        useRandomColors: true,
        borderColor: "blue",
        borderWidth: 1,
      },
    ],
  };
  const pieCarData = {
    labels: carMakerBrand,
    datasets: [
      {
        label: "Brand",
        data: carCountModelCount,
        backgroundColor: pieChartColors,
        useRandomColors: true,
        borderColor: "blue",
        borderWidth: 1,
      },
    ],
  };
  const options = {};
  return (
    <div>
      <h1>CHARTS</h1>
      <Bar data={data} options={options} />
      <div className="pie-container">
        <label htmlFor="choice">DROPDOWN</label>
        <select
          name="choice"
          onChange={handleAgeChange}
          defaultValue="default"
          id="choice"
        >
          <option value="default">Select</option>
          <option value="first">10-15</option>
          <option value="second">15-20</option>
          <option value="third">20-25</option>
          <option value="fourth">25-30</option>
          <option value="fifth">30-35</option>
        </select>
        <Pie data={pieData} options={options} />
      </div>
      <div className="pie-container">
        <Pie data={pieCarData} options={options} />
      </div>
    </div>
  );
};

export default Charts;
