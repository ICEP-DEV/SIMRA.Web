import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AddForm from './AddForm';

const Add = () => {
  const handleFormSubmit = (values) => {
    // Handle form submission, you can save the data or perform any action here
    console.log('Form Values:', values);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Pathogen</Text>
      <AddForm onSubmit={handleFormSubmit} />
    </View>
  );
};

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
});

export default Add;