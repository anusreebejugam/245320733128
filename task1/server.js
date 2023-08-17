const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Register your company with John Doe Railway Server
app.post('/train/register', (req, res) => {
  // Your registration logic here
  const registrationResponse = {
    companyName: "Train Central",
    clientID: "b46118f0-fbde-4b16-a4b1-6ae6ad718b27",
    clientSecret: "xOyolORPaskWOdAN"
  };
  res.status(200).json(registrationResponse);
});

// Obtain the Authorization Token
app.post('/train/auth', (req, res) => {
  // Your authorization logic here
  const authorizationResponse = {
    token_type: "Bearer",
    access_token: "YIFnHZ",
    expires_in: 1682629264
  };
  res.status(200).json(authorizationResponse);
});

// Get all train details
app.get('/train/trains', async (req, res) => {
  const token = req.headers.authorization; // Get the authorization token from request headers
  
  // Your logic to fetch train details using the provided API
  try {
    const response = await axios.get('http://20.244.56.144/train/trains', {
      headers: { Authorization: token }
    });
    
    const trainDetails = response.data; // Process train details
    
    res.status(200).json(trainDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get details of a specific train
app.get('/train/trains/:trainNumber', async (req, res) => {
  const token = req.headers.authorization; // Get the authorization token from request headers
  const trainNumber = req.params.trainNumber;
  
  // Your logic to fetch details of a specific train using the provided API
  try {
    const response = await axios.get(`http://20.244.56.144/train/trains/${trainNumber}`, {
      headers: { Authorization: token }
    });
    
    const trainDetail = response.data; // Process train detail
    
    res.status(200).json(trainDetail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});