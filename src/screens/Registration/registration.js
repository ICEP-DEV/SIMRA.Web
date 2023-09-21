import React, { useState } from 'react';
import { View, Text, TextInput, Button, Picker } from 'react-native';
import axios from 'axios';

const UserRegistration = () => {
  const [username, setUsername] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [email, setEmail] = useState('');
  const [userLevel, setUserLevel] = useState('beginner');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegistration = () => {
    // Check if the password and confirmPassword match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Clear any previous error messages
    setError(null);

    axios.post('http://', {username, userSurname, email, userLevel, mobileNo, password,})
      .then((response) => {
        console.log('User registered successfully');
        // Navigate to a success screen or perform other actions as needed.
      })
      .catch((error) => {
        console.error('Registration error:', error);
        // Handle registration error, e.g., display an error message.
      });
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
        <Picker.Item label="Beginner" value="beginner" />
        <Picker.Item label="Intermediate" value="intermediate" />
        <Picker.Item label="Expert" value="expert" />
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
    </View>
  );
};

export default UserRegistration;