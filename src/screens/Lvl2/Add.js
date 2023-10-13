import React from 'react';
import AddForm from './Information';

const Add = () => {
  const handleFormSubmit = (values) => {
    // Handle form submission, you can save the data or perform any action here
    console.log('Form Values:', values);
  };

  return (
    <div className="container">
      <h1 className="header">Add Pathogen</h1>
      <AddForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default Add;