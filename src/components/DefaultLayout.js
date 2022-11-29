import React from 'react';
import Header from './Header';

function DefaultLayout(props) {
  return (
    <div>
        <Header />
        <div className="content">{props.children}</div>
    </div>
  )
}

export default DefaultLayout