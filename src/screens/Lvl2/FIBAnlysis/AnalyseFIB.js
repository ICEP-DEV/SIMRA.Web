import React, { useState } from 'react';
import { View, Text, Picker, TextInput } from 'react-native';

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
    <View>
      <Text>Select an FIB:</Text>
      <Picker
        selectedValue={selectedFIB}
        onValueChange={(itemValue) => handleFibData(itemValue)}>
        <Picker.Item label="Select an FIB" value="Select an FIB" />
        {Object.keys(fibData).map((fib) => (
          <Picker.Item key={fib} label={fib} value={fib} />
        ))}
      </Picker>
      <Text>Reference Pathogen: {referencePath}</Text>
      <Text>Ratio: {ratio}</Text>
      <Text>Estimated Count: {estimatedCount} </Text>
      <Text>Enter Estimated Count:</Text>
      <TextInput
        keyboardType="numeric"
        onChangeText={(text) => {
          // Parse the input as an integer and set it to the estimatedCount state
          const count = parseInt(text, 10);
          setEstimatedCount(isNaN(count) ? 0 : count);
        }}
      />
    </View>
  );
};

export default FibAnalysis;
