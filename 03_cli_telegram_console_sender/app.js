// Bot link - https://t.me/MamontsConsoleSenderBot
const { Command } = require('commander');
const TelegramApi = require('node-telegram-bot-api');

const token = '6774702445:AAE1WomYVALFHThwY_-BKaUwpZjCXlV6UqI';
const chatId = 1116211212;

const program = new Command();
const bot = new TelegramApi(token, { polling: true });

program
    .version('0.0.1')

program
    .command('message')
    .description('Send message to Telegram Bot')
    .alias("m")
    .argument('<message>')
    .action(async (msg) => {
        await bot.sendMessage(chatId, msg);
        process.exit();
    });

program
    .command('photo')
    .description('Send photo to Telegram Bot. Just drag and drop it console after p-flag')
    .alias("p")
    .argument('<photo>')
    .action(async (photo) => {
        const options = { filename: 'photo.jpg', contentType: 'image/jpeg' };
        await bot.sendPhoto(chatId, photo, {}, options);
        console.log('You successfully send a photo to your bot');
        process.exit();
    });

program.parse();