import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MapDisplay = () => {
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 2,
      });

      // Fetch coordinates from your API using Axios
      axios.get('http://localhost:3000/coordinates')
        .then(response => {
          const allCoordinates = response.data;
          setCoordinates(allCoordinates);

          allCoordinates.forEach(coord => {
            const marker = new window.google.maps.Marker({
              position: { lat: coord.latitude, lng: coord.longitude },
              map: map,
              title: `User ID: ${coord.userId}`,
            });
          });
        })
        .catch(error => console.error('Error fetching coordinates:', error));
    };

    // Load the Google Maps API script dynamically
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap`;
    script.defer = true;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup to avoid memory leaks
      document.head.removeChild(script);
    };
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <div id="map" style={{ height: '400px', width: '100%' }}></div>
    </div>
  );
};

export default MapDisplay;