import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // Initialize i18next
  .init({
    debug: true, // Turn off in production
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    resources: {
      en: {
        translation: {
          // General
          dashboard_title: 'HBR Chronos AI',
          backend_status_label: 'Servidor:',
          trading_pair_label: 'Trading Pair',
          // Statuses
          status_online: 'Online',
          status_offline: 'Offline',
          status_checking: 'checking...',
          // Signals
          signal_buy: 'Buy',
          signal_sell: 'Sell',
          signal_neutral: 'Neutral',
          // Component specific
          chart_loading: 'Loading Chart...',
          chart_placeholder: 'Chart will be displayed here (Component temporarily disabled)',
          indicators_title: 'Technical Indicators',
          indicators_loading: 'Loading Technical Indicators...',
          indicators_no_data: 'No indicator data available.',
          indicator_card_value: 'Value:',
          indicator_card_signal: 'Signal:',
          analysis_title: 'Final Analysis',
          analysis_loading: 'Running Final Analysis...',
          analysis_no_data: 'No analysis data available.',
          analysis_summary: 'Summary',
          analysis_breakdown: 'Indicator Breakdown:',
          prob_meter_title: 'Signal Confidence',
          signal_display_title: 'Overall Signal',
          // About Modal
          about_title: 'About This Analysis',
          about_intro: 'This tool performs an automated technical analysis based on a set of common indicators. It is not financial advice.',
          about_how_it_works: 'How It Works',
          about_p1: 'The system fetches the latest price data for the selected pair and timeframe from Binance.',
          about_p2: 'It then calculates ~30 technical indicators. Each indicator provides a "Buy", "Sell", or "Neutral" signal.',
          about_p3: 'The final analysis aggregates these individual signals into a single recommendation and a confidence score.',
          prob_table_title: 'Probability Guide',
          prob_high: 'High',
          prob_medium: 'Medium',
          prob_low: 'Low',
          prob_high_desc: '80-100% | Strong consensus among indicators.',
          prob_medium_desc: '60-79% | Moderate consensus among indicators.',
          prob_low_desc: '50-59% | Weak or mixed signals.',
        }
      },
      es: {
        translation: {
          // General
          dashboard_title: 'HBR Chronos AI',
          backend_status_label: 'Servidor:',
          trading_pair_label: 'Par de Trading',
          // Statuses
          status_online: 'En línea',
          status_offline: 'Fuera de línea',
          status_checking: 'verificando...',
          // Signals
          signal_buy: 'Compra',
          signal_sell: 'Venta',
          signal_neutral: 'Neutral',
          // Component specific
          chart_loading: 'Cargando Gráfico...',
          chart_placeholder: 'El gráfico se mostrará aquí (Componente deshabilitado temporalmente)',
          indicators_title: 'Indicadores Técnicos',
          indicators_loading: 'Cargando Indicadores Técnicos...',
          indicators_no_data: 'No hay datos de indicadores disponibles.',
          indicator_card_value: 'Valor:',
          indicator_card_signal: 'Señal:',
          analysis_title: 'Análisis Final',
          analysis_loading: 'Realizando análisis final...',
          analysis_no_data: 'No hay datos de análisis disponibles.',
          analysis_summary: 'Resumen',
          analysis_breakdown: 'Desglose de Indicadores:',
          prob_meter_title: 'Confianza de la Señal',
          signal_display_title: 'Señal General',
          // About Modal
          about_title: 'Sobre Este Análisis',
          about_intro: 'Esta herramienta realiza un análisis técnico automatizado basado en un conjunto de indicadores comunes. No es asesoramiento financiero.',
          about_how_it_works: 'Cómo Funciona',
          about_p1: 'El sistema obtiene los datos de precios más recientes para el par y la temporalidad seleccionados desde Binance.',
          about_p2: 'Luego calcula ~30 indicadores técnicos. Cada indicador proporciona una señal de "Compra", "Venta" o "Neutral".',
          about_p3: 'El análisis final agrega estas señales individuales en una única recomendación y un puntaje de confianza.',
          prob_table_title: 'Guía de Probabilidad',
          prob_high: 'Alta',
          prob_medium: 'Media',
          prob_low: 'Baja',
          prob_high_desc: '80-100% | Consenso fuerte entre los indicadores.',
          prob_medium_desc: '60-79% | Consenso moderado entre los indicadores.',
          prob_low_desc: '50-59% | Señales débiles o mixtas.',
        }
      },
      ro: {
        translation: {
          // General
          dashboard_title: 'HBR Chronos AI',
          backend_status_label: 'Server:',
          trading_pair_label: 'Pereche de Tranzacționare',
          // Statuses
          status_online: 'Online',
          status_offline: 'Offline',
          status_checking: 'se verifică...',
          // Signals
          signal_buy: 'Cumpără',
          signal_sell: 'Vinde',
          signal_neutral: 'Neutru',
          // Component specific
          chart_loading: 'Se încarcă Graficul...',
          chart_placeholder: 'Graficul va fi afișat aici (Componentă dezactivată temporar)',
          indicators_title: 'Indicatori Tehnici',
          indicators_loading: 'Se încarcă Indicatorii Tehnici...',
          indicators_no_data: 'Nu sunt disponibile date despre indicatori.',
          indicator_card_value: 'Valoare:',
          indicator_card_signal: 'Semnal:',
          analysis_title: 'Analiză Finală',
          analysis_loading: 'Se efectuează analiza finală...',
          analysis_no_data: 'Nu sunt disponibile date de analiză.',
          analysis_summary: 'Rezumat',
          analysis_breakdown: 'Sumar Indicatori:',
          prob_meter_title: 'Încredere Semnal',
          signal_display_title: 'Semnal General',
          // About Modal
          about_title: 'Despre Această Analiză',
          about_intro: 'Acest instrument efectuează o analiză tehnică automată bazată pe un set de indicatori comuni. Nu reprezintă consultanță financiară.',
          about_how_it_works: 'Cum Funcționează',
          about_p1: 'Sistemul preia cele mai recente date de preț pentru perechea și intervalul de timp selectate de pe Binance.',
          about_p2: 'Apoi calculează ~30 de indicatori tehnici. Fiecare indicator oferă un semnal de "Cumpără", "Vinde" sau "Neutru".',
          about_p3: 'Analiza finală cumulează aceste semnale individuale într-o singură recomandare și un scor de încredere.',
          prob_table_title: 'Ghid de Probabilitate',
          prob_high: 'Ridicat',
          prob_medium: 'Mediu',
          prob_low: 'Scăzut',
          prob_high_desc: '80-100% | Consens puternic între indicatori.',
          prob_medium_desc: '60-79% | Consens moderat între indicatori.',
          prob_low_desc: '50-59% | Semnale slabe sau mixte.',
        }
      }
    }
  });

export default i18n;
