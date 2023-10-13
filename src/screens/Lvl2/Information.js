import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  municipality: Yup.string().required('Municipality is required'),
  village: Yup.string().required('Village is required'),
  river: Yup.string().required('Name of river is required'),
  samplePoint: Yup.string().required('Sampling Point is required'),
  sampleCode: Yup.string().required('Sample Code is required'),
  count: Yup.object().shape({
    cycle1: Yup.string().required('Cycle 1 is required'),
    cycle2: Yup.string().required('Cycle 2 is required'),
    cycle3: Yup.string().required('Cycle 3 is required'),
  }),
});

const AddForm = ({ onSubmit }) => {
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const formik = useFormik({
    initialValues: {
      municipality: '',
      village: '',
      river: '',
      samplePoint: '',
      sampleCode: '',
      count: {
        cycle1: '', 
        cycle2: '', 
    },
  },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Your form submission logic here
        const response = await axios.post('', values);
        if (response.status === 200) {
          // If successful, set `successModalVisible` to true
          setSuccessModalVisible(true);
        } else {
          setErrorModalVisible(true);
        }
      } catch (error) {
        // If there's an error, set `errorModalVisible` to true
        console.error('API Request Error:', error);
        setErrorModalVisible(true);
      }
    },
  });

  return (
    <div className="formContainer">
      <input
        type="text"
        name="municipality"
        placeholder="Municipality"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.municipality}
      />
      {formik.touched.municipality && formik.errors.municipality && (
        <div className="errorText">{formik.errors.municipality}</div>
      )}

      <input
        type="text"
        name="village"
        placeholder="Village"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.village}
      />
      {formik.touched.village && formik.errors.village && (
        <div className="errorText">{formik.errors.village}</div>
      )}

      <input
        type="text"
        name="river"
        placeholder="Name of River"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.river}
      />
      {formik.touched.river && formik.errors.river && (
        <div className="errorText">{formik.errors.river}</div>
      )}

      <input
        type="text"
        name="samplePoint"
        placeholder="Sampling Point"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.samplePoint}
      />
      {formik.touched.samplePoint && formik.errors.samplePoint && (
        <div className="errorText">{formik.errors.samplePoint}</div>
      )}

      <input
        type="text"
        name="sampleCode"
        placeholder="Sample Code"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.sampleCode}
      />
      {formik.touched.sampleCode && formik.errors.sampleCode && (
        <div className="errorText">{formik.errors.sampleCode}</div>
      )}

<div className="countContainer">
  <div className="countHeader">Count/100ml</div>

  <div className="cycleInput">
    <input
      type="text"
      name="count.cycle1"
      placeholder="Cycle 1"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.count.cycle1}
    />
    {formik.touched.count?.cycle1 && formik.errors.count?.cycle1 && (
      <div className="errorText">{formik.errors.count.cycle1}</div>
    )}
  </div>

  <div className="cycleInput">
    <input
      type="text"
      name="count.cycle2"
      placeholder="Cycle 2"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.count.cycle2}
    />
    {formik.touched.count?.cycle2 && formik.errors.count?.cycle2 && (
      <div className="errorText">{formik.errors.count.cycle2}</div>
    )}
  </div>

  <div className="cycleInput">
    <input
      type="text"
      name="count.cycle3"
      placeholder="Cycle 3"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.count.cycle3}
    />
    {formik.touched.count?.cycle3 && formik.errors.count?.cycle3 && (
      <div className="errorText">{formik.errors.count.cycle3}</div>
    )}
  </div>
</div>

      <button type="submit" onClick={formik.handleSubmit}>
        Submit
      </button>

      {/* Success and Error Modals */}
      {successModalVisible && (
        <div className="modalContainer">
          <div className="modalText">Successfully Added!</div>
        </div>
      )}

      {errorModalVisible && (
        <div className="modalContainer">
          <div className="modalText">Error: Failed to Add</div>
        </div>
      )}
    </div>
  );
};

export default AddForm;
