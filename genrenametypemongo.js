const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Genre schema and model
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Genre = mongoose.model('Genre', genreSchema);

app.use(bodyParser.json());

// Endpoint to add a new genre
app.post('/genres', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Genre Name ' });
    }

    // Check if the genre already exists
    const existingGenre = await Genre.findOne({ name });
    if (existingGenre) {
      return res.status(400).json({ error: 'Genre already exists.' });
    }

    // Create a new genre document
    const newGenre = new Genre({ name });
    await newGenre.save();

    res.status(201).json({ message: 'Genre added successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
