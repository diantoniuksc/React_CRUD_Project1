import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import { AddUserForm } from './AddUserForm'; // Import a component for adding new users
import UserMUITable from './UserMUITable'; // Import a component for displaying users in a Material-UI table
import axios from 'axios'; // Import Axios for making HTTP requests

// Define the main application component
const App: React.FC = () => {
  const [users, setUsers] = useState([]); // State to store the list of users
  const [selectedCity, setSelectedCity] = useState(''); // State to store a selected city (currently unused)

  // useEffect hook runs once when the component mounts to fetch all users
  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await axios.get('http://localhost:3001/api/users'); // Fetch users from the API
      setUsers(response.data); // Update the users state with the fetched data
    };
    fetchAllUsers(); // Invoke the fetch function
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to delete a user by ID
  const handleDeleteUser = async (id: string) => {
    await axios.delete(`http://localhost:3001/api/users/${id}`); // Send a DELETE request to the API
    setUsers(users.filter(user => user._id !== id)); // Remove the deleted user from the state
  };

  // Function to add a new user
  const handleAddUser = async (user: any) => {
    const response = await axios.post('http://localhost:3001/api/users', user); // Send a POST request to add a new user
    setUsers([...users, response.data]); // Add the new user to the state
  };

  return (
    <div style={{ width: '70%', margin: '0 auto' }}> {/* Center the main content and set its width */}
      <h1 style={{ color: "white" }}>Application Users</h1> {/* Header for the application */}
      <div className="user-table">
        <UserMUITable users={users} onDeleteUser={handleDeleteUser} /> {/* Render the user table, passing users and delete handler as props */}
      </div>
      <AddUserForm onAddUser={handleAddUser} /> {/* Render the form for adding a new user, passing add handler as a prop */}
    </div>
  );
};

export default App; // Export the App component as the default export
