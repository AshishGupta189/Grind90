import axios from '../config/axiosConfig.js';
const API_URL = '/teachers';

export const getTeachers = () => axios.get(API_URL);
export const getTeacherById = (id) => axios.get(`${API_URL}/${id}`);
export const createTeacher = (data) => axios.post(API_URL, data);
export const updateTeacher = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteTeacher = (id) => axios.delete(`${API_URL}/${id}`);

export default {
  getTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};
