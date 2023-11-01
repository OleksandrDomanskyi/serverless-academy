const fs = require('fs').promises;
const path = require('path');

async function startProgram() {
    const dirName = '2kk_words_400x400';
    const fullPath = path.join(__dirname, dirName);
    try {
        const startTime = process.hrtime();
        const files = await fs.readdir(fullPath);

        const filePromises = files.map(async (file) => {
            const currentFile = await fs.readFile(path.join(fullPath, file), 'utf8');
            return currentFile;
        });

        const fileContents = await Promise.all(filePromises);

        const data = [];
        const countValue = {};

        fileContents.forEach((currentFile) => {
            const uniqueValue = [...new Set(currentFile.split('\n'))];
            data.push(currentFile.split('\n'));

            uniqueValue.forEach((element) => {
                countValue[element] ? countValue[element]++ : (countValue[element] = 1);
            });
        });

        const uniqueValues = () => {
            return [...new Set(data.flat())].length;
        };

        const existInAllFiles = () => {
            return Object.values(countValue).filter((value) => value === files.length).length;
        };

        const existInAtleastTen = () => {
            return Object.values(countValue).filter((value) => value >= 10).length;
        };

        const endTime = process.hrtime(startTime);
        const seconds = endTime[0] + endTime[1] / 1e9;
        const roundedTime = seconds.toFixed(2);

        console.log('uniqueValues:', uniqueValues());
        console.log('existInAllFiles:', existInAllFiles());
        console.log('existInAtleastTen:', existInAtleastTen());
        console.log('Total time:', roundedTime + 's');
    } catch (error) {
        console.log(error);
    }
}

startProgram();