import {
  Center,
  Box,
  HStack,
  Icon,
  Text,
  Pressable,
  ScrollView,
} from 'native-base';
import React from 'react';
import {Header} from '../Login';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {logoutUser} from '../../src/Utils';
import {useDispatch} from 'react-redux';
import {setUser} from '../../Redux/reducers/authSlice';

const Settings = ({navigation}) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(setUser(null));
    await logoutUser(() => navigation.navigate('Login'));
  };
  return (
    <Box safeArea p={'2'}>
      <Header title={'Settings'} />

      <ScrollView px={'2'}>
        {/* logout */}
        <Pressable
          bg={'white'}
          borderRadius={'xl'}
          onPress={handleLogout}
          _pressed={{
            bg: 'amber.50',
          }}>
          <HStack px={'8'} space={'6'} py={'3'}>
            {/* icon1 */}
            <Icon
              as={<MaterialCommunityIcons name={'logout'} />}
              size={'5'}
              color={'#000'}
            />
            {/* text */}
            <Text fontWeight={'700'}>Log Out</Text>
          </HStack>
        </Pressable>
      </ScrollView>
    </Box>
  );
};

export default Settings;
