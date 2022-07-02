import {
  Box,
  Image,
  VStack,
  Text,
  Select,
  HStack,
  Center,
  Icon,
  ScrollView,
} from 'native-base';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LabeledInput} from '../../components/Input';
import {assets, SIZES} from '../../constants';
import {SubmitButton} from '../Credentials';

const Delivery = () => {
  return (
    <ScrollView>
      <Box pb={5} safeArea>
        <Box position={'relative'}>
          <Image
            source={assets.bg_map}
            alt="background map"
            h={'330px'}
            resizeMode={'cover'}
          />
          <Box position={'absolute'} w="full">
            <VStack
              p={5}
              bg="white"
              mx={'auto'}
              w={SIZES.width * 0.9}
              borderRadius="2xl"
              top={'32'}
              space={'3'}>
              <Select
                borderColor="primary"
                borderWidth={'1.5px'}
                borderRadius={'xl'}
                size={'md'}
                placeholderTextColor={'gray.500'}
                color={'black'}
                placeholder="-- select agent/doorstep --"
              />

              <LabeledInput
                label={'From'}
                placeholder={'Type your agent name'}
                color={'black'}
                //   value={credentials.password}
                //   handleChange={pwd =>
                //     setCredentials(prev => ({...prev, password: pwd}))
                //   }
              />

              <LabeledInput
                label={'To'}
                color={'black'}
                placeholder={"customer's agent name"}
                //   value={credentials.password}
                //   handleChange={pwd =>
                //     setCredentials(prev => ({...prev, password: pwd}))
                //   }
              />

              <SubmitButton text={'Send Package'} />
            </VStack>
          </Box>
        </Box>

        <HStack mx={'5%'} py={'1'} mt={'32'} justifyContent="space-between">
          <HStack
            space={2}
            alignItems={'center'}
            bg={'white'}
            p={3}
            w={'150px'}
            borderRadius={'xl'}>
            <Center h="12" w={'12'} bg={'#FDF7D3'} p={3} borderRadius={'full'}>
              <Image
                alt="avatar icon"
                source={assets.track}
                resizeMode="contain"
              />
            </Center>

            <Text fontWeight={'semibold'} fontSize={'sm'}>
              {'Track \nOrders'}
            </Text>
          </HStack>

          <HStack
            space={2}
            alignItems={'center'}
            bg={'white'}
            p={3}
            w={'150px'}
            borderRadius={'xl'}>
            <Center h="12" w={'12'} bg={'#FDF7D3'} p={3} borderRadius={'full'}>
              <Image
                alt="avatar icon"
                source={assets.track}
                resizeMode="contain"
              />
            </Center>

            <Text fontWeight={'semibold'} fontSize={'sm'}>
              {'Manage \nExpenses'}
            </Text>
          </HStack>
        </HStack>

        <HStack
          borderRadius={'xl'}
          bg={'white'}
          p={2}
          mx={'5%'}
          mt={2}
          space={2}>
          <Center borderRadius={'full'} bg={'gray.100'} w={10} h={10}>
            <Icon
              size={6}
              color={'primary'}
              as={<FontAwesome name="motorcycle" />}
            />
          </Center>
          <Box>
            <Text fontWeight={'semibold'}>Track Recent Package </Text>
            <Text fontWeight={'light'}>Package sent at 10:30 am </Text>

            <Box py={3}>
              <HStack space={2}>
                <Icon
                  color={'primary'}
                  size={6}
                  as={<Ionicons name={'cube-outline'} />}
                />

                <Box>
                  <Text
                    fontWeight={'medium'}
                    color={'gray.500'}
                    fontSize={'xs'}>
                    Package picked by JohnDoe
                  </Text>

                  <Text
                    fontWeight={'medium'}
                    color={'gray.500'}
                    fontSize={'2xs'}>
                    10:00am
                  </Text>
                </Box>
              </HStack>

              <Box
                borderLeftWidth={1.5}
                borderLeftColor={'primary'}
                borderStyle={'dashed'}
                ml={2.5}
                h={6}
              />

              <HStack space={2.5} alignItems={'center'}>
                <Box
                  background={'primary'}
                  size={3}
                  borderRadius={'full'}
                  ml={1}
                  as={<Ionicons name={'cube-outline'} />}
                />

                <Box>
                  <Text
                    fontWeight={'medium'}
                    color={'gray.500'}
                    fontSize={'xs'}>
                    Package picked by JohnDoe
                  </Text>

                  <Text
                    fontWeight={'medium'}
                    color={'gray.500'}
                    fontSize={'2xs'}>
                    10:00am
                  </Text>
                </Box>
              </HStack>
              <Box
                borderLeftWidth={1.5}
                borderLeftColor={'primary'}
                borderStyle={'dashed'}
                ml={2.5}
                h={6}
              />
              <HStack space={2.5} alignItems={'center'}>
                <Box
                  background={'primary'}
                  size={3}
                  borderRadius={'full'}
                  ml={1}
                  as={<Ionicons name={'cube-outline'} />}
                />

                <Box>
                  <Text
                    fontWeight={'medium'}
                    color={'gray.500'}
                    fontSize={'xs'}>
                    Package picked by JohnDoe
                  </Text>

                  <Text
                    fontWeight={'medium'}
                    color={'gray.500'}
                    fontSize={'2xs'}>
                    10:00am
                  </Text>
                </Box>
              </HStack>
            </Box>
          </Box>
        </HStack>
      </Box>
    </ScrollView>
  );
};

export default Delivery;
