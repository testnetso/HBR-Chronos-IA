const ti = require('technicalindicators');

const formatInput = (klines) => {
  const input = { open: [], high: [], low: [], close: [], volume: [], timestamp: [] };
  klines.forEach(k => {
    input.open.push(parseFloat(k[1]));
    input.high.push(parseFloat(k[2]));
    input.low.push(parseFloat(k[3]));
    input.close.push(parseFloat(k[4]));
    input.volume.push(parseFloat(k[5]));
    input.timestamp.push(k[0]);
  });
  return input;
};

const calculateIndicators = (klines) => {
  const input = formatInput(klines);
  const lastClose = input.close[input.close.length - 1];
  const results = {};

  const addIndicator = (name, calculation, signalLogic) => {
    try {
      const value = calculation();
      const valueToStore = (typeof value === 'object' && value !== null) ? (value.k ?? value.d ?? value.histogram ?? value.middle ?? value.adx ?? value.conversion ?? value.pp ?? value) : value;
      results[name] = { value: valueToStore, signal: signalLogic(value, lastClose) };
    } catch (e) {
      results[name] = { value: 0, signal: 'Error' };
    }
  };

  const maSignal = (val, close) => close > val ? 'Compra' : 'Venta';

  addIndicator('RSI', () => ti.RSI.calculate({ period: 14, values: input.close }).pop(), (val) => val > 70 ? 'Venta' : val < 30 ? 'Compra' : 'Neutral');
  addIndicator('Stochastic', () => ti.Stochastic.calculate({ ...input, period: 14, signalPeriod: 3 }).pop(), (val) => val.k > 80 ? 'Venta' : val.k < 20 ? 'Compra' : 'Neutral');
  addIndicator('MFI', () => ti.MFI.calculate({ ...input, period: 14 }).pop(), (val) => val > 80 ? 'Venta' : val < 20 ? 'Compra' : 'Neutral');
  addIndicator('CCI', () => ti.CCI.calculate({ ...input, period: 20 }).pop(), (val) => val > 100 ? 'Venta' : val < -100 ? 'Compra' : 'Neutral');
  addIndicator('Williams %R', () => ti.WilliamsR.calculate({ ...input, period: 14 }).pop(), (val) => val > -20 ? 'Venta' : val < -80 ? 'Compra' : 'Neutral');
  addIndicator('ROC', () => ti.ROC.calculate({ period: 10, values: input.close }).pop(), (val) => val > 0 ? 'Compra' : 'Venta');
  addIndicator('TRIX', () => ti.TRIX.calculate({ period: 18, values: input.close }).pop(), (val) => val > 0 ? 'Compra' : 'Venta');
  addIndicator('Ultimate Oscillator', () => ti.UltimateOscillator.calculate({ ...input, shortPeriod: 7, mediumPeriod: 14, longPeriod: 28 }).pop(), (val) => val > 70 ? 'Venta' : val < 30 ? 'Compra' : 'Neutral');
  addIndicator('MACD', () => ti.MACD.calculate({ values: input.close, fastPeriod: 12, slowPeriod: 26, signalPeriod: 9, SimpleMAOscillator: false, SimpleMASignal: false }).pop(), (val) => val.histogram > 0 ? 'Compra' : 'Venta');
  addIndicator('PPO', () => ti.PPO.calculate({ values: input.close, fastPeriod: 12, slowPeriod: 26, signalPeriod: 9 }).pop(), (val) => val.histogram > 0 ? 'Compra' : 'Venta');
  addIndicator('SMA (20)', () => ti.SMA.calculate({ period: 20, values: input.close }).pop(), maSignal);
  addIndicator('EMA (20)', () => ti.EMA.calculate({ period: 20, values: input.close }).pop(), maSignal);
  addIndicator('WMA (20)', () => ti.WMA.calculate({ period: 20, values: input.close }).pop(), maSignal);
  addIndicator('HMA (20)', () => ti.HMA.calculate({ period: 20, values: input.close }).pop(), maSignal);
  addIndicator('VWAP', () => ti.VWAP.calculate(input).pop(), maSignal);
  addIndicator('Bollinger Bands', () => ti.BollingerBands.calculate({ period: 20, values: input.close, stdDev: 2 }).pop(), (val, close) => close > val.upper ? 'Venta' : close < val.lower ? 'Compra' : 'Neutral');
  addIndicator('Keltner Channels', () => ti.KeltnerChannels.calculate({ ...input, period: 20, multiplier: 2, useSMA: true }).pop(), (val, close) => close > val.upper ? 'Venta' : close < val.lower ? 'Compra' : 'Neutral');
  addIndicator('Donchian Channels', () => ti.DonchianChannels.calculate({ ...input, period: 20 }).pop(), (val, close) => close > val.upper ? 'Compra' : close < val.lower ? 'Venta' : 'Neutral');
  addIndicator('True Range', () => ti.TrueRange.calculate(input).pop(), () => 'Info');
  addIndicator('ATR', () => ti.ATR.calculate({ ...input, period: 14 }).pop(), () => 'Info');
  addIndicator('DMI', () => ti.DMI.calculate({ ...input, period: 14 }).pop(), (val) => val.pdi > val.mdi ? 'Compra' : 'Venta');
  // Corrected ADX Logic
  addIndicator('ADX', () => ti.ADX.calculate({ ...input, period: 14 }).pop(), (val) => {
    if (val.adx < 25) return 'Tendencia Débil';
    return val.pdi > val.mdi ? 'Compra' : 'Venta';
  });
  addIndicator('OBV', () => ti.OBV.calculate(input).pop(), () => 'Info');
  addIndicator('ADL', () => ti.ADL.calculate(input).pop(), () => 'Info');
  addIndicator('CMF', () => ti.CMF.calculate({ ...input, period: 20 }).pop(), (val) => val > 0 ? 'Compra' : 'Venta');
  addIndicator('Ichimoku Cloud', () => ti.IchimokuCloud.calculate({ ...input }).pop(), (val, close) => close > val.spanA && close > val.spanB ? 'Compra' : 'Venta');
  addIndicator('Pivot Points', () => ti.PivotPoints.calculate({ ...input }).pop(), () => 'Info');
  addIndicator('Historical Volatility', () => ti.HistoricalVolatility.calculate({ period: 20, values: input.close }).pop(), () => 'Info');
  addIndicator('Z-Score', () => ti.ZScore.calculate({ period: 20, values: input.close }).pop(), (val) => val > 2 ? 'Venta' : val < -2 ? 'Compra' : 'Neutral');
  addIndicator('Awesome Oscillator', () => ti.AwesomeOscillator.calculate({ ...input, fastPeriod: 5, slowPeriod: 34 }).pop(), (val) => val > 0 ? 'Compra' : 'Venta');

  return results;
};

module.exports = {
  calculateIndicators,
};
