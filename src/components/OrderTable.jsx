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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersData, buyersData, farmersData] = await Promise.all([
          getOrders(),
          getBuyers(),
          getFarmers(),
        ]);

        // Create buyer lookup map: userId -> userName
        const buyerLookup = buyersData.reduce((map, buyer) => {
          map[buyer.userId] = buyer.user?.userName || 'Unknown';
          return map;
        }, {});

        // Create farmer lookup map: farmerId -> userName
        const farmerLookup = farmersData.reduce((map, farmer) => {
          map[farmer.userId] = farmer.user?.userName || 'Unknown';
          return map;
        }, {});

        // Filter valid orders
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

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
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
            {orders.map((order) => (
              <tr
                key={order.orderId}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-4 py-2">{order.orderId}</td>
                <td className="px-4 py-2">
                  {buyerMap[order.order?.userId] || 'Unknown'}
                </td>
                <td className="px-4 py-2">
                  {farmerMap[order.crop?.farmerId] || 'Unknown'}
                </td>
                <td className="px-4 py-2">
                  {order.order?.orderDate
                    ? new Date(order.order.orderDate).toLocaleDateString()
                    : 'N/A'}
                </td>
                <td className="px-4 py-2">
                  ${order.amount?.toFixed(2) || 'N/A'}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      order.status === 'Completed'
                        ? 'bg-green-500'
                        : order.status === 'Pending'
                        ? 'bg-yellow-500'
                        : order.status === 'ConfirmOrder'
                        ? 'bg-blue-500'
                        : 'bg-red-500'
                    }`}
                  >
                    {order.status || 'Pending'}
                  </span>
                </td>
                <td className="px-4 py-2 flex gap-2 text-l">
                  <button
                    onClick={() => handleViewDetails(order)}
                    title="View Details"
                  >
                    <FaInfoCircle className="text-blue-500 hover:text-blue-700 text-2xl" />
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