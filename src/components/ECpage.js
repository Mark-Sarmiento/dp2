import React, {useState, useEffect} from 'react';
import {database} from '../firebase';
import { ref, onValue, off } from "firebase/database";
import spinach from '../assets/spinach.jpeg';
import petchay from '../assets/petchay.jpg';
import { UserAuth } from '../context/AuthContext.js';
import ECplot from './content/ECplot';

const ECpage = () => {
  const {user} = UserAuth();
  // START Retain the background even when reloading the page
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
      }, [user?.uid, selectedPlant]);

      useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    if (selectedPlant === 'Spinach') {
      body.style.backgroundImage = `url(${spinach})`;
      body.style.backgroundSize = 'cover';
    } else if (selectedPlant === 'Petchay') {
      body.style.backgroundImage = `url(${petchay})`;
      body.style.backgroundSize = 'cover';
    } else {
      body.style.backgroundImage = '';
    }
  }, [selectedPlant]);
  // END Retain the background even when reloading the page
  return (
    <div className='overflow-y-hidden'>
      <h1 className="pt-6 pl-4 bg-white bg-opacity-50 p-8">Electric Conductivity Graph</h1>
      <div className="m-auto w-screen h-screen">
        <div className='relative'>
          <ECplot/>
        </div>
      </div>
    </div>
  );
};

export default ECpage;