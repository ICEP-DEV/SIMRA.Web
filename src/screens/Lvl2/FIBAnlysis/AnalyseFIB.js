import React, { useState } from 'react';

const FibAnalysis = () => {
  const [selectedFIB, setSelectedFIB] = useState('Select a FIB');
  const [referencePath, setReferencePath] = useState('');
  const [ratio, setRatio] = useState(0);
  const [estimatedCount, setEstimatedCount] = useState(0); 

  const fibData = {
    'E.coli': { referencePath: 'Campylobacter', ratio: 0.66, estimatedCount: 0 },
    'Coliform': { referencePath: 'Cryptosporidium', ratio: 1, estimatedCount: 0 },
    'Enterococcus': { referencePath: 'Campylobacter', ratio: 0.01, estimatedCount: 0 },
    'Clostridium': { referencePath: 'Giardia', ratio: 0.8, estimatedCount: 0 },
  };

  const handleFibData = (fib) => {
    setSelectedFIB(fib);
    if (fibData[fib]) {
      setReferencePath(fibData[fib].referencePath);
      setRatio(fibData[fib].ratio);
      // You can update the estimated count here based on user input or any other logic
    } else {
      setReferencePath('');
      setRatio(0);
      setEstimatedCount(0);
    }
  };

  return (
    <div>
      <p>Select an FIB:</p>
      <select
        value={selectedFIB}
        onChange={(event) => handleFibData(event.target.value)}
      >
        <option value="Select a FIB">Select an FIB</option>
        {Object.keys(fibData).map((fib) => (
          <option key={fib} value={fib}>
            {fib}
          </option>
        ))}
      </select>
      <p>Reference Pathogen: {referencePath}</p>
      <p>Ratio: {ratio}</p>
      <p>Estimated Count: {estimatedCount} </p>
      <p>Enter Estimated Count:</p>
      <input
        type="number"
        value={estimatedCount}
        onChange={(event) => {
          // Parse the input as an integer and set it to the estimatedCount state
          const count = parseInt(event.target.value, 10);
          setEstimatedCount(isNaN(count) ? 0 : count);
        }}
      />
    </div>
  );
};

export default FibAnalysis;
