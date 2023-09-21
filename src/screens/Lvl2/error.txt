import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    municipality: Yup.string().required('Municipality is required'),
    village: Yup.string().required('Village is required'),
    river: Yup.string().required('Name of river is required'),
    samplePoint: Yup.string().required('Sampling Point is required'),
    sampleCode: Yup.string().required('Sample Code is required'),
    count: Yup.string().required('Count/100ml is required'),
});

const AddForm = ({ onSubmit }) => {
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);

    const handleFormSubmit = async (values) => {
        try {
          // Your form submission logic here
          // For example, you can make an API request to save the data
          // If successful, set `successModalVisible` to true
          setSuccessModalVisible(true);
        } catch (error) {
          // If there's an error, set `errorModalVisible` to true
          setErrorModalVisible(true);
        }
        
  return (
    <Formik
      initialValues={{
        municipality: '',
        village: '',
        river: '',
        samplePoint: '',
        sampleCode: '',
        count: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View style={styles.formContainer}>
          <TextInput
            onChangeText={handleChange('municipality')}
            onBlur={handleBlur('municipality')}
            value={values.municipality}
            placeholder="Municipality"
          />
          {errors.municipality && <Text style={styles.errorText}> {errors.municipality}</Text>}

          <TextInput
            onChangeText={handleChange('village')}
            onBlur={handleBlur('village')}
            value={values.village}
            placeholder="Village"
          />
          {errors.village && <Text style={styles.errorText}> {errors.village}</Text>}

          
           <TextInput
           onChangeText={handleChange('river')}
           onBlur={handleBlur('river')}
           value={values.river}
           placeholder="Name of River"
         /> 
          
          {errors.river && <Text style={styles.errorText}> {errors.river }</Text>}

          
            <TextInput
            onChangeText={handleChange('samplePoint')}
            onBlur={handleBlur('samplePoint')}
            value={values.samplePoint}
            placeholder="Sampling Point"
          />
          {errors.samplePoint && <Text style={styles.errorText}> {errors.samplePoint}</Text>}

          
           <TextInput
           onChangeText={handleChange('sampleCode')}
           onBlur={handleBlur('sampleCode')}
           value={values.sampleCode}
           placeholder="Sample Code"
         /> 
          
          {errors.sampleCode && <Text style={styles.errorText}> {errors.sampleCode }</Text>}

          
             <TextInput
             onChangeText={handleChange('count')}
             onBlur={handleBlur('count')}
             value={values.count}
             placeholder="Count/100ml"
             />
          
          {errors.count && <Text style={styles.errorText}> {errors.count }</Text>}
          
          <Button title="Submit" onPress={handleSubmit} />
        </View>
        
        <Modal
        isVisible={successModalVisible}
        onBackdropPress={() => setSuccessModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Successfully Added!</Text>
        </View>
      </Modal>

<Modal
isVisible={errorModalVisible}
onBackdropPress={() => setErrorModalVisible(false)}
>
<View style={styles.modalContainer}>
  <Text style={styles.modalText}>Error: Failed to Add</Text>
</View>
</Modal>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({

    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
      modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },

  formContainer: {
    margin: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default AddForm;
