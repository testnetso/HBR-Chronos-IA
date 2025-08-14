const axios = require('axios');

const BINANCE_API_URL = 'https://api.binance.com/api/v3';

/**
 * Fetches kline/candlestick data from Binance.
 * @param {string} symbol The trading symbol (e.g., 'BTCUSDT').
 * @param {string} interval The interval (e.g., '1h', '4h', '1d').
 * @param {number} limit The number of data points to retrieve (max 1000).
 * @returns {Promise<Array>} A promise that resolves to an array of kline data arrays.
 */
const fetchKlines = async (symbol, interval = '1h', limit = 200) => {
  if (!symbol) {
    throw new Error('Symbol is required to fetch klines.');
  }

  try {
    const response = await axios.get(`${BINANCE_API_URL}/klines`, {
      params: {
        symbol: symbol.toUpperCase(),
        interval,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching klines for ${symbol} from Binance:`, error.response ? error.response.data : error.message);
    // Re-throw a more generic error to not expose too many details to the client
    throw new Error('Failed to fetch data from Binance API.');
  }
};

module.exports = {
  fetchKlines,
};
