import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PhysicianComponent from "../components/Physician";

const PhysicianPage: React.FC<{}> = (props) => {
  const Chart: any = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });
  const EmptyArray = [];
  let [userData, SetUserData] = useState(EmptyArray);

  async function getUserHeartRate() {
    await fetch("http://localhost:5000/physician").then(async (response) => {
      const data = await response.json();
      SetUserData(data);
      // console.log(userData);
    });
  }

  useEffect(() => {
    getUserHeartRate();
  }, []);

  return (
    <div>
      <h2>User Heart Rate Time Series by Date</h2>
      {userData.map((item, key) => {
        return (
          <div key={key}>
            <PhysicianComponent value={item} />
          </div>
        );
      })}
    </div>
  );
};

export default PhysicianPage;
