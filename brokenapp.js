const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const GITHUB_API_URL = 'https://api.github.com';

// Middleware to validate the request body
function validateRequest(req, res, next) {
  const { developers } = req.body;
  if (!developers || !Array.isArray(developers) || developers.length === 0) {
    return res.status(400).json({ error: 'Invalid request body. Expected { developers: [username, ...] }' });
  }
  next();
}

// Helper function to fetch user data from the GitHub API
async function fetchUserData(username) {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`);
    const { name, bio } = response.data;
    return { name, bio };
  } catch (error) {
    console.error(`Error fetching data for user ${username}:`, error);
    return null;
  }
}

// Route handler for POST /
app.post('/', validateRequest, async (req, res) => {
  const { developers } = req.body;
  const userDataPromises = developers.map((username) => fetchUserData(username));
  const userData = await Promise.all(userDataPromises);
  const filteredUserData = userData.filter((data) => data !== null);
  res.json(filteredUserData);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});