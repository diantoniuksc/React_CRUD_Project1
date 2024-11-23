import React, { useState } from 'react';

type AddUserFormProps = {
  onAddUser: (user: any) => void;
};

export const AddUserForm: React.FC<AddUserFormProps> = ({ onAddUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    pass: '',
    city: '',
    country: '',
    thoughts: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddUser(formData);
    setFormData({
      name: '',
      lastName: '',
      pass: '',
      city: '',
      country: '',
      thoughts: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
        <input type="password" name="pass" value={formData.pass} onChange={handleChange} placeholder="Password" required />
        <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
        <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" required />
        <input type="text" name="thoughts" value={formData.zip} onChange={handleChange} placeholder="Thoughts" required />
        <button type="submit">Add User</button>
      </div>
    </form>
  );  
};
