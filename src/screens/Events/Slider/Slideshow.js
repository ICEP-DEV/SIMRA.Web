import React, { useState, useEffect, Component } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import axios from 'axios';
import Resizer from 'react-image-file-resizer'; // Import the library

const ImageSlider = ({ slides }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/getEvents');
        const resizedData = await resizeImages(response.data); // Resize the images
        setData(resizedData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

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
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  

  return (
    <section className='slider'>
      <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
      <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
      {data.map((item,index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <img src={item.image} alt='travel image' className='image' />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;
