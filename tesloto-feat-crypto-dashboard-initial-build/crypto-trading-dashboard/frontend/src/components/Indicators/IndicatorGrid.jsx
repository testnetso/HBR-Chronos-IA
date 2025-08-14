import React from 'react';
import { useTranslation } from 'react-i18next';
import IndicatorCard from './IndicatorCard';
import '../../styles/Indicators.css';

const IndicatorGrid = ({ indicators, isLoading }) => {
  const { t } = useTranslation();

  if (isLoading) {
    return <p>{t('indicators_loading')}</p>;
  }

  if (!indicators) {
      return <p>{t('indicators_no_data')}</p>
  }

  return (
    <div className="indicator-grid-container">
      <h3>{t('indicators_title')}</h3>
      <div className="indicator-grid">
        {Object.entries(indicators).map(([name, data]) => (
          <IndicatorCard key={name} name={name} data={data} />
        ))}
      </div>
    </div>
  );
};

export default IndicatorGrid;
