//READ ME
//This is just for my reference of knowledge

{/*
import React, {useState, useEffect}from 'react';
import { database } from '../firebase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ref,  onValue, off, child, push, orderByKey, query, orderByChild} from 'firebase/database';
import { UserAuth } from '../context/AuthContext';

const PlotRH = () => {
    const {user} = UserAuth();
    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState(null);
    
    //const RHsort = query(ref(database, '/Users/' + `${user?.uid}` + '/ESP1/RH/'+ RHkeys), orderByKey('Value'));
    // For Graph in Relative Humidity 
    useEffect(() => {
        const RHval = '/Users/' + `${user?.uid}` + '/ESP1/RH/Value';
        const RHtime = '/Users/' + `${user?.uid}` + '/ESP1/RH/Time';
        const ODCrhval = (snapshot) => {
            const fetchedData1 = snapshot.val();
            setData1(fetchedData1);
        };
        const ODCrhtime = (snapshot) => {
            const fetchedData2 = snapshot.val();
            setData2(fetchedData2);
        }
        const dataRef1 = ref(database, RHval);
        const dataRef2 = ref(database, RHtime);
        onValue(dataRef1, ODCrhval);
        onValue(dataRef2, ODCrhtime);
        return () => {
            off(dataRef1, ODCrhval);
            off(dataRef2, ODCrhtime);
        };
    }, [user?.uid]);
    // For Graph in Relative Humidity

     const [fbData, setFbData] = useState([]);
         const [chartLabels, setChartLabels] = useState([1]);
         useEffect(() => {
             let data = [];
             let labels = [];
             fbData.map((item, index) => {
             data.push(item.Value);
             labels.push(item.Time);
             });
             if (data) {
             setChartLabels(labels);
             setChartData(data);
             }
         }, [fbData]);
 
         const [chartData, setChartData] = useState([]);
     
         useEffect(() => {
           if (fbData) {
             const timer = setTimeout(() => addData(), 1000);
             return () => clearTimeout(timer);
           }
         }, [fbData]);
       
         const addData = () => {
           let d = [];
           d = [...chartData];
           if (d.length > 0) {
             d.push(fbData[fbData.length - 1]);
             if (d.length > 10) d.shift();
             setChartData([...d]);
           } else {
             if (fbData.length > 20) setChartData(fbData.slice(-10));
             else setChartData([...fbData]);
           }
         };
     
    const RHSamp =() =>{
        const RHval = '/Users/' + `${user?.uid}` + '/ESP1/RH/data/Value';
        let table =[]
        table=[...chartData];
        if (table.length >0){
            table.push(ref(database, RHval))
            if (table.length >10 ) table.shift();
        }
        else {
            if (RHval.length > 20) setChartData(RHval.slice(-10));
            else setChartData([...RHval]);
        }
    }

    const RH  = [
        { name: data2, uv: 4000, pv: data1 },
        { name: data2, uv: 3000, pv: data1 },
        { name: data2, uv: 2000, pv: data1 },
        { name: data2, uv: 5000, pv: data1 },
      ];
    
        
    return (
        <>
            <ResponsiveContainer width="100%" height="50%">
                <LineChart
                width={500}
                height={300}
                data={RHSamp}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 5 }} />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
    }


export default PlotRH;
 */}