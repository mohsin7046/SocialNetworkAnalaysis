import React, { useState } from 'react';
import { createUser } from '../api';

const UserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && email) {
      await createUser({ name, email });
      setName('');
      setEmail('');
      alert('User created successfully!');
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <h2 className="text-xl font-bold mb-4">Add New User</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <input
          type="text"
          placeholder="Name"
          className="border rounded p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border rounded p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Add User
        </button>
      </form>
    </div>
  );
};

export default UserForm;
