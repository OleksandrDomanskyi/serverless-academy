import inquirer from 'inquirer';
import fs from 'fs';

const database = 'db.txt';
let users = [];

const questions = {
    start: [
        {
            type: 'input',
            name: 'user',
            message: "Enter the user's name. To cancel, just press ENTER: ",
        },
    ],
    info: [
        {
            type: 'list',
            name: 'gender',
            message: 'Choose your Gender.',
            choices: ['male', 'female'],
        },
        {
            type: 'number',
            name: 'age',
            message: 'Enter your age: ',
        },
    ],
    search: [
        {
            type: 'confirm',
            name: 'search',
            message: 'Would you like to search values in the DB?',
            default: false,
        },
    ],
    searchUser: [
        {
            type: 'input',
            name: 'searchUser',
            message: "Enter the user's name you want to find in the DB: ",
        },
    ],
};

async function runProgram() {
    if (fs.existsSync(database)) {
        loadData();
    }

    const { user } = await inquirer.prompt(questions.start);
    if (user) {
        const { gender, age } = await inquirer.prompt(questions.info);
        const newUser = {
            user,
            gender,
            age,
        };
        const isDuplicate = users.some(existingUser =>
            existingUser.user.toLowerCase() === newUser.user.toLowerCase() &&
            existingUser.gender === newUser.gender &&
            existingUser.age === newUser.age
        );
        if (!isDuplicate) {
            users.push(newUser);
            saveData();
        }
        runProgram();
    } else {
        const { search } = await inquirer.prompt(questions.search);

        if (search) {
            console.log(users);
            searchUser();
        } else {
            process.exit();
        }
    }
}

function saveData() {
    try {
        fs.writeFileSync(database, JSON.stringify(users, null, 4));
    } catch (error) {
        console.log(error);
    }
}

function loadData() {
    try {
        const data = fs.readFileSync(database, { encoding: 'utf8' });
        if (data) {
            users = JSON.parse(data);
        }
    } catch (error) {
        console.log(error);
    }
}

async function searchUser() {
    const { searchUser } = await inquirer.prompt(questions.searchUser);
    const searchName = searchUser.toLowerCase();
    const foundUsers = users.filter(user => user.user.toLowerCase() === searchName);

    if (foundUsers.length > 0) {
        console.log(`Users with the name ${searchUser} found:`);
        foundUsers.forEach(foundUser => {
            console.log(foundUser);
        });
    } else {
        console.log('Such a user does not exist.');
    }
    process.exit();
}

runProgram();