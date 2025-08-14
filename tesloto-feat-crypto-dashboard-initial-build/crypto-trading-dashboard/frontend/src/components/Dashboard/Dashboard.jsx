import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getHealthStatus, getIndicators, getFinalAnalysis } from '../../services/api';
import { useTheme } from '../../context/ThemeContext';

import LanguageSelector from '../Common/LanguageSelector';
import ThemeSwitcher from '../Common/ThemeSwitcher';
import PairSelector from './PairSelector';
import TimeframeSelector from './TimeframeSelector';
import TradingViewWidget from '../Chart/TradingViewWidget';
import IndicatorGrid from '../Indicators/IndicatorGrid';
import AnalysisResult from '../Results/AnalysisResult';
import SideMenu from '../Common/SideMenu';

// A new component for the animated background
const Particles = () => {
  useEffect(() => {
    const container = document.getElementById('particles');
    if (!container || container.hasChildNodes()) return;
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 6}s`;
      particle.style.animationDuration = `${Math.random() * 4 + 4}s`;
      container.appendChild(particle);
    }
  }, []);
  return <div className="background-particles" id="particles" />;
};

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();

  // State Management
  const [backendStatus, setBackendStatus] = useState('Offline');
  const [currentPair, setCurrentPair] = useState(null);
  const [currentTimeframe, setCurrentTimeframe] = useState('1h');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [indicators, setIndicators] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch backend status on initial load
  useEffect(() => {
    getHealthStatus().then(result => {
      if (result.status === 'ok') setBackendStatus('Activo');
    });
  }, []);

  // Manual analysis trigger
  const handleAnalysis = async () => {
    if (!currentPair) {
      alert(t('alert_select_pair'));
      return;
    }
    setIsLoading(true);
    // Fetch both indicators and final analysis
    const [indicatorData, analysisData] = await Promise.all([
      getIndicators(currentPair, currentTimeframe),
      getFinalAnalysis(currentPair, currentTimeframe)
    ]);
    setIndicators(indicatorData);
    setAnalysis(analysisData);
    setIsLoading(false);
  };

  return (
    <>
      <Particles />
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <div className="main-container">
        <header className="header">
          <div className="brand">
            <span className="dot"></span>
            <span>{t('dashboard_title')}</span>
          </div>
          <div className="nav-controls">
             <PairSelector onPairSelect={setCurrentPair} />
             <TimeframeSelector onTimeframeSelect={setCurrentTimeframe} />
             <button className="analyze-btn" onClick={handleAnalysis} disabled={isLoading}>
                {isLoading ? t('analysis_loading') : t('analyze_button')}
             </button>
             <ThemeSwitcher />
             <button id="openDrawer" className="menu-btn" onClick={() => setIsMenuOpen(true)}>Menú</button>
          </div>
        </header>

        <main className="dashboard-main">
            <div className="status-bar">
                <div className="status-indicator">
                    <span className={`status-dot ${backendStatus === 'Activo' ? 'active' : ''}`}></span>
                    <span>{t('backend_status_label')} {t(`status_${backendStatus.toLowerCase()}`)}</span>
                </div>
            </div>

            <section className="dashboard-grid">
              <div className="chart-container">
                <TradingViewWidget
                  symbol={`BINANCE:${currentPair || 'BTCUSDT'}`}
                  theme={theme}
                  locale={i18n.language.split('-')[0]}
                />
              </div>
              <aside className="analysis-panel">
                <AnalysisResult analysis={analysis} isLoading={isLoading} />
              </aside>
              <section className="indicators-section">
                <IndicatorGrid indicators={indicators} isLoading={isLoading} />
              </section>
            </section>
        </main>

        <footer className="footer">
            <div className="copyright">© Copyright HBR Hashbrow Republic 2025</div>
        </footer>
      </div>
    </>
  );
};

export default Dashboard;
