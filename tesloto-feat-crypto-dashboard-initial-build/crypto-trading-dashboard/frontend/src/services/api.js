const API_BASE_URL = `http://${window.location.hostname}:3001/api`;

/**
 * Fetches the health status from the backend API.
 */
export const getHealthStatus = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching health status:", error);
    return { status: 'error', message: error.message };
  }
};

/**
 * Fetches the list of available trading pairs from the backend API.
 */
export const getTradingPairs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/pairs`);
    if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching trading pairs:", error);
    return [];
  }
};

/**
 * Fetches historical kline data from the backend.
 * NOTE: The TradingView widget fetches its own data, so this function is not currently used by the chart.
 * It remains here for potential future use or for other components that might need raw kline data.
 */
export const getKlines = async (symbol, interval = '1h') => {
    try {
        const response = await fetch(`${API_BASE_URL}/klines?symbol=${symbol}&interval=${interval}`);
        if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching klines for ${symbol}:`, error);
        return [];
    }
};

/**
 * Fetches calculated technical indicators from the backend.
 */
export const getIndicators = async (symbol, interval = '1h') => {
  if (!symbol) return {};
  try {
    const response = await fetch(`${API_BASE_URL}/indicators?symbol=${symbol}&interval=${interval}`);
    if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching indicators for ${symbol}:`, error);
    return {};
  }
};

/**
 * Fetches the final analysis from the backend.
 */
export const getFinalAnalysis = async (symbol, interval = '1h') => {
  if (!symbol) return null;
  try {
    const response = await fetch(`${API_BASE_URL}/analyze?symbol=${symbol}&interval=${interval}`);
    if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching final analysis for ${symbol}:`, error);
    return null;
  }
};
