import React from 'react';
import RHplot, {LatestValueRH} from './content/RHplot';
import { ResponsiveContainer } from 'recharts';

const RHpage = () => {
  return (
    <div className=' m-auto chart-container'>
      <h1 className="pt-6 pl-4">Relative Humidity Graph</h1>
      <div className=" m-auto w-screen h-screen">
        <ResponsiveContainer width="100%" height="100%">
          <RHplot />
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RHpage;
