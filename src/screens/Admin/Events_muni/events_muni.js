import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GiConsoleController } from 'react-icons/gi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Footer from '../../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Admin_NavBar/Admin_NavBar';
import Header from '../../Header/Header';
import './events_muni.css';
import { api } from '../../../Data/API';
import { Modal, Button } from 'react-bootstrap'; 
import { useSelector } from 'react-redux/es/hooks/useSelector';
import SideBar from '../Sidebar/SideBar';

const Manage_Events = () => {
  let user_info = useSelector((state) => state.user.value)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [venue, setVenue] = useState('');
    const [Municipality, setMunicipality] = useState('');
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState(null);
  const [Province, setProvince] = useState('');
  const [provinces, setProvinces] = useState([])
  const [Municipalities, setMunicipalities] = useState([])
  let navigate = useNavigate();
  const [dateTime, setDateTime] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
   // State to store the selected event for updating
   const [selectedEvent, setSelectedEvent] = useState(null);
   const [eventIdToDelete, setEventIdToDelete] = useState('');
  const handleDateTimeChange = (date) => {
    setDateTime(date);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleVenueChange = (e) => {
    setVenue(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationEventId, setConfirmationEventId] = useState('');

  const handleShowConfirmation = (eventId) => {
    setConfirmationEventId(eventId);
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setConfirmationEventId('');
  };
  const deleteEvent = async (eventId, userId) => {
    try {
      const response = await axios.delete(api+'deleteEventMun/'+eventId, {
        data: {
          eventId, userId
        },
      });
  
      // Assuming your API returns a message when the event is deleted successfully
      console.log(response.data.message);
      
      // You can return the response or any specific data you need
      return response.data;
    } catch (error) {
      console.error('Error deleting event:', error.message);
      throw error; // Rethrow the error to handle it at the calling site if needed
    }
  };

 // Fetch events data when the component mounts
 useEffect(() => {
  const fetchEvents = async () => {
    try {
      const response = await axios.get(api + 'getEvents');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error.message);
    }
  };

  fetchEvents();
}, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

const handleUpdateEvent = (eventId) => {
  console.log(eventId)
  console.log(events)

  
  // Set the selected event immediately
  setSelectedEvent(eventId);
  // Show the modal
  setShowModal(true);
};

// Update function
const handleUpdateEventDetails = async () => {
  try {
    // Check if selectedEvent is not null
    if (!selectedEvent) {
      console.error('Selected event is null');
      return;
    }

    const eventId = selectedEvent;

    const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('venue', venue);
  formData.append('date', dateTime);
  formData.append('image', image);
  formData.append('muni_name', selectedMunicipality); // Add the selected municipality
  formData.append('muni_id', selectedMunicipalityId); // Assuming you have an ID for the selected municipality
  formData.append('userId', userId);

   await axios.put(api + `updateEventMun/`+ eventId, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Optionally, you can refetch the events to update the table
    const response = await axios.get(api + 'getEvents');
    setEvents(response.data);

    // Close the modal
    setShowModal(false);
  } catch (error) {
    console.error('Error updating event:', error.message);
    // Handle error as needed
  }
};
var userId = user_info.userId;
var selectedMunicipalityId = Municipalities.muni_id;
var selectedMunicipality = Municipalities.muni_name;
/*
const handleDeleteEvent = async (eventId) => {
  try {
    // Display confirmation modal
    handleShowConfirmation(eventId);
  } catch (error) {
    console.error('Error handling deleteEvent:', error.message);
    // Handle errors, show error messages, etc.
  }
};
*/
const handleDeleteEvent = async (eventId) => {
  try {
    // Display confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this event?");

    if (isConfirmed) {
      // Set the eventIdToDelete state before making the delete request
      setEventIdToDelete(eventId);

      // Call the deleteEvent function passing the eventId and userId
      await deleteEvent(eventId);

      // Optionally, you can perform additional actions after the event is deleted
      // For example, fetching updated events or updating the UI
      // ...
    }
  } catch (error) {
    console.error('Error handling deleteEvent:', error.message);
    // Handle errors, show error messages, etc.
  }
};

/*
const handleConfirmDelete = async (eventId) => {
  try {
    // Close the confirmation modal
    handleCloseConfirmation();

    // Set the eventIdToDelete state before making the delete request
    setEventIdToDelete(eventId);

    // Call the deleteEvent function passing the eventId and userId
    await deleteEvent(eventId);

    // Optionally, you can perform additional actions after the event is deleted
    // For example, fetching updated events or updating the UI
    // ...
  } catch (error) {
    console.error('Error handling deleteEvent:', error.message);
    // Handle errors, show error messages, etc.
  }
};
*/
useEffect(() => {
  axios.get(api + 'get_provinces').then(response => {
      setProvinces(response.data.results)
  }, err => {
      console.log(err)
  })
}, [provinces])

function getAllMunicipalities(event) {
  var prov_id = event.target.value
  axios.get(api + 'get_municipalities/' + prov_id).then(response => {
      setMunicipalities(response.data.results)
      setProvince(response.data.results)
  }, err => {
      console.log(err)
  })
}
function SelectMunicipality(event) {
  setMunicipality(event.target.value)
}
function formatDateAndTime(date) {
  if (!date) return ''; // Handle the case where date is undefined or null

  // If date is already a string, parse it into a Date object
  const dateObject = typeof date === 'string' ? new Date(date) : date;

  // Format the date and time
  return dateObject.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  
    hour12: false, // Use 24-hour format
  });
}
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('venue', venue);
    formData.append('date', dateTime);
    formData.append('image', image);
    formData.append('muni_name', selectedMunicipality); // Add the selected municipality
    formData.append('muni_id', selectedMunicipalityId); // Assuming you have an ID for the selected municipality
    formData.append('userId', userId);

    try {
    
      const response = await axios.post(api+ 'addEvents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      //console.log(response.data);
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
    <div className='container-admin'>
      <div className='sidebar-admin'>
            <SideBar/>
      </div>
  
      <div className='main-admin'>
    <div className='container-wrapper mb-5'>
      
   <div className='mb-50'>
      <h4 style={{ textAlign: 'center', marginBottom:"3%"}}>Event Details</h4>
      <form onSubmit={handleFormSubmit}>
      <div className='form-group'>
                        {/* <label>Province</label> */}
                        <select className='select-sampling_data form-select w-75 mb-4 align-self-center' onChange={getAllMunicipalities}>
                            <option>Select Province</option>
                            {provinces.map((prov, xid) => (
                                <option key={xid} className="control-form" value={prov.province_id} >{prov.province_name}</option>
                            ))}
                        </select>
                    </div>

                    <div className='form-group'>
                        {/* <label>Municipality</label> */}
                        <select className='select-sampling_data form-select w-75 mb-4 align-self-center' onChange={SelectMunicipality}>
                            <option>Select Municipality</option>
                            {Municipalities.map((muni, xid) => (
                                <option key={xid} className="control-form" value={muni.muni_id} >{muni.muni_name}</option>
                            ))}
                        </select>
                    </div>
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input type="text" className="form-control" value={title} required onChange={handleTitleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea className="form-control" value={description} required onChange={handleDescriptionChange} />
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
        <button type="submit" className="btn btn-primary mb-3">
          Add Event
        </button>
      </form>
    </div>
     <div className='container '>

 
    
    </div>
    </div>
    <div className='editEvent '>
   {/* Table with events */}
       <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Venue</th>
              <th>Date and Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, _id) => (
              <tr key={event._id}>
                <td>{event.title}</td>
                <td>{event.description}</td>
                <td>{event.venue}</td>
                <td>{formatDateAndTime(event.date)}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleUpdateEvent(event.id)}
                  >
                    Update
                  </button> 
             
                  
                </td>
                     <td>
                <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    Delete
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
    </div>
 {/* Modal for updating events */}
 <Modal show={showModal} onHide={() => setShowModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Update Event</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <form>
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
    
      </form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Close
    </Button>
    <Button variant="primary" onClick={handleUpdateEventDetails}>
      Save Changes
    </Button>
  </Modal.Footer>
</Modal>
 
 {/* <Modal show={showConfirmation} onHide={handleCloseConfirmation} centered>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to delete this event?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseConfirmation}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleConfirmDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal> */}
    </div>
  );
};

export default Manage_Events;
