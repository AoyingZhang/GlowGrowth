import express from "express";
import cors from "cors";
import mongoose from "mongoose";

mongoose.connect('mongodb+srv://admin:admin@loveletter.kw6pyp3.mongodb.net/?retryWrites=true&w=majority&appName=Loveletter', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

//---------------------------------SCHEMAS------------------------------------
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

// Unique index to ensure username and date combination is unique
journalSchema.index({ username: 1, date: 1 }, { unique: true });

const Journal = mongoose.model('Journal', journalSchema);


const PORT = process.env.PORT || 5050;
const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

//---------------------------------API methods---------------------------------------
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && user.password === password) {
    res.status(200).json({
      message: 'Login successful',
      username: user.username  // Make sure to send back the username
    });
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


app.get('/api/users/:username/nickname', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json({ nickname: user.nickname });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
//---------------------------------JOURNAL-------------------------------------------

app.post('/api/journals/:username', async (req, res) => {
  const { username } = req.params;
  const { date, mood, proud1, proud2, proud3, other } = req.body;

  try {
    const newEntry = new Journal({ username, date, mood, proud1, proud2, proud3, other });
    await newEntry.save();
    res.status(201).send({ message: 'Journal entry created successfully.' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).send({ message: 'Entry for this date already exists.' });
    } else {
      res.status(500).send({ message: 'Failed to create journal entry.' });
    }
  }
});

app.get('/api/journals/:username/:date', async (req, res) => {
  const { username, date } = req.params;
  try {
    const entry = await Journal.findOne({ username, date });
    if (!entry) {
      return res.status(404).send({ message: 'Entry not found' });
    }
    res.json(entry);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

// New endpoint to handle updates
app.put('/api/journals/:username/:date', async (req, res) => {
  const { username, date } = req.params;
  const updateData = req.body;

  try {
    const updatedEntry = await Journal.findOneAndUpdate({ username, date }, updateData, { new: true });
    if (!updatedEntry) {
      return res.status(404).send({ message: 'Entry not found' });
    }
    res.json({ message: 'Journal entry updated successfully.' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).send({ message: 'Entry for this date already exists.' });
    } else {
      res.status(500).send({ message: 'Failed to update journal entry.' });
    }
  }
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
