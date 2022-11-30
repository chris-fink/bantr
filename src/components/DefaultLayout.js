import React from 'react';
import Header from './Header';

function DefaultLayout(props) {
  return (
    <div className='mx-20 my-5 md:mx-5'>
        <Header />
        <div className="content mt-5 border-4 border-[#ffba08] h-[85vh] rounded-md p-5 bg-white">{props.children}</div>
    </div>
  )
}

export default DefaultLayout