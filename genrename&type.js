const express = require('express');
const bodyParser = require('body-parser'); // To parse JSON requests

const app = express();
const port = 3000;

// Initialize an array to store genres
const genres = [];

app.use(bodyParser.json());

// Endpoint to get the list of genres
app.get('/genres', (req, res) => {
  res.json(genres);
});

// Endpoint to add a new genre
app.post('/genres', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Genre name is required.' });
  }

  // Check if the genre already exists
  if (genres.includes(name)) {
    return res.status(400).json({ error: 'Genre already exists.' });
  }

  // Add the new genre to the list
  genres.push(name);
  res.status(201).json({ message: 'Genre added successfully.' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
