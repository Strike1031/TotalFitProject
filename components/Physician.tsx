import React, { useState, useEffect, ReactNode } from "react";
import dynamic from "next/dynamic";

const PhysicianComponent: React.FC<{ value: any }> = ({ value }) => {
  const Chart: any = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });

  let heartData;
  var chartHeader = {
    options: {
      chart: {
        id: "HeartRate-bar",
      },
      xaxis: {
        categories: ["", "", "", "", "", "", ""],
      },
    },
    series: [
      {
        name: "series-1",
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ],
  };

  const [options, setOptions] = useState(chartHeader.options);
  const [series, setSeries] = useState(chartHeader.series);

  async function getUserHeartRate() {
    let baseUrl = "https://api.fitbit.com/1/user/";
    baseUrl = baseUrl + value.userName;
    baseUrl = baseUrl + "/activities/heart/date/today/7d.json";
    const response2 = await fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + value.access_token,
      },
    });

    const data = await response2.json();
    // console.log(data);
    heartData = data;
    // console.log("------heartData------");
    // console.log(heartData);
    chartHeader = {
      options: {
        chart: {
          id: "Date",
        },
        xaxis: {
          categories: [
            heartData["activities-heart"][0].dateTime,
            heartData["activities-heart"][1].dateTime,
            heartData["activities-heart"][2].dateTime,
            heartData["activities-heart"][3].dateTime,
            heartData["activities-heart"][4].dateTime,
            heartData["activities-heart"][5].dateTime,
            heartData["activities-heart"][6].dateTime,
          ],
        },
      },
      series: [
        {
          name: "HeartRate",
          data: [
            heartData["activities-heart"][0].value.heartRateZones[0].min,
            heartData["activities-heart"][1].value.heartRateZones[0].min,
            heartData["activities-heart"][2].value.heartRateZones[0].min,
            heartData["activities-heart"][3].value.heartRateZones[0].min,
            heartData["activities-heart"][4].value.heartRateZones[0].min,
            heartData["activities-heart"][5].value.heartRateZones[0].min,
            heartData["activities-heart"][6].value.heartRateZones[0].min,
          ],
        },
      ],
    };

    setOptions(chartHeader.options);
    setSeries(chartHeader.series);
  }

  useEffect(() => {
    getUserHeartRate();
  }, []);

  return (
    <div>
      <Chart options={options} series={series} type="line" width="500" />
    </div>
  );
};

export default PhysicianComponent;
