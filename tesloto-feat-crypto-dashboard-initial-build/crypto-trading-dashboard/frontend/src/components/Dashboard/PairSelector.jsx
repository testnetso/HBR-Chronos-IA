import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getTradingPairs } from '../../services/api';

const PairSelector = ({ onPairSelect }) => {
  const { t } = useTranslation();
  const [pairs, setPairs] = useState([]);
  const [selectedPair, setSelectedPair] = useState('');

  useEffect(() => {
    const fetchPairs = async () => {
      const fetchedPairs = await getTradingPairs();
      setPairs(fetchedPairs);
      if (fetchedPairs.length > 0) {
        const defaultPair = fetchedPairs[0].id;
        setSelectedPair(defaultPair);
        onPairSelect(defaultPair);
      }
    };

    fetchPairs();
  }, [onPairSelect]);

  const handleChange = (event) => {
    const newPair = event.target.value;
    setSelectedPair(newPair);
    onPairSelect(newPair);
  };

  return (
    <select className="trading-pair" value={selectedPair} onChange={handleChange}>
      {pairs.map((pair) => (
        <option key={pair.id} value={pair.id}>
          {pair.name}
        </option>
      ))}
    </select>
  );
};

export default PairSelector;
