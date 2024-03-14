
import Navbar from '../Navbar/Navbar';
import image from '../../assets/dam101.jpg';
import image1 from '../../assets/dam.jpg';
import image2 from '../../assets/dam_kzn.jpg';
import image3  from'../../assets/landing-image.png';
import { Carousel } from 'react-responsive-carousel';
import './Home.css';
import MovingComponent from '../animations/component';
import Footer from '../Footer/Footer'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import Resizer from 'react-image-file-resizer'; // Import the library


function Home() {
  const [data, setData] = useState([]);
  let navigate = useNavigate();
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

  return (
    <div className='hero' >

      <div className=''>
        <Navbar />
      </div>
      <Carousel className='carousel'
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showThumbs={false}
      >

        <div >

          <img src={image1} alt="screen 1" />


        </div>
        <div>
          <img src={image2} alt="screen 2" />

        </div>
        <div>
          <img src={image} alt="screen 3" />

        </div>
        {/* Add more images as needed */}
      </Carousel>


      <section className='section-2 '>
      <section className=''>
<div className='d-inline-flex p-2'> <div className='vl p-1'></div> <h2 className='text-dark'>Events</h2> </div>

        <div className="row">
            {data.map((item) => (
              <div key={item._id} className="col-md-4 mb-2">
                <Card className="h-100 card-event">
                  <div className="d-flex flex-column">
                    <div className="mb-3 mt-2">
                      <Card.Img
                        variant="top"
                        src={item.image ? item.image : ''}
                        alt={item.title}
                        className="img-fluid"
                      />
                    </div>
                    <Card.Body className="flex-grow-2">
                      <Card.Title style={{ textAlign: 'center', textTransform: 'uppercase' }} className='text-secondary'>{item.title}</Card.Title>
                      <Card.Text className='text-center'>{item.description}</Card.Text>
                      <p className='text-center text-primary'>Venue: {item.venue}</p>
                      <p className='text-center text-danger'>Date: {item.date}</p>
                    </Card.Body>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          <div className='w-100' >
          <button className='btn btn-primary' style={{display:'block', marginLeft:'auto', marginRight:'auto'}} 
          onClick={() => navigate('/events')}>See More</button>
          </div>
        

        </section>
       <div className='d-inline-flex'> <div className='vl p-1'></div> <h2 className='text-dark'>About Simra</h2> </div>
     



        <div className='row-landing'>
  <div className='column-landin'>
    <div className='p-3'>
      <img src={image3} style={{width:'90%', height:'450px'}}/>
    </div>
  </div>
  <div className='column-landin'>
  <MovingComponent
          type="glowing"
          duration="1000ms"
          delay="0.2s"
          direction="normal"
          timing="ease"
          iteration="1"
          fillMode="none">

          <p className='para font_7 wixui-richtext_text  text-dark ' >
            SIMRA is a cutting-edge web tool revolutionizing water resource management. It evaluates and mitigates microbial risks in water sources,<br />
            providing a robust framework for addressing health hazards from contamination. With seamless data integration, advanced modeling, <br />
            and decision support, SIMRA empowers stakeholders to protect public health and ensure water system sustainability. <br />
            Its ability to integrate diverse data sources, simulate contaminant behavior, and facilitate scenario analysis enables effective risk management strategies.<br />
            User-friendly interfaces and interactive visualizations promote transparent communication, fostering informed discussions. <br />
            SIMRA's iterative approach supports continuous monitoring and adaptation, refining interventions and enhancing risk management practices over time.<br />
            Overall, SIMRA marks a significant advancement in water resource management, <br />
            offering a comprehensive solution for assessing and managing microbial risks to promote long-term public health and water system vitality.</p>

        </MovingComponent>
  </div>

</div>


        <section className='section-h2s'>
        <div className='d-inline-flex'> <div className='vl p-1'></div> <h2 className='text-dark'>Simra Levels</h2> </div>
     
        
          <div className='level1-desccription'>

            <div className='h2s-cards row align-items-start justify-content-around'>

              <div className='card text-bg-warning mb-5'   >
                <h5 className='text-center text-light'>Household</h5>
                <div className='card-body  text-center '>
                  <p className='text-light'> SIMRA makes risk assessment and management accessible to everyone, especially those with limited resources.<br />
                    It's designed to be simple, easy to use, and practical for a wide range of users, including households and individuals.</p>
                </div>

              </div>
              <div className='card text-bg-primary  mb-5' >
                <h5 className='text-center'>Intermidiate</h5>
                <div className='card-body text-center '>
                  <p className='text-light'>This level of SIMRA goes beyond the basics, offering detailed water quality analysis and advanced microbial risk assessment tools. <br />
                    It's tailored for water treatment plant managers, government officials, researchers, and experts who need in-depth and comprehensive data.</p>
                </div> </div>
              <div className='card text-bg-danger ' >
                <h5 className='text-center'>Expert</h5>
                <div className='card-body  text-center '>
                  <p className='text-light '>At the advanced level, SIMRA is designed for experts, microbiologists,
                    and researchers seeking in-depth microbial analysis and advanced risk assessment capabilities.<br></br>
                    It provides molecular biology techniques and detailed reports to meet the specific needs of these professionals.</p>
                </div> </div>





            </div>
          </div>
        </section>
        {/*** */}

        <MovingComponent
          type="fadeInFromRight"
          duration="1000ms"
          delay="0.2s"
          direction="normal"
          timing="ease"
          iteration="1"
          fillMode="none">

          <h2 className='text-primary text-center'>Is your water safe for drinking purposes? </h2>
          <p className='para font_7 wixui-richtext_text text-center text-dark ' >
            While water may appear clear,  <br></br>it may not necessarily be safe for drinking. <br></br>
            Such water can potentially lead to diarrheal and other waterborne diseases. <br></br>
            Hence, it is essential for you to regularly monitor the quality of your water. <br></br>

          </p>

        </MovingComponent>

      </section>


      <footer>



        <Footer />

      </footer>
    </div>




  )
}
export default Home;