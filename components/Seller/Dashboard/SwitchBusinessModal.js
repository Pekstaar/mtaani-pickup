import React from 'react';
import {
  Actionsheet,
  Avatar,
  Box,
  Center,
  HStack,
  Icon,
  Image,
  Pressable,
  ScrollView,
  Text,
} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentBusiness} from '../../../Redux/reducers/authSlice';

const SwitchBusinessModal = ({isOpen, onClose, businesses, current, user}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleAddAccount = useCallback(() => {
    onClose();
    navigation.navigate('about_business', {user, mode: 'add'});
  }, []);

  const handleSwitchAccount = business => {
    dispatch(setCurrentBusiness(business));
    onClose();
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
      <Actionsheet.Content>
        <Pressable
          _pressed={{opacity: '80'}}
          onPress={onClose}
          borderRadius={'full'}
          p={'1'}
          position={'absolute'}
          top={'3'}
          right={'3'}
          bg={'trueGray.100'}>
          <Icon
            color={'trueGray.500'}
            size={'5'}
            as={<Ionicons name={'close'} />}
          />
        </Pressable>
        <ScrollView py={2} px={6} w={'full'}>
          {businesses?.map(b => {
            return (
              <BusinessItem
                key={b?._id}
                business={b}
                isCurrent={current === b?._id}
                handlePress={() => handleSwitchAccount(b)}
              />
            );
          })}
          <AddAccountItem handlePress={handleAddAccount} />
        </ScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default SwitchBusinessModal;

const BusinessItem = ({business, isCurrent, handlePress}) => (
  <Pressable
    borderBottomWidth={'1'}
    borderColor={'primary'}
    borderRadius={'lg'}
    onPress={handlePress}
    _pressed={{
      bg: 'trueGray.200',
    }}>
    <HStack mx={'3'} py={'3'} alignItems={'center'} space={'3'}>
      {/* avatar */}
      <Avatar
        bg="green.500"
        alignSelf="center"
        size="md"
        source={{
          uri: business?.logo,
        }}>
        {business?.name?.substring(0, 2)}
      </Avatar>

      <Box flexGrow={'1'}>
        <Text fontSize={'md'} fontWeight={'700'}>
          {business?.name}
        </Text>
        <Text color={'trueGray.500'} fontWeight={'600'}>
          switch account
        </Text>
      </Box>

      <Box p={'2'}>
        {isCurrent ? (
          <Center
            borderRadius={'full'}
            p={'2'}
            bg={'secondary'}
            w={'3'}
            h={'3'}>
            <Icon size={'3'} color={'white'} as={<Entypo name="check" />} />
          </Center>
        ) : (
          <Icon
            size={'5'}
            color={'primary'}
            as={<Entypo name="chevron-right" />}
          />
        )}
      </Box>
    </HStack>
  </Pressable>
);

const AddAccountItem = ({handlePress}) => (
  <Pressable
    borderRadius={'lg'}
    onPress={handlePress}
    _pressed={{
      bg: 'trueGray.200',
    }}>
    <HStack mx={'3'} py={'3'} alignItems={'center'} space={'3'}>
      {/* avatar */}
      <Avatar
        bg="white"
        borderWidth={'1.5'}
        borderColor={'black'}
        alignSelf="center"
        size="40px">
        <Icon
          as={<Ionicons name={'md-add'} />}
          color={'secondary'}
          size={'6'}
        />
      </Avatar>

      <Box flexGrow={'1'}>
        <Text fontSize={'md'} fontWeight={'700'}>
          Add account
        </Text>
        <Text color={'trueGray.500'} fontWeight={'600'}>
          create new account
        </Text>
      </Box>

      <Box p={'2'}>
        {/* <Center borderRadius={'full'} p={'2'} bg={'secondary'} w={'3'} h={'3'}> */}
        <Icon
          size={'5'}
          color={'primary'}
          as={<Entypo name="chevron-right" />}
        />
        {/* </Center> */}
      </Box>
    </HStack>
  </Pressable>
);
