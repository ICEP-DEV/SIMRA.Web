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

  const handleRegistration = () => {
    // Check if the password and confirmPassword match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
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
      <p>Username:</p>
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
      <select value={userLevel} onChange={(e) => setUserLevel(e.target.value)}>
        <option value="Household">Household</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Expert">Expert</option>
      </select>
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