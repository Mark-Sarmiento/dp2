import React from 'react';
import { ResponsiveContainer } from 'recharts';
import PHplot from './content/PHplot';

const PHpage = () => {
  return (
    <div className=' m-auto chart-container'>
      <h1 className="pt-6 pl-4">PH Level</h1>
      <div className=" m-auto w-screen h-screen">
        <ResponsiveContainer width="100%" height="100%">
          <PHplot/>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PHpage;