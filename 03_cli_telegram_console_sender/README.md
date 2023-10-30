# Task 3: CLI TELEGRAM CONSOLE SENDER

## To run app

`npm start` &mdash; wakes up the bot.

## Bot commands

- `node app.js m 'Write your message here'` &mdash; sends the message entered in the console to the bot.
- `node app.js p 'Drag and drop your image here'` &mdash; sends the image sent in the console to the bot.
- `node app.js --help` &mdash; shows descriptions about the commands and their options in the console.

## Task requirements

In this task we will create a simple telegram bot that can act as notes or notepad when you need to save something urgently from the console.

### Tools and libraries you can use

- commander - this library helps you organize your app with commands and command-specific option
- node-telegram-bot-api - just a wrapper on top of Telegram Bot API.

### Commands

Here is the list of commands that your app should support

#### Send a message

$ node app.js send-message 'Your message'
The result of executing this command is the appearance of your message in your Telegram bot. After it has been executed, the CLI terminates the process itself to allow you to enter the next command.

#### Send a message

$ node app.js send-photo '/path/to/the/photo.png'
The result of this command is a photo sent to the Telegram bot from your PC. After it has been executed, the CLI terminates the process itself to allow you to enter the next command.

NOTE: Take care of your users beforehand - make sure you added descriptions about the commands and their options. The user should be able to see it using help command or --help argument.
