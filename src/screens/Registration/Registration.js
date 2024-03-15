import React, { useState } from 'react';
import axios from 'axios';
import "./Registration.css"
// import SuccessPopup from './SuccessPopUp/SuccessPopUp';
//import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { api } from "../../Data/API";
import { useNavigate } from 'react-router-dom';
const UserRegistration = (props) => {
  const [username, setUsername] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [email, setEmail] = useState('');
  const [userLevel, setUserLevel] = useState('Household');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSuccessPopupVisible, setSuccessPopupVisible] = useState(false);
  const navigation = useNavigate();

  const handleRegistration = () => {
    // Check if the password and confirmPassword match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Clear any previous error messages
    setError(null);


    axios.post(api+'UserRegister', { username, userSurname, email, userLevel, mobileNo, password, })
      .then((response) => {

        console.log('User registered successfully');
        // Navigate 
        navigation.navigate('../Login');
        setSuccessPopupVisible(true);
      })
      .catch((error) => {
        console.error('Registration error:', error);

        // Handle registration error, e.g., display an error message.
      });
  };

  //   const handleCloseSuccessPopup = () => {
  //     setSuccessPopupVisible(false); // Hide the success pop-up
  //   };

  return (props.trigger) ? (
    <div className="register-popup">
      <div className="register-popup-inner">
        <div className="popup-inner-header">
          <label className="popup-btn mt-5" onClick={() => props.setTrigger(false)}><h2>X</h2></label>
        </div>
        {props.children}
      </div>
    </div>
  ) : "";
};

export default UserRegistration;