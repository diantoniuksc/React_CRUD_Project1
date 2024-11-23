import axios from 'axios';

const API_URL = 'http://localhost:3001/api/users';

export const fetchUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const deleteUser = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const addUser = async (user: any) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};
