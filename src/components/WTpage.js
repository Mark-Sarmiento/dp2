import React from 'react';
import { ResponsiveContainer } from 'recharts';
import WTplot from './content/WTplot';

const WTpage = () => {
  return (
    <div className=' m-auto chart-container'>
      <h1 className="pt-6 pl-4 bg-white bg-opacity-50 p-8">PH Level</h1>
      <div className=" m-auto w-screen h-screen">
        <div className='relative'>
          <WTplot/>
        </div>
      </div>
    </div>
  );
};

export default WTpage;