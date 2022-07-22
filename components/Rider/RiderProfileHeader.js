import {Avatar, Box, Center, HStack, Icon, Pressable, Text} from 'native-base';
import React from 'react';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const RiderProfileHeader = () => {
  return (
    <Pressable
      bg={'white'}
      borderColor={'trueGray.200'}
      borderWidth={'1'}
      my={'4'}
      borderRadius={'xl'}
      _pressed={{
        bg: 'trueGray.100',
      }}>
      <HStack p={'2'} space={'3'} alignItems={'center'}>
        {/* avatar */}
        <Avatar
          source={{
            uri: 'https://images.unsplash.com/photo-1611004061856-ccc3cbe944b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW90b3JjeWNsZSUyMGhlbG1ldHxlbnwwfHwwfHw%3D&w=1000&q=80',
          }}>
          BK
        </Avatar>

        {/* details */}
        <Box flexDir={'row'} flexGrow={'1'} alignItems={'center'}>
          <Box>
            <Text color={'trueGray.600'}>Your Rider</Text>
            <Box flexDir={'row'} alignItems={'center'}>
              <Text fontSize={'md'} fontWeight={'700'}>
                Isaac Muiruri
              </Text>

              <Center
                ml={'2'}
                h={'3.5'}
                w={'3.5'}
                p={'1'}
                bg={'#4EB4FF'}
                borderRadius={'full'}>
                <Icon
                  color={'white'}
                  size={3}
                  as={<FontAwesome5 name={'check'} />}
                />
              </Center>
            </Box>

            <HStack space={'1.5'} my={'1'}>
              {[1, 2, 3, 4].map(i => (
                <Icon
                  key={i}
                  size={'4'}
                  color={'primary'}
                  as={<FontAwesome5 name={'star'} />}
                />
              ))}
              <Icon
                size={'4'}
                color={'primary'}
                as={<FontAwesome5 name={'star-half-empty'} />}
              />
            </HStack>
          </Box>
          {/* icons */}
          <Center
            p={'1'}
            ml={'3.5'}
            borderWidth={'1'}
            borderColor={'trueGray.300'}
            borderRadius={'full'}>
            <Icon
              size={'4'}
              color={'trueGray.700'}
              as={<Ionicons name={'call-sharp'} />}
            />
          </Center>

          <Center
            p={'1'}
            ml={'3.5'}
            borderWidth={'1'}
            borderColor={'trueGray.300'}
            borderRadius={'full'}>
            <Icon
              size={'4'}
              color={'trueGray.700'}
              as={<Entypo name={'chat'} />}
            />
          </Center>
        </Box>

        {/* chevron right icon */}
        <Center>
          <Icon
            size={'6'}
            color={'trueGray.700'}
            as={<Ionicons name={'chevron-forward'} />}
          />
        </Center>
      </HStack>
    </Pressable>
  );
};

export default RiderProfileHeader;
