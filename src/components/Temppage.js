import React from 'react';
import Tempplot from './content/Tempplot';

const Temppage = () => {
  return (
    <div className=' m-auto chart-container'>
      <h1 className="pt-6 pl-4 bg-white bg-opacity-50 p-8">Temperature Graph</h1>
      <div className=" m-auto w-screen h-screen">
        <div className='relative'>
          <Tempplot/>
        </div>
      </div>
    </div>
  );
};

export default Temppage;