import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Resizer from 'react-image-file-resizer'; // Import the library
import { api } from '../../Data/API';

const Events = () => {
  const [data, setData] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api +'getEvents');
        const resizedData = await resizeImages(response.data); // Resize the images
        setData(resizedData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  // Function to format date and time
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
  const resizeImages = async (eventsData) => {
    // Resize each image in the events data
    const resizedData = await Promise.all(
      eventsData.map(async (item) => {
        if (item.image) {
          try {
            const resizedImage = await resizeImage(item.image, 200, 200); // Adjust the size as needed
            return { ...item, image: resizedImage };
          } catch (error) {
            console.error('Error resizing image:', error.message);
            return item;
          }
        }
        return item;
      })
    );

    return resizedData;
  };

  const resizeImage = (file, maxWidth, maxHeight) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        maxWidth,
        maxHeight,
        'JPEG', // Output format (you can change it to 'PNG' if needed)
        100, // Image quality (100 means no compression)
        0, // Rotation (0 means no rotation)
        (uri) => {
          resolve(uri);
        },
        'base64' // Output type (you can change it to 'blob' if needed)
      );
    });
    const state = { isOpen: false };
const handlezoom = () =>
{

}
  return (
    <div className='hero-all'>
      <Navbar />
   
      <div className='content'>
      <h1 className="mt-3 mb-3">Events</h1>
      <div className='container-wrapper mb-5'>
       
       
          <div className="row">
            {data.map((item) => (
              <div key={item._id} className="col-md-6 mb-4">
                <Card className="h-100 w-50 ">
                  <div className="d-block">
                    <div className="mb-3">
                      <Card.Img
                        variant="top"
                        src={item.image ? item.image : ''}
                        alt={item.title}
                        className="img-fluid"
                      />
                    </div>
                    <Card.Body className="flex-grow-1">
                      <Card.Title style={{ textAlign: 'center', textTransform: 'uppercase' }}>{item.title}</Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                      <p>Venue: {item.venue}</p>
                      <p>Date and Time: {formatDateAndTime(item.date)}</p>
                    </Card.Body>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Events;
