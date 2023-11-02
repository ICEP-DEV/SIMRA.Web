import React, { useState } from "react";
import Sidebar from '../Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import "./Profile.css";
import { FiEdit2 } from 'react-icons/fi';
import axios from 'axios';
import { user_details } from "../../Redux/user";

function UserProfileUpdate() {
  const user_info = useSelector((state) => state.user.value);
  const dispatch=useDispatch()

  const [state, setState] = useState({
    
    user_firstname:'',
    user_lastname: '',
    user_mobileNo:''
    // Add more fields as needed
  });
                   

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProfileData = { ...state };
    dispatch(user_details(updatedProfileData))
    console.log(updatedProfileData);
    let token = localStorage.getItem('jsonwebtoken');
    console.log("jsonwebtoken", token);

    axios.put('http://localhost:3001/api/updateProfile', updatedProfileData, {
      headers: {
        'authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log('Profile updated:', response.data);
        // Optionally, you can update the user interface to reflect the changes
      })
      .catch((error) => {
        console.error('Profile update failed:', error);
        // Handle errors gracefully
      });
  };

  return (
    <div className='hero-all'>

      <div className=''>
        <Sidebar />
      </div>

      <div className='main-all'>
        <div className='content'>
          <div className='container-wrapper'>

            <div className="profile-main">
              <h1>My Profile</h1>
              <form onSubmit={handleSubmit}>

                <div className="sub">
                  First Name
                  <br></br>
                  <div className="input-container">
                    <input className="profile-input" type="text"
                      id="user_firstname"
                      name="user_firstname" placeholder={user_info.user_firstname}value={state.user_firstname} onChange={handleInputChange} />
                    <FiEdit2 className="edit-icon" />
                  </div>
                </div>

                <div className="sub">
                  Last Name
                  <br></br>
                  <div className="input-container">
                    <input className="profile-input" type="text"
                      id="user_lastname"
                      name="user_lastname" placeholder={user_info.user_lastname} value={state.user_lastname}  onChange={handleInputChange} />
                    <FiEdit2 className="edit-icon" />
                  </div>
                </div>

                <div className="sub">
                  Mobile Number
                  <br></br>
                  <div className="input-container">
                    <input className="profile-input" type="text" id="user_mobileNo"
                      name="user_mobileNo" placeholder={user_info.user_mobileNo}value={state.user_mobileNo} onChange={handleInputChange} />
                    <FiEdit2 className="edit-icon" />
                  </div>
                </div>

                <button className="btn-data" type="submit">Update</button>
              </form>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default UserProfileUpdate;
