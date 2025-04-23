import { useState, useEffect } from 'react';
import { getOrders } from '../services/api'; 
import { FaInfoCircle } from 'react-icons/fa';

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data.sort((a, b) => a.orderId - b.orderId)); 
        setLoading(false);
      } catch (err) {
        setError('Failed to load orders');
        setLoading(false);
      }
    };
    fetchOrders();
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
              <th className="py-3 px-4 text-left">Customer Name</th>
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
                <td className="px-4 py-2">{order.customerName}</td>
                <td className="px-4 py-2">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  ${order.totalAmount?.toFixed(2)}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      order.status === 'Completed'
                        ? 'bg-green-500'
                        : order.status === 'Pending'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  >
                    {order.status}
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
      {selectedOrder && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="text-xl font-semibold">Order Details</h3>
          <p>Order ID: {selectedOrder.orderId}</p>
          <p>Customer: {selectedOrder.customerName}</p>
          <p>Order Date: {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
          <p>Total Amount: ${selectedOrder.totalAmount?.toFixed(2)}</p>
          <p>Status: {selectedOrder.status}</p>
          <button
            onClick={() => setSelectedOrder(null)}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;