import express from 'express'
import {User} from '../models/user.model.js'
const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('friends');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Add a friend
router.post('/:userId/add-friend/:friendId', async (req, res) => {
  const { userId, friendId } = req.params;
  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    if (!user || !friend) return res.status(404).json({ error: 'User not found' });

    user.friends.push(friendId);
    friend.friends.push(userId);
    await user.save();
    await friend.save();

    res.json({ message: 'Friend added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding friend' });
  }
});

// Remove a friend
router.post('/:userId/remove-friend/:friendId', async (req, res) => {
  const { userId, friendId } = req.params;
  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    if (!user || !friend) return res.status(404).json({ error: 'User not found' });

    user.friends = user.friends.filter((id) => id.toString() !== friendId);
    friend.friends = friend.friends.filter((id) => id.toString() !== userId);
    await user.save();
    await friend.save();

    res.json({ message: 'Friend removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing friend' });
  }
});

// Get mutual friends
router.get('/:userId/mutual-friends/:friendId', async (req, res) => {
  const { userId, friendId } = req.params;
  try {
    const user = await User.findById(userId).populate('friends');
    const friend = await User.findById(friendId).populate('friends');
    if (!user || !friend) return res.status(404).json({ error: 'User not found' });

    const userFriendsSet = new Set(user.friends.map((f) => f._id.toString()));
    const mutualFriends = friend.friends.filter((f) => userFriendsSet.has(f._id.toString()));

    res.json(mutualFriends);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching mutual friends' });
  }
});

export default router
