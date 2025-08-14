import React, { useEffect, useRef } from 'react';

const TradingViewWidget = ({ symbol, theme, locale }) => {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;

    // To prevent duplicate widgets, clear the container first
    container.current.innerHTML = '';

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;

    // The configuration object for the widget
    const widgetConfig = {
      "autosize": true,
      "symbol": symbol || "BINANCE:BTCUSDT",
      "interval": "60", // 60 minutes = 1h
      "timezone": "Etc/UTC",
      "theme": theme === 'dark' ? 'dark' : 'light',
      "style": "1",
      "locale": locale || "en",
      "enable_publishing": false,
      "hide_top_toolbar": false,
      "allow_symbol_change": true,
      "save_image": false,
      "container_id": `tradingview-widget-container__widget-${Math.random()}` // Unique ID
    };

    script.innerHTML = JSON.stringify(widgetConfig);

    container.current.appendChild(script);

  }, [symbol, theme, locale]);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
      {/* The script will populate this div */}
    </div>
  );
}

// Use React.memo to prevent re-renders if props haven't changed
export default React.memo(TradingViewWidget);
