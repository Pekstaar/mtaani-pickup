import {Text, Box, Center, Button, HStack, useToast} from 'native-base';
import React, {useEffect, useCallback} from 'react';
import {Header} from './Login';
import {useNavigation} from '@react-navigation/native';
import RoleButton from '../components/Seller/role/RoleButton';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRoles, setSelectedRole} from '../Redux/reducers/authSlice';
import Loader from '../components/general/Loader';
import {SIZES} from '../constants';
import Toast from '../components/general/toasts';

const Role = ({route: {params}}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const {roles, selectedRole, isLoading, error, isError, isSuccess} =
    useSelector(state => state.auth);

  // const [pressed, setPressed] = useState('');

  const handleContinue = () => {
    if (!selectedRole) {
      toast.show({
        render: () => {
          return <Toast.error message={'You need to select a role!'} />;
        },
      });
    } else {
      navigation.navigate('credentials', {...params});
      console.log(params);
    }
  };

  const handleRoleButtonPress = useCallback(
    selected => {
      if (selected?.name.toLowerCase() === 'seller') {
        dispatch(setSelectedRole(selected));
      } else if (selected?.name === 'Rider') {
        navigation.navigate('select_rider_category');
      }
    },
    [dispatch, setSelectedRole],
  );

  useEffect(() => {
    dispatch(fetchRoles());
  }, []);

  // useEffect(() => {
  //   console.log(selectedRole);
  // }, [selectedRole]);

  // }, [roles, isLoading, error, isError, isSuccess]);

  return (
    <Box safeArea p={4}>
      {isLoading && <Loader />}
      {/* Header  */}
      <Header title={'Tell us who you are'} />
      {/* body */}
      <Box my={2}>
        <Text fontWeight={600} fontSize={'xs'} color={'gray.500'}>
          Choose one category that suits what you do. e.g. if you sell products
          online, tap "Online Seller".
        </Text>

        {/* Buttons  */}
        <Center my={6}>
          <HStack
            // space={5}
            flexWrap={'wrap'}
            py={'3'}
            w={'auto'}
            mx={SIZES.width * 0.02}
            justifyContent="center">
            {roles.map(r => {
              if (r?.name.toLowerCase() === 'admin') return;

              return (
                <RoleButton
                  key={r?._id}
                  pressed={selectedRole?.name}
                  handleRoleButtonPress={() => handleRoleButtonPress(r)}
                  currentRole={r?.name}
                />
              );
            })}
          </HStack>
          <Button
            bg={'primary'}
            borderRadius={'full'}
            mt={4}
            width={'5/6'}
            onPress={handleContinue}>
            <Text color={'secondary'} fontWeight={800} fontSize={'md'}>
              CONTINUE
            </Text>
          </Button>
        </Center>
      </Box>
    </Box>
  );
};

export default Role;
