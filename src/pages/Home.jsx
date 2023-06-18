import React from 'react';
import { Link } from 'react-router-dom';
//import { UserAuth } from '../context/AuthContext';
//import homebg from '../assets/homepage.mp4';
import homebg2 from '../assets/homepage2.mp4';

const Home = () => {

  return (
    <div className='w-full h-screen relative '>
      <div className='flex justify-between items-center h-20 px-4 absolute z-10 text-white'>
        <h1>Nutriculture</h1>
      </div>
      <video className='w-full h-full object-cover bg-fill' src={homebg2} autoPlay loop muted/>
      <div className='absolute w-full h-full top-0 left-0 bg-gray-900/50'></div>
      <div className='absolute top-0 w-full h-full flex flex-col justify-center text-center text-white p-4'>
        <h1>Automated Farming</h1>
        <h2>Agriculture with a New Skill </h2>

        <div className='py-8'>
          <Link  className='inline-block shadow-2xl bg-white opacity-60 hover:opacity-100 px-12 text-black font-bold text-2xl font-serif' to='/signin'>Get Started</Link>
        </div>
        
      </div>


















      {/*<video className=' videoTag' autoPlay loop muted>
        <source src={homebg} type='video/mp4'/>
        <source src={homebg2} type='video/mp4'/>
      </video>

      <div className='overlay'>

      </div>
      <div className='text'>
        <h2>Tagline</h2>
        <h3>here</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec.</p>
        <Link   to='/signin'>Get Started</Link>
      </div>

      <div className='text-left py-8 px-12'>
        <h1 className=' text-3xl font-bold  text-white' >Home Page</h1>
        <Link  className='absolute text-center text-3xl font-bold py-8 text-white' to='/signin'>Get Started</Link>
  </div>*/}
      
    </div>
  )
}

export default Home