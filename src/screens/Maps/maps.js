import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Admin_NavBar/Admin_NavBar';
import { api } from "../../Data/API";


const apiKey = 'AIzaSyAuIftAMt7svFoGBDw_86NyBbH7sdTQjT4'; // Replace with your API key

const MapComponent = ({ markers }) => (
  <div style={{ height: '100%', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: apiKey }}
      defaultCenter={{ lat: 0, lng: 0 }}
      defaultZoom={8}
    >
      {Array.isArray(markers) &&
        markers.map((marker, index) => (
          <Marker key={index} lat={marker.latitude} lng={marker.longitude} />
        ))}
    </GoogleMapReact>
  </div>
);

const Marker = () => <div style={{ color: 'red' }}>Marker</div>;

const Map = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api+'coordinates');
        setMarkers(response.data);
      } catch (error) {
        console.error('Error fetching coordinates:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='hero-all'>   
      <Navbar />    
      <div>
      <Header />
      <h3 style={{ textAlign: 'center'}}>Map</h3>
    <div className='container-wrapper mt-3 mb-3'>
      <div style={{ height: '500px', width: '500px' }}>
        <MapComponent markers={markers} />
      </div>
    </div>
    </div>
    <Footer />
    </div>
    
  );
};

export default Map;
