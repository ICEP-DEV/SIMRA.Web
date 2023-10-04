import React, { useState } from 'react';

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

  const handleUserLevelChange = (selectedLevel) => {
    // Update the userLevel state when a checkbox is selected
    setUserLevel(selectedLevel);
  };

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

  const handleCloseSuccessPopup = () => {
    setSuccessPopupVisible(false);
  };

  return (
    <div>
      <p>First Name:</p>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <p>User Surname:</p>
      <input
        type="text"
        value={userSurname}
        onChange={(e) => setUserSurname(e.target.value)}
      />
      <p>Email:</p>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
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
      <p>Mobile Number:</p>
      <input
        type="text"
        value={mobileNo}
        onChange={(e) => setMobileNo(e.target.value)}
      />
      <p>Password:</p>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p>Confirm Password:</p>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleRegistration}>Register</button>

      {isSuccessPopupVisible && (
        <div>
          <p>Registration Successful!</p>
          <button onClick={handleCloseSuccessPopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default UserRegistration;