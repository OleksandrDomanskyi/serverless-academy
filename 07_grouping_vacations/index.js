const fs = require('fs');
const path = require('path');

const folder = 'database';
const fileName = 'data.json';
const formattedFileName = 'formattedData.json';
const dataPath = path.join(__dirname, folder, fileName);
const formattedDataPath = path.join(__dirname, folder, formattedFileName);

const data = JSON.parse(fs.readFileSync(dataPath));

const result = {};

for (const vacation of data) {
    const { user, startDate, endDate } = vacation;
    const { _id, name } = user;

    if (!result[_id]) {
        result[_id] = {
            userId: _id,
            userName: name,
            vacations: [],
        };
    }

    result[_id].vacations.push({ startDate, endDate });
}

const formattedData = Object.values(result);

fs.writeFileSync(formattedDataPath, JSON.stringify(formattedData, null, 4));