import React from "react";
import { AiFillPhone,AiOutlineCopyrightCircle,AiFillLinkedin,AiFillYoutube} from 'react-icons/ai';
import natural from '../../assets/natural_research.png';
import {BsFacebook} from 'react-icons/bs';
import {FaXTwitter} from 'react-icons/fa6';
import tut_logo from "../../assets/TUT_white.png";
import icep from "../../assets/ICEP_logo2.png";
import { HiOutlineMail } from 'react-icons/hi';
import './Footer.css';
import { Link } from "react-router-dom";
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

<div className="col-xs-4 col-md-3">
    <h6>Contact Info</h6>
          <label>
            <h8 className="personName">Prof Maggy NB Momba</h8><br></br>
            <HiOutlineMail /> <span> MombaMNB@tut.ac.za </span> <br></br>
            <AiFillPhone /><span> W: +27 12 382 6365</span><br></br>
            <AiFillPhone /><span> M: +27 82 513 7395/+78 460 6259</span><br></br>
        
            <h8 className="personName">Prof Lizzy Monyatsi</h8><br></br>
            <HiOutlineMail /> <span> monyatsil@tut.ac.za</span> <br></br>
            <AiFillPhone /><span> W +27 12 382 6201</span><br></br>
       
            <h8 className="personName">Miss Arinao Murei</h8><br></br>
            <HiOutlineMail /> <span> mureiarinao@gmail.com</span> <br></br>
            <AiFillPhone /><span> M: +27 76 772 4697</span><br></br>
         
            <h8 className="personName">Ms Anza-vhudziki Mboyi</h8><br></br>
            <HiOutlineMail /> <span> MboyiA@tut.ac.za </span> <br></br>
            <AiFillPhone /><span> W: +27 12 382 6376</span><br></br>
         
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
  <div class="col-md-4 col-sm-6 col-xs-6">
  <img src={natural} style={{width:'100px', paddingRight: '15px' }}/>
  <img src={tut_logo}  style={{width:'100px', paddingRight: '15px'}} />
  <img src={icep}  style={{width:'100px'}} />
</div>
</div>

</div>
      
</div>
  )
}
export default Footer;