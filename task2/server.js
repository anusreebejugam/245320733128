const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;
const TIMEOUT = 500; // Timeout in milliseconds

app.get('/numbers', async (req, res) => {
  const urls = req.query.url;
  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: 'Invalid query parameter' });
  }

  const validUrls = [];
  const promises = [];

  // Validate and filter valid URLs
  for (const url of urls) {
    try {
      new URL(url);
      validUrls.push(url);
    } catch (error) {
      console.error(`Invalid URL: ${url}`);
    }
  }

  // Fetch data from valid URLs in parallel
  for (const url of validUrls) {
    promises.push(
      axios
        .get(url, { timeout: TIMEOUT })
        .then(response => response.data.numbers)
        .catch(error => {
          console.error(`Failed to fetch from ${url}: ${error.message}`);
          return [];
        })
    );
  }

  // Wait for all requests to complete
  try {
    const results = await Promise.all(promises);

    // Merge and sort unique numbers
    const mergedNumbers = [...new Set(results.flat())].sort((a, b) => a - b);

    res.json({ numbers: mergedNumbers });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});