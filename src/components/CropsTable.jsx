// src/components/CropsTable.jsx
import React, { useState, useEffect } from 'react';
import { getCrops } from '../services/api';
import { FaInfoCircle } from 'react-icons/fa';

function CropsTable() {
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCrops()
      .then((data) => {
        setCrops(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className="relative">
      {/* Crops Table */}
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-gray-600">ID</th>
            <th className="px-4 py-2 text-left text-gray-600">Name</th>
            <th className="px-4 py-2 text-left text-gray-600">Price (Rs)</th>
            <th className="px-4 py-2 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {crops.map((crop) => (
            <tr key={crop.cropId} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{crop.cropId}</td>
              <td className="px-4 py-2">{crop.name}</td>
              <td className="px-4 py-2">{crop.price}</td>
              <td className="px-4 py-2">
                <button onClick={() => setSelectedCrop(crop)}>
                  <FaInfoCircle className="text-blue-500 hover:text-blue-700 text-2xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup for Crop Details */}
      {selectedCrop && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={() => setSelectedCrop(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <img
              src={selectedCrop.imageUrl}
              alt={selectedCrop.name}
              className="mt-2 w-32 h-32 object-cover rounded justify-center mx-auto mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{selectedCrop.name}</h3>
            <p><strong>Category:</strong> {selectedCrop.category}</p>
            <p><strong>Farmer ID:</strong> {selectedCrop.farmerId}</p>
            <p><strong>Price:</strong> ${selectedCrop.price}</p>
            <p><strong>Quantity:</strong> {selectedCrop.quantity}</p>
            <p><strong>Harvesting Date:</strong> {new Date(selectedCrop.harvestingDate).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CropsTable; 