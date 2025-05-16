import React from 'react'
import Card from './Card'
import { FaBoxOpen, FaEnvelope, FaRegUser, FaShoppingCart, FaUserAlt } from 'react-icons/fa'
import { FaUsers, FaWheatAwn } from 'react-icons/fa6';
import { dataBar, dataLine } from '../assets/ChartData';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, BarElement , CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, BarElement , CategoryScale, LinearScale, PointElement);

const Dahsboard = () => {
  return (
    <div className='grow p-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6' >
                <Card icon={<FaUsers />} title="Sellers" value="25" />
                <Card icon={<FaBoxOpen />} title="Orders" value="31" />
                <Card icon={<FaWheatAwn />} title="Crops" value="27" />
                <Card icon={<FaEnvelope />} title="Complaints" value="15" />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 '>
                <div className='bg-white p-4 rounded-lg shadow-md dark:bg-[#ffffffc6]  dark:border-black'>
                    <h2 className='font-semibold text-xl mb-3  text-gray-900'>Sales Data</h2>
                    <Line data={dataLine} />
                </div>
                <div className='bg-white p-4 rounded-lg shadow-md dark:bg-[#ffffffc6]  dark:border-black'>
                    <h2 className='font-semibold text-xl mb-3 text-gray-900' >Crops Data</h2>
                    <Bar data={dataBar} />
                </div>
            </div>
    </div>
  )
}

export default Dahsboard