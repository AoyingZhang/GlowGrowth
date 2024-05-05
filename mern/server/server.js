import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// Environment configuration
import 'dotenv/config';

// Path setup for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Express app setup
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'https://glowgrowth.onrender.com' // Change this to your deployed client URL or '*' for open access
}));

// MongoDB Schemas and Models
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  username: { type: String, unique: true },
  nickname: String
});
const User = mongoose.model('User', userSchema);

const journalSchema = new mongoose.Schema({
  username: { type: String, required: true },
  date: { type: String, required: true },
  mood: String,
  proud1: String,
  proud2: String,
  proud3: String,
  other: String
}, { timestamps: true });
journalSchema.index({ username: 1, date: 1 }, { unique: true });
const Journal = mongoose.model('Journal', journalSchema);

// API routes
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && user.password === password) {
    res.status(200).json({ message: 'Login successful', username: user.username });
  } else {
    res.status(401).send({ message: user ? 'Password incorrect' : 'User does not exist' });
  }
});

app.post('/api/signup', async (req, res) => {
  const { email, password, username, nickname } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    const existingUserName = await User.findOne({ username });
    if (existingUser) {
      res.status(400).send({ message: 'Email already registered' });
    } else if (existingUserName) {
      res.status(400).send({ message: 'Username already exists' });
    } else {
      await new User({ email, password, username, nickname }).save();
      res.send({ message: 'SignUp successful' });
    }
  } catch (error) {
    console.error('SignUp Error:', error);
    res.status(500).send({ message: 'Error signing up' });
  }
});

app.get('/api/journals/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const entries = await Journal.find({ username }).sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    console.error('Error fetching journals:', error);
    res.status(500).send({ message: 'Server error fetching journals' });
  }
});

// If you want to serve the React build
app.use(express.static(path.join(__dirname, '../client/build')));

// The "catchall" handler for any other GET request not handled by above routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Set the port and start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
