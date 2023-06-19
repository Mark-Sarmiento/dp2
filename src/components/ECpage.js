import React from 'react';
import { ResponsiveContainer } from 'recharts';
import ECplot from './content/ECplot';

const ECpage = () => {
  return (
    <div className=' '>
      <h1 className="pt-6 pl-4 bg-white bg-opacity-50 p-8">Electric Conductivity</h1>
      <div className=" ">
          <ECplot/>
      </div>
    </div>
  );
};

export default ECpage;