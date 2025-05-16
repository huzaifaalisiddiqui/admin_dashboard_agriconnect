// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://152.67.10.128:5280';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const getFarmers = async () => {
  try {
    const response = await api.get('/api/Admin/Farmer');
    const farmers = response.data.$values;
    return farmers.sort((a, b) => a.userId - b.userId);
  } catch (error) {
    console.error('Error fetching farmers:', error);
    throw error;
  }
};

export const getBuyers = async () => {
  try {
    const response = await api.get('/api/Admin/Buyer');
    const buyers = response.data.$values;
    return buyers.sort((a, b) => a.userId - b.userId);
  } catch (error) {
    console.error('Error fetching buyers:', error);
    throw error;
  }
};

export const getCrops = async () => {
  try {
    const response = await api.get('/api/Crops');
    const crops = response.data.$values;
    return crops.sort((a, b) => a.cropId - b.cropId);
  } catch (error) {
    console.error('Error fetching crops:', error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await api.get('/api/Order/order-crops');
    const orders = response.data.$values;
    return orders.sort((a, b) => a.orderId - b.orderId);
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};


export const deactivateUser = async (id) => {
  try {
    const response = await api.post(`/api/Admin/InactiveUser/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deactivating user:', error);
    throw error;
  }
};

export const activateUser = async (id) => {
  try {
    const response = await api.post(`/api/Admin/activeUser/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error activating user:', error);
    throw error;
  }
};

export default api;