import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Center, Spinner} from 'native-base';
import React, {useEffect} from 'react';
import {useState} from 'react';
// fetch user from local storage
// verify user

const PrivateSeller = ({children}) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    const fetchUserFromStorage = async () => {
      navigation
        .getParent()
        ?.setOptions({tabBarStyle: {display: 'none'}, tabBarVisible: false});
      const user = JSON.parse(await AsyncStorage.getItem('user'));

      //   console.log('user found', user);
      if (user?.token) {
        setLoading(false);
      } else {
        setLoading(false);
        navigation.navigate('Login');
      }

      return () => {
        navigation.getParent()?.setOptions({tabBarStyle: undefined});
        setLoading(false);
      };
    };

    fetchUserFromStorage();
  }, []);

  if (loading)
    return (
      <Center h={'100%'} zIndex={'100'}>
        <Spinner size="lg" color={'primary'} />
      </Center>
    );

  return <>{children}</>;
};

export default PrivateSeller;
