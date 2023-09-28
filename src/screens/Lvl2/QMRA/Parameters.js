import React, { useState } from 'react';
import { View, Text, Picker, StyleSheet, TextInput, Button } from 'react-native';

const qmraParameters = {
  'Campylobacter jejun': { model: 'Beta-Poisson', alpha: 0.145, beta: 7.45 },
  'E-Coli O157:H7': { model: 'Beta-Poisson', alpha: 0.4, beta: 45.9 },
  'Salmonella Typhi': { model: 'Beta-Poisson', alpha: 0.21, beta: 49.78 },
  'S. flexneri': { model: 'Beta-Poisson', alpha: 0.265, beta: 1480 },
  'Vibrio cholerae': { model: 'Beta-Poisson', alpha: 0.169, beta: 2305 },
  'Cryptosporidium parvum': { model: 'exponential', r: 0.059 },
  'Entamoeba coli': { model: 'Beta-Poisson', alpha: 0.79433, beta: 5.40789 },
  'Giardia lambia': { model: 'exponential', k: 0.01199 },
  'Other': { model: '', alpha: 0, beta: 0 },
};

export default function App() {
  const [selectedOrganism, setSelectedOrganism] = useState('Campylobacter jejun');
  const [count, setCount] = useState('');
  const [alpha, setAlpha] = useState('');
  const [beta, setBeta] = useState('');
  const [model, setModel] = useState('');
  const [result, setResult] = useState('');

  const calculateResult = () => {
    if (selectedOrganism === 'Other' && model && count && alpha && beta) {
      let calculatedResult = 0;
      
      if (model === 'Beta-Poisson') {
        
        //calculatedResult = alpha * count + beta;
      } else if (model === 'exponential') {
        
        //calculatedResult = alpha * Math.exp(beta * count);
      }
      
      setResult(`Model Type: ${model}, Calculated Result: ${calculatedResult}`);
    } else {
      setResult('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>QMRA Parameters</Text>
      <Picker
        selectedValue={selectedOrganism}
        onValueChange={(itemValue) => {
          setSelectedOrganism(itemValue);
          setResult('');
        }}
      >
        {Object.keys(qmraParameters).map((organism) => (
          <Picker.Item
            key={organism}
            label={organism}
            value={organism}
          />
        ))}
        <Picker.Item label="Other" value="Other" />
      </Picker>
      {selectedOrganism === 'Other' && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter Organism"
            onChangeText={(text) => setSelectedOrganism(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Model"
            onChangeText={(text) => setModel(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Count"
            keyboardType="numeric"
            onChangeText={(text) => setCount(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Alpha"
            keyboardType="numeric"
            onChangeText={(text) => setAlpha(parseFloat(text))}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Beta"
            keyboardType="numeric"
            onChangeText={(text) => setBeta(parseFloat(text))}
          />
        </>
      )}
      <Button
        title="Calculate"
        onPress={calculateResult}
      />
      {result !== '' && (
        <Text style={styles.result}>{result}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: 200,
    fontSize: 16,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'blue',
  },
  result: {
    fontSize: 18,
    marginTop: 20,
  },
});
