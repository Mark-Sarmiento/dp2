import React from 'react';

const Account = () => {
  


  return (
    <div>

    </div>

  );
};

export default Account;




{/*
<div className='inline-flex'>
      <div className={`bg-dark-purple h-screen p-5 pt-8 relative ${open ? "w-72" : "w-20"} duration-300`}>
        <BsArrowLeftShort  className={`border border-dark-purple cursor-pointer bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 ${!open && "rotate-180"} duration-500`} onClick={()=>setOpen(!open)}/>
        <div className='inline-flex '>
          <img className={`${open && "rotate-[360deg]"} duration-500 mr-2 rounded-full bg-white bg-opacity-30  w-10 h-10  border shadow-lg shadow-blue-500/50`} src={`${user?.photoURL}`}/>
          <p className={`text-white origin-left text-xl font-medium  duration-300 ${!open && "scale-0"}`}>{user?.displayName}</p>
        </div>
        <ul className='pt-2'>

          {Menus.map((menu,index)=>(
            <>
              <li  key={index} className={`cursor-pointer text-gray-300 text-sm flex items-center gap-x-4  p-2 hover:bg-light-white rounded-md mt-2 ${menu.spacing ? "mt-9" : "mt-2"} `}>
                
                <span className={`text-2xl block float-left duration-500 ${!open && "rotate-[360deg]"}`}>
                  {menu.icon ? menu.icon : <RiDashboardFill  />}
                </span>

                <span  className={`text-base font-medium flex-1 duration-300 ${!open &&"hidden"}`}>
                  {menu.title} 
                  <span  onClick={handleSignOut}>{menu.logout }</span>
                </span>
                
                {menu.submenu && open && (
                  <BsChevronDown onClick={()=>setSubmenuOpen(!submenuOpen) } className={`${submenuOpen && "rotate-180"} text-2xl  `}  />
                )}
                
              </li>

              {menu.submenu && submenuOpen && open && (
                  <ul>
                    {menu.submenuItems.map ((submenuItem,index)=>(
                      <li key={index} className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounderd-md">
                        {submenuItem.title}
                      </li>
                    ))}
                  </ul>
                )}
              
            </>
          ))}

        </ul>
      </div>
      
      <main>
        {children}
      </main>
      

      

  </div>

*/}