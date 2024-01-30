import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import SideBar from '../Sidebar/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import NavBar_Admin from '../NavBar_Admin/NavBar_Admin';
import Register from '../../Registration/Registration';
import { ToastContainer, toast } from 'react-toastify';
function AdminDashboard() {

   
   
  
  



  

    return (
      
           
      
            <div className="container-admin" >
            <div className='sidebar-admin ' >
            <SideBar/>
            </div>
               <div className='main-admin'>
               <div class="card-deck">
  
    <div className='card alert alert-primary'>
      <div class="card-body">
        <h5 class="card-title">Total Number of Users</h5>
        <p class="card-text">50000</p>
        
        <Link to='/users' className="btn btn-primary">users</Link>
      </div>
    </div>
  
  
    <div className='card alert alert-success'>
      <div class="card-body">
        <h5 class="card-title">Total Number of Uncontaminated Area</h5>
        <p class="card-text">5000</p>
        
      </div>
   
  </div>
  
    <div className='card alert alert-danger'>
      <div class="card-body">
        <h5 class="card-title"> Total Number of Contaminated Areas</h5>
        <p class="card-text">100</p>
       
      </div>
    
  </div>
</div>
              
               <div >
                
                <div>
                  
                </div>
               </div>
               <div >
               
                <div>
                  
                </div>
               </div>
                </div>
               
                
               </div>
               
              
          


      
    )
}

export default AdminDashboard;