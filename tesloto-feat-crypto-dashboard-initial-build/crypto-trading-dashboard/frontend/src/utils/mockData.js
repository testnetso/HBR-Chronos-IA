// Generates some random candlestick data for mocking
const generateMockData = (count = 200) => {
  const data = [];
  let lastClose = 100;
  let time = new Date();
  time.setHours(0, 0, 0, 0);

  for (let i = 0; i < count; i++) {
    const open = lastClose;
    const close = open + (Math.random() - 0.5) * 10;
    const high = Math.max(open, close) + Math.random() * 5;
    const low = Math.min(open, close) - Math.random() * 5;

    data.push({
      time: time.getTime() / 1000,
      open: open,
      high: high,
      low: low,
      close: close,
    });

    lastClose = close;
    time.setDate(time.getDate() + 1);
  }
  return data;
};

export const mockCandlestickData = generateMockData();

// Mock data for the user's requested list of technical indicators
export const mockIndicatorData = {
  'RSI': { value: 48.5, signal: 'Neutral' },
  'MACD': { value: 0.15, signal: 'Bullish' },
  'Stochastic': { k: 55, d: 52, signal: 'Neutral' },
  'Keltner Channel': { upper: 104.2, middle: 100.1, lower: 96.0, signal: 'Neutral' },
  'SMA (20)': { value: 99.8, signal: 'Price is above SMA' },
  'ADX': { value: 18.2, signal: 'Weak Trend' },
  'CCI': { value: 95, signal: 'Neutral' },
  'Momentum': { value: 1.5, signal: 'Bullish' },
  'Bollinger Bands': { upper: 105.1, middle: 99.9, lower: 94.7, signal: 'Neutral' },
  'ATR': { value: 2.3, signal: 'Low Volatility' },
  'Volume': { value: 1500000, signal: 'Average Volume' },
  'Parabolic SAR': { value: 98.9, signal: 'Bullish' },
  'StochRSI': { k: 70, d: 65, signal: 'Bullish' },
  'KDJ': { k: 75, d: 68, j: 89, signal: 'Bullish' },
  'EMA (20)': { value: 100.5, signal: 'Price is above EMA' },
};

// Mock data for the final analysis result
export const mockAnalysisData = {
  summary: 'Based on the combination of 15 technical indicators, the short-term outlook is moderately bullish. Key drivers are the recent crossover on the MACD and price holding above the 20-period EMA.',
  signal: 'Bullish',
  probability: 68, // Probability in percentage
  indicatorSummary: {
    bullish: 7,
    bearish: 3,
    neutral: 5,
  }
};
