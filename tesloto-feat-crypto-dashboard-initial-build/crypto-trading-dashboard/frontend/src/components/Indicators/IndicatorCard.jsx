import React from 'react';
import { useTranslation } from 'react-i18next';

const IndicatorCard = ({ name, data }) => {
  const { t } = useTranslation();

  const renderValue = () => {
    if (typeof data.value === 'number') {
      return data.value.toFixed(2);
    }
    if (typeof data.value === 'object' && data.value !== null) {
      // For complex values, just show a main value or '...'
      return data.value.k?.toFixed(2) || data.value.histogram?.toFixed(2) || '...';
    }
    return data.signal;
  };

  const getTranslatedSignal = (signal) => {
    if (!signal) return t('signal_neutral');
    const lowerSignal = signal.toLowerCase();

    // Logic to handle signals from backend (which are in Spanish)
    if (lowerSignal === 'compra') return t('signal_buy');
    if (lowerSignal === 'venta') return t('signal_sell');
    if (lowerSignal === 'neutral') return t('signal_neutral');

    // For non-standard signals like "Tendencia Fuerte" or "Info", show them directly
    return signal;
  };

  const getSignalClass = (signal) => {
    if (!signal) return 'signal-neutral';
    const lowerSignal = signal.toLowerCase();

    if (lowerSignal === 'compra') return 'signal-buy';
    if (lowerSignal === 'venta') return 'signal-sell';
    return 'signal-neutral';
  };

  return (
    <div className="indicator-card">
      <div className="indicator-name">{name}</div>
      <div className="indicator-value">{renderValue()}</div>
      <div className={`indicator-signal ${getSignalClass(data.signal)}`}>
        {getTranslatedSignal(data.signal)}
      </div>
    </div>
  );
};

export default IndicatorCard;
