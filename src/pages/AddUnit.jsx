import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, update, onValue, off } from 'firebase/database';
import { UserAuth } from '../context/AuthContext';
import spinach from '../assets/spinach.jpeg';
import petchay from '../assets/petchay.jpg';
import PopupForm from '../context/PopupForm';
import { useNavigate } from 'react-router-dom';

const AddUnit = () => {
  const { user } = UserAuth();
  const [showPopupForm, setShowPopupForm] = useState(localStorage.getItem('showPopupForm') || true);
  const [selectedPlant, setSelectedPlant] = useState();
  const navigate = useNavigate();

  const setPetchay = () => {
    const postPetchay = {
      slctdParam: 'Petchay',
      RHmin: 40,
      RHmax: 70,
      ECmin: parseFloat(1.6),
      ECminwopad: parseFloat(1.5),
      ECmax: parseFloat(2),
      Tempmin:18,
      Tempmax: 34,
      PHmin:  parseFloat(5.8),
      PHmax:  parseFloat(6.2),
      PHminwopad: parseFloat(5.5),
      PHmaxwopad: parseFloat(6.5),
      WTmin: 18,
      WTmax: 34,
      PHupmin: 8,
      PHupmax:3,
      PHdownmin: 8,
      PHdownmax: 3,
      NSmin: 8,
      NSmax: 3,
      WRmin: 8,
      WRmax:3,
      RSRVRmin: 7,
      RSRVRmax: 4,
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
      Tempmin: 7,
      Tempmax: 24,
      PHmin: 50,
      PHmax: 100,
      WTmin: 50,
      WTmax: 100,
      PHupmin: 8,
      PHupmax:3,
      PHdownmin: 8,
      PHdownmax: 3,
      NSmin: 8,
      NSmax: 3,
      WRmin: 8,
      WRmax:3,
      RSRVRmin: 7,
      RSRVRmax: 4,
    };
    const updates = {};
    updates[`/Users/${user?.uid}/ESP1/Params`] = postSpinach;
    setSelectedPlant('Spinach');
    localStorage.setItem('selectedPlant', 'Spinach');
    setShowPopupForm(false);
    setTimeout(() => navigate('/dashboard'), 1000);
    return update(ref(database), updates);
  };

  const cancelPopupForm = () =>{
    setShowPopupForm(false);
    setTimeout(() => navigate('/dashboard'), 1000);
  }

  const [param1, setparam1] = useState('')
  const setCustom = () => {

  const handleInputChange = (event) => {
    setparam1(event.target.value);
  };

  const saveCustomParam = () => {
    const postCustom = {
      slctdParam: param1,
    };

    const updates = {};
    updates[`/Users/${user?.uid}/ESP1/Params`] = postCustom;
    setSelectedPlant(param1);
    localStorage.setItem('selectedPlant', param1);
    setShowPopupForm(false);
    setTimeout(() => navigate('/dashboard'), 1000);
    return update(ref(database), updates);
  };

  return (
    <>
      <div className='bg-gray-700'>
        <div className='text-white'>
          <input
            type='text'
            id='slctdParam'
            value={param1}
            onChange={handleInputChange}
          />
          <button onClick={saveCustomParam}>Save</button>
        </div>
      </div>
    </>
  );
  }

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
        body.style.backgroundImage = '';
      }
    }, [user?.uid, selectedPlant]);

  return (
    <div className='bg-opacity-50'>
      {showPopupForm && <PopupForm
          onPetchay={setPetchay}
          onSpinach={setSpinach}
          onCancel={cancelPopupForm}
          onCustom={setCustom}
        >
        </PopupForm>}
    </div>
  );
};

export default AddUnit;
