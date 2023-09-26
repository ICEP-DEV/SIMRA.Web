import React, { useState } from 'react';
import { View, Text, TextInput, Button, Picker, Modal } from 'react-native';
import axios from 'axios';
import SuccessPopup from './SuccessPopUp';

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

    axios.post('http://localhost:3000/register', {username, userSurname, email, userLevel, mobileNo, password,})
      .then((response) => {
        console.log('User registered successfully');
        // Navigate to a success screen or perform other actions as needed.
        setSuccessPopupVisible(true);
      })
      .catch((error) => {
        console.error('Registration error:', error);
        
        // Handle registration error, e.g., display an error message.
      });
  };

  const handleCloseSuccessPopup = () => {
    setSuccessPopupVisible(false); // Hide the success pop-up
  };

  return (
    <View>
      <Text>Username:</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
      />
      <Text>User Surname:</Text>
      <TextInput
        value={userSurname}
        onChangeText={setUserSurname}
      />
      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
      />
     <Text>User Level:</Text>
      <Picker
        selectedValue={userLevel}
        onValueChange={(itemValue, itemIndex) => setUserLevel(itemValue)}
      >
        <Picker.Item label="Household" value="Household" />
        <Picker.Item label="Intermediate" value="Intermediate" />
        <Picker.Item label="Expert" value="Expert" />
      </Picker>
      <Text>Mobile Number:</Text>
      <TextInput
        value={mobileNo}
        onChangeText={setMobileNo}
      />
      <Text>Password:</Text>
      <TextInput
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Text>Confirm Password:</Text>
      <TextInput
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <Button title="Register" onPress={handleRegistration} />

      <SuccessPopup
        isVisible={isSuccessPopupVisible}
        message="Registration Successful!"
        onClose={handleCloseSuccessPopup}
      />
      
    </View>
  );
};

export default UserRegistration;