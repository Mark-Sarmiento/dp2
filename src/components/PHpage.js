import React from 'react';
import PHplot from './content/PHplot';

const PHpage = () => {
  return (
    <div className=' m-auto chart-container'>
      <h1 className="pt-6 pl-4 bg-white bg-opacity-50 p-8">PH Level</h1>
      <div className=" m-auto w-screen h-screen">
        <div className='relative'>
          <PHplot/>
        </div>
      </div>
    </div>
  );
};

export default PHpage;