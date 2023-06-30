import React,{useState, useEffect} from "react";
import {database} from '../firebase';
import FirebaseData from '../components/FirebaseData';
import { UserAuth } from '../context/AuthContext';
import { ref, onValue, off, update } from "firebase/database";
import emailjs from "emailjs-com";
import spinach from '../assets/spinach.jpeg';
import petchay from '../assets/petchay.jpg';
import customsetbg from '../assets/customsetbg.jpg';
import PopupForm from '../context/PopupForm';
import { RiWaterFlashFill} from 'react-icons/ri';
import { WiHumidity } from 'react-icons/wi';
import { TbTemperatureCelsius } from 'react-icons/tb';
import { FaTemperatureHigh, FaWater } from 'react-icons/fa';
import {GiFertilizerBag, GiWaterSplash, GiWaterTank} from 'react-icons/gi'
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from "react-icons/bs";
import pHicon from "../assets/pHicon.png"
import DashboardBox from "../components/content/DashboardBox";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

emailjs.init("kTo0FMoCg9hTzN5Hn");


const Dashboard = () => {

  const { user } = UserAuth();
  const [selectedPlant, setSelectedPlant] = useState();


  useEffect(() => {
        const fetchData = async () => {
        const dbconf = ref(database, `Users/${user?.uid}/ESP1/Params/slctdParam`);
    
        const dbconfCallback = onValue(dbconf, (snapshot) => {
          const slctdParam = snapshot.val();
          setSelectedPlant(slctdParam);
        });
        // Clean up the listeners when component unmounts or when user?.uid changes
        return () => {
          off(dbconf, 'value', dbconfCallback);
        };
      };
      fetchData();

      const body = document.getElementsByTagName('body')[0];
      if (selectedPlant === 'Spinach') {
        body.style.backgroundImage = `url(${spinach})`;
        body.style.backgroundSize = 'cover';
      } else if (selectedPlant === 'Petchay') {
        body.style.backgroundImage = `url(${petchay})`;
        body.style.backgroundSize = 'cover';
      } else {
        body.style.backgroundImage = `url(${customsetbg})`;
        body.style.backgroundSize = 'cover';
      }
    }, [user?.uid, selectedPlant]);

  // Start EC current
  const [ecdata, setecData] = useState([]);
  const [ecmin, setecmin] = useState();
  const [eccolor, seteccolor] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/data/EC`);
      const dbconf = ref(database, `Users/${user?.uid}/ESP1/Params/ECmin`);
  
      const dbconfCallback = onValue(dbconf, (snapshot) => {
        const ECmin = snapshot.val();
        setecmin(ECmin);
      });
  
      const dbRefCallback = onValue(dbRef, (snapshot) => {
        const firebaseData = snapshot.val();
        const chartData = [];
  
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
               
              }
            }
          }
        }
  
        setecData(chartData);
        const currentValue = chartData[chartData.length - 1]?.value;
  
        if (currentValue > ecmin) {
          seteccolor('bg-green-700');
        } else {
          seteccolor('bg-rose-700');
        }
      });
  
      // Clean up the listeners when component unmounts or when user?.uid changes
      return () => {
        off(dbconf, 'value', dbconfCallback);
        off(dbRef, 'value', dbRefCallback);
      };
    };
  
    if (user?.uid) {
      fetchData();
    }
  }, [user?.uid, ecmin]);
  // End EC current

  // Start RH current
  const [rhdata, setrhData] = useState([]);
  const [rhmin, setrhmin] = useState();
  const [rhcolor, setrhcolor] = useState();
  useEffect(() => {
        const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/data/RH`);
      const dbconf = ref(database, `Users/${user?.uid}/ESP1/Params/RHmin`);
  
      const dbconfCallback = onValue(dbconf, (snapshot) => {
        const RHmin = snapshot.val();
        setrhmin(RHmin);
      });
  
      const dbRefCallback = onValue(dbRef, (snapshot) => {
        const firebaseData = snapshot.val();
        const chartData = [];
  
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
               
              }
            }
          }
        }
  
        setrhData(chartData);
        const currentValue = chartData[chartData.length - 1]?.value;
  
        if (currentValue > rhmin) {
          setrhcolor('bg-green-700');
        } else {
          setrhcolor('bg-rose-700');
        }
      });
  
      // Clean up the listeners when component unmounts or when user?.uid changes
      return () => {
        off(dbconf, 'value', dbconfCallback);
        off(dbRef, 'value', dbRefCallback);
      };
    };
  
    if (user?.uid) {
      fetchData();
    }
  }, [user?.uid, rhmin ]);
  // End RH current

  // Start Temp current
  const [tempdata, settempData] = useState([]);
  const [tempmin, settempmin] = useState();
  const [tempcolor, settempcolor] = useState();
   useEffect(() => {
        const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/data/Temp`);
      const dbconf = ref(database, `Users/${user?.uid}/ESP1/Params/Tempmin`);
  
      const dbconfCallback = onValue(dbconf, (snapshot) => {
        const TEMPmin = snapshot.val();
        settempmin(TEMPmin);
      });
  
      const dbRefCallback = onValue(dbRef, (snapshot) => {
        const firebaseData = snapshot.val();
        const chartData = [];
  
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
               
              }
            }
          }
        }
  
        settempData(chartData);
        const currentValue = chartData[chartData.length - 1]?.value;
  
        if (currentValue > tempmin) {
          settempcolor('bg-green-700');
        } else {
          settempcolor('bg-rose-700');
        }
      });
  
      // Clean up the listeners when component unmounts or when user?.uid changes
      return () => {
        off(dbconf, 'value', dbconfCallback);
        off(dbRef, 'value', dbRefCallback);
      };
    };
  
    if (user?.uid) {
      fetchData();
    }
  }, [user?.uid, tempmin]);
  // End Temp current

  // Start PH current 
  const [phdata, setphData] = useState([]);
  const [phmin, setphmin] = useState();
  const [phmax, setphmax] = useState();
  const [phcolor, setphcolor] = useState();
   useEffect(() => {
        const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/data/PH`);
      const dbconf = ref(database, `Users/${user?.uid}/ESP1/Params/PHmin`);
      const dbconf1 = ref(database, `Users/${user?.uid}/ESP1/Params/PHmax`);
  
      const dbconfCallback = onValue(dbconf, (snapshot) => {
        const PHmin = snapshot.val();
        setphmin(PHmin);
      });
      const dbconfCallback1 = onValue(dbconf1, (snapshot) => {
        const PHmax = snapshot.val();
        setphmax(PHmax);
      });
  
      const dbRefCallback = onValue(dbRef, (snapshot) => {
        const firebaseData = snapshot.val();
        const chartData = [];
  
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
               
              }
            }
          }
        }
  
        setphData(chartData);
        const currentValue = chartData[chartData.length - 1]?.value;
  
        if (currentValue > phmin && currentValue < phmax) {
          setphcolor('bg-green-700');
        } else {
          setphcolor('bg-rose-700');
        }
      });
  
      // Clean up the listeners when component unmounts or when user?.uid changes
      return () => {
        off(dbconf, 'value', dbconfCallback);
        off(dbconf, 'value', dbconfCallback1);
        off(dbRef, 'value', dbRefCallback);
      };
    };
  
    if (user?.uid) {
      fetchData();
    }
  }, [user?.uid, phmin,  phmax]);
  // End PH current

  // Start Water Temperature
  const [wtdata, setwtData] = useState([]);
  const [wtmin, setwtmin] = useState();
  const [wtcolor, setwtcolor] = useState();
   useEffect(() => {
      const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/data/WT`);
      const dbconf = ref(database, `Users/${user?.uid}/ESP1/Params/WTmin`);
  
      const dbconfCallback = onValue(dbconf, (snapshot) => {
        const WTmin = snapshot.val();
        setwtmin(WTmin);
      });
  
      const dbRefCallback = onValue(dbRef, (snapshot) => {
        const firebaseData = snapshot.val();
        const chartData = [];
  
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
               
              }
            }
          }
        }
  
        setwtData(chartData);
        const currentValue = chartData[chartData.length - 1]?.value;
  
        if (currentValue > wtmin) {
          setwtcolor('bg-green-700');
        } else {
          setwtcolor('bg-rose-700');
        }
      });
  
      // Clean up the listeners when component unmounts or when user?.uid changes
      return () => {
        off(dbconf, 'value', dbconfCallback);
        off(dbRef, 'value', dbRefCallback);
      };
    };
  
    if (user?.uid) {
      fetchData();
    }
  }, [user?.uid, wtmin]);
  // End Water Temperature

  // Start IRPHUP current
  const [phupdata, setphupData] = useState(); 
  const phuppercentage = parseFloat(((13.4-phupdata)/10.4)*100).toFixed(2);
  const [phupmin, setphupmin] = useState();
  const [phupcolor, setphupcolor] = useState();
  const [phupEmailSent, setPhupEmailSent] = useState(false);
  const phupPopMessage = 'pH UP solution is running low!';
  //Send warning message for pH up level 
  const SWEphuplowlevel = async () => {
    const templateParams = {
      to_email: `${user?.email}`,
      from_name: "Nutriculture team",
      to_name: `${user?.displayName}`,
      subject: "Warning: pH UP Level ",
      body: `The pH UP level is running low. \n Please refill your container quickly! \n \n Thank you `,
    };

    try {
      await emailjs.send("service_bi2u2dw", "template_e9yzocj", templateParams);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/data/IRPHUP/Value`);
      const dbconf = ref(database, `Users/${user?.uid}/ESP1/Params/PHupmin`);

      const dbconfCallback = onValue(dbconf, (snapshot) => {
        const PHUPmin = snapshot.val();
        setphupmin(PHUPmin);
      });
  
      const dbRefCallback = onValue(dbRef, (snapshot) => {
        const firebaseData = snapshot.val();
        setphupData(firebaseData);
      });

        if (phupdata < phupmin) {
          setphupcolor('bg-green-700');
          if (phupEmailSent === true){
            setPhupEmailSent(false);
          }
        } else {
          setphupcolor('bg-rose-700');
          if (phupEmailSent === false){
            if (phupdata != null){
              //SWEphuplowlevel();
              toast.warning(phupPopMessage, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 10000, // Close the pop-up after 3 seconds
              });
              setPhupEmailSent(true);
            }
          }
        }
      // Clean up the listeners when component unmounts or when user?.uid changes
      return () => {
        off(dbconf, 'value', dbconfCallback);
        off(dbRef, 'value', dbRefCallback);
      };
    };
  
    if (user?.uid) {
      fetchData();
    }
  }, [user?.uid, phupmin, phupdata, phupEmailSent]);
  // End IRPHUP current

  // Start IRPHDOWN current
  const [phdowndata, setphdownData] = useState(null); 
  const phdownpercentage = parseFloat(((13.4-phdowndata)/10.4)*100).toFixed(2);
  const [phdownmin, setphdownmin] = useState();
  const [phdowncolor, setphdowncolor] = useState();
  const [phdownEmailSent, setphdownEmailSent] = useState(false);
  const phdownPopMessage = 'pH Down solution is running low!';
  //Send warning message for pH down level 
  const SWEphdownlowlevel = async () => {
    const templateParams = {
      to_email: `${user?.email}`,
      from_name: "Nutriculture team",
      to_name: `${user?.displayName}`,
      subject: "Warning: pH down Level ",
      body: `The pH down level is running low. \n Please refill your container quickly! \n \n Thank you `,
    };

    try {
      await emailjs.send("service_bi2u2dw", "template_e9yzocj", templateParams);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/data/IRPHDOWN/Value`);
      const dbconf = ref(database, `Users/${user?.uid}/ESP1/Params/PHdownmin`);
  
      const dbconfCallback = onValue(dbconf, (snapshot) => {
        const PHDOWNmin = snapshot.val();
        setphdownmin(PHDOWNmin);
      });
  
      const dbRefCallback = onValue(dbRef, (snapshot) => {
        const firebaseData = snapshot.val();
        setphdownData(firebaseData);
      });

        if (phdowndata < phdownmin) {
          setphdowncolor('bg-green-700');
          if (phdownEmailSent === true){
            setphdownEmailSent(false);
          }
        } else {
          setphdowncolor('bg-rose-700');
          if (phdownEmailSent === false){
            if (phdowndata != null){
              //SWEphdownlowlevel();
              toast.warning(phdownPopMessage, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 10000, // Close the pop-up after 3 seconds
              });
              setphdownEmailSent(true);
            }
          }
        }
      // Clean up the listeners when component unmounts or when user?.uid changes
      return () => {
        off(dbconf, 'value', dbconfCallback);
        off(dbRef, 'value', dbRefCallback);
      };
    };
  
    if (user?.uid) {
      fetchData();
    }
  }, [user?.uid, phdownmin, phdowndata, phdownEmailSent]);
  // End IRPHDOWN current

  // Start Nutrient Solution Current
  const [nsdata, setnsData] = useState(null); 
  const nspercentage = parseFloat(((13.4-nsdata)/10.4)*100).toFixed(2);
  const [nsmin, setnsmin] = useState();
  const [nscolor, setnscolor] = useState();
  const [nsEmailSent, setnsEmailSent] = useState(false);
  const nsPopMessage = 'Nutrient solution is running low!';
    //Send warning message for Nutrient Solution level 
    const SWEnslowlevel = async () => {
      const templateParams = {
        to_email: `${user?.email}`,
        from_name: "Nutriculture team",
        to_name: `${user?.displayName}`,
        subject: "Warning: Nutrient Solution Level ",
        body: `The Nutrient Solution level is running low. \n Please refill your container quickly! \n \n Thank you `,
      };

      try {
        await emailjs.send("service_bi2u2dw", "template_e9yzocj", templateParams);
        console.log("Email sent successfully");
      } catch (error) {
        console.error("Error sending email:", error);
      }
    };
    useEffect(() => {
      const fetchData = async () => {
        const dbRef = ref(database, `Users/${user?.uid}/ESP1/data/IRFERTILIZER/Value`);
        const dbconf = ref(database, `Users/${user?.uid}/ESP1/Params/NSmin`);
    
        const dbconfCallback = onValue(dbconf, (snapshot) => {
          const NSmin = snapshot.val();
          setnsmin(NSmin);
        });
    
        const dbRefCallback = onValue(dbRef, (snapshot) => {
          const firebaseData = snapshot.val();
          setnsData(firebaseData);
        });

          if (nsdata < nsmin) {
            setnscolor('bg-green-700');
            if (nsEmailSent === true){
              setnsEmailSent(false);
            }
          } else {
            setnscolor('bg-rose-700');
            if (nsEmailSent === false){
               if (nsdata != null){
              //SWEnslowlevel();
              toast.warning(nsPopMessage, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 10000, // Close the pop-up after 10 seconds
              });
              setnsEmailSent(true);
            }
            }
          }
        // Clean up the listeners when component unmounts or when user?.uid changes
        return () => {
          off(dbconf, 'value', dbconfCallback);
          off(dbRef, 'value', dbRefCallback);
        };
      };
    
      if (user?.uid) {
        fetchData();
      }
    }, [user?.uid, nsmin, nsdata, nsEmailSent]);
  // End Nutrient Solution Current

// Start Water Refill current
const [wrdata, setwrData] = useState(null); 
const wrpercentage = parseFloat(((13.4-wrdata)/10.4)*100).toFixed(2);
const [wrmin, setwrmin] = useState();
const [wrcolor, setwrcolor] = useState();
const [wrEmailSent, setwrEmailSent] = useState(false)
const wrPopMessage = 'Water refill container is running low!';
//Send warning message for Water Refill level 
  const SWEwrlowlevel = async () => {
    const templateParams = {
      to_email: `${user?.email}`,
      from_name: "Nutriculture team",
      to_name: `${user?.displayName}`,
      subject: "Warning: Water Refill Level ",
      body: `The water refill level is running low. \n Please refill your container quickly! \n \n Thank you `,
    };

    try {
      await emailjs.send("service_bi2u2dw", "template_e9yzocj", templateParams);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/data/IRWATERUP/Value`);
      const dbconf = ref(database, `Users/${user?.uid}/ESP1/Params/WRmin`);
  
      const dbconfCallback = onValue(dbconf, (snapshot) => {
        const WRmin = snapshot.val();
        setwrmin(WRmin);
      });
  
      const dbRefCallback = onValue(dbRef, (snapshot) => {
        const firebaseData = snapshot.val();
        setwrData(firebaseData);
      });

        if (wrdata < wrmin) {
          setwrcolor('bg-green-700');
          if (wrEmailSent === true){
            setwrEmailSent(false);
          }
        } else {
          setwrcolor('bg-rose-700');
          if (wrEmailSent === false){
            if (wrdata != null){
              //SWEwrlowlevel();
              toast.warning(wrPopMessage, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 10000, // Close the pop-up after 10 seconds
              });
              setwrEmailSent(true);
            }
          }
        }
      // Clean up the listeners when component unmounts or when user?.uid changes
      return () => {
        off(dbconf, 'value', dbconfCallback);
        off(dbRef, 'value', dbRefCallback);
      };
    };
  
    if (user?.uid) {
      fetchData();
    }
  }, [user?.uid, wrmin, wrdata, wrEmailSent]);
