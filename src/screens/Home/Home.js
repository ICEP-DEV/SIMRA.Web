import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import image from '../../assets/borehole.jpg';
import image1 from '../../assets/flowingriver.jpg';
import image2 from '../../assets/dwater.avif';
import { Carousel } from 'react-responsive-carousel';
import glassofwater from'../../assets/glassofwater.jpg';
import './Home.css';
import { useSelector } from 'react-redux';
import MovingComponent from '../animations/component';
import Footer from '../Footer/Footer'
function Home() {
  let navigate = useNavigate();
  let user_info = useSelector((state) => state.user.value)

  return (
    <div className='hero' >

      <div className=''>
        <Navbar />
      </div>



      {/* <div className='mb-5 text-center display-6 ml-5'>
<label className='mt-5'>Hi {user_info.user_firstname} {user_info.user_lastname}, Welcome To Simra</label>
</div> */}
      
        {/* <div className='card-home mb-5 '>
        <MovingComponent
          type="slideInFromTop"
          duration="1000ms"
          delay="0.5s"
          direction="normal"
          timing="ease"
          iteration="1"
          fillMode="none">
           <div className='user-text d-flex mb-5 text-center display-6 ml-5 '>
        <label className='mt-5 text-center'>Hi {user_info.user_firstname} {user_info.user_lastname}, Welcome To Simra</label>
        </div>
        </MovingComponent>
        </div> */}
    <Carousel className='.carousel'
      autoPlay={true}
      infiniteLoop={true}
      showStatus={false}
      showThumbs={false}
    >
      <div className='img-carousel'>
        <img src={image1} alt="Image 1"  />
       <p>Welcome</p>
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
            
          <p className='para ' >
          	<h4 >What are the households water treatment methods?</h4>
            <li>Boiling: Bring the water to a rolling boil and maintain it for at least one minute. Allow the water to cool before use. </li>
            <li>SODIS (Solar Water Disinfection): Fill clear, plastic bottles with water and leave them in direct sunlight for at least six hours (or longer if it cloudy). disinfect the water. </li>
            <li> Chemical Disinfection: Add a cap full of bleach in 25L of water. Allow the treated water to sit for a specific contact time before consuming.</li>
            <li>Filtration: Choose a water filter certified for the removal of specific contaminants (e.g., use a cloth folded 8 times/ clay pots/ceramic filters). </li>
            <br></br>
            “Everyone has the right to have access to sufficient food and water.” </p>

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
 {/*** */}
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