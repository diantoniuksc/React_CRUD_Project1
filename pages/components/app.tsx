import React, { useState, useEffect } from 'react';
import { AddUserForm } from './AddUserForm';
import UserMUITable from './UserMUITable';
import axios from 'axios';

const App: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await axios.get('http://localhost:3001/api/users');
      setUsers(response.data);
    };
    fetchAllUsers();
  }, []);

  const handleDeleteUser = async (id: string) => {
    await axios.delete(`http://localhost:3001/api/users/${id}`);
    setUsers(users.filter(user => user._id !== id));
  };

  const handleAddUser = async (user: any) => {
    const response = await axios.post('http://localhost:3001/api/users', user);
    setUsers([...users, response.data]);
  };

  return (
    <div style={{ width: '70%', margin: '0 auto' }}>
      <h1 style={{ color: "white" }}>Application Users</h1>
      <div className="user-table">
        <UserMUITable users={users} onDeleteUser={handleDeleteUser}/>
      </div>
      <AddUserForm onAddUser={handleAddUser} />
    </div>
  );
};

export default App;