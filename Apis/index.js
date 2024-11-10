import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import userRoutes from './routes/user.routes.js'
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


app.use('/api/users', userRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
