import React from 'react';
import RHplot from './content/RHplot';
import FirebaseData from './FirebaseData';

const RHpage = () => {
  return (
    <div className=' m-auto chart-container'>
      <h1 className="pt-6 pl-4 bg-white bg-opacity-50 p-8">Relative Humidity Graph</h1>
      <div className=" m-auto w-screen h-screen">
        <div className='relative'>
          <RHplot />
        </div>

        <FirebaseData/>
      </div>
    </div>
  );
};

export default RHpage;
