# Task 3: CLI TELEGRAM CONSOLE SENDER

## To run app

`npm start` &mdash; starts server in a production mode.

## Task requirements

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
