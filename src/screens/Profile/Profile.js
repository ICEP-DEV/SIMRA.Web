
import React, { Component } from "react";
import Sidebar from '../Navbar/Navbar';
import { useSelector } from 'react-redux';
import "./Profile.css";
import { FiEdit2 } from 'react-icons/fi';
import axios from 'axios';

class UserProfileUpdate extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        firstname: '', // Initialize with the user's existing data
        lastname: '',
        mobileNo: ''
        // Add more fields as needed
      };
    }
  
    handleInputChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
      
    };
  
    handleSubmit = (e) => {
      e.preventDefault();
      const updatedProfileData = { ...this.state };
      console.log(updatedProfileData)
      let token=localStorage.getItem('jsonwebtoken');
      console.log("jsonwebtoken",token)
    
      axios.put('http://localhost:3001/api/updateProfile',  updatedProfileData, {headers: {
        'authorization': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
        }})
        .then((response) => {
          console.log('Profile updated:', response.data);
          // Optionally, you can update the user interface to reflect the changes
        })
        .catch((error) => {
          console.error('Profile update failed:', error);
          // Handle errors gracefully
        });
    };
   
         //let user_info = useSelector((state) => state.user.value);
         
 

    render() {
        
       
    

        return (
            <div className='hero-all' >

                <div className='sidenav'>
                    <Sidebar />
                </div>

                <div className='main-all'>
                    <div className='content'>
                        <div className='container-wrapper'>

                            <div className="profile-main">
                                <h1>My Profile</h1>
                                <form onSubmit={this.handleSubmit}>

                                    <div className="sub">
                                        First Name
                                        <br></br>
                                        <div className="input-container">
                                            <input className="profile-input"  type="text"
                                                id="firstname"
                                                name="firstname"value={this.state.firstname} onChange={this.handleInputChange} />
                                            <FiEdit2 className="edit-icon" />
                                        </div>
                                    </div>

                                    <div className="sub">
                                        Last Name
                                        <br></br>
                                        <div className="input-container">
                                            <input className="profile-input"  type="text"
                                                id="lastname"
                                                name="lastname"value={this.state.lastname} onChange={this.handleInputChange}/>
                                            <FiEdit2 className="edit-icon" />
                                        </div>
                                    </div>

                                    <div className="sub">
                                        Mobile Number:
                                        <br></br>
                                        <div className="input-container">
                                            <input className="profile-input" type="text" id="mobileNo" 
                                            name="mobileNo" value={this.state.mobileNo} onChange={this.handleInputChange} />
                                            <FiEdit2 className="edit-icon" />
                                        </div>
                                    </div>

                                    {/* <div className="sub">
                                        Password:
                                        <br></br>
                                        <div className="input-container">
                                            <input type="password" className="profile-input" value={user_info.user_password} />
                                            <FiEdit2 className="edit-icon" />
                                        </div>
                                    </div> */}

                                    <button className="btn-data" type="submit">Update</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default  UserProfileUpdate;