import React from 'react';
import Header from './Header';
import { useSelector } from 'react-redux';
import Loader from './Loader';
import logo from './afc-richmond-logo.png';

function DefaultLayout(props) {
  const { loading } = useSelector(store => store);
  return (
    <div className='mx-20 my-5 md:mx-5'>
      {loading && <Loader />}
      <Header />
      <div className="content mt-5 border-4 border-[#ffba08] h-[70vh] rounded-md p-5 bg-white">{props.children}</div>
      <div className='flex justify-center items-center'>
        <h1 className='text-black font-semibold'>Bantr is a proud sponsor of:  </h1>
        <img
          src={logo}
          alt='logo'
          className='h-20 w-20 mt-5'
        />
      </div>
    </div>
  )
}

export default DefaultLayout