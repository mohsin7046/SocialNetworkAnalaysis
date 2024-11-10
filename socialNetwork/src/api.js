import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000/api' });

export const fetchUsers = () => API.get('/users');
export const createUser = (newUser) => API.post('/users', newUser);
export const addFriend = (userId, friendId) => API.post(`/users/${userId}/add-friend/${friendId}`);
export const removeFriend = (userId, friendId) => API.post(`/users/${userId}/remove-friend/${friendId}`);
export const getMutualFriends = (userId, friendId) => API.get(`/users/${userId}/mutual-friends/${friendId}`);
