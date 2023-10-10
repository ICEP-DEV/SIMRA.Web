import React from 'react'
import axios from 'axios'
import './Registration.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Loader from '../Loader/Loader';
import logo from './logo.png';




function Signup() {
 
  

    let navigate = useNavigate();
 return(


  <div className='all-contents'>

            <div className='login-container'>
                <div className='welcome'>
                    <div className='logo-login'>
                        <img src={logo} alt='logo' /> Simra
                    </div>
                    <h1>Welcome</h1>
                    SIMRA, tool integrates  <br></br>
                    the current water and <br></br>
                    sanitation risk assessment <br></br>
                    and management methods <br></br>
                    into one harmonised tool<br></br>
                </div>
                <div className='login-card'>

                    <div className='main-login' id='main-login'>

                      
                        <h3 className='header-txt mb-4'><b>Create An Account</b></h3>
                        <div className='mb-1'>
                          
                            <input className='input-login w-75 ' type="username" name='username'  placeholder='First Name' />
                            <small>

                            </small>
                        </div>
                        <div className='mb-1'>
                       
                            <input className='input-login  w-75' type="username" o name='username'  placeholder='Lastname' />
                            <small>

                            </small>
                        </div>

                        <div className='mb-1'>
                        
                            <input className='input-login  w-75' type="username"  name='username' placeholder='Mobile Number' />
                            <small>

                            </small>
                        </div>


                        <div className='mb-1 text-center'>
                      <label >  Select Level</label> 
                           <div className='d-flex justify-content-between'>
                            <div className='radio-level p-1 d-inline '><label><input type="radio"/>Household</label></div>
                            <div className='radio-level p-1 d-inline '><label><input type="radio"/>Intermediate</label></div>
                            <div className='radio-level p-1 d-inline' ><label><input type="radio"/>Expert</label></div>
                           </div>
                        </div>
                        <div className='d-flex justify-content-between'>
                        <div className='mb-1'>
                            <input className='input-login w-100 float-start' type="password" name='password'  placeholder='Password' />

                        </div>

                        <div className='mb-3'>
                           
                            <input className='input-login w-100 ' type="password"  name='password'  placeholder=' confirm Password' />

                            
                        </div>
                        </div>
                        
                        
                        <div className='login-grid'>

                            <button className='btn-login'>Sign Up</button>
                            <small className='txt-signup'>
                                Already have an account ? <Link to="/Login" className='ms-2'>Sign In</Link>
                            </small>
                        </div>

                    </div>

                </div>

            </div>
       </div>
    )
}

export default Signup