import React, { useState } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';

const qmraParameters = [
    { studyOrganism: 'Campylobacter jejun', bestFitModel: 'Beta-Poisson', alpha: 0.145, beta: 7.45 },
    { studyOrganism: 'E-Coli O157:H7', bestFitModel: 'Beta-Poisson', alpha: 0.4, beta: 45.9 },
    { studyOrganism: 'Salmonella Typhi', bestFitModel: 'Beta-Poisson', alpha: 0.21, beta: 49.78 },
    { studyOrganism: 'S. flexneri', bestFitModel: 'Beta-Poisson', alpha: 0.265, beta:  1480},
    { studyOrganism: 'Vibrio cholerae', bestFitModel: 'Beta-Poisson', alpha:  0.169, beta: 2305 },
    { studyOrganism: 'Cryptosporidium parvum', bestFitModel: 'exponential', aaR: 0.059 },
    { studyOrganism: 'Entamoeba coli', bestFitModel: 'Beta-Poisson', alpha: 0.79433, beta: 5.40789, endDay: 22 },
    { studyOrganism: 'Giardia lambia', bestFitModel: 'exponential', k: 0.01199 },
    { studyOrganism: 'Other', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
    { sign: 'Libra', startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
    { sign: 'Scorpio', startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
    { sign: 'Sagittarius', startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 },
    { sign: 'Capricorn', startMonth: 12, startDay: 22, endMonth: 12, endDay: 31 },
  ];
  

export default function App() {
  const [selectedOrganism, setSelectedOrganism] = useState(1);
  const [selectedModel, setSelectedModel] = useState(1);
  const [formulaUsed, setFormula] = useState('Unknown');
       
        const updateReferencePath = () => {
        switch (selectedOrganism) {
          case 1:
            if (selectedModel == 1 && selectedDate <= 19) {
              setZodiacSign('Capricorn');
            } else if (selectedDate >= 20 && selectedDate <= 31) {
              setZodiacSign('Aquarius');
            }
            break;
          case 2:
            if (selectedDate >= 1 && selectedDate <= 18) {
              setZodiacSign('Aquarius');
            } else if (selectedDate >= 19 && selectedDate <= 29) {
              setZodiacSign('Pisces');
            }
            break;
          case 3:
            if (selectedDate >= 1 && selectedDate <= 20) {
              setZodiacSign('Pisces');
            } else if (selectedDate >= 21 && selectedDate <= 31) {
              setZodiacSign('Aries');
            }
            break;
          // Add cases for other months and signs here
          default:
            setZodiacSign('Unknown');
        }
      };
      {
        setZodiacSign(sign.sign);
        return;
      }
    }
    setZodiacSign('Unknown');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Zodiac Sign Selector</Text>
      <Picker
        selectedValue={selectedMonth}
        onValueChange={(itemValue) => {
          setSelectedMonth(itemValue);
          updateZodiacSign();
        }}
      >
        <Picker.Item label="January" value={1} />
        <Picker.Item label="February" value={2} />
        <Picker.Item label="March" value={3} />
        <Picker.Item label="April" value={1} />
        <Picker.Item label="February" value={2} />
        <Picker.Item label="March" value={3} />
        {/* Add more months */}
      </Picker>
      <Picker
        selectedValue={selectedDate}
        onValueChange={(itemValue) => {
          setSelectedDate(itemValue);
          updateZodiacSign();
        }}
      >
        {/* Populate the date picker dynamically based on selected month */}
        {Array.from({ length: 31 }, (_, index) => (
          <Picker.Item key={index} label={`${index + 1}`} value={index + 1} />
        ))}
      </Picker>
      <Text style={styles.result}>Your Zodiac Sign is: {zodiacSign}</Text>
    </View>
  );

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
  result: {
    fontSize: 18,
    marginTop: 20,
  },
});
