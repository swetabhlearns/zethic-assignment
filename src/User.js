import React, { useEffect } from "react";
import { faker } from "@faker-js/faker";
import { useState } from "react";
import {
  Chart as ChartJs,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import InfiniteList from "./InfiniteList";
import Charts from "./Charts";
import ModelWiseData from "./ModelWiseData";

ChartJs.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function User() {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [pieChartColors, setPieChartsColor] = useState([]);
  const [carUser, setCarUser] = useState([]);
  const [carCountModelCount, setCarModelCount] = useState([]);
  const [carMakerBrand, setCarMakerBrand] = useState([]);
  const [modelWiseUserData, setModelWiseUserData] = useState({});
  const [filterData, setFilterData] = useState([]);

  const handleAgeChange = (event) => {
    if (event.target.value === "first") {
      const newArr = filterData.filter((data) => data < 15);
      setPieChartData(newArr);
    }
    if (event.target.value === "second") {
      const newArr = filterData.filter((data) => data > 15 && data < 20);
      setPieChartData(newArr);
    }
    if (event.target.value === "third") {
      const newArr = filterData.filter((data) => data > 20 && data < 25);
      setPieChartData(newArr);
    }
    if (event.target.value === "fourth") {
      const newArr = filterData.filter((data) => data > 25 && data < 30);
      setPieChartData(newArr);
    }
    if (event.target.value === "fifth") {
      const newArr = filterData.filter((data) => data > 30 && data < 35);
      setPieChartData(newArr);
    }
  };

  const createUser = () => {
    return {
      id: faker.datatype.uuid(),
      randomColor: faker.color.rgb(),
      name: faker.name.fullName(),
      address: faker.address.streetAddress(),
      country: faker.address.country(),
      sex: faker.name.sexType(),
      phone: faker.phone.number("+91 91 ### ## ##"),
      job: faker.name.jobTitle(),
      vehicleInfo: {
        company: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        age: faker.datatype.number({ min: 10, max: 40 }),
      },
    };
  };

  useEffect(() => {
    createUsers(100).then((data) => {
      const createPieAgeData = data.map((idData) => idData.vehicleInfo.age);
      setFilterData(createPieAgeData);
      const createPieColor = data.map((color) => color.randomColor);
      const createCarUser = data.map((user) => user.name);
      const countryData = {};
      const carModelData = {};
      const carModelCount = {};
      const carModelUsers = {};
      const carModelCountMaker = [];
      const createCarMakerData = [];
      for (let i = 0; i < 6; i++) {
        createCarMakerData[i] = data[i].vehicleInfo.company;
      }
      setCarMakerBrand(createCarMakerData);
      data.map((barData) => {
        const { country } = barData;
        if (countryData[country]) countryData[country] += 1;
        else countryData[country] = 1;
      });
      const barData = Object.keys(countryData).map((data) => {
        return { x: data, y: countryData[data] };
      });

      data.map((el) => {
        const {
          name,
          vehicleInfo: { model },
        } = el;
        if (carModelUsers[model]) {
          carModelUsers[model].push(name);
        } else {
          carModelUsers[model] = [name];
        }
      });
      setModelWiseUserData(carModelUsers);
      data.map((carModel) => {
        const {
          vehicleInfo: { model, company },
        } = carModel;
        if (carModelData[company]) carModelData[model] = model;
        else carModelData[company] = model;
      });
      // console.log(carModelData);
      const carModel = Object.keys(carModelData).map((data) => {
        if (createCarMakerData.includes(data)) {
          if (carModelCount[data]) {
            carModelCount[data] += 1;
          } else {
            carModelCount[data] = 1;
          }
        }
        return { x: data, y: carModelData[data] };
      });
      for (const car in carModelCount) {
        carModelCountMaker.push(carModelCount[car]);
      }
      // console.log(carModelCountMaker);
      setCarModelCount(carModelCountMaker);
      setBarChartData(barData);
      const createPieCarData = data.map((carData) => ({
        company: carData.vehicleInfo.company,
        model: carData.vehicleInfo.model,
      }));
      setPieChartData(createPieAgeData);
      setPieChartsColor(createPieColor);
      setCarUser(createCarUser);
    });

    setLoading(false);
  }, []);

  const createUsers = async (numUsers = 10) => {
    setLoading(true);
    let userData = await new Array(numUsers).fill().map(createUser);
    if (userData) {
      setInfo(userData);
    }
    return userData;
  };

  return (
    <div>
      <h1>REACT VIRTUALISED LIST</h1>
      <InfiniteList info={info} />
      <div className="pie-container">
        {/* <Pie data={pieCarData} options={options} /> */}
        <Charts
          barChartData={barChartData}
          pieChartData={pieChartData}
          carUser={carUser}
          pieChartColors={pieChartColors}
          carCountModelCount={carCountModelCount}
          carMakerBrand={carMakerBrand}
          handleAgeChange={handleAgeChange}
        />
        <h1>MODEL WISE DATA</h1>
        <ModelWiseData modelWiseUserData={modelWiseUserData} />
      </div>
    </div>
  );
}
