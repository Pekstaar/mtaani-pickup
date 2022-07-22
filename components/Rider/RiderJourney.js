import {Box, Center, HStack, Icon, Pressable, Text} from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CButton from '../general/Buttons';

const RiderJourney = () => {
  return (
    <Pressable
      bg={'white'}
      borderColor={'trueGray.200'}
      borderWidth={'1'}
      mb={'4'}
      borderRadius={'xl'}
      p={'6'}
      _pressed={{
        bg: 'trueGray.100',
      }}>
      <HStack py={0} space={'5'}>
        <Center w={10} h={10} borderRadius={'full'} bg={'amber.100'}>
          <Icon
            as={<FontAwesome5 name="box-open" />}
            size={5}
            color="primary"
            my={'auto'}
          />
        </Center>
        <Box>
          <Text fontWeight={'700'} my={'auto'}>
            Kinoo Muthiga - Agent
          </Text>

          <Text
            fontStyle={'italic'}
            fontWeight={'600'}
            fontSize={'xs'}
            // my={'auto'}
            color={'gray.500'}>
            11.23 am, Aigle Pharmacy
          </Text>
        </Box>
      </HStack>

      <DashedLine />

      <HStack py={0} space={'5'}>
        <Center w={8} h={8} ml={'1'} borderRadius={'full'} bg={'amber.100'}>
          <Box h={'3'} w={'3'} bg={'primary'} borderRadius={'full'} />
        </Center>
        <Box>
          <Text fontWeight={'700'} my={'auto'}>
            Philadephia Hse warehouse
          </Text>

          <Text
            fontStyle={'italic'}
            fontWeight={'600'}
            fontSize={'xs'}
            // my={'auto'}
            color={'gray.500'}>
            12.15 pm, CBD Warehouse sorting
          </Text>
        </Box>
      </HStack>

      <DashedLine />

      <HStack py={0} space={'5'}>
        <Center w={10} h={10} borderRadius={'full'} bg={'amber.100'}>
          <Icon
            as={<FontAwesome5 name="building" />}
            size={5}
            color="primary"
            my={'auto'}
          />
        </Center>

        <Box>
          <Text fontWeight={'700'} my={'auto'}>
            TRM DRIVE - Destination
          </Text>

          <Text
            fontStyle={'italic'}
            fontWeight={'600'}
            fontSize={'xs'}
            // my={'auto'}
            color={'gray.500'}>
            Your order has not arrived at the destination
          </Text>
        </Box>
      </HStack>

      <Box my={'5'} alignItems={'flex-end'}>
        <CButton.outlined
          text={`View full journey  >`}
          ml={3}
          _text={{color: 'black'}}
          //   border
          w={'155px'}
        />
      </Box>
    </Pressable>
  );
};

export default RiderJourney;

const DashedLine = ({...rest}) => (
  <Box
    borderStyle={'dashed'}
    borderLeftColor={'primary'}
    borderLeftWidth={1.5}
    height={'8'}
    ml={'5'}
    {...rest}
  />
);
