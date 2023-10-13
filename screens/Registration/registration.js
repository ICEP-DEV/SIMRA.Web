
import React, { useState } from 'react';
import axios from 'axios';
import "./Registration.css"
import SuccessPopup from './SuccessPopUp/SuccessPopUp';
import { Link,useNavigate } from 'react-router-dom';
import logo from './logo.png';

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    // email: '',
   level: 'Household',
    mobileNo: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(null);
  const [isSuccessPopupVisible, setSuccessPopupVisible] = useState(false);
  const navigation = useNavigate();

  const handleUserLevelChange = (selectedLevel) => {
    setFormData({ ...formData, userLevel: selectedLevel });
  };

  const handleRegistration = () => {
    setError(null); // Clear any previous error messages

    // Check if the password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.firstname || !formData.lastname) {
      setError('First name and surname are required');
      return;
    }

    if (!formData.level) {
      setError('Please select a user level');
      return;
    }

    if (!formData.mobileNo) {
      setError('Please enter a registered phone number');
      return;
    }

    // if (!formData.email) {
    //   setError('Please enter an email');
    //   return;
    // }

    // Make an Axios POST request for user registration
    axios
      .post('http://localhost:3001/api/UserRegister', formData)
      .then((response) => {
        console.log('User registered successfully');
        setSuccessPopupVisible(true);
        navigation('/Level2'); // Use '/' for relative path
      })
      .catch((error) => {
        console.error('Registration error:', error);
        setError('Registration failed. Please try again.');
      });
  };

  const handleCloseSuccessPopup = () => {
    setSuccessPopupVisible(false);
  };

  return (
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

          <div className='main-reg' id='main-login'>
            <h3 className='header-txt'><b>Create An Account</b></h3>
            <div>
             
              <input
               className='input-login'
               placeholder='First Name'
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
              />
            </div>
            <div>
          
              <input
              placeholder='Last Name'
               className='input-login'
                type="text"
                value={formData.userSurname}
                onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
              />
            </div>
            {/* <div>
            
              <input
               className='input-login'
                type="text"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div> */}
            <div>
             
              <input
              placeholder='Mobile Number'
               className='input-login'
                type="text"
                value={formData.mobileNo}
                onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })}
              />
            </div>
            <p className='d-flex justify-content-center'>User Level:</p>
            <div className='d-flex justify-content-between'>
             
              <label>
                <input
                 className='.d-print-inline-block'
                  type="radio"
                  value="Household"
                  checked={formData.level=== 'Household'}
                  onChange={() => handleUserLevelChange('Household')}
                />
                Household
              </label>
              <label>
                <input
                 className='.d-print-inline-block'
                  type="radio"
                  value="Intermediate"
                  checked={formData.level === 'Intermediate'}
                  onChange={() => handleUserLevelChange('Intermediate')}
                />
                Intermediate
              </label>
              <label>
                <input
                 className='.d-print-inline-block'
                  type="radio"
                  value="Expert"
                  checked={formData.level === 'Expert'}
                  onChange={() => handleUserLevelChange('Expert')}
                />
                Expert
              </label>
            </div>
            <div className='d-flex flex-row'>
            <div>
           
              <input
               className='input-login w-75 p-1'
               placeholder='password'
                type="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div>
        
              <input
              placeholder='Confirm Password'
               className='input-login w-75 p-1'
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
            </div>
          
            {error && <p style={{ color: 'red' }}>{error}</p>}
         
            <div className='login-grid'>

            <button className='btn btn-dark' onClick={handleRegistration}>Create Account</button>
<small className='txt-signup'>
    Don't have an account ? <Link to="/Login" className='ms-2'>Sign In</Link>
</small>
</div>
            {isSuccessPopupVisible && (
              <div>
                <p>Registration Successful!</p>
                <button onClick={handleCloseSuccessPopup}>Close</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;