import React, { useState } from 'react';
import axios from 'axios';
import "./Registration.css"
import SuccessPopup from './SuccessPopUp/SuccessPopUp';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';

const UserRegistration = () => {
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

  const handleUserLevelChange = (selectedLevel) => {
    // Update the userLevel state when a checkbox is selected
    setUserLevel(selectedLevel);
  };
  


    // Clear any previous error messages
    setError(null);

    const handleRegistration = () => {
      // Check if the password and confirmPassword match
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
  
      if (!username || !userSurname) {
        setError('First names and surnames are required');
        return;
      }
  
      if (!userLevel) {
        setError('Please select a user level');
        return;
      }
  
      if (!mobileNo) {
        setError('Please enter a registered phone number');
        return;
      }
  
      if (!email) {
        setError('Please enter an Email');
        return;
      }
  
      // Clear any previous error messages
      setError(null);
  
      // Simulate registration success (Replace this with your actual registration logic)
      setTimeout(() => {
        console.log('User registered successfully');
        setSuccessPopupVisible(true);
      }, 1000);
    };

    

    axios.post('http://localhost:3001/api/UserRegister', {username, userSurname, email, userLevel, mobileNo, password,})
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


   const handleCloseSuccessPopup = () => {
     setSuccessPopupVisible(false); // Hide the success pop-up
   };

  return (
    <div className='all-contents'>

    <div className='reg-container'>
<div className='welcome'>
        <div className='logo-login'>
        <img /> Simra
                </div>
                <h2>Welcome</h2>
                SIMRA, tool integrates  <br></br>
                the current water and <br></br>
                sanitation risk assessment <br></br>
                and management methods <br></br>
                into one harmonised tool<br></br>
            </div>  
            <div className='reg-card'>

            <div className='main-reg' id='main-login'>
<h3 className='header-txt'><b>Create An Account</b></h3>
<div>

<p>First Name:</p>
    <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
</div>
<div>
    
    <p>User Surname:</p>
      <input
        type="text"
        value={userSurname}
        onChange={(e) => setUserSurname(e.target.value)}
      />
</div>
<div>
  
    <p>Email:</p>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
</div>

<div>
<p>Mobile Number:</p>
      <input
        type="text"
        value={mobileNo}
        onChange={(e) => setMobileNo(e.target.value)}
      /> 
</div>


<div>
  <p>User Level:</p>
      <label>
        <input
          type="checkbox"
          value="Household"
          checked={userLevel === 'Household'}
          onChange={() => handleUserLevelChange('Household')}
        />
        Household
      </label>

      <label>
        <input
          type="checkbox"
          value="Intermediate"
          checked={userLevel === 'Intermediate'}
          onChange={() => handleUserLevelChange('Intermediate')}
        />
        Intermediate
      </label>

      <label>
        <input
          type="checkbox"
          value="Expert"
          checked={userLevel === 'Expert'}
          onChange={() => handleUserLevelChange('Expert')}
        />
        Expert
      </label>   

    <div> </div>
      <div>
    <p>Password:</p>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
</div>
<div>
    
    <p>Confirm Password:</p>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
</div>             
</div>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <button className='btn-reg' title="Register" onPress={handleRegistration}>Create Account</button>

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