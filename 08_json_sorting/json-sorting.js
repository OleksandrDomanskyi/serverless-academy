const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const folder = 'data';
const fileName = 'data.json';
const dataPath = path.join(__dirname, folder, fileName);

const maxRetries = 3;

async function fetchData(url) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await axios.get(url);
            if (response.data.hasOwnProperty('isDone')) {
                console.log(`[Success] ${url}: isDone - ${response.data.isDone}`);
                return response.data;
            }
        } catch (error) {
            if (i === maxRetries - 1) {
                console.log(`[Fail] ${url}: The endpoint is unavailable`);
                return false;
            }
        }
    }
    return false;
}

async function startCount() {
    let trueFound = 0;
    let falseFound = 0;

    try {
        const data = await fs.readFile(dataPath, 'utf8');
        const endpoints = JSON.parse(data);

        for (const endpoint of endpoints) {
            const result = await fetchData(endpoint);

            if (result) {
                if (result.isDone === true) {
                    trueFound++;
                } else {
                    falseFound++;
                }
            }
        }
        console.log(`Found True values: ${trueFound}`);
        console.log(`Found False values: ${falseFound}`);
    } catch (error) {
        console.error('Error reading endpoints file:', error);
    }
}

startCount();