import React from 'react';
import { ResponsiveContainer } from 'recharts';
import Tempplot from './content/Tempplot';

const Temppage = () => {
  return (
    <div className=' m-auto chart-container'>
      <h1 className="pt-6 pl-4">Temperature</h1>
      <div className=" m-auto w-screen h-screen">
        <ResponsiveContainer width="100%" height="100%">
          <Tempplot/>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Temppage;