import React from 'react';
import { ResponsiveContainer } from 'recharts';
import ECplot from './content/ECplot';

const ECpage = () => {
  return (
    <div className='overflow-y-hidden'>
      <h1 className="pt-6 pl-4 bg-white bg-opacity-50 p-8">Electric Conductivity</h1>
      <div className="m-auto w-screen h-screen">
        <div className='relative'>
          <ECplot/>
        </div>
      </div>
    </div>
  );
};

export default ECpage;