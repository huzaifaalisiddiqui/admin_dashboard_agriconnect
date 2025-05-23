import { useState, useEffect } from 'react';
import { getOrders, getBuyers, getFarmers } from '../services/api';
import { FaInfoCircle } from 'react-icons/fa';

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [buyerMap, setBuyerMap] = useState({});
  const [farmerMap, setFarmerMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersData, buyersData, farmersData] = await Promise.all([
          getOrders(),
          getBuyers(),
          getFarmers(),
        ]);

        const buyerLookup = buyersData.reduce((map, buyer) => {
          map[buyer.userId] = buyer.user?.userName || 'Unknown';
          return map;
        }, {});

        const farmerLookup = farmersData.reduce((map, farmer) => {
          map[farmer.userId] = farmer.user?.userName || 'Unknown';
          return map;
        }, {});

        const validOrders = ordersData.filter((order) => {
          const hasValidBuyer = order.order?.userId && buyerLookup[order.order.userId] !== 'Unknown';
          const hasValidFarmer = order.crop?.farmerId && farmerLookup[order.crop.farmerId] !== 'Unknown';
          const hasValidDate = order.order?.orderDate;
          const hasValidAmount = order.amount != null;
          return hasValidBuyer && hasValidFarmer && hasValidDate && hasValidAmount;
        });

        setOrders(validOrders);
        setBuyerMap(buyerLookup);
        setFarmerMap(farmerLookup);
        setLoading(false);
      } catch (err) {
        setError('Failed to load orders');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500 dark:bg-green-600';
      case 'Pending':
        return 'bg-yellow-500 dark:bg-yellow-600';
      case 'ConfirmOrder':
        return 'bg-blue-500 dark:bg-blue-600';
      default:
        return 'bg-red-500 dark:bg-red-600';
    }
  };

  const filteredOrders = orders.filter((order) => {
    const buyerName = buyerMap[order.order?.userId]?.toLowerCase() || '';
    const sellerName = farmerMap[order.crop?.farmerId]?.toLowerCase() || '';
    const orderId = order.orderId?.toString() || '';
    return (
      buyerName.includes(searchTerm.toLowerCase()) ||
      sellerName.includes(searchTerm.toLowerCase()) ||
      orderId.includes(searchTerm)
    );
  });

  if (loading) return <div className="text-center py-4 dark:text-gray-200">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500 dark:text-red-400">{error}</div>;

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-gray-200">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">Orders</h2>
        <input
          type="text"
          placeholder="🔍 Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-80 p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border dark:bg-gray-800 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal dark:bg-gray-700 dark:text-gray-300">
              <th className="py-3 px-4 text-left">Order ID</th>
              <th className="py-3 px-4 text-left">Buyer Name</th>
              <th className="py-3 px-4 text-left">Seller Name</th>
              <th className="py-3 px-4 text-left">Order Date</th>
              <th className="py-3 px-4 text-left">Total Amount</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.orderId}
                className="border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-green-700"
              >
                <td className="px-4 py-2">{order.orderId}</td>
                <td className="px-4 py-2">{buyerMap[order.order?.userId] || 'Unknown'}</td>
                <td className="px-4 py-2">{farmerMap[order.crop?.farmerId] || 'Unknown'}</td>
                <td className="px-4 py-2">
                  {order.order?.orderDate
                    ? new Date(order.order.orderDate).toLocaleDateString()
                    : 'N/A'}
                </td>
                <td className="px-4 py-2">${order.amount?.toFixed(2) || 'N/A'}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-white ${getStatusClass(order.status)}`}>
                    {order.status || 'Pending'}
                  </span>
                </td>
                <td className="px-4 py-2 flex gap-2 text-lg">
                  <button
                    onClick={() => handleViewDetails(order)}
                    title="View Details"
                  >
                    <FaInfoCircle className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 text-2xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup for Order Details */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md relative dark:bg-gray-800 dark:text-gray-200">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-2 dark:text-gray-100">Order Details</h3>
            <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
            <p><strong>Buyer:</strong> {buyerMap[selectedOrder.order?.userId] || 'Unknown'}</p>
            <p><strong>Seller:</strong> {farmerMap[selectedOrder.crop?.farmerId] || 'Unknown'}</p>
            <p>
              <strong>Order Date:</strong>{' '}
              {selectedOrder.order?.orderDate
                ? new Date(selectedOrder.order.orderDate).toLocaleDateString()
                : 'N/A'}
            </p>
            <p><strong>Total Amount:</strong> ${selectedOrder.amount?.toFixed(2) || 'N/A'}</p>
            <p><strong>Status:</strong> {selectedOrder.status || 'Pending'}</p>
            <p><strong>Crop:</strong> {selectedOrder.crop?.name || 'N/A'}</p>
            <p><strong>Quantity:</strong> {selectedOrder.quantity || 'N/A'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
