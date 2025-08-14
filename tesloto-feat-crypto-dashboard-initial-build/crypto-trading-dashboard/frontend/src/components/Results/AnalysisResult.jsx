import React from 'react';
import { useTranslation } from 'react-i18next';

const AnalysisResult = ({ analysis, isLoading }) => {
  const { t } = useTranslation();

  if (isLoading) {
    return <div className="analysis-card">{t('analysis_loading')}</div>;
  }

  if (!analysis) {
    return <div className="analysis-card">{t('analysis_no_data')}</div>;
  }

  const displaySignal = t(`signal_${analysis.signal.toLowerCase()}`);
  const confidencePercentage = analysis.probability || 0;
  const circleDegrees = (confidencePercentage / 100) * 360;

  const getSignalClass = (signal) => {
    if (!signal) return 'signal-neutral';
    const lowerSignal = signal.toLowerCase();
    if (lowerSignal === 'compra') return 'signal-buy';
    if (lowerSignal === 'venta') return 'signal-sell';
    return 'signal-neutral';
  };

  return (
    <div className="analysis-card">
        <center><h2>{t('analysis_title')}</h2>
        <h3>{t('prob_meter_title')}</h3></center> <br/>

        <div className="signal-general">
            <div className="signal-badge-center">{displaySignal}</div>
            <div>{t('signal_display_title')}</div>
        </div>

        <div className="confidence-circle">
            <div className="circle-bg" style={{ background: `conic-gradient(from 0deg, #00ffff 0deg, #00ffff ${circleDegrees}deg, rgba(255, 255, 255, 0.1) ${circleDegrees}deg)` }}>
                <span className="confidence-text">{confidencePercentage}%</span>
            </div>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
            <h4>{t('analysis_summary')}</h4>
            <p>{analysis.summary}</p>

            <p style={{ marginTop: '1rem' }}><strong>{t('analysis_breakdown')}</strong></p>
            <span className={getSignalClass('Compra')}>{t('signal_buy')}: {analysis.indicatorSummary.bullish}</span>
            <span className={getSignalClass('Venta')} style={{marginLeft: '10px'}}> {t('signal_sell')}: {analysis.indicatorSummary.bearish}</span>
            <span className={getSignalClass('Neutral')} style={{marginLeft: '10px'}}> {t('signal_neutral')}: {analysis.indicatorSummary.neutral}</span>
        </div>
    </div>
  );
};

export default AnalysisResult;
