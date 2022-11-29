import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CgMenuRightAlt } from 'react-icons/cg'

function Header() {
  const location = useLocation()
  const [showMenu, setShowMenu] = useState(false);
  const menuItems = [

    {
      title: 'Home',
      path: '/'
    },
    {
      title: 'Add Post',
      path: '/addpost'
    },
    {
      title: 'Shares',
      path: '/shares'
    },
    {
      title: 'Profile',
      path: '/profile'
    }
  ];

  return (
    <div className='p-2 bg-primary'>
      {!showMenu && (
        <div className='md:flex justify-end mr-5 mt-5 hidden bg-primary -mb-8'>
          <CgMenuRightAlt size={30} color='white' className='cursor-pointer' onClick={() => setShowMenu(true)} />
        </div>
      )}

      <div className='flex items-center justify-between'>

        <h1 className='text-2xl font-semibold text-white'>bantr</h1>
        {/*web view */}
        <div className="flex space-x-10 justify-end items-center md:flex-col md:items-end md:space-y-5 md:hidden">
          {menuItems.map((item) => {
            return (
              <Link
                to={`${item.path}`}
                className={`text-gray-200 font-semibold  
              ${item.path === location.pathname &&
                  'bg-white text-gray-700 rounded py-1 px-3'
                  }`}
                onClick={() => setShowMenu(false)}
              >
                {item.title}
              </Link>
            );
          })}
        </div>

        {/*mobile view */}
        {showMenu && (
          <div className="md:flex space-x-10 justify-end  flex-col items-end space-y-5 hidden">
            {menuItems.map((item) => {
              return <Link to={`${item.path}`} className={`
                                          text-gray-200 
                                          font-semibold 
                                          ${item.path === location.pathname && 'bg-white text-gray-700 rounded py-1 px-3'}`}>
                {item.title}
              </Link>
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Header