import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import homebg2 from '../assets/homepage2.mp4';

const Home = () => {
  const {user} = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user != null) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  

  return (
    <div className='fixed bottom-0 w-screen h-screen  overflow-hidden '>
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
    </div>
  )
}

export default Home