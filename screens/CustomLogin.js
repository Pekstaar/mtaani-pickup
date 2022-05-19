import {View, Text, TextInput, Button} from 'react-native';
import React, {useState} from 'react';
import AxiosUtility from '../services/AxiosService';

const CustomLogin = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await AxiosUtility.post(`/login`, loginDetails);

      console.log(response?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(error);
      throw error;
    }

    // setTimeout(() => {
    //   setLoading(false);
    // }, 1000);
  };

  return (
    <View style={{padding: 20}}>
      <Text>CustomLogin</Text>

      <TextInput
        type="text"
        style={{borderWidth: 1, marginVertical: 10}}
        value={phone}
        onChange={text => setPhone(text)}
      />
      <TextInput
        type="password"
        style={{borderWidth: 1, marginVertical: 10}}
        value={password}
        onChange={text => setPassword(text)}
      />

      <Button
        title={loading ? 'loading...' : 'Login'}
        onPress={loading ? () => {} : handleLogin}
      />
    </View>
  );
};

export default CustomLogin;
