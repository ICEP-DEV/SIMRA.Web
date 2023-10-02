import axios from "axios";
import React  from "react";
import {  useNavigate } from 'react-router-dom';
import Sidebar  from '../Sidebar/Sidebar';
import { useSelector } from 'react-redux';

import  "./Profile.css";
function Profile (){
    let navigate = useNavigate();
    let user_info = useSelector((state) => state.user.value)
   

    return(
<div className='hero-all' >

    <div className='sidenav'>
        <Sidebar />
    </div>

    <div className='main-all'>
        <div className='content'>
            <div className='container-wrapper'>
                <div className="upload-image">

                </div>
                <div className="profile-main"> 
            <h1>My Profile</h1>
      
              
            <div className="sub">First Name: <label>{user_info.user_firstname}</label>
            </div>
            
                  
            <div  className="sub">Last Name:<label>{user_info.user_lastname}</label>
            </div>
                   
            <div  className="sub"> Mobile Number: <input class="border-0" value={user_info.user_mobileNo}/>
            </div>
              <div className="sub">Role: <label>{user_info.user_role}</label>
              </div>      
            <div  className="sub" >Password:  <input class="border border-light"value={user_info.user_password}/>
                </div>
                 
              
             
         
                

                <button className="btn-data">Update</button>
                </div>
                </div>
                </div>
                </div>
              
            </div>
    )
}
export default Profile;