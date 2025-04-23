import React, { useContext } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import {ThemeContext} from '../context/ThemeContextProvider';

const Navbar = () => {

  const {theme, toggleTheme} = useContext(ThemeContext);

  return (
    <div className=' bg-green-50 text-gray-900 border border-gray-300 p-2 flex justify-between items-center dark:bg-[#071c00] dark:text-gray-100 dark:border-black'>
       <h2 className='text-4xl font-semibold ml-3 my-4'>AgriConnect</h2>

       <button className='text-2xl mr-4 p-2 hover:text-gray-400 duration-200' onClick={toggleTheme}>
          { theme === 'dark' ? <FaSun/> : <FaMoon />}
       </button>
    </div>
  )
}

export default Navbar;