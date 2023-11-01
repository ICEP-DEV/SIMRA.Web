import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { HiOutlineMail } from 'react-icons/hi';
import image from '../../assets/borehole.jpg';
import image1 from '../../assets/flowingriver.jpg';
import image2 from '../../assets/dwater.avif';
import { Carousel } from 'react-responsive-carousel';
import glassofwater from'../../assets/glassofwater.jpg';
import dwater from './dirtywater.jpeg';
import './Home.css';
import { useSelector } from 'react-redux';
import MovingComponent from '../animations/component'
import Footer from '../Footer/Footer'
import Card from 'react-bootstrap/Card';


function Home() {
  let navigate = useNavigate();
  let user_info = useSelector((state) => state.user.value)

  return (
    <div className='hero' >

      <div className=''>
        <Navbar />
      </div>
      <Carousel className='.carousel'
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showThumbs={false}
      >
        <div className='img-carousel'>
          <img src={image1} alt="Image 1"  />
        
        </div>
        <div className='img-carousel'> 
          <img src={image2} alt="Image 2" />
        </div>
        <div className='img-carousel'>
          <img src={image} alt="Image 3" />
        </div>
        {/* Add more images as needed */}
      </Carousel>
      


      <section className='section-2 px-5'>
        <h1>Information</h1>
        
        <div className='row gx-5 align-items-center'>
                       
 
          <div className='col-lg-6 order-lg-2'>
            <MovingComponent
                      type="fadeInFromLeft"
                      duration="1000ms"
                      delay="0.2s"
                      direction="normal"
                      timing="ease"
                      iteration="1"
                      fillMode="none">

                    <Card className='card border-0' style={{ width: '45rem',backgroundColor:'#F0FFFF' }}>
                          <Card.Body>
                           
                            <Card.Text>
                            <p className='para ' >
                              <h4 >Intro About Simra</h4>
                             Water resource management is of paramount importance to ensure public health and sustainability.<br></br>
                              However, the threat of microbial contamination in water sources poses a significant challenge <br></br>
                               worldwide.Microbial pollutants such as bacteria, viruses, and pathogens can lead to waterborne  <br></br>
                               diseases, disproportionately affecting vulnerable communities in both rural and urban areas. <br></br>
                             Traditional methods of water quality assessment and risk management often fall short in providing <br></br>
                                accurate and comprehensive solutions to this critical issue.

 </p>
                            </Card.Text>
                            
                          </Card.Body>
                        </Card>
                     
                
               

            </MovingComponent>
          </div>
          <div className='col-lg-6 order-lg-2'>
            <div className='p-5'>
            {/* <img className='img-fluid ' style={{width:'600px' ,height:'300px'}} src={dwater}/> */}
            </div>
        
          </div>
       </div>


       <div className='row gx-5 align-items-center'>
          <div className='col-lg-6 order-lg-2'>
            <div className='p-5'>
             <img className='img-fluid ' style={{width:'400px' ,height:'300px'}} src={glassofwater}/>
            </div>
        
          </div>

          <div className='col-lg-6 order-lg-2'>
            <MovingComponent
                      type="fadeInFromRight"
                      duration="1000ms"
                      delay="0.2s"
                      direction="normal"
                      timing="ease"
                      iteration="1"
                      fillMode="none">
                    <p className='para ' >
                      <h4>Is your water safe for drinking purposes? </h4>
                      While water may appear clear,  <br></br>it may not necessarily be safe for drinking. <br></br>
                      Such water can potentially lead to diarrheal and other waterborne diseases. <br></br>
                      Hence, it is essential for you to regularly monitor the quality of your water. <br></br>
                    </p>

            </MovingComponent>
          </div>
       
        </div>
      </section>
      

      {/**About simra */}
      
      {/** contact us*/}
      {/* <section className='section-3'>

        <div className='card-contact mb-5  d-flex'>
          <div className='card-content'>
            <h1><HiOutlineMail /> Contact Us </h1>
            <input className='input' placeholder='Name'></input>

            <input className='input' placeholder='Email'></input>

            <textarea type="text" id="message" name="message" rows="5" className="textarea" placeholder='Message'></textarea>

            <button className="btn-send">Send</button>

          </div>


        </div>

      </section> */}
      <footer>


       
          <Footer />
       
      </footer>
    </div>




  )
}
export default Home;