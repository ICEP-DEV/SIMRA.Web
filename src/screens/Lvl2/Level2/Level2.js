import React from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar2 from '../Navbar2/Navbar2';
import {HiOutlineMail} from 'react-icons/hi';

import dwater from'./dirtywater.jpeg';
import './Level2.css';
import { useSelector } from 'react-redux';
import MovingComponent from '../../../screens/animations/component';
import Footer from '../../Footer/Footer';
function Level2() {
    let navigate = useNavigate();
    let user_info = useSelector((state) => state.user.value)

    return (
        <div className='hero' >
          
     
            <Navbar2/>
     
           

                             
{/* <div className='mb-5 text-center display-6 ml-5'>
<label className='mt-5'>Hi {user_info.user_firstname} {user_info.user_lastname}, Welcome To Simra</label>
</div> */}
<section className='section-1'>
<div className='mb-5 text-center display-6 ml-5'>
<label className='mt-5'>Hi {user_info.user_firstname} {user_info.user_lastname}, Welcome To Simra</label>
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
<p className='para'> “Everyone has the right to have access to sufficient food and water.” </p>
</MovingComponent>
<MovingComponent
 type="slideOutToBottom"
  duration="1000ms"
  delay="0.2s"
  direction="normal"
  timing="ease"
  iteration="1"
  fillMode="none">
<p className='para'> <img className='img-section-2' src={dwater}/> </p>
</MovingComponent>

</section>
{/** contact us*/}
<section className='section-3'>

<div className='card-contact mb-5  d-flex'>
  <div className='card-content'>
  <h1><HiOutlineMail/> Contact Us </h1>
<input className='input' placeholder='Name'></input>

<input className='input'placeholder='Email'></input>

<textarea type="text" id="message" name="message" rows="5" className="textarea" placeholder='Message'></textarea>

<button className="btn-send">Send</button>
        
  </div>


</div>

</section>
<footer><Footer/> </footer>

                    </div>

                   


    )
}
export default Level2;