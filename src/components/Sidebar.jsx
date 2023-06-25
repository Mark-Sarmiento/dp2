import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { RiDashboardFill, RiPlantFill, RiLogoutBoxRLine } from 'react-icons/ri';
import { BsArrowLeftShort, BsPlusLg, BsChevronDown } from 'react-icons/bs';
import { NavLink,  Outlet,  HashRouter } from 'react-router-dom';

const Sidebar = ({children}) => {
  const { logOut, user } = UserAuth();
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const menuItem = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: <RiDashboardFill />,
    },
    {
      path: '/setparameters',
      name: 'Set Parameters',
      icon: <BsPlusLg />,
    },
    
    {
      name: 'Sensors',
      icon: <RiPlantFill />,
      submenu: true,
      submenuItems: [
        {
          path: '/sensors/humidity',
          name: 'Humidity',
        },
        {
          path: '/sensors/temperature',
          name: 'Temperature',
        },
        {
          path: '/sensors/ECsensor',
          name: 'EC Sensor',
        },
        {
          path: '/sensors/PHLevel',
          name: 'PH Level',
        },
        {
          path: '/sensors/WaterTemp',
          name: 'Water Temperature',
        },
      ],
    },
  ];

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
      <div className={`inline-flex `}>
        <div
          className={`bg-dark-purple h-screen  p-5 pt-8 relative bottom-0  ${
            open ? 'w-72 ' : 'w-20'
          } ${!user && 'hidden'} duration-300`}
        >
          <BsArrowLeftShort
            className={`border border-dark-purple cursor-pointer bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 ${
              !open && 'rotate-180'
            } duration-500`}
            onClick={() => setOpen(!open)}
          />
          <div className="inline-flex ">
            <img
              className={`${
                open && 'rotate-[360deg]'
              } duration-500 mr-2 rounded-full bg-white bg-opacity-30  w-10 h-10  border shadow-lg shadow-blue-500/50`}
              src={`${user?.photoURL}`}
              alt="Profile"
            />
            <p className={`text-white origin-left text-xl font-medium  duration-300 ${!open && 'scale-0'}`}>
              {user?.displayName}
            </p>
          </div>
          <div>
            {menuItem.map((item, index) => (
              <div key={index}>
                {item.submenu ? (
                  <div
                    className={`cursor-pointer text-gray-300 text-sm flex items-center gap-x-4  p-2 hover:bg-light-white rounded-md mt-2`}
                    onClick={() => setSubmenuOpen(!submenuOpen)}
                  >
                    <div className={`text-2xl block float-left duration-500 ${!open && 'rotate-[360deg]'}`}>
                      {item.icon}
                    </div>
                    <div className={`text-base font-medium flex-1 duration-300 ${!open && 'hidden'}`}>
                      {item.name}
                    </div>
                    <BsChevronDown
                      className={`text-2xl block float-right duration-500 ${!open && 'rotate-[360deg]'}`}
                    />
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    className={`cursor-pointer text-gray-300 text-sm flex items-center gap-x-4  p-2 hover:bg-light-white rounded-md mt-2`}
                  >
                    <div className={`text-2xl block float-left duration-500 ${!open && 'rotate-[360deg]'}`}>
                      {item.icon}
                    </div>
                    <div className={`text-base font-medium flex-1 duration-300 ${!open && 'hidden'}`}>
                      {item.name}
                    </div>
                  </NavLink>
                )}

                {/* Render the submenu items */}
                {submenuOpen && item.submenu && (
                  <div className={`ml-6 mt-2`}>
                    {item.submenuItems.map((subItem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={subItem.path}
                        className={`cursor-pointer text-gray-300 text-sm flex items-center gap-x-4  p-2 hover:bg-light-white rounded-md`}
                      >
                        <div className={`text-base font-medium duration-300 ${!open && 'hidden'}`}>
                          {subItem.name}
                        </div>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className={`cursor-pointer text-gray-300 text-sm flex items-center gap-x-4  p-2 hover:bg-light-white rounded-md mt-2`}
              onClick={handleSignOut}>
              <RiLogoutBoxRLine className={`text-2xl block float-left duration-500 ${!open && 'rotate-[360deg]'}`} />
              <p className={`text-base font-medium flex-1 duration-300 ${!open && 'hidden'}`}>Logout</p>
            </div>
          </div>
        </div>

        {/* Render the children components */}
        
        <Outlet />
        <div className='inline-flex '>
          {children}
        </div>
        
      </div>
  );
};

export default Sidebar;
