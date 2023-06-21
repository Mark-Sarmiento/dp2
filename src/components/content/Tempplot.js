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

const LatestValueRH = ({ value }) => {
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
  const [tempmin, settempmin] = useState();
  const [color, setColor] = useState("#8884d8");
  const [areaColor, setAreaColor] = useState("url(#colorValue)");
  const [maxData, setMaxData] = useState(20);

  const updateMaxData = () => {
    if (window.innerWidth < 1100) {
      setMaxData(8);
    } else if (window.innerWidth < 1200) {
      setMaxData(10);
    } else if (window.innerWidth < 1300) {
      setMaxData(12);
    } else if (window.innerWidth < 1400) {
      setMaxData(14);
    } else if (window.innerWidth < 1500) {
      setMaxData(16);
    } else if (window.innerWidth < 1600) {
      setMaxData(18);
    } else {
      setMaxData(20);
    }
  };

  useEffect(() => {
    updateMaxData();
    window.addEventListener("resize", updateMaxData);
    return () => {
      window.removeEventListener("resize", updateMaxData);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/data/Temp`);
      const dbconf = ref(database, `Users/${user?.uid}/ESP1/Params/Tempmin`);

      const dbconfCallback = onValue(dbconf, (snapshot) => {
        const Tempmin = snapshot.val();
        settempmin(Tempmin);
      });

      onValue(dbRef, (snapshot) => {
        const firebaseData = snapshot.val();
        const chartData = [];

        let counter = 0;
        for (let date in firebaseData) {
          if (firebaseData.hasOwnProperty(date)) {
            const children = firebaseData[date];
            for (let time in children) {
              if (children.hasOwnProperty(time)) {
                const value = children[time].Value;
                const dataPoint = {
                  time: time,
                  value: value,
                };
                chartData.push(dataPoint);
                counter++;

                if (counter >= maxData) {
                  chartData.shift();
                }
              }
            }
          }
        }

        setData(chartData);

        const latestValue = chartData[chartData.length - 1]?.value;
        if (latestValue < tempmin) {
          setColor("red");
          setAreaColor("url(#colorValueRed)");
        } else {
          setColor("#8884d8");
          setAreaColor("url(#colorValue)");
        }
      });
    };

    fetchData();
  }, [user?.uid, maxData, tempmin]);

  const currentValue = data.length > 0 ? data[data.length - 1].value : null;

  return (
    <div className="absolute right-4 w-screen h-screen p-10">
      <DashboardBox className="bg-gray-300 ml-4 px4" width="calc(87% - 100px)" height={300}>
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
      <LatestValueRH value={currentValue} />
    </div>
  );
};

export default Tempplot;
