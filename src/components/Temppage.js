import React from 'react';
import Tempplot from './content/Tempplot';

const Temppage = () => {
  return (
    <div className=' m-auto chart-container'>
      <h1 className="pt-6 pl-4 bg-white bg-opacity-50 p-8">Temperature</h1>
      <div className=" m-auto w-screen h-screen">
          <Tempplot/>
      </div>
    </div>
  );
};

export default Temppage;