// End Water Refill current

// Start Reservoir current
const [rsrvrdata, setrsrvrData] = useState(null); 
const rsrvrpercentage = parseFloat(((10-rsrvrdata)/5.5)*100).toFixed(2);
const [rsrvrmin, setrsrvrmin] = useState();
const [rsrvrcolor, setrsrvrcolor] = useState();
const [rsrvrEmailSent, setrsrvrEmailSent] = useState(false);
const rsrvrPopMessage = 'Water Reservoir is running low!';
  //Send warning message for Reservoir level 
  const SWErsrvrlowlevel = async () => {
    const templateParams = {
      to_email: `${user?.email}`,
      from_name: "Nutriculture team",
      to_name: `${user?.displayName}`,
      subject: "Warning: Reservoir Level ",
      body: `The Reservoir is running low. \n Please refill your container quickly! \n \n Thank you `,
    };

    try {
      await emailjs.send("service_bi2u2dw", "template_e9yzocj", templateParams);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/data/IRWATER/Value`);
      const dbconf = ref(database, `Users/${user?.uid}/ESP1/Params/RSRVRmin`);

      const dbconfCallback = onValue(dbconf, (snapshot) => {
        const RSRVRmin = snapshot.val();
        setrsrvrmin(RSRVRmin);
      });
  
      const dbRefCallback = onValue(dbRef, (snapshot) => {
        const firebaseData = snapshot.val();
        setrsrvrData(firebaseData);
      });

        if (rsrvrdata < rsrvrmin ) {
          setrsrvrcolor('bg-green-700');
          if (rsrvrEmailSent === true){
            setrsrvrEmailSent(false);
          }
        } else {
          setrsrvrcolor('bg-rose-700');
          if (rsrvrEmailSent === false){
            if (rsrvrdata != null){
              //SWErsrvrlowlevel();
              toast.warning(rsrvrPopMessage, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 10000, // Close the pop-up after 10 seconds
              });
              setrsrvrEmailSent(true);
            }
          }
        }
      // Clean up the listeners when component unmounts or when user?.uid changes
      return () => {
        off(dbconf, 'value', dbconfCallback);
        off(dbRef, 'value', dbRefCallback);
      };
    };
  
    if (user?.uid) {
      fetchData();
    }
  }, [user?.uid, rsrvrmin, rsrvrdata, rsrvrEmailSent]);
// End Reservoir current

// Water Flow
const [wfdata, setwfData] = useState(); 
const [wfstate, setwfstate] = useState(); 
const [wfcolor, setwfcolor] = useState()
const [wfEmailSent, setwfEmailSent] = useState (false)
const wfPopMessage = 'Water is not FLOWING!';
//Send warning message for Reservoir level 
  const SWEwffalse = async () => {
    const templateParams = {
      to_email: `${user?.email}`,
      from_name: "Nutriculture team",
      to_name: `${user?.displayName}`,
      subject: "Warning: Water Flow  ",
      body: `The Water Flow state is closed. \n Please check the Prototype immediately! \n \n Thank you `,
    };

    try {
      await emailjs.send("service_bi2u2dw", "template_e9yzocj", templateParams);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/data/WState/Value`);
      
      const dbRefCallback = onValue(dbRef, (snapshot) => {
        const firebaseData = snapshot.val();
        setwfstate(firebaseData);
      });

        if (wfstate >= 9000 ) {
          setwfcolor('bg-green-700');
          setwfData("Active")
          if (wfEmailSent === true){
            setwfEmailSent(false);
          }
        } else {
          setwfcolor('bg-rose-700');
          setwfData("Inactive")
          if (wfEmailSent === false){
            if (wfstate != null){
              //SWEwflowlevel();
              toast.warning(wfPopMessage, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 10000, // Close the pop-up after 3 seconds
              });
              setwfEmailSent(true);
            }
          }
        }
      // Clean up the listeners when component unmounts or when user?.uid changes
      return () => {
        off(dbRef, 'value', dbRefCallback);
      };
    };
  
    if (user?.uid) {
      fetchData();
    }
  }, [user?.uid, wfdata, wfstate, wfEmailSent]);

  const ECcurrent = ecdata.length > 0 ? ecdata[ecdata.length - 1].value : null;
  const RHcurrent = rhdata.length > 0 ? rhdata[rhdata.length - 1].value : null;
  const Tempcurrent = tempdata.length > 0 ? tempdata[tempdata.length - 1].value : null;
  const PHcurrent = phdata.length > 0 ? phdata[phdata.length - 1].value : null;
  const WTcurrent = wtdata.length > 0 ? wtdata[wtdata.length - 1].value : null;

  const [gridColumns, setGridColumns] = useState("grid-cols-5");

  // START Function to update the grid columns based on the screen size
  {/*
*/}
const updateGridColumns = () => {
  if (window.innerWidth < 655) {
    setGridColumns("grid-cols-1 ");
  } else if (window.innerWidth < 938) {
    setGridColumns("grid-cols-2 ");
  } else if (window.innerWidth < 1200) {
    setGridColumns("grid-cols-3");
  }else {
    setGridColumns("grid-cols-5 ");
  }
};
useEffect(() => {
  // Update grid columns when the component mounts
  updateGridColumns();
  // Event listener to update grid columns on window resize
  window.addEventListener("resize", updateGridColumns);
  // Cleanup the event listener when the component unmounts
  return () => {
    window.removeEventListener("resize", updateGridColumns);
  };
}, []);
// END Function to update the grid columns based on the screen size

  return (
    <>
      <div className="h-screen w-full right-0 ">
        <div className=" top-0 right-0 left-0 bg-gray-200 bg-opacity-50 ">
          <h1 className=" p-8 text-white">Dashboard</h1>
        </div>

        <div className="p-8  h-full pb-32">
            <DashboardBox  className=" bg-gray-300 ml-4  bg-opacity-50  h-full w-full border-2 border-black"  >
              <div className={` grid ${gridColumns}  gap-8 mx-auto   justify-center  p-4  h-full overflow-auto`} >
                <div className={`${eccolor} text-white p-4 rounded-2xl flex-grow `}>
                  <div className="flex justify-center items-center mb-2">
                    <RiWaterFlashFill className="text-5xl" />
                  </div>
                  <h3 className="text-center px-4">Electric Conductivity: </h3>
                  <p className="text-center px-4">{ECcurrent}</p>
                </div>
                <div className={`${rhcolor} text-white p-4 rounded-2xl  flex-grow`}>
                  <div className="flex justify-center items-center mb-2">
                    <WiHumidity className="text-5xl" />
                  </div>
                  <h3 className="text-center px-4">Relative Humidity: </h3>
                  <p className="text-center px-4">{RHcurrent}</p>
                </div>
                <div className={`${tempcolor} text-white p-4 rounded-2xl  flex-grow`}>
                  <div className="flex justify-center items-center mb-2">
                    <TbTemperatureCelsius className="text-5xl" />
                  </div>
                  <h3 className="text-center px-4">Temperature: </h3>
                  <p className="text-center px-4">{Tempcurrent}</p>
                </div>
                <div className={`${phcolor} text-white p-4 rounded-2xl  flex-grow`}>
                  <div className="flex justify-center items-center mb-2">
                    <img src={pHicon} alt="pH Level Icon" className="h-12 w-12" />
                  </div>
                  <h3 className="text-center px-4">PH Level: </h3>
                  <p className="text-center px-4">{PHcurrent}</p>
                </div>
                <div className={`${wtcolor} text-white p-4 rounded-2xl  flex-grow`}>
                  <div className="flex justify-center items-center mb-2">
                    <FaTemperatureHigh className="text-5xl" />
                  </div>
                  <h3 className="text-center px-4">Water Temperature: </h3>
                  <p className="text-center px-4">{WTcurrent}</p>
                </div>
                <div className={`${phupcolor} text-white p-4 rounded-2xl  flex-grow`}>
                  <div className="flex justify-center items-center mb-2">
                    <BsFillArrowUpCircleFill className="text-5xl" />
                  </div>
                  <h3 className="text-center px-4">PH Up Level: </h3>
                  <p className="text-center px-4 py-2">{phuppercentage} %</p>
                </div>
                <div className={`${phdowncolor} text-white p-4 rounded-2xl  flex-grow`}>
                  <div className="flex justify-center items-center mb-2">
                    <BsFillArrowDownCircleFill className="text-5xl" />
                  </div>
                  <h3 className="text-center px-4">PH Down Level: </h3>
                  <p className="text-center px-4">{phdownpercentage} %</p>
                </div>
                <div className={`${nscolor} text-white p-4 rounded-2xl  flex-grow`}>
                  <div className="flex justify-center items-center mb-2">
                    <GiFertilizerBag className="text-5xl" />
                  </div>
                  <h3 className="text-center px-4">Nutrient Soln Level: </h3>
                  <p className="text-center px-4">{nspercentage} %</p>
                </div>
                <div className={`${wrcolor} text-white p-4 rounded-2xl  flex-grow`}>
                  <div className="flex justify-center items-center mb-2">
                    <GiWaterSplash className="text-5xl" />
                  </div>
                  <h3 className="text-center px-4">Water Refill Level: </h3>
                  <p className="text-center px-4"> {wrpercentage} %</p>
                </div>
                <div className={`${rsrvrcolor} text-white p-4 rounded-2xl  flex-grow`}>
                  <div className="flex justify-center items-center mb-2">
                    <GiWaterTank className="text-5xl" />
                  </div>
                  <h3 className="text-center px-4">Reservoir Level: </h3>
                  <p className="text-center px-4">{rsrvrpercentage} %</p>  
                </div>
                <div className={`${wfcolor} text-white p-4 rounded-2xl  flex-grow`}>
                  <div className="flex justify-center items-center mb-2">
                    <FaWater className="text-5xl" />
                  </div>
                  <h3 className="text-center px-4">Water Flow: </h3>
                  <p className="text-center px-4">{wfdata}</p>
                </div>
              </div>
            </DashboardBox>
        </div>
          <div className="fixed bottom-0">
            <FirebaseData  />
          </div>
      </div>
    </>
    );
    };
 
export default Dashboard;
