import React from 'react';
import {Box, Center, HStack, Icon, Pressable, Text} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
const MethodInput = ({icon, text, handlePress, isCurrent, ...rest}) => (
  <Pressable
    borderWidth={'1.5'}
    borderColor={isCurrent ? 'primary' : 'black'}
    p={'3.5'}
    borderRadius={'xl'}
    _focus={{
      borderColor: 'secondary',
    }}
    onPress={handlePress}
    {...rest}>
    <HStack space={'5'} alignItems={'center'}>
      <Center
        w={'4'}
        h={'4'}
        borderRadius={'full'}
        borderWidth={'1.5'}
        p={'0.5'}
        borderColor={isCurrent ? 'primary' : 'black'}>
        {isCurrent && (
          <Icon
            color={'primary'}
            as={<Ionicons name={'ios-checkmark-sharp'} />}
          />
        )}
      </Center>

      <Text fontSize={'md'} fontWeight={'800'}>
        {text}
      </Text>

      {icon}
      {/* <Icon size={'5'} as={<SimpleLineIcons name="screen-smartphone" />} /> */}
    </HStack>
  </Pressable>
);

export default MethodInput;
