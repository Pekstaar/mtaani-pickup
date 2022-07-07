import React, {useState} from 'react';
import {Box, Center, HStack, VStack, Image, Checkbox, Text} from 'native-base';
import {assets} from '../../constants';
import {Header} from '../Login';
import {LoadingButton, SubmitButton} from '../Credentials';
import {useNavigation} from '@react-navigation/native';

const SelectRiderCategory = () => {
  const [rider, setRider] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // functions:
  const handleChange = values => {
    console.log(values);
  };
  const handleContinue = () => {
    navigation.navigate('create_rider_profile');
  };

  return (
    <Box p={3} safeArea style={{flex: 1}} bg="white">
      {/* Header  */}
      <Header title={'Select One'} />

      {/* motor mobile image */}
      <Center my={'10'} px={4}>
        <Image
          source={assets.motorMobile}
          resizeMode={'cover'}
          w={'270px'}
          height={'56'}
          alt={'mobile-rider logo'}
        />
      </Center>

      {/* inputs */}
      {/* {/* <CheckInput title={'Pickup mtaani rider'} isChecked={false} /> */}

      <Checkbox.Group
        flex={1}
        colorScheme="orange"
        value={rider[0]}
        accessibilityLabel="pick an item"
        onChange={handleChange}>
        <VStack w={'full'} space={6}>
          <CheckInput title={'Individual rider'} value={'individual'} />

          <CheckInput title={'Pickup mtaani rider'} value={'pickup'} />
        </VStack>
      </Checkbox.Group>

      {/* submit button */}
      {loading ? (
        <LoadingButton />
      ) : (
        <SubmitButton text={'Create Account'} handlePress={handleContinue} />
      )}
    </Box>
  );
};

export default SelectRiderCategory;

const CheckInput = ({isChecked = false, title, value}) => (
  <HStack
    alignItems={'center'}
    space={6}
    p={3}
    pl={5}
    bg="gray.200"
    borderRadius={'xl'}
    // borderWidth={1}
    borderColor={'gray.400'}>
    <Checkbox
      width={'full'}
      accessibilityLabel="rider category"
      borderRadius={'full'}
      value={value}
      size="md"
      borderColor={'gray.500'}
      isChecked={isChecked}
    />
    <Text>{title}</Text>
  </HStack>
);
