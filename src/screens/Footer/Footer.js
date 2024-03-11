import React from "react";
import { AiFillPushpin, AiFillPhone,AiOutlineCopyrightCircle,AiFillLinkedin,AiFillYoutube} from 'react-icons/ai';
import natural from '../../assets/natural_research.png';
import {BsFacebook} from 'react-icons/bs';
import {ImLocation} from 'react-icons/im';
import {FaXTwitter} from 'react-icons/fa6';
import tut_logo from "../../assets/Tshwane_University_of_Technology_logo.svg.png"
import { HiOutlineMail } from 'react-icons/hi';
import { CiLocationOn } from 'react-icons/ci';
import './Footer.css';
import { Link } from "react-router-dom";
import { ListGroupItem } from "react-bootstrap";
function Footer() {
  return (

      <div className='contact-info'>
         <div class="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
          
          <h6>Location</h6>
          <p className="text-justify">
          
            Tshwane University of Technology <br />
            Department of Environmental, Water & Earth Sciences<br />
            Faculty of Sciences, Arcadia Campus<br />
            175 Nelson Mandela Drive<br />
            Private Bag X 680<br />
            Pretoria 000<br />
            South Africa
          </p>
       </div>

<div className="col-xs-6 col-md-3">
    <h6>Contact Info</h6>
          <label>
            <HiOutlineMail /> <span>science@tut.ac.za </span> 
            <AiFillPhone /><span>+27 12 382 6377</span>
          </label>
        </div>
        <div className="col-xs-6 col-md-3 ">
     <h6>Media</h6>
  
      <div  className="social-icons ">
      <Link className="facebook sm-5">  <BsFacebook/> </Link>
      <div className="spacing"></div>
         <Link className="twitter"> <FaXTwitter/> </Link>   
          <div className="spacing"></div>
        <Link className="linkedin"> <AiFillLinkedin/>  </Link>
        <div className="spacing"></div>
  <Link className="youtube"> <AiFillYoutube/></Link>
      </div>
   
      
            
             
          </div>

        {/* <div className="col-sm-12 col-md-6">
      
          <h6>Media</h6>
          <label>
            <BsFacebook/>  <FaXTwitter/>  <AiFillLinkedin/> <AiFillYoutube/>
          </label>
        </div> */}
       

        </div>
        <hr></hr>
        </div>
     
        <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
        <label  >Copyright <AiOutlineCopyrightCircle/> <Link to={'https://www.icep.co.za/'}>ICEP</Link>. All rights Reserved</label>
    
</div>
  <div class="col-md-4 col-sm-6 col-xs-12">
  <img src={natural} style={{width:'100px'}}/>
  <img src={tut_logo}  style={{width:'90px'}} />
</div>
</div>

</div>
      
</div>
  )
}
export default Footer;