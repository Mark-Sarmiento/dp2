import React, { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { database } from '../../firebase';
import { ref, onValue } from "firebase/database";
import { UserAuth } from '../../context/AuthContext';
import DashboardBox from "./DashboardBox";


const CustomTooltip = ({ active, payload }) => {

  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    return (
      <div className="bg-white rounded p-2">
        <p className="text-gray-800 font-medium">Time: {dataPoint.time}</p>
        <p className="text-gray-800 font-medium">Value: {dataPoint.value}</p>
      </div>
    );
  }
  return null;
};

const LatestValue = ({ value }) => {
  return (
    <div className="value-container">
      <h3>Latest Value:</h3>
      <p>{value}</p>
    </div>
  );
};



const Tempplot = () => {
  const { user } = UserAuth();
  const [data, setData] = useState([]);
  const [color, setColor] = useState("#8884d8");
  const [areaColor, setAreaColor] = useState("url(#colorValue)");

      const [maxdata, setmaxdata] = useState(20);

  // START Function to update the grid columns based on the screen size
  const updatemaxdata = () => {
    if (window.innerWidth < 1100) {
      setmaxdata(8);
    }else if (window.innerWidth < 1200) {
      setmaxdata(10);
    }else if (window.innerWidth < 1300) {
      setmaxdata(12);
    }else if (window.innerWidth < 1400) {
      setmaxdata(14);
    }else if (window.innerWidth < 1500) {
      setmaxdata(16);
    } else if (window.innerWidth < 1600) {
      setmaxdata(18);
    }else {
      setmaxdata(20);
    }
  };

  useEffect(() => {
    // Update grid columns when the component mounts
    updatemaxdata();
    // Event listener to update grid columns on window resize
    window.addEventListener("resize", updatemaxdata);
    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updatemaxdata);
    };
  }, []);
  // END Function to update the grid columns based on the screen size

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/data/Temp`);
      onValue(dbRef, (snapshot) => {
        const firebaseData = snapshot.val();
        const chartData = [];

        let counter = 0;
        for (let key in firebaseData) {
          if (firebaseData.hasOwnProperty(key)) {
            chartData.push({
              name: key,
              value: firebaseData[key].Value,
              time: firebaseData[key].Time,
            });
            counter++;

            // Limit the number of data points to display
            if (counter >= maxdata) {
              chartData.shift();
            }
          }
        }

        setData(chartData);

        
        // Check the latest fetched data and update the color accordingly
        const latestValue = chartData[chartData.length - 1]?.value;
        if (latestValue < 50) {
          setColor("red"); // Change the line color to red if the latest value is below 50
          setAreaColor("url(#colorValueRed)"); // Change the area color to red gradient if the latest value is below 50
        } else {
          setColor("#8884d8"); // Reset the line color to the default if the latest value is 50 or above
          setAreaColor("url(#colorValue)"); // Reset the area color to the default gradient if the latest value is 50 or above
        }
      });
    };

    fetchData();
  }, [user?.uid, maxdata]);

  const currentValue = data.length > 0 ? data[data.length - 1].value : null;

  return (
    <div className=" absolute right-4 w-screen h-screen p-10 ">
      <p></p>
      <DashboardBox className="bg-gray-300 ml-4 px-4 " width="calc(87% - 100px)" height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 20,
              bottom: 20,
              left: 20,
              right: 20
            }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorValueRed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="red" stopOpacity={0.8} />
                <stop offset="95%" stopColor="red" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" domain={[0, "dataMax"]} />
            <YAxis dataKey="value" />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Tooltip content={<CustomTooltip />} />
            <Area type="linear" dataKey="value" stroke={color} fillOpacity={1} fill={areaColor} isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
      <LatestValue value={currentValue} />
    </div>
  );
};

export default Tempplot;
