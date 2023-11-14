// import React, { useState } from 'react';
// import axios from 'axios';

// const Add_Events = ({ onAddEvent }) => {
//   const [title, setTitle] = useState('');
//   const [picture, setPicture] = useState('');
//   const [description, setDescription] = useState('');
//   const [venue, setVenue] = useState('');
//   const [date, setDate] = useState('');
//   const [image, setimage] = useState('');
//   const [file, setFile] = useState(null); // For storing the selected file

//   const handleAddEvent = () => {
//     // Check if all required fields are filled before adding the event
//     if (title.trim() !== '' && description.trim() !== '' && venue.trim() !== '' && date.trim() !== '') {
//       const newEvent = {
//         title,
//         description,
//         venue,
//         date,
//         image
        
//       };

//       // onAddEvent(newEvent);
//       console.log(newEvent)
//       axios.post("http://localhost:3001/api/addEvents", newEvent).then((response) => {
//         console.log(response)

//       })

//       // Clear the form after adding the event
//       setTitle('');
//       setPicture('');
//       setDescription('');
//       setVenue('');
//       setDate('');
//       setFile(null);
//     }
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setimage(selectedFile);
//     setPicture(''); // Clear the picture URL when a file is selected
//   };

//   return (
//     <div>
//       <h2>Add Event</h2>

//       <label>Title:</label>
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Enter Event Title"
//       />
//       <br />

//       <label>Picture:</label>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileChange}
//       />
//       <br />
//       {file && (
//         <img src={URL.createObjectURL(file)} alt="Event" style={{ maxWidth: '100px' }} />
//       )}
//       <br />

//       <label>Or enter Picture URL:</label>
//       <input
//         type="text"
//         value={picture}
//         onChange={(e) => setPicture(e.target.value)}
//         placeholder="Enter Event Picture URL"
//       />
//       <br />

//       <label>Description:</label>
//       <input
//         type="text"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         placeholder="Enter Event Description"
//       />
//       <br />

//       <label>Venue:</label>
//       <input
//         type="text"
//         value={venue}
//         onChange={(e) => setVenue(e.target.value)}
//         placeholder="Enter Event Venue"
//       />
//       <br />

//       <label>Date:</label>
//       <input
//         type="text"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//         placeholder="Enter Event Date"
//       />
//       <br />

//       <button onClick={handleAddEvent}>Add Event</button>
//     </div>
//   );
// };

// export default Add_Events;
import React, { useState } from 'react';
import axios from 'axios';
import { GiConsoleController } from 'react-icons/gi';

const Add_Events = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleVenueChange = (e) => {
    setVenue(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
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
      const response = await axios.post('http://localhost:3001/api/addEvents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
        setTitle('');
        setDescription('');
        setVenue('');
        setDate('');
        setImage('');
      // You can handle the response data as needed, e.g., display a success message.
    } catch (error) {
      console.error('Error adding events:', error.message);
    }
  };

  return (
    <div>
      <h1>Add Events</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={handleDescriptionChange} />
        </label>
        <br />
        <label>
          Venue:
          <textarea value={venue} onChange={handleVenueChange} />
        </label>
        <br />
        <label>
          Date:
          <textarea value={date} onChange={handleDateChange} />
        </label>
        <br />
        <label>
          Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <br />
        <button type="submit">Add Picture</button>
      </form>
    </div>
  );
};

export default Add_Events;

