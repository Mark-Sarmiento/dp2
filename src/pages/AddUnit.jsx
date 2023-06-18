import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, update } from 'firebase/database';
import { UserAuth } from '../context/AuthContext';
import spinach from '../assets/spinach.jpeg';
import petchay from '../assets/petchay.jpg';
import PopupForm from '../context/PopupForm';
import { useNavigate } from 'react-router-dom';

const AddUnit = () => {
  const { user } = UserAuth();
  const [showPopupForm, setShowPopupForm] = useState(true);
  const [selectedPlant, setSelectedPlant] = useState(localStorage.getItem('selectedPlant') || '');
  const navigate = useNavigate();

  const setPetchay = () => {
    const postPetchay = {
      slctdParam: 'Petchay',
      RHmin: 50,
      RHmax: 100,
      ECmin: 10,
      ECmax: 100,
      Tempmin: 50,
      Tempmax: 100,
      PHmin: 50,
      PHmax: 100,
      WTmin: 50,
      WTmax: 100,
      PHupmin: 50,
      PHupmax: 100,
      PHdownmin: 50,
      PHdownmax: 100,
      NSmin: 50,
      NSmax: 100,
      WRmin: 50,
      WRmax: 100,
      RSRVRmin: 50,
      RSRVRmax: 100,
      WFstate: true,
    };
    const updates = {};
    updates[`/Users/${user?.uid}/ESP1/Params`] = postPetchay;
    setSelectedPlant('Petchay');
    localStorage.setItem('selectedPlant', 'Petchay');
    setShowPopupForm(false);
    setTimeout(() => navigate('/dashboard'), 1000);
    return update(ref(database), updates);
  };

  const setSpinach = () => {
    const postSpinach = {
      slctdParam: 'Spinach',
      RHmin: 50,
      RHmax: 100,
      ECmin: 50,
      ECmax: 100,
      Tempmin: 50,
      Tempmax: 100,
      PHmin: 50,
      PHmax: 100,
      WTmin: 50,
      WTmax: 100,
      PHupmin: 50,
      PHupmax: 100,
      PHdownmin: 50,
      PHdownmax: 100,
      NSmin: 50,
      NSmax: 100,
      WRmin: 50,
      WRmax: 100,
      RSRVRmin: 50,
      RSRVRmax: 100,
      WFstate: false,
    };
    const updates = {};
    updates[`/Users/${user?.uid}/ESP1/Params`] = postSpinach;
    setSelectedPlant('Spinach');
    localStorage.setItem('selectedPlant', 'Spinach');
    setShowPopupForm(false);
    setTimeout(() => navigate('/dashboard'), 1000);
    return update(ref(database), updates);
  };

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

  return (
    <div className='bg-opacity-50'>
      {showPopupForm && <PopupForm onPetchay={setPetchay} onSpinach={setSpinach} />}
    </div>
  );
};

export default AddUnit;
