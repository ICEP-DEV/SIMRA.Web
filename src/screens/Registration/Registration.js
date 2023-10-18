import React, { useState } from 'react';
import axios from 'axios';
import "./Registration.css"
// import SuccessPopup from './SuccessPopUp/SuccessPopUp';
//import { useNavigate } from 'react-router-dom';
import logo from './logo.png';
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


    axios.post('http://localhost:3001/api/UserRegister', { username, userSurname, email, userLevel, mobileNo, password, })
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
          <label className="popup-btn-rotate" onClick={() => props.setTrigger(false)}><h2>X</h2></label>
        </div>
        <div className='register-form'>
          <h3 className='header-txt'><b>Create An Account</b></h3>
          <div className='form-group'>
            <label>First Name:</label>
            <input className='control-form' value={username} onChangeText={setUsername} />
          </div>
          <div className='form-group'>
          <label>Last Name:</label>
            <input className="control-form" value={userSurname}
              onChangeText={setUserSurname} />
          </div>
          <div className='form-group'>
          <label>Email:</label>
            <input className="control-form" value={email} onChangeText={setEmail} />
          </div>
          <div className='form-group'>
          <label>Password:</label>
            <input className="control-form" secureTextEntry
              value={password}
              onChangeText={setPassword} />
          </div>
          <div className='form-group'>
          <label>Confirm Password:</label>
            <input  className="control-form" secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword} />
          </div>
          <div className='form-group'>

            <label> User Level:</label>
            <select className='select-sampling_data'  >
              <option value='' className="control-form">---Select---</option>
              <option value='' className="control-form">Household</option>
              <option value='' className="control-form">Intermediate</option>
              <option value='' className="control-form">Expert</option>
            </select>

          </div>
          <div className='form-group'>
            <label>Mobile Number:</label>
            <input value={mobileNo} className="control-form"
              onChangeText={setMobileNo} />
          </div>


          <button className='btn-reg' title="Register" onPress={handleRegistration}>Create Account</button>


        </div>
      </div>
    </div>
  ) : "";
  //     <div className='all-contents'>

  //     <div className='reg-container'>
  // <div className='welcome'>
  //         <div className='logo-login'>
  //         <img /> Simra
  //                 </div>
  //                 <h2>Welcome</h2>
  //                 SIMRA, tool integrates  <br></br>
  //                 the current water and <br></br>
  //                 sanitation risk assessment <br></br>
  //                 and management methods <br></br>
  //                 into one harmonised tool<br></br>
  //             </div>  
  //             <div className='reg-card'>

  //             <div className='main-reg' id='main-login'>
  // <h3 className='header-txt'><b>Create An Account</b></h3>
  // <div>
  // First Name:
  //     <input className="control-form" value={username} onChangeText={setUsername}/>
  // </div>
  // <div>
  //     Last Name:
  //     <input className="control-form" value={userSurname}
  //         onChangeText={setUserSurname}/>
  // </div>
  // <div>
  //     Email:
  //     <input className="control-form" value={email} onChangeText={setEmail}/>
  // </div>
  // <div>
  //     Password:
  //     <input  className="control-form" secureTextEntry
  //         value={password}
  //         onChangeText={setPassword}/>
  // </div>
  // <div>
  //     Confirm Password:
  //     <input className="control-form" secureTextEntry
  //         value={confirmPassword}
  //         onChangeText={setConfirmPassword}/>
  // </div>
  // <div>

  //     <label> User Level:</label>
  //     <select className='select-sampling_data'  >
  //     <option value='' className="control-form">---Select---</option>
  //     <option value='' className="control-form">Household</option>
  //     <option value='' className="control-form">Intermediate</option>
  //     <option value='' className="control-form">Expert</option>
  //     </select>

  // </div>
  // <div>
  //     Mobile Number:
  //     <input  value={mobileNo}
  //         onChangeText={setMobileNo}/>
  // </div>


  //     <button className='btn-reg' title="Register" onPress={handleRegistration}>Create Account</button>


  //     </div>
  //     </div>

  //    </div>
  //    </div>

  //  <Text>User Level:</Text>
  //   <Picker
  //   selectedValue={userLevel}
  //  onValueChange={(itemValue, itemIndex) => setUserLevel(itemValue)}
  //  >
  //    <Picker.Item label="Household" value="Household" />
  //     <Picker.Item label="Intermediate" value="Intermediate" />
  //     <Picker.Item label="Expert" value="Expert" />
  //  </Picker>
  // );
};

export default UserRegistration;