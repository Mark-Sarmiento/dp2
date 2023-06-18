import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import Protected from './components/Protected';
import { AuthContextProvider } from './context/AuthContext';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard'
import AddUnit from './pages/AddUnit'
import Sidebar from './components/Sidebar';
import RHpage from './components/RHpage';
import './app.css'
import ECpage from './components/ECpage';
import Temppage from './components/Temppage';
import PHpage from './components/PHpage';
import WTpage from './components/WTpage';

function App() {
  return (
    <div className='h-screen overflow-y-hidden mx-auto '>
      <AuthContextProvider>
        
        <Routes>
          
          <Route path='/signin' element={<Signin />} />
        </Routes>
          <Sidebar>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path="/dashboard" element={<Protected> <Dashboard/> </Protected>}/>
              <Route path="/setparameters" element={<Protected> <AddUnit/> </Protected>}/>
              <Route path="/sensors/humidity" element={<Protected> <RHpage/> </Protected>}/>
              <Route path="/sensors/temperature" element={<Protected> <Temppage/> </Protected>}/>
              <Route path="/sensors/ECsensor" element={<Protected> <ECpage/> </Protected>}/>
              <Route path="/sensors/PHLevel" element={<Protected> <PHpage/> </Protected>}/>
              <Route path="/sensors/WaterTemp" element={<Protected> <WTpage/> </Protected>}/>
            </Routes>
          </Sidebar>
        
      </AuthContextProvider>
    </div>
  );
}

export default App;