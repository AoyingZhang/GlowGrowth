import express from "express";
import cors from "cors";
import mongoose from "mongoose"
mongoose.connect('mongodb+srv://admin:admin@loveletter.kw6pyp3.mongodb.net/?retryWrites=true&w=majority&appName=Loveletter', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});
const User = mongoose.model('User', userSchema);
const PORT = process.env.PORT || 5050;
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'  // Client URL
}));

app.get('/test', (req, res) => {
  console.log("route test working");
  res.status(200).send('Test route is working');
});
app.post('/api/login', async (req, res) => {
  const { username, email, password } = req.body;

  // Find user in database
  const user = await User.findOne({ email });
  // Check password
  if (user && user.password === password) {
    res.send({ message: 'Login successful' });
  } else {
    res.status(401).send({ message: 'Login failed' });
  }
});

app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  console.log(existingUser);
  if (existingUser) {
    return res.status(400).send({ message: 'User already exists' });
  }

  // Create new user
  const user = new User({username, email, password });
  console.log(user);
  try {
    // Save user to database
    await user.save();
    res.send({ message: 'SignUp successful' });
  } catch (error) {
    res.status(500).send({ message: 'Error signing up' });
  }
});


// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});