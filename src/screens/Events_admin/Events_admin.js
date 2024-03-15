import React, { useState } from 'react';
import axios from 'axios';
import { GiConsoleController } from 'react-icons/gi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Admin_NavBar/Admin_NavBar';
import Header from '../Header/Header';
import './events_admin.css';
import { api } from "../../Data/API";

const Add_Events = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState(null);
  let navigate = useNavigate();
  const [dateTime, setDateTime] = useState(new Date());

  const handleDateTimeChange = (date) => {
    setDateTime(date);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleVenueChange = (e) => {
    setVenue(e.target.value);
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('venue', venue);
    formData.append('date', date);
    formData.append('image', image);

    try {
      const response = await axios.post(api+'/addEvents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      setTitle('');
      setDescription('');
      setVenue('');
      setDate(new Date());
      setImage('');
      // You can handle the response data as needed, e.g., display a success message.
    } catch (error) {
      console.error('Error adding events:', error.message);
    }
  };

  return (
    <div>   <Navbar />      <Header />

      <h2 style={{ textAlign: 'center'}}>Add Events</h2>
    <div className='container-wrapper mt-3 mb-3'>
      
   <div className='mb-50'>
      <h4 style={{ textAlign: 'center', marginBottom:"3%"}}>Event Details</h4>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input type="text" className="form-control" value={title} onChange={handleTitleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea className="form-control" value={description} onChange={handleDescriptionChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Venue:</label>
          <input type="text" className="form-control" value={venue} onChange={handleVenueChange} />
        </div>
        <div className="mb-3">
        <label className="form-label">Date and Time:</label><br />
      <DatePicker
        selected={dateTime}
        onChange={handleDateTimeChange}
        showTimeSelect
        dateFormat="Pp"
        className="form-control"
      />
 
        </div>
        <div className="mb-3">
          <label className="form-label">Image:</label>
          <input type="file" accept="image/*" className="form-control" onChange={handleImageChange} />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Event
        </button>
      </form>
    </div>
    </div>

    <Footer />
    </div>
  );
};

export default Add_Events;
