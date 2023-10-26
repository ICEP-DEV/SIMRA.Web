import React from "react";
import { AiFillPushpin, AiFillPhone,AiOutlineCopyrightCircle} from 'react-icons/ai';
import {ImLocation} from 'react-icons/im'
import { HiOutlineMail } from 'react-icons/hi';
import { CiLocationOn } from 'react-icons/ci';
import './Footer.css';
function Footer() {
  return (
    <div >
      <div className='contact-info'>
        <div id="address" className="contact_detail">
          <h2>Location</h2>
          <label>
            <CiLocationOn />
            Tshwane University of Technology <br />
            Department of Environmental, Water & Earth Sciences<br />
            Faculty of Sciences, Arcadia Campus<br />
            175 Nelson Mandela Drive<br />
            Private Bag X 680<br />
            Pretoria 000<br />
            South Africa
          </label>
        </div>
        <div id="contact_details" className="contact_detail">
          <h2>Contact Info</h2>
          <label>
            <HiOutlineMail /> <span>science@tut.ac.za </span> 
            <AiFillPhone /><span>+27 12 382 6377</span>
          </label>
        </div>
        <div id="social_media" className="contact_detail">
          <h2>Media</h2>
          <label>
            Facebook   Twitter  LinkedIn  Youtube
          </label>
        </div>




      </div>

      <label className="end_footer" ><AiOutlineCopyrightCircle/>Copyright ICEP. All rights Reserved</label>
    </div>
  )
}
export default Footer;