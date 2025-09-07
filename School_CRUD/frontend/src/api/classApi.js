import axios from '../config/axiosConfig.js';
const API_URL = '/classes';

export const getClasses = () => axios.get(API_URL);
export const getClassById = (id) => axios.get(`${API_URL}/${id}`);
export const createClass = (data) => axios.post(API_URL, data);
export const updateClass = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteClass = (id) => axios.delete(`${API_URL}/${id}`);

export default {
  getClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
};
