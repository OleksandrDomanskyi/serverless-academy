// Bot link - https://t.me/MamontsExchangeRatesBot
const axios = require("axios");
const TelegramApi = require('node-telegram-bot-api');
const NodeCache = require( "node-cache" );

const token = '6887389678:AAFmMWyJhLI68QbsWJ8nL_TXYFliCSZBnx8';
const apiKey = '91f3178438879f3f805b6a266c03f00c';

const myCache = new NodeCache({ stdTTL: 300 });

const privatbankApi = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
const monobankApi = 'https://api.monobank.ua/bank/currency';

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

const startOptions = {
    reply_markup: {
        keyboard: [
            [{ text: 'Forecast in Odesa' }],
            [{ text: 'Exchange rate' }]
        ],
        resize_keyboard: true,
        one_time_keyboard: false,
    }
};

const forecastOptions = {
    reply_markup: {
        keyboard: [
            [
                { text: 'at intervals of 3 hours' },
                { text: 'at intervals of 6 hours' },
            ],
            [{ text: 'Previous menu' }],
        ],
        resize_keyboard: true,
        one_time_keyboard: false,
    }
};

const exchangeOptions = {
    reply_markup: {
        keyboard: [
            [
                { text: 'USD' },
                { text: 'EUR' },
            ],
            [{ text: 'Previous menu' }],
        ],
        resize_keyboard: true,
        one_time_keyboard: false,
    }
};

bot.setMyCommands([
    { command: '/start', description: 'Starts the weather forecast program' },
]);

bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === '/start') {
        return bot.sendMessage(chatId, 'Hi, choose what you want to see:', startOptions);
    };

    if (text === 'Forecast in Odesa') {
        return bot.sendMessage(chatId, 'Choose the interval:', forecastOptions);
    };

    if (text === 'at intervals of 3 hours' || text === 'at intervals of 6 hours') {
        const interval = text === 'at intervals of 3 hours' ? 3 : 6;
        getWeatherForecast(chatId, interval);
    };

    if (text === 'Exchange rate') {
        return bot.sendMessage(chatId, 'Choose currency:', exchangeOptions);
    };

    if (text === 'USD' || text === 'EUR') {
        getExchangeRate(chatId, text);
    };

    if (text === 'Previous menu') {
        return bot.sendMessage(chatId, 'Hi, choose what you want to see:', startOptions);
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
        console.log('Error in getWeatherForecast:', error);
    };
};

async function getExchangeRate(chatId, currency) {
    const cachedData = myCache.get(`exchange_rate_${currency}`);
    const currentTime = Date.now();
    let privatRate, monoRate;

    if (cachedData && currentTime - cachedData.timestamp < 300000) {
        ({ privatRate, monoRate } = cachedData);
    } else {
        try {
            const [privatRateData, monoRateData] = await Promise.all([
                fetchRateData(privatbankApi),
                fetchRateData(monobankApi)
            ]);

            privatRate = findPrivatRate(privatRateData, currency);
            monoRate = findMonoRate(monoRateData, currency);

            if (privatRate && monoRate) {
                myCache.set(`exchange_rate_${currency}`, {
                    privatRate,
                    monoRate,
                    timestamp: currentTime
                }, 300);
            };
        } catch (error) {
            console.log('Error in getExchangeRate:', error);
        };
    };

    if (privatRate && monoRate) {
        sendRateMessage(chatId, currency, privatRate, monoRate);
    };
};

async function fetchRateData(apiUrl) {
    const response = await axios.get(apiUrl);
    return response.data;
};

function findPrivatRate(data, currency) {
    return data.find(rate => rate.ccy === currency) || {};
};

function findMonoRate(data, currency) {
    if (currency === 'USD') {
        return data.find(rate => rate.currencyCodeA === 840 && rate.currencyCodeB === 980) || {};
    };

    if (currency === 'EUR') {
        return data.find(rate => rate.currencyCodeA === 978 && rate.currencyCodeB === 980) || {};
    };
};

function sendRateMessage(chatId, currency, privatRate, monoRate) {
    const privatBankBuy = parseFloat(privatRate.buy).toFixed(2);
    const privatBankSell = parseFloat(privatRate.sale).toFixed(2);
    const monobankBuy = parseFloat(monoRate.rateBuy).toFixed(2);
    const monobankSell = parseFloat(monoRate.rateSell).toFixed(2);

    bot.sendMessage(chatId, `Exchange rate for ${currency}:\nPrivatBank - BUY: ${privatBankBuy}, SELL: ${privatBankSell}\nMonobank - BUY: ${monobankBuy}, SELL: ${monobankSell}`);
};



