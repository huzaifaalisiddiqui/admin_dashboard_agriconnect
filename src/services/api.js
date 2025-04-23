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
    return response.data.$values;
  } catch (error) {
    console.error('Error fetching farmers:', error);
    throw error;
  }
};

export const getBuyers = async () => {
  try {
    const response = await api.get('/api/Admin/Buyer');
    return response.data.$values;
  } catch (error) {
    console.error('Error fetching buyers:', error);
    throw error;
  }
};

export const getCrops = async () => {
  try {
    const response = await api.get('/api/Crops');
    return response.data.$values;
  } catch (error) {
    console.error('Error fetching crops:', error);
    throw error;
  }
};

export const getOrders  = async () => {
  try {
    const response = await api.get('/api/Crops');
    return response.data.$values;
  } catch (error) {
    console.error('Error fetching crops:', error);
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

export default api;