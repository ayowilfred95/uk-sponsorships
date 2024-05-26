const express = require('express');
const axios = require('axios');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const url = 'https://assets.publishing.service.gov.uk/media/6650bede0c8f88e868d33262/2024-05-24_-_Worker_and_Temporary_Worker.csv';
const outputFilePath = 'public/worker_data.json';

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to fetch and parse CSV data
app.get('/fetch-data', async (req, res) => {
  try {
    const response = await axios.get(url, { responseType: 'stream' });
    const data = [];
    response.data
      .pipe(csv())
      .on('data', (row) => {
        data.push(row);
      })
      .on('end', () => {
        fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2));
        res.send({ message: 'CSV file successfully processed and saved as JSON.' });
      });
  } catch (error) {
    console.error(`Error fetching the CSV file: ${error}`);
    res.status(500).send({ error: 'Failed to fetch CSV data' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
