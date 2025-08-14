const express = require('express');
const router = express.Router();
const { fetchKlines } = require('../services/binanceService');
const { calculateIndicators } = require('../services/indicatorService');
const { generateFinalAnalysis } = require('../services/analysisService');

// --- Static Data (User's Full List) ---
const tradingPairs = [
  { id: 'BTCUSDT', name: 'BTC/USDT' }, { id: 'ETHUSDT', name: 'ETH/USDT' }, { id: 'BCHUSDT', name: 'BCH/USDT' },
  { id: 'XRPUSDT', name: 'XRP/USDT' }, { id: 'LTCUSDT', name: 'LTC/USDT' }, { id: 'TRXUSDT', name: 'TRX/USDT' },
  { id: 'ETCUSDT', name: 'ETC/USDT' }, { id: 'LINKUSDT', name: 'LINK/USDT' }, { id: 'XLMUSDT', name: 'XLM/USDT' },
  { id: 'ADAUSDT', name: 'ADA/USDT' }, { id: 'XMRUSDT', name: 'XMR/USDT' }, { id: 'DASHUSDT', name: 'DASH/USDT' },
  { id: 'ZECUSDT', name: 'ZEC/USDT' }, { id: 'XTZUSDT', name: 'XTZ/USDT' }, { id: 'BNBUSDT', name: 'BNB/USDT' },
  { id: 'ATOMUSDT', name: 'ATOM/USDT' }, { id: 'ONTUSDT', name: 'ONT/USDT' }, { id: 'IOTAUSDT', name: 'IOTA/USDT' },
  { id: 'BATUSDT', name: 'BAT/USDT' }, { id: 'VETUSDT', name: 'VET/USDT' }, { id: 'NEOUSDT', name: 'NEO/USDT' },
  { id: 'QTUMUSDT', name: 'QTUM/USDT' }, { id: 'IOSTUSDT', name: 'IOST/USDT' }, { id: 'THETAUSDT', name: 'THETA/USDT' },
  { id: 'ALGOUSDT', name: 'ALGO/USDT' }, { id: 'ZILUSDT', name: 'ZIL/USDT' }, { id: 'KNCUSDT', name: 'KNC/USDT' },
  { id: 'ZRXUSDT', name: 'ZRX/USDT' }, { id: 'COMPUSDT', name: 'COMP/USDT' }, { id: 'DOGEUSDT', name: 'DOGE/USDT' },
  { id: 'SXPUSDT', name: 'SXP/USDT' }, { id: 'KAVAUSDT', name: 'KAVA/USDT' }, { id: 'BANDUSDT', name: 'BAND/USDT' },
  { id: 'RLCUSDT', name: 'RLC/USDT' }, { id: 'MKRUSDT', name: 'MKR/USDT' }, { id: 'SNXUSDT', name: 'SNX/USDT' },
  { id: 'DOTUSDT', name: 'DOT/USDT' }, { id: 'YFIUSDT', name: 'YFI/USDT' }, { id: 'CRVUSDT', name: 'CRV/USDT' },
  { id: 'TRBUSDT', name: 'TRB/USDT' }, { id: 'RUNEUSDT', name: 'RUNE/USDT' }, { id: 'SUSHIUSDT', name: 'SUSHI/USDT' },
  { id: 'EGLDUSDT', name: 'EGLD/USDT' }, { id: 'SOLUSDT', name: 'SOL/USDT' }, { id: 'ICXUSDT', name: 'ICX/USDT' },
  { id: 'STORJUSDT', name: 'STORJ/USDT' }, { id: 'UNIUSDT', name: 'UNI/USDT' }, { id: 'AVAXUSDT', name: 'AVAX/USDT' },
  { id: 'ENJUSDT', name: 'ENJ/USDT' }, { id: 'FLMUSDT', name: 'FLM/USDT' }, { id: 'KSMUSDT', name: 'KSM/USDT' },
  { id: 'NEARUSDT', name: 'NEAR/USDT' }, { id: 'AAVEUSDT', name: 'AAVE/USDT' }, { id: 'FILUSDT', name: 'FIL/USDT' },
  { id: 'RSRUSDT', name: 'RSR/USDT' }, { id: 'LRCUSDT', name: 'LRC/USDT' }, { id: 'BELUSDT', name: 'BEL/USDT' },
  { id: 'AXSUSDT', name: 'AXS/USDT' }, { id: 'ALPHAUSDT', name: 'ALPHA/USDT' }, { id: 'ZENUSDT', name: 'ZEN/USDT' },
  { id: 'SKLUSDT', name: 'SKL/USDT' }, { id: 'GRTUSDT', name: 'GRT/USDT' }, { id: '1INCHUSDT', name: '1INCH/USDT' },
  { id: 'CHZUSDT', name: 'CHZ/USDT' }, { id: 'SANDUSDT', name: 'SAND/USDT' }, { id: 'ANKRUSDT', name: 'ANKR/USDT' },
  { id: 'RVNUSDT', name: 'RVN/USDT' }, { id: 'SFPUSDT', name: 'SFP/USDT' }, { id: 'COTIUSDT', name: 'COTI/USDT' },
  { id: 'CHRUSDT', name: 'CHR/USDT' }, { id: 'MANAUSDT', name: 'MANA/USDT' }, { id: 'ALICEUSDT', name: 'ALICE/USDT' },
  { id: 'HBARUSDT', name: 'HBAR/USDT' }, { id: 'ONEUSDT', name: 'ONE/USDT' }, { id: 'DENTUSDT', name: 'DENT/USDT' },
  { id: 'CELRUSDT', name: 'CELR/USDT' }, { id: 'HOTUSDT', name: 'HOT/USDT' }, { id: 'MTLUSDT', name: 'MTL/USDT' },
  { id: 'OGNUSDT', name: 'OGN/USDT' }, { id: '1000SHIBUSDT', name: '1000SHIB/USDT' }, { id: 'BAKEUSDT', name: 'BAKE/USDT' },
  { id: 'GTCUSDT', name: 'GTC/USDT' }, { id: 'BTCDOMUSDT', name: 'BTCDOM/USDT' }, { id: 'IOTXUSDT', name: 'IOTX/USDT' },
  { id: 'C98USDT', name: 'C98/USDT' }, { id: 'MASKUSDT', name: 'MASK/USDT' }, { id: 'ATAUSDT', name: 'ATA/USDT' },
  { id: 'DYDXUSDT', name: 'DYDX/USDT' }, { id: '1000XECUSDT', name: '1000XEC/USDT' }, { id: 'GALAUSDT', name: 'GALA/USDT' },
  { id: 'CELOUSDT', name: 'CELO/USDT' }, { id: 'ARUSDT', name: 'AR/USDT' }, { id: 'ARPAUSDT', name: 'ARPA/USDT' },
  { id: 'CTSIUSDT', name: 'CTSI/USDT' }, { id: 'LPTUSDT', name: 'LPT/USDT' }, { id: 'ENSUSDT', name: 'ENS/USDT' },
  { id: 'PEOPLEUSDT', name: 'PEOPLE/USDT' }, { id: 'ROSEUSDT', name: 'ROSE/USDT' }, { id: 'DUSKUSDT', name: 'DUSK/USDT' },
  { id: 'FLOWUSDT', name: 'FLOW/USDT' }, { id: 'IMXUSDT', name: 'IMX/USDT' }, { id: 'API3USDT', name: 'API3/USDT' },
  { id: 'GMTUSDT', name: 'GMT/USDT' }, { id: 'APEUSDT', name: 'APE/USDT' }, { id: 'WOOUSDT', name: 'WOO/USDT' },
  { id: 'JASMYUSDT', name: 'JASMY/USDT' }, { id: 'OPUSDT', name: 'OP/USDT' }, { id: 'INJUSDT', name: 'INJ/USDT' },
  { id: 'STGUSDT', name: 'STG/USDT' }, { id: 'SPELLUSDT', name: 'SPELL/USDT' }, { id: '1000LUNCUSDT', name: '1000LUNC/USDT' },
  { id: 'LUNA2USDT', name: 'LUNA2/USDT' }, { id: 'LDOUSDT', name: 'LDO/USDT' }, { id: 'ICPUSDT', name: 'ICP/USDT' },
  { id: 'APTUSDT', name: 'APT/USDT' }, { id: 'QNTUSDT', name: 'QNT/USDT' }, { id: 'FETUSDT', name: 'FET/USDT' },
  { id: 'FXSUSDT', name: 'FXS/USDT' }, { id: 'HOOKUSDT', name: 'HOOK/USDT' }, { id: 'MAGICUSDT', name: 'MAGIC/USDT' },
  { id: 'TUSDT', name: 'T/USDT' }, { id: 'HIGHUSDT', name: 'HIGH/USDT' }, { id: 'MINAUSDT', name: 'MINA/USDT' },
  { id: 'ASTRUSDT', name: 'ASTR/USDT' }, { id: 'PHBUSDT', name: 'PHB/USDT' }, { id: 'GMXUSDT', name: 'GMX/USDT' },
  { id: 'CFXUSDT', name: 'CFX/USDT' }, { id: 'STXUSDT', name: 'STX/USDT' }, { id: 'ACHUSDT', name: 'ACH/USDT' },
  { id: 'SSVUSDT', name: 'SSV/USDT' }, { id: 'CKBUSDT', name: 'CKB/USDT' }, { id: 'PERPUSDT', name: 'PERP/USDT' },
  { id: 'TRUUSDT', name: 'TRU/USDT' }, { id: 'LQTYUSDT', name: 'LQTY/USDT' }, { id: 'USDCUSDT', name: 'USDC/USDT' },
  { id: 'IDUSDT', name: 'ID/USDT' }, { id: 'ARBUSDT', name: 'ARB/USDT' }, { id: 'JOEUSDT', name: 'JOE/USDT' },
  { id: 'TLMUSDT', name: 'TLM/USDT' }, { id: 'LEVERUSDT', name: 'LEVER/USDT' }, { id: 'RDNTUSDT', name: 'RDNT/USDT' },
  { id: 'HFTUSDT', name: 'HFT/USDT' }, { id: 'XVSUSDT', name: 'XVS/USDT' }, { id: 'ETHBTC', name: 'ETH/BTC' },
  { id: 'BLURUSDT', name: 'BLUR/USDT' }, { id: 'EDUUSDT', name: 'EDU/USDT' }, { id: 'SUIUSDT', name: 'SUI/USDT' },
  { id: '1000PEPEUSDT', name: '1000PEPE/USDT' }, { id: '1000FLOKIUSDT', name: '1000FLOKI/USDT' }, { id: 'UMAUSDT', name: 'UMA/USDT' },
  { id: 'NMRUSDT', name: 'NMR/USDT' }, { id: 'MAVUSDT', name: 'MAV/USDT' }, { id: 'XVGUSDT', name: 'XVG/USDT' },
  { id: 'WLDUSDT', name: 'WLD/USDT' }, { id: 'PENDLEUSDT', name: 'PENDLE/USDT' }, { id: 'ARKMUSDT', name: 'ARKM/USDT' },
  { id: 'AGLDUSDT', name: 'AGLD/USDT' }, { id: 'YGGUSDT', name: 'YGG/USDT' }, { id: 'DODOXUSDT', name: 'DODOX/USDT' },
  { id: 'BNTUSDT', name: 'BNT/USDT' }, { id: 'OXTUSDT', name: 'OXT/USDT' }, { id: 'SEIUSDT', name: 'SEI/USDT' },
  { id: 'CYBERUSDT', name: 'CYBER/USDT' }, { id: 'HIFIUSDT', name: 'HIFI/USDT' }, { id: 'ARKUSDT', name: 'ARK/USDT' },
  { id: 'BICOUSDT', name: 'BICO/USDT' }, { id: 'BIGTIMEUSDT', name: 'BIGTIME/USDT' }, { id: 'WAXPUSDT', name: 'WAXP/USDT' },
  { id: 'BSVUSDT', name: 'BSV/USDT' }, { id: 'RIFUSDT', name: 'RIF/USDT' }, { id: 'POLYXUSDT', name: 'POLYX/USDT' },
  { id: 'GASUSDT', name: 'GAS/USDT' }, { id: 'POWRUSDT', name: 'POWR/USDT' }, { id: 'TIAUSDT', name: 'TIA/USDT' },
  { id: 'CAKEUSDT', name: 'CAKE/USDT' }, { id: 'MEMEUSDT', name: 'MEME/USDT' }, { id: 'TWTUSDT', name: 'TWT/USDT' },
  { id: 'TOKENUSDT', name: 'TOKEN/USDT' }, { id: 'ORDIUSDT', name: 'ORDI/USDT' }, { id: 'STEEMUSDT', name: 'STEEM/USDT' },
  { id: 'ILVUSDT', name: 'ILV/USDT' }, { id: 'NTRNUSDT', name: 'NTRN/USDT' }, { id: 'KASUSDT', name: 'KAS/USDT' },
  { id: 'BEAMXUSDT', name: 'BEAMX/USDT' }, { id: '1000BONKUSDT', name: '1000BONK/USDT' }, { id: 'PYTHUSDT', name: 'PYTH/USDT' },
  { id: 'SUPERUSDT', name: 'SUPER/USDT' }, { id: 'USTCUSDT', name: 'USTC/USDT' }, { id: 'ONGUSDT', name: 'ONG/USDT' },
  { id: 'ETHWUSDT', name: 'ETHW/USDT' }, { id: 'JTOUSDT', name: 'JTO/USDT' }, { id: '1000SATSUSDT', name: '1000SATS/USDT' },
  { id: 'AUCTIONUSDT', name: 'AUCTION/USDT' }, { id: '1000RATSUSDT', name: '1000RATS/USDT' }, { id: 'ACEUSDT', name: 'ACE/USDT' },
  { id: 'MOVRUSDT', name: 'MOVR/USDT' }, { id: 'NFPUSDT', name: 'NFP/USDT' }, { id: 'BTCUSDC', name: 'BTC/USDC' },
  { id: 'ETHUSDC', name: 'ETH/USDC' }, { id: 'BNBUSDC', name: 'BNB/USDC' }, { id: 'SOLUSDC', name: 'SOL/USDC' },
  { id: 'XRPUSDC', name: 'XRP/USDC' }, { id: 'AIUSDT', name: 'AI/USDT' }, { id: 'XAIUSDT', name: 'XAI/USDT' },
  { id: 'DOGEUSDC', name: 'DOGE/USDC' }, { id: 'WIFUSDT', name: 'WIF/USDT' }, { id: 'MANTAUSDT', name: 'MANTA/USDT' },
  { id: 'ONDOUSDT', name: 'ONDO/USDT' }, { id: 'LSKUSDT', name: 'LSK/USDT' }, { id: 'ALTUSDT', name: 'ALT/USDT' },
  { id: 'JUPUSDT', name: 'JUP/USDT' }, { id: 'ZETAUSDT', name: 'ZETA/USDT' }, { id: 'RONINUSDT', name: 'RONIN/USDT' },
  { id: 'DYMUSDT', name: 'DYM/USDT' }, { id: 'SUIUSDC', name: 'SUI/USDC' }, { id: 'OMUSDT', name: 'OM/USDT' },
  { id: 'LINKUSDC', name: 'LINK/USDC' }, { id: 'PIXELUSDT', name: 'PIXEL/USDT' }, { id: 'STRKUSDT', name: 'STRK/USDT' },
  { id: 'ORDIUSDC', name: 'ORDI/USDC' }, { id: 'GLMUSDT', name: 'GLM/USDT' }, { id: 'PORTALUSDT', name: 'PORTAL/USDT' },
  { id: 'TONUSDT', name: 'TON/USDT' }, { id: 'AXLUSDT', name: 'AXL/USDT' }, { id: 'MYROUSDT', name: 'MYRO/USDT' }
];

