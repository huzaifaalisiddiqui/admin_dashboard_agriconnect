import React, { useState } from 'react';
import { FaShoppingCart, FaSignOutAlt, FaTachometerAlt, FaUsers } from 'react-icons/fa';
import { FaUserGroup, FaWheatAwn } from 'react-icons/fa6';


const Sidebar = ({ setActiveComponent }) => {
const [activeItem, setActiveItem] = useState('Dashboard'); // Default active item

  const menuItems = [
    { id: 'Dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { id: 'Orders', icon: <FaShoppingCart />, label: 'Orders' },
    { id: 'Farmers', icon: <FaUserGroup />, label: 'Farmers' },
    { id: 'Customers', icon: <FaUsers />, label: 'Customers' },
    { id: 'Crops', icon: <FaWheatAwn />, label: 'Crops' },
    { id: 'Logout', icon: <FaSignOutAlt />, label: 'Logout' },
  ];

  const handleMenuClick = (id) => {
    setActiveItem(id);
    setActiveComponent(id); // Update the active component in App.jsx
  };

  return (
    <div className='bg-[#0d3705e5] text-white h-screen px-2 fixed w-16 md:w-64 border-r border-gray-200 dark:bg-[#071c00] dark:text-gray-100 dark:border-[#071c00]'>
      <h1 className='text-2xl font-bold hidden md:block my-8 text-center'>Welcome Admin!</h1>
      <ul className='flex flex-col mt-5 text-l font-semibold'>
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={`text-lg flex border-b border-gray-500 items-center py-4 px-3 space-x-4 hover:rounded hover:cursor-pointer duration-200 ${
              activeItem === item.id ? 'bg-green-700 text-white rounded' : 'hover:text-white hover:bg-green-800'
            }`}
            onClick={() => handleMenuClick(item.id)}
          >
            {item.icon}
            <span className='hidden md:inline'>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;