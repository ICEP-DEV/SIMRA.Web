
import React  from "react";
import Sidebar  from '../Level1/Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import  "./Profile.css";
import Navbar from "../../Navbar/Navbar";

function Profile (){

    let user_info = useSelector((state) => state.user.value)
 

    return(
<div className='hero-all' >

   <Navbar/>
    <div className='main-all'>
        <div className='content'>
            <div className='container-wrapper'>
                
                <div className="profile-main"> 
                
            <h1>My Profile</h1>
      
              
            <div className="sub">First Name <br></br><input className="profile-input" value={user_info.user_firstname} /></div>
                  
            <div  className="sub ">Last Name  <br></br><input className="profile-input" value={user_info.user_lastname}/> </div>
                   
            <div  className="sub"> 
            Mobile Number: <br></br>
            <input  className="profile-input" value={user_info.user_mobileNo}/>
             </div>
                    
            <div  className="sub" >
              Password:  <br></br>
                <input type="password" className="profile-input" value={user_info.user_password} />
               
                </div>
                 
              
             
         
                

                <button className="btn btn-dark w-25">Update</button>
                
                </div>
                
                </div>
                </div>
                </div>
              
            </div>
    )
}
export default Profile;