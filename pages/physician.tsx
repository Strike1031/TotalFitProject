import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const PhysicianPage: React.FC<{}> = (props) => {
  const Chart: any = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });
  let tempHeartData = [];
  let [heartData, setHeartData] = useState(tempHeartData);
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

  async function getUserHeartRate1() {
    await fetch("http://localhost:5000/physician").then(async (response) => {
      let userData = await response.json();
      // console.log(userData);
      for (let i = 0; i < userData.length; i++) {
        let baseUrl = "https://api.fitbit.com/1/user/";
        baseUrl = baseUrl + userData[i].userName;
        baseUrl = baseUrl + "/activities/heart/date/today/7d.json";
        const response2 = await fetch(baseUrl, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + userData[i].access_token,
          },
        });

        const data = await response2.json();
        // console.log(data);
        tempHeartData.push(data);
        setHeartData(tempHeartData);
      }
    });
    console.log("------heartData------");
    console.log(heartData);
    chartHeader = {
      options: {
        chart: {
          id: "Date",
        },
        xaxis: {
          categories: [
            heartData[0]["activities-heart"][0].dateTime,
            heartData[0]["activities-heart"][1].dateTime,
            heartData[0]["activities-heart"][2].dateTime,
            heartData[0]["activities-heart"][3].dateTime,
            heartData[0]["activities-heart"][4].dateTime,
            heartData[0]["activities-heart"][5].dateTime,
            heartData[0]["activities-heart"][6].dateTime,
          ],
        },
      },
      series: [
        {
          name: "HeartRate",
          data: [
            heartData[0]["activities-heart"][0].value.heartRateZones[0].max,
            heartData[0]["activities-heart"][1].value.heartRateZones[0].max,
            heartData[0]["activities-heart"][2].value.heartRateZones[0].max,
            heartData[0]["activities-heart"][3].value.heartRateZones[0].max,
            heartData[0]["activities-heart"][4].value.heartRateZones[0].max,
            heartData[0]["activities-heart"][5].value.heartRateZones[0].max,
            heartData[0]["activities-heart"][6].value.heartRateZones[0].max,
          ],
        },
      ],
    };

    setOptions(chartHeader.options);
    setSeries(chartHeader.series);
  }

  useEffect(() => {
    getUserHeartRate1();
  }, []);

  return (
    <div>
      <h2>User Heart Rate Time Series by Date</h2>
      {heartData.map((item, key) => {
        console.log(item);
        return (
          <div key={key}>
            <Chart options={options} series={series} type="line" width="500" />
          </div>
        );
      })}
    </div>
  );
};

export default PhysicianPage;
