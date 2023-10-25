import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { HiOutlineMail } from 'react-icons/hi';
import { AiFillPushpin, AiFillPhone } from 'react-icons/ai';
import { CiLocationOn } from 'react-icons/ci';
import dwater from './dirtywater.jpeg';
import './Home.css';
import { useSelector } from 'react-redux';
import MovingComponent from '../animations/component'
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
      <section className='section-1'>
      <MovingComponent
          type="slideInFromTop"
          duration="1000ms"
          delay="0.5s"
          direction="normal"
          timing="ease"
          iteration="1"
          fillMode="none">
           <div className='user-text d-flex mb-5 text-center display-6 ml-5'>
        <label className='mt-5 text-center'>Hi {user_info.user_firstname} {user_info.user_lastname}, Welcome To Simra</label>
        </div>
        </MovingComponent>
      
      
      </section>
      {/**About simra */}
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
          <p className='para ' style={{color:'white'}}>
            Ensuring safe drinking water for all<br></br>

            Empower yourself: monitor your water quality at home.<br></br>
            <br></br>
            “Everyone has the right to have access to sufficient food and water.” </p>

        </MovingComponent>
</div>
       <div className='col-lg-6 order-lg-2'>
        <div className='p-5'>
        <img className='img-fluid rounded-circle' style={{width:'400px' ,height:'400px'}} src={dwater}/>
        </div>
     
       </div>
       </div>
      </section>
      {/** contact us*/}
      <section className='section-3'>

        <div className='card-contact mb-5  d-flex'>
          <div className='card-content'>
            <h1><HiOutlineMail /> Contact Us </h1>
            <input className='input' placeholder='Name'></input>

            <input className='input' placeholder='Email'></input>

            <textarea type="text" id="message" name="message" rows="5" className="textarea" placeholder='Message'></textarea>

            <button className="btn-send">Send</button>

          </div>


        </div>

      </section>
      <footer>


        <div className='contact-info'>
          <Footer />
        </div>
      </footer>
    </div>




  )
}
export default Home;