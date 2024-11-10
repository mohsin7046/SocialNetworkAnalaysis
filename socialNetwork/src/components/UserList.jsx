import React from 'react';

const UserList = ({ users, onAddFriend }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Users</h2>
      {users.map((user) => (
        <div key={user._id} className="border-b py-2 flex justify-between items-center">
          <span>{user.name}</span>
          <select
            onChange={(e) => onAddFriend(user._id, e.target.value)}
            className="border rounded p-1"
          >
            <option value="">Add Friend</option>
            {users
              .filter((u) => u._id !== user._id && !user.friends.includes(u._id))
              .map((friend) => (
                <option key={friend._id} value={friend._id}>
                  {friend.name}
                </option>
              ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default UserList;
