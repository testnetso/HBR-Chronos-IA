const generateFinalAnalysis = (indicators) => {
  let buySignals = 0;
  let sellSignals = 0;
  let neutralSignals = 0;

  for (const key in indicators) {
    const signal = indicators[key].signal;
    if (signal === 'Compra') {
      buySignals++;
    } else if (signal === 'Venta') {
      sellSignals++;
    } else if (signal !== 'Info' && signal !== 'Error' && signal !== 'Tendencia Fuerte' && signal !== 'Tendencia Débil') {
      neutralSignals++;
    }
  }

  let finalSignal = 'Neutral';
  if (buySignals > sellSignals) {
    finalSignal = 'Compra';
  } else if (sellSignals > buySignals) {
    finalSignal = 'Venta';
  }

  const totalDirectionalSignals = buySignals + sellSignals;
  let probability = 50;

  if (totalDirectionalSignals > 0 && finalSignal !== 'Neutral') {
    if (finalSignal === 'Compra') {
      probability = (buySignals / totalDirectionalSignals) * 100;
    } else {
      probability = (sellSignals / totalDirectionalSignals) * 100;
    }
  }

  const summary = `Análisis basado en ${Object.keys(indicators).length} indicadores. Señales de Compra: ${buySignals}. Señales de Venta: ${sellSignals}.`;

  return {
    signal: finalSignal,
    probability: Math.round(probability),
    summary,
    indicatorSummary: {
      bullish: buySignals,
      bearish: sellSignals,
      neutral: neutralSignals,
    },
  };
};

module.exports = {
  generateFinalAnalysis,
};