// --- Routes ---
router.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
router.get('/pairs', (req, res) => res.json(tradingPairs));

// Get all indicators
router.get('/indicators', async (req, res) => {
  try {
    const { symbol, interval = '1h' } = req.query;
    if (!symbol) return res.status(400).json({ message: 'Symbol is required' });

    // Increase candle count to 500 for more reliable indicator calculation
    const klines = await fetchKlines(symbol, interval, 500);
    if (klines.length < 200) { // Some indicators need significant data
        return res.status(400).json({ message: 'Not enough historical data to generate analysis.' });
    }
    const indicators = calculateIndicators(klines);
    res.json(indicators);
  } catch (error) {
    console.error('!!! CRITICAL ERROR IN /indicators ROUTE !!!:', error);
    res.status(500).json({ message: 'Failed to calculate indicators due to a server error.' });
  }
});

// Get final analysis
router.get('/analyze', async (req, res) => {
  try {
    const { symbol, interval = '1h' } = req.query;
    if (!symbol) return res.status(400).json({ message: 'Symbol is required' });

    const klines = await fetchKlines(symbol, interval, 500);
    if (klines.length < 200) {
        return res.status(400).json({ message: 'Not enough historical data to generate analysis.' });
    }
    const indicators = calculateIndicators(klines);
    const finalAnalysis = generateFinalAnalysis(indicators);
    res.json(finalAnalysis);
  } catch (error) {
    console.error('!!! CRITICAL ERROR IN /analyze ROUTE !!!:', error);
    res.status(500).json({ message: 'Failed to generate final analysis due to a server error.' });
  }
});

module.exports = router;
