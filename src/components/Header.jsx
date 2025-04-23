import React from 'react';
import {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';

const Header = () => {
  return (
      <header class name="header ">
            <div class name="menu-icon">
                <BsJustify className='icon'/>
            </div>

            <div className='header-left'>
                <BsSearch className='icon'/>              
            </div>

            <div className='header-right'>
                <BsFillBellFill className='icon'/>              
                <BsFillEnvelopeFill className='icon'/>              
                <BsPersonCircle className='icon'/>              
            </div>

        </header>
  )
}

export default Header