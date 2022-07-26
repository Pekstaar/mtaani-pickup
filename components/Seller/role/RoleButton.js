import {Text, HStack, Image, Box, Button} from 'native-base';
import React from 'react';
import {assets} from '../../../constants';
import {SHADOWS, SIZES} from '../../../constants/theme';

const RoleButton = ({pressed, handleRoleButtonPress, currentRole}) => {
  //   const handleRoleButtonPress = useCallback(() => {
  //     setPressed(currentRole);
  //   }, [setPressed, currentRole]);

  return (
    <Button
      my={'2'}
      mx={'2.5'}
      bg={'white'}
      px={4}
      minWidth={'135px'}
      borderRadius={'2xl'}
      onPress={handleRoleButtonPress}
      _pressed={{
        borderColor: 'primary',
        borderWidth: '1',
      }}
      //  borderColor={}
      borderColor={'primary'}
      borderWidth={pressed === currentRole ? 1 : 0}
      style={
        pressed === currentRole && {
          ...SHADOWS.dark,
        }
      }>
      <HStack space={3} alignItems={'center'}>
        <Box bg={'primary_light'} p={2} borderRadius={'full'}>
          <Image
            source={
              currentRole?.toLowerCase() === 'agent'
                ? assets.agent
                : currentRole?.toLowerCase() === 'client' ||
                  currentRole?.toLowerCase() === 'seller'
                ? assets.store
                : currentRole?.toLowerCase() === 'rider'
                ? assets.rider
                : assets.staff
            }
            alt={'role image'}
            resizeMode="contain"
            w={8}
            h={8}
            borderRadius={'full'}
          />
        </Box>

        <Text
          fontWeight={700}
          fontSize={SIZES.base}
          textTransform={'capitalize'}>
          {currentRole}
        </Text>
      </HStack>
    </Button>
  );
};

export default RoleButton;
