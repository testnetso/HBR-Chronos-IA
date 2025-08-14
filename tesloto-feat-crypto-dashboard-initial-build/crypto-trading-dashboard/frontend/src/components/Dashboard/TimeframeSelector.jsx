import React, { useState } from 'react';

const timeframes = ['1m', '5m', '15m', '1h', '4h', '1d', '1w'];

const TimeframeSelector = ({ onTimeframeSelect }) => {
  const [activeTimeframe, setActiveTimeframe] = useState('1h');

  const handleSelect = (event) => {
    const timeframe = event.target.value;
    setActiveTimeframe(timeframe);
    onTimeframeSelect(timeframe);
  };

  return (
    <select className="time-dropdown" value={activeTimeframe} onChange={handleSelect}>
        {timeframes.map((tf) => (
            <option key={tf} value={tf}>
                {tf.toUpperCase()}
            </option>
        ))}
    </select>
  );
};

export default TimeframeSelector;
