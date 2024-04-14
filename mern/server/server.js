import express from "express";
import cors from "cors";
import mongoose from "mongoose";

mongoose.connect('mongodb+srv://admin:admin@loveletter.kw6pyp3.mongodb.net/?retryWrites=true&w=majority&appName=Loveletter', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  username: { type: String, unique: true },
  nickname: String
});
const User = mongoose.model('User', userSchema);


const PORT = process.env.PORT || 5050;
const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && user.password === password) {
    res.send({ message: 'Login successful' });
  } else if (user) {
    res.status(401).send({ message: 'Password incorrect' });
  } else {
    res.status(401).send({ message: 'User does not exist' });
  }
});

app.post('/api/signup', async (req, res) => {
  const { email, password, username, nickname } = req.body;
  if (!email.includes('@')) {
    return res.status(400).send({ message: 'Email is not in a valid format' });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'Email already registered' });
    }

    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
      return res.status(400).send({ message: 'Username already exists' });
    }

    const user = new User({ email, password, username, nickname });
    await user.save();
    res.send({ message: 'SignUp successful' });
  } catch (error) {
    console.error('SignUp Error:', error);
    res.status(500).send({ message: 'Error signing up' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
