const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const greetings = 'Hello, Dark Master, Kyrylo Kozak! Please, enter a few words or numbers separated by a space (or type exit for exiting the program): ';
const options = `What operation you want to do with entered words and numbers:
1. Sort words alphabetically
2. Show numbers from lesser to greater
3. Show numbers from bigger to smaller
4. Display words in ascending order by number of letters in the word
5. Show only unique words
6. Display only unique values from the set of words and numbers entered by the user

`;
const enterChoice = 'Select (1 - 6) and press ENTER or type exit for exiting the program: ';

function runProgram() {
    readline.question(greetings, (input) => {
        const inputText = input.toLowerCase().split(' ');
        
        if (input.toLowerCase() === 'exit') {
            process.exit();
        }

        console.log(options);
        
        readline.question(enterChoice, (choice) => processOption(choice.toLowerCase(), inputText));
    });
}

function processOption(choice, inputText) {
    switch (choice) {
        case '1':
            processResult(inputText, (word) => /^[a-zA-Z]+$/.test(word), (words) => words.sort());
            break;
        case '2':
            processResult(inputText, (num) => !isNaN(num), (numbers) => numbers.sort((a, b) => a - b));
            break;
        case '3':
            processResult(inputText, (num) => !isNaN(num), (numbers) => numbers.sort((a, b) => b - a));
            break;
        case '4':
            processResult(inputText, (word) => /^[a-zA-Z]+$/.test(word), (words) => words.sort((a, b) => a.length - b.length));
            break;
        case '5':
            processResult(inputText, (word) => /^[a-zA-Z]+$/.test(word), (words) => [...new Set(words)]);
            break;
        case '6':
            processResult(inputText, () => true, (values) => [...new Set(values)]);
            break;
        case 'exit':
            process.exit();
        default:
            runProgram();
    }
}

function processResult(inputText, filterFunc, sortFunc) {
    const filteredItems = inputText.filter(filterFunc);
    const result = sortFunc(filteredItems);
    console.log(result);
    runProgram();
}

runProgram();

// ----------Initial solution, which I refactored in the process for better readability----------

// function runProgram() {
//     readline.question(greetings, input => {
//         const inputText = input.toLowerCase().split(' ');
//         if (input === 'exit') {
//             process.exit();
//         }

//         processInput(inputText);
//     });

//     function processInput(inputText) {
//         console.log(options);
        
//         readline.question(enterChoice, choice => {
//             const choiceValue = choice.toLowerCase();
//             if (choiceValue === 'exit') {
//                 process.exit();
//             } 
//             processOption(choiceValue, inputText);
//         });
//     };
    
//     function processOption(choice, inputText) {
//         switch (choice) {
//             case '1':
//                 const sortedWords = inputText.filter(word => /^[a-zA-Z]+$/.test(word)).sort();
//                 console.log(sortedWords);
//                 runProgram();
//                 break;
//             case '2':
//                 const sortedNumbersToGreater = inputText.filter(num => !isNaN(num)).map(Number).sort((a, b) => a - b);
//                 console.log(sortedNumbersToGreater);
//                 runProgram();
//                 break;
//             case '3':
//                 const sortedNumbersToSmaller  = inputText.filter(num => !isNaN(num)).map(Number).sort((a, b) => b - a);
//                 console.log(sortedNumbersToSmaller);
//                 runProgram();
//                 break;
//             case '4':
//                 const sortedWordsByLength = inputText.filter(word => /^[a-zA-Z]+$/.test(word)).sort((a, b) => a.length - b.length);
//                 console.log(sortedWordsByLength);
//                 runProgram();
//                 break;
//             case '5':
//                 const uniqueWords = [...new Set(inputText.filter(word => /^[a-zA-Z]+$/.test(word)))];
//                 console.log(uniqueWords);
//                 runProgram();
//                 break;
//             case '6':
//                 const uniqueValues = [...new Set(inputText)];
//                 console.log(uniqueValues);
//                 runProgram();
//                 break;
//             default:
//                 runProgram();
//         }
//     }
// }