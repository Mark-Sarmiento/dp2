import React from 'react';

const PopupForm = ({ onPetchay, onSpinach }) => {


  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500'>
      <div className="text-white">
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
        </div>
      </div>
    </div>
  );
};

export default PopupForm;
