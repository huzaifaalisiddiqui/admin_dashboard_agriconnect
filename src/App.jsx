import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dahsboard from './components/Dahsboard';
import FarmersTable from './components/FarmersTable';
import BuyersTable from './components/BuyersTable';
import CropsTable from './components/CropsTable';
import OrderTable from './components/OrderTable';

function App() {
  const [activeComponent, setActiveComponent] = useState('Dashboard'); // Default component

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <Dahsboard />;
      case 'Farmers':
        return <FarmersTable />;
      case 'Customers':
        return <BuyersTable />;
      case 'Crops':
        return <CropsTable />;
      case 'Orders':
        return <OrderTable />  ;
      default:
        return <Dahsboard />;
    }
  };

  return (
    <div className='flex'>
      <Sidebar setActiveComponent={setActiveComponent} />
      <div className='grow ml-16 md:ml-64 h-full lg:h-screen bg-green-50 text-gray-900 dark:bg-[#040f00] dark:text-gray-100 dark:border-green-900'>
        <Navbar />
        <div>{renderComponent()}</div>
      </div>
    </div>
  );
}

export default App;