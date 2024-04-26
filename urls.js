const fs = require('fs');
const axios = require('axios');
const { URL } = require('url');

async function downloadPage(url) {
  try {
    const response = await axios.get(url);
    const hostname = new URL(url).hostname;
    fs.writeFileSync(hostname, response.data);
    console.log(`Wrote to ${hostname}`);
  } catch (error) {
    console.error(`Couldn't download ${url}`);
  }
}

async function processUrls(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf-8');
    const urls = data.split('\n').filter(url => url.trim() !== '');

    // Bonus: Start all the downloads concurrently
    await Promise.all(urls.map(downloadPage));
  } catch (error) {
    console.error(`Error reading file: ${filename}`);
    process.exit(1);
  }
}

const filename = process.argv[2];
processUrls(filename);