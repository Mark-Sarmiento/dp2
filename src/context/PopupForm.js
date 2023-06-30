import React, { useState } from 'react';
import { UserAuth } from './AuthContext';
import { ref, update } from 'firebase/database';
import { database } from '../firebase';
import { useNavigate } from 'react-router-dom';

const PopupForm = ({ onPetchay, onSpinach, onCancel }) => {
  const { user } = UserAuth();
  const navigate = useNavigate();
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customValues, setCustomValues] = useState({
    slctdParam: '',
    RHmin: '',
    RHmax: '',
    ECmin: '',
    ECmax: '',
    Tempmin: '',
    Tempmax: '',
    PHmin: '',
    PHmax: '',
    WTmin: '',
    WTmax: '',
    PHupmin: '',
    PHupmax: '',
    PHdownmin: '',
    PHdownmax: '',
    NSmin: '',
    NSmax: '',
    WRmin: '',
    WRmax: '',
    RSRVRmin: '',
    RSRVRmax: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const saveCustomValues = (event) => {
    event.preventDefault();
    const updates = {};
    updates[`/Users/${user?.uid}/ESP1/Params`] = customValues;
    setShowCustomForm(false);
    setTimeout(() => navigate('/dashboard'), 1000);
    update(ref(database), updates);
  };

  const cancelCustomForm = () => {
    setShowCustomForm(false);
  }
  // ...

return (
  <div className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500'>
    <div className='text-white'>
      <h2 className='text-center'>Before redirecting to dashboard</h2>
      <br />
      <p className='text-center'>Please choose the configuration that is being set.</p>
      <br />
      <div className='flex gap-12 justify-center'>
        <div className='border rounded bg-black opacity-50 p-2 hover:scale-150'>
            <button onClick={onPetchay}>Petchay</button>
          </div>
          <div className='border rounded bg-black opacity-50 p-2 hover:scale-150'>
            <button onClick={onSpinach}>Spinach</button>
          </div>
          <div className='border rounded bg-black opacity-50 p-2 hover:scale-150'>
            <button onClick={() => setShowCustomForm(true)}>Custom Set</button>
          </div>
          <div className='border rounded bg-black opacity-50 p-2 hover:scale-150'>
            <button onClick={onCancel}>Cancel</button>
          </div>
      </div>
      <div className='py-10 h-full '>
      {showCustomForm && (
        <div className='fixed top-10 left-0 right-0 bottom-0 pb-10 h-full flex  justify-center bg-gray-500 '>
          <form onSubmit={saveCustomValues} className='bg-black border-2 mb-10 border-white p-4 overflow-y-auto'>
            <h3 className='text-center p-4 text-2xl '>Custom Values</h3>
            <div className='grid grid-cols-2 gap-4'>
              {/* Plant Name */}
              <div className='text-right'>
                <label htmlFor='slctdParam' className='text-white'>
                  Plant Name:
                </label>
              </div>
              <div>
                <input
                  type='text'
                  id='slctdParam'
                  name='slctdParam'
                  placeholder='Selected Parameter'
                  value={customValues.slctdParam}
                  onChange={handleInputChange}
                  className='my-2 text-black w-64'
                  required
                />
              </div>
              {/* RH min */}
              <div className='text-right'>
                <label htmlFor='RHmin' className='text-white'>
                  RH min:
                </label>
              </div>
              <div>
                <input
                  type='number'
                  id='RHmin'
                  name='RHmin'
                  placeholder='minimum relative humidity'
                  value={customValues.RHmin}
                  onChange={handleInputChange}
                  className='my-2 text-black w-64'
                  required
                />
              </div>
              {/* RH max */}
              <div className='text-right'>
                <label htmlFor='RHmax' className='text-white'>
                  RH max:
                </label>
              </div>
              <div>
                <input
                  type='number'
                  id='RHmax'
                  name='RHmax'
                  placeholder='maximum relative humidity'
                  value={customValues.RHmax}
                  onChange={handleInputChange}
                  className='my-2 text-black w-64'
                  required
                />
              </div>
              {/* EC min */}
              <div className='text-right'>
                <label htmlFor='ECmin' className='text-white'>
                  EC min:
                </label>
              </div>
              <div>
                <input
                  type='number'
                  id='ECmin'
                  name='ECmin'
                  placeholder='minimmum electrical conductivity'
                  value={customValues.ECmin}
                  onChange={handleInputChange}
                  className='my-2 text-black w-64'
                  required
                />
              </div>
              {/* EC max */}
              <div className='text-right'>
                <label htmlFor='ECmax' className='text-white'>
                  EC max:
                </label>
              </div>
              <div>
                <input
                  type='number'
                  id='ECmax'
                  name='ECmax'
                  placeholder='maximum electrical conductivity'
                  value={customValues.ECmax}
                  onChange={handleInputChange}
                  className='my-2 text-black w-64'
                  required
                />
              </div>
              {/* Temp min */}
              <div className='text-right'>
                <label htmlFor='Tempmin' className='text-white'>
                  Temp min:
                </label>
              </div>
              <div>
                <input
                  type='number'
                  id='Tempmin'
                  name='Tempmin'
                  placeholder='minimum temperature'
                  value={customValues.Tempmin}
                  onChange={handleInputChange}
                  className='my-2 text-black w-64'
                  required
                />
              </div>
              {/* Temp max */}
              <div className='text-right'>
                <label htmlFor='Tempmax' className='text-white'>
                  Temp max:
                </label>
              </div>
              <div>
                <input
                  type='number'
                  id='Tempmax'
                  name='Tempmax'
                  placeholder='maximum temperature'
                  value={customValues.Tempmax}
                  onChange={handleInputChange}
                  className='my-2 text-black w-64'
                  required
                />
              </div>
              {/* PH min */}
              <div className='text-right'>
                <label htmlFor='PHmin' className='text-white'>
                  PH min:
                </label>
              </div>
              <div>
                <input
                  type='number'
                  id='PHmin'
                  name='PHmin'
                  placeholder='minimum pH level'
                  value={customValues.PHmin}
                  onChange={handleInputChange}
                  className='my-2 text-black w-64'
                  required
                />
              </div>
              {/* PH max */}
              <div className='text-right'>
                <label htmlFor='PHmax' className='text-white'>
                  PH max:
                </label>
              </div>
              <div>
                <input
                  type='number'
                  id='PHmax'
                  name='PHmax'
                  placeholder='maximum pH level'
                  value={customValues.PHmax}
                  onChange={handleInputChange}
                  className='my-2 text-black w-64'
                  required
                />
              </div>
              {/* WT min */}
              <div className='text-right'>
                <label htmlFor='WTmin' className='text-white'>
                  WT min:
                </label>
              </div>
              <div>
                <input
                  type='number'
                  id='WTmin'
                  name='WTmin'
                  placeholder='minimum water temperature'
                  value={customValues.WTmin}
                  onChange={handleInputChange}
                  className='my-2 text-black w-64'
                  required
                />
              </div>
              {/* WT max */}
              <div className='text-right'>
                <label htmlFor='WTmax' className='text-white'>
                  WT max:
                </label>
              </div>
              <div>
                <input
                  type='number'
                  id='WTmax'
                  name='WTmax'
                  placeholder='maximum water temperature'
                  value={customValues.WTmax}
                  onChange={handleInputChange}
                  className='my-2 text-black w-64'
                  required
                />
              </div>
              {/* PHup min */}
              <div className='text-right'>
                <label htmlFor='PHupmin' className='text-white'>
                  PHup min:
                </label>
              </div>
              <div>
                <input
                  type='number'
                  id='PHupmin'
                  name='PHupmin'
                  placeholder='dt from sensor to liquid level in cm'
                  value={customValues.PHupmin}
                  onChange={handleInputChange}
                  className='my-2 text-black w-64'
                  required
                />
              </div>
              {/* PHup max */}
              <div className='text-right'>
                <label htmlFor='PHupmax' className='text-white'>
                  PHup max:
                </label>
              </div>
              <div>
                <input
                  type='number'
                  id='PHupmax'
                  name='PHupmax'
                  placeholder='dt from sensor to liquid level in cm'
                  value={customValues.PHupmax}
                  onChange={handleInputChange}
                  className='my-2 text-black w-64'
                  required
                />
              </div>
              {/* PHdown min */}
              <div className='text-right'>
                <label htmlFor='PHdownmin' className='text-white'>
                  PHdown min:
                </label>
              </div>
              <div>
                <input
                  type='number'
                  id='PHdownmin'
                  name='PHdownmin'
                  placeholder='dt from sensor to liquid level in cm'
                  value={customValues.PHdownmin}
                  onChange={handleInputChange}
                  className='my-2 text-black w-64'
                  required
                />
              </div>
              {/* PHdown max */}
              <div className='text-right'>
                <label htmlFor='PHdownmax' className='text-white'>
                  PHdown max:
                </label>
              </div>
              <div>
                <input
                  type='number'
                  id='PHdownmax'
                  name='PHdownmax'
                  placeholder='dt from sensor to liquid level in cm'
                  value={customValues.PHdownmax}
                  onChange={handleInputChange}
                  className='my-2 text-black w-64'
                  required
                />
              </div>
              {/* NS min */}
              <div className='text-right'>
                <label htmlFor='NSmin' className='text-white'>
                  NS min:
                </label>
              </div>
              <div>
                <input
                  type='number'
                  id='NSmin'
                  name='NSmin'
                  placeholder='dt from sensor to liquid level in cm'
                  value={customValues.NSmin}
                  onChange={handleInputChange}
                  className='my-2 text-black w-64'
                  required
                />
              </div>
              {/* NS max */}
              <div className='text-right'>
                <label htmlFor='NSmax' className='text-white'>
                  NS max:
                </label>
              </div>
              <div>
                <input
                  type='number'
                  id='NSmax'
                  name='NSmax'
                  placeholder='dt from sensor to liquid level in cm'
                  value={customValues.NSmax}
                  onChange={handleInputChange}
                  className='my-2 text-black w-64'
                  required
                />
              </div>
              {/* WR min */}
              <div className='text-right'>
                <label htmlFor='WRmin' className='text-white'>
                  Water Refill min:
                </label>
              </div>
              <div>
                <input
                  type='number'
                  id='WRmin'
                  name='WRmin'
                  placeholder='dt from sensor to liquid level in cm'
                  value={customValues.WRmin}
                  onChange={handleInputChange}
                  className='my-2 text-black w-64'
                  required
                />
              </div>
              {/* WR max */}
              <div className='text-right'>
                <label htmlFor='WRmax' className='text-white'>
                  Water Refill max:
                </label>
              </div>
              <div>
                <input
                  type='number'
                  id='WRmax'
                  name='WRmax'
                  placeholder='dt from sensor to liquid level in cm'
                  value={customValues.WRmax}
                  onChange={handleInputChange}
                  className='my-2 text-black w-64'
                  required
                />
              </div>
              {/* RSRVR min */}
              <div className='text-right'>
                <label htmlFor='RSRVRmin' className='text-white'>
                  Reservoir min:
                </label>
              </div>
              <div>
                <input
                  type='number'
                  id='RSRVRmin'
                  name='RSRVRmin'
                  placeholder='dt from sensor to liquid level in cm'
                  value={customValues.RSRVRmin}
                  onChange={handleInputChange}
                  className='my-2 text-black w-64'
                  required
                />
              </div>
              {/* RSRVR max */}
              <div className='text-right'>
                <label htmlFor='RSRVRmax' className='text-white'>
                  Reservoir max:
                </label>
              </div>
              <div>
                <input
                  type='number'
                  id='RSRVRmax'
                  name='RSRVRmax'
                  placeholder='dt from sensor to liquid level in cm'
                  value={customValues.RSRVRmax}
                  onChange={handleInputChange}
                  className='my-2 text-black w-64'
                  required
                />
              </div>
            </div>
            <div className='flex justify-center gap-4'>
              <button type='submit' className='bg-white text-black px-4 py-2 mt-4'>
                Submit
              </button>
              <button onClick={cancelCustomForm} className='bg-white text-black px-4 py-2 mt-4'>
                Cancel
              </button>
            </div>
            
          </form>
        </div>
      )}
      </div>
    </div>
  </div>
);

};

export default PopupForm;
