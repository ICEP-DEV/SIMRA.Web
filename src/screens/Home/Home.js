import React, { useEffect } from 'react';
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

  useEffect(()=>{
    if(user_info === undefined){
      navigate('/')
    }
  })
  return (
    <div className='hero' >

      <div className=''>
        <Navbar />
      </div>



      {/* <div className='mb-5 text-center display-6 ml-5'>
<label className='mt-5'>Hi {user_info.user_firstname} {user_info.user_lastname}, Welcome To Simra</label>
</div> */}
      <section className='section-1'>
        <div className='mb-5 text-center display-6 ml-5'>
          <label className='mt-5'>Hi {user_info.user_firstname} {user_info.user_lastname}, Welcome To Simra</label>
          <br></br>
          <label>House hold Level</label>
        </div>
        <div class="curve"></div>
      </section>
      {/**About simra */}
      <section className='section-2'>

        <MovingComponent
          type="fadeInFromLeft"
          duration="1000ms"
          delay="0.2s"
          direction="normal"
          timing="ease"
          iteration="1"
          fillMode="none">
          <p className='para d-flex justify-content-start'>
            Ensuring safe drinking water for all<br></br>

            Empower yourself: monitor your water quality at home.<br></br>
            “Everyone has the right to have access to sufficient food and water.” </p>

        </MovingComponent>
        {/* <img className='img-section-2' src={dwater}/> */}
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