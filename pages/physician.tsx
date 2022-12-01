import React, { useEffect } from "react";
import dynamic from "next/dynamic";

const PhysicianPage: React.FC<{}> = (props) => {

    const VisGraph2d: any = dynamic(() => import("react-visjs-graph2d"), {
        ssr: false,
    });

  const getUserHeartRate = () => {
    const userData = fetch("http://localhost:5000/physician").then(response => response.json())
    .then(data => {
      console.log(data);
      data.forEach( element => {
        console.log(element.userName+"/"+element.access_token);
        let baseUrl = "https://api.fitbit.com/1/user/";
        baseUrl = baseUrl + element.userName;
        baseUrl = baseUrl +  "/activities/heart/steps/date/today/1m.json";
        fetch(baseUrl, {
            headers: {
                'authorization': "Bearer "+element.access_token
            }
        })
        .then(response => response.json())
        .then(data => {
           console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
      });
    })
    .catch(err => {
      console.log(err);
    });

  }
  useEffect( () => {
    getUserHeartRate();
  }, []);

  return <div>
    User Heart Rate Time Series by Date
  </div>;
};

export default PhysicianPage;