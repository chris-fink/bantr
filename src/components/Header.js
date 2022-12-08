import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CgMenuRightAlt } from 'react-icons/cg';

function Header() {
  const user = JSON.parse(localStorage.getItem('bantr-user'));
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const menuItems = [

    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Add Post',
      path: '/addpost',
    },
    {
      title: 'Shares',
      path: '/share',
    },
    {
      title: 'Profile',
      path: `/profile/${user.id}`,
    },
  ];

  return (
    <div className='p-3 bg-secondary rounded-md  border-4 border-[#ffba08]'>
      {!showMenu && (
        <div className='md:flex justify-end mr-5 mt-5 hidden bg-secondary -mb-12'>
          <CgMenuRightAlt size={30} color='white' className='cursor-pointer' onClick={() => setShowMenu(true)} />
        </div>
      )}

      <div className='flex items-center justify-between'>

        <div>
          <h1 className='text-6xl font-semibold text-white ' id='logo'>bantr</h1>
          <span className='font-semibold p-2'>
            {user.email.substring(0, user.email.length - 10)}
          </span>
        </div>
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
          <h1
            className='text-gray-200 font-semibold cursor-pointer'
            onClick={() => {
              localStorage.removeItem('bantr-user');
              navigate('/login');
            }}
          >Logout</h1>
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
            <h1
              className='text-gray-200 font-semibold cursor-pointer'
              onClick={() => {
                localStorage.removeItem('bantr-user');
                navigate('/login');
              }}
            >Logout</h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header