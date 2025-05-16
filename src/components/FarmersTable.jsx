// src/components/FarmersTable.jsx
import React, { useState, useEffect } from 'react';
import { getFarmers, deactivateUser, activateUser } from '../services/api';
import { FaInfoCircle } from 'react-icons/fa';

function FarmersTable() {
  const [farmers, setFarmers] = useState([]);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFarmers()
      .then((data) => {
        setFarmers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDeactivate = (id) => {
    deactivateUser(id)
      .then(() => {
        getFarmers().then(setFarmers); // Refresh data
        alert(`Farmer ${id} has been deactivated successfully`);
        getFarmers().then(setFarmers); // Refresh data
      })
      .catch(() => alert('Failed to deactivate farmer'));
  };

   const handleActivate = (id) => {
    activateUser(id)
      .then(() => {
        getFarmers().then(setFarmers); // Refresh data
        alert(`Farmer ID : ${id} has been activated successfully`);
        getFarmers().then(setFarmers); // Refresh data
      })
      .catch(() => alert('Failed to activate farmer'));
   } 

  if (loading) return <div className="text-center text-gray-500 dark:text-gray-200">Loading...</div>;

  return (
    <div className="relative dark:bg-gray-900 dark:text-gray-200">
      <h2 className="text-2xl font-bold m-2 p-2 dark:text-gray-100">Farmers</h2>
      {/* Farmers Table */}
      <table className="min-w-full bg-white shadow-md rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">ID</th>
            <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Name</th>
            <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Address</th>
            <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {farmers.map((farmer) => (
            <tr key={farmer.userId} className="border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
              <td className="px-4 py-2">{farmer.userId}</td>
              <td className="px-4 py-2">{farmer.user.userName}</td>
              <td className="px-4 py-2">{farmer.user.address}</td>
              <td className="px-4 py-2 flex gap-2">
                <button onClick={() => setSelectedFarmer(farmer)}>
                  <FaInfoCircle className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 text-2xl mr-3" />
                </button>   
                <button             
                   onClick={ farmer.user.isactive ? ()=>handleDeactivate(farmer.userId) : ()=>handleActivate(farmer.userId) }
                  className={`px-2 py-1 rounded text-white ${
                  farmer.user.isactive 
                      ? 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700' 
                      : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
                    }`}      
                    >
                    {farmer.user.isactive ? 'Deactivate' : 'Activate'}
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup for Farmer Details */}
      {selectedFarmer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md relative dark:bg-gray-800 dark:text-gray-200">
            <button
              onClick={() => setSelectedFarmer(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              ✕
            </button>
            <img
              src={selectedFarmer.user.imageUrl}
              alt={selectedFarmer.user.userName}
              className="mt-2 w-32 h-32 object-cover rounded justify-center mx-auto mb-4"
            />
            <h3 className="text-xl font-bold mb-2 dark:text-gray-100">{selectedFarmer.user.userName}</h3>
            <p><strong>Email:</strong> {selectedFarmer.user.email}</p>
            <p><strong>Phone:</strong> {selectedFarmer.user.phoneNumber}</p>
            <p><strong>Address:</strong> {selectedFarmer.user.address}</p>
            <p><strong>NIC:</strong> {selectedFarmer.user.nic}</p>
            <p><strong>Status:</strong> {selectedFarmer.user.isactive ? 'Active' : 'Inactive'}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default FarmersTable;