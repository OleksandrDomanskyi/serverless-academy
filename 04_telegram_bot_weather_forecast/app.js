// Bot link - https://t.me/MamontsWeatherForecastBot
const axios = require("axios");
const TelegramApi = require('node-telegram-bot-api');

const token = '6852159325:AAGkggXTzVF6ZCzdEyqwgqjrIusGBg78tKY';
const apiKey = '91f3178438879f3f805b6a266c03f00c';

const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/forecast',
    params: {
        appid: apiKey,
        lat: '46.4825',
        lon: '30.7233',
        units: 'metric',
        lang: 'en',
    }
});

const bot = new TelegramApi(token, { polling: true });

const cityOptions = {
    reply_markup: {
        inline_keyboard: [
            [{ text: 'Forecast in Odesa', callback_data: 'forecast_odesa' }]
        ],
    }
};

const intervalOptions = {
    reply_markup: {
        inline_keyboard: [
            [
                { text: 'at intervals of 3 hours', callback_data: 'interval_3' },
                { text: 'at intervals of 6 hours', callback_data: 'interval_6' }
            ],
        ],
    }
};

bot.setMyCommands([
    { command: '/start', description: 'Starts the weather forecast program' },
    { command: '/exit', description: 'Exit the weather forecast program' }
]);

bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const message = 'Hi, if you want to see the weather forecast for Odessa, click the button below';

    if (text === '/start') {
        return bot.sendMessage(chatId, message, cityOptions);
    };

    if (text === '/exit') {
        process.exit();
    };
});

bot.on('callback_query', async query => {
    const chatId = query.message.chat.id;
    const data = query.data;
    const message = 'Choose the interval:';

    if (data === 'forecast_odesa') {
        return bot.sendMessage(chatId, message, intervalOptions);
    };

    if (data === 'interval_3' || data === 'interval_6') {
        const interval = data === 'interval_3' ? 3 : 6;
        getWeatherForecast(chatId, interval);
    };
});

async function getWeatherForecast(chatId, interval) {
    try {
        const response = await instance.get();
        const forecastData = response.data.list;
        let message = `Weather forecast for Odesa at ${interval}-hour intervals:\n`;

        for (let i = 0; i < forecastData.length; i += interval / 3) {
            const timestamp = forecastData[i].dt_txt;
            const temperature = Math.round(forecastData[i].main.temp);
            const description = forecastData[i].weather[0].description;

            message += `\nDate/time: ${timestamp}\nTemperature: ${temperature}°C, Description: ${description}\n`;
        };

        bot.sendMessage(chatId, message);
    } catch (error) {
        console.log(error);
    }
};