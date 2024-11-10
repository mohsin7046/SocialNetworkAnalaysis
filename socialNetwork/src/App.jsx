import React, { useState, useEffect } from 'react';
import { fetchUsers, addFriend } from './api.js';
import Graph from './components/D3';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await fetchUsers();
      setUsers(data);
    };
    getUsers();
  }, []);

  const handleAddFriend = async (userId, friendId) => {
    await addFriend(userId, friendId);
    const { data } = await fetchUsers();
    setUsers(data);
  };

  // Convert users to nodes and links for D3 visualization
  const nodes = users.map((user) => ({ id: user._id, name: user.name }));
  const links = users.flatMap((user) =>
    user.friends.map((friend) => ({ source: user._id, target: friend }))
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Social Network Graph Analysis</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <UserForm />
            <UserList users={users} onAddFriend={handleAddFriend} />
          </div>
          <div className="col-span-2">
            <Graph users={users} nodes={nodes} links={links} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
