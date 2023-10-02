import axios from "axios";
import React ,{useEffect,useState} from "react";
import {  useNavigate } from 'react-router-dom';
import Sidebar  from '../Sidebar/Sidebar';
import  "./Profile.css";
function Profile (){
    let navigate = useNavigate();
    const [posts ,setPosts] =useState([]);

useEffect(() =>{
    axios 
    .get("http://localhost:3001/api/login")
    .then((result) => {
        console.log(result.data);
        setPosts(result.data);
    })
    .catch((error) => console.log(error ));
},[] );


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
      
              
            <div className="sub">First Name <br></br><input  value={posts.firstname}/> {posts.firstname}</div>
                  
            <div  className="sub">Last Name  <br></br><input  value={posts.lastname}/> {posts.lastname}</div>
                   
            <div  className="sub"> 
            Email  <br></br>
            <input placeholder=" " value={posts.mobileNo}/>{posts.mobileNo}
             </div>
                    
            <div  className="sub" >
                <input placeholder="*********" value={posts.password} />{posts.password}
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