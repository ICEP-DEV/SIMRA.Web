import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

const Events = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/getEvents');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Events</h1>
      {data.map((item) => (
      
        
        
            <Card  key={item._id}style={{ width: '18rem' }}>
              <Card.Img variant="top" src={item.image? item.image: ''} alt={item.title} style={{ maxWidth: '100%' }} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                {item.description}
                </Card.Text>
                <p>Venue: {item.venue}</p>
                <p>Date: {item.date}</p>
              </Card.Body>
            </Card>
      
        
      
        // <div key={item._id} style={{ marginBottom: '20px' }}>
        //   <img src={item.image} alt={item.title} style={{ maxWidth: '100%' }} />
        //   <h2>{item.title}</h2>
        //   <p>{item.description}</p>
        //   <p>Venue: {item.venue}</p>
        //   <p>Date: {item.date}</p>
        // </div>
      ))}
    </div>
  );
};

export default Events;
