import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';
import {HiOutlineMail} from 'react-icons/hi';
import {AiFillPushpin,AiFillPhone} from'react-icons/ai';
import {CiLocationOn} from 'react-icons/ci';
import './Level3.css';
import { useSelector } from 'react-redux';
import MovingComponent from '../../../screens/animations/component'
function Level3() {
    let navigate = useNavigate();
    let user_info = useSelector((state) => state.user.value)

    return (
        <div className='hero' >
          
     <div className=''>
            <Navbar/>
        </div>
           

                             
{/* <div className='mb-5 text-center display-6 ml-5'>
<label className='mt-5'>Hi {user_info.user_firstname} {user_info.user_lastname}, Welcome To Simra</label>
</div> */}
<section className='section-1-1'>
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

</section>
{/** contact us*/}
<section className='section-3'>

<div className='card-contact'>
<h1><HiOutlineMail/>contact us </h1>
<input className='input-group mb-3' placeholder='Name'></input>
<input className='input-group mb-3'placeholder='Email'></input>
<textarea type="text" id="message" name="message" rows="5" className="form-control md-textarea" placeholder='Message'></textarea>
<button className="btn-send">Send</button>
</div>

</section>
<footer>
  
  <h5>Contact Info</h5>
  <div className='contact-info'>
  <CiLocationOn/><span>75 Nelson Mandela Dr, Arcadia,Pretoria, 0083</span>
<HiOutlineMail/> <span>science@tut.ac.za </span>
<AiFillPhone/><span>+27 12 382 6377</span>
  </div>

  copyright@Icep
  </footer>
                    </div>

                   


    )
}
export default Level3;