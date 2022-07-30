import {Box, HStack, Icon, Image, Pressable, Text, VStack} from 'native-base';
import React from 'react';

import Entypo from 'react-native-vector-icons/Entypo';
import {SubmitButton} from '../../../screens/Credentials';
import {Doorstep, Storage, Store} from '../../../assets';
import {useNavigation} from '@react-navigation/native';

const SendPackage = () => {
  const navigation = useNavigation();

  return (
    <Box px={'3'} mb={'2'}>
      {/* card */}
      <VStack space={'3'}>
        {/* image */}
        <Box h={'170px'}>
          <Image
            source={{
              uri: 'https://www.wheninmanila.com/wp-content/uploads/2021/08/delivery-rider-stock-motorcycle.jpg?width=1200&enable=upscale',
            }}
            alt={'delivery image'}
            h={'full'}
            w={'full'}
            resizeMethod={'resize'}
            resizeMode={'cover'}
            borderTopRadius={'2xl'}
            position={'relative'}
          />

          <Box position={'absolute'} bottom={'0'} w={'full'}>
            <Text
              textTransform={'uppercase'}
              textAlign={'center'}
              fontWeight={'800'}
              fontSize={'md'}
              color={'primary'}>
              Send Package instantly
            </Text>

            <Text textAlign={'center'} color={'white'} fontWeight={'700'}>
              To send a package select Agent delivery or Doorstep delivery.
            </Text>
          </Box>
        </Box>

        <SendItem
          icon={<Store height={40} width={40} />}
          title={'Agent to Agent'}
          desc={'send a package from your local agent'}
          handlePress={() =>
            navigation.navigate('drawer', {
              screen: 'Home',
              params: {
                screen: 'send_package',
              },
            })
          }
        />

        <SendItem
          icon={<Doorstep height={40} width={40} />}
          title={'Doorstep delivery'}
          desc={'send a package from your local agent'}
        />

        <SendItem
          icon={<Storage height={40} width={40} />}
          title={'Rent a shelf Drop off'}
          desc={'send a package from your local agent'}
          handlePress={() =>
            navigation.navigate('drawer', {
              screen: 'Home',
              params: {
                screen: 'products',
              },
            })
          }
        />

        <SubmitButton text="Send Package " />
      </VStack>
      {/* proceed button */}
    </Box>
  );
};

export default SendPackage;

const SendItem = ({icon, title, desc, handlePress}) => (
  <Pressable
    p={'2'}
    bg={'white'}
    shadow={'1'}
    borderRadius={'xl'}
    onPress={handlePress}
    _pressed={{bg: 'trueGray.100'}}>
    <HStack space={'4'} alignItems={'center'} justifyContent={'space-around'}>
      {/* icon */}
      <Box p={'3'} bg={'primary_light'} borderRadius={'xl'}>
        {icon}
      </Box>
      {/* text */}
      <Box maxWidth={'5/6'}>
        <Text fontWeight={'black'} fontSize={'md'}>
          {title}
        </Text>

        <Text fontWeight={'600'} color={'trueGray.500'} fontSize={'xs'}>
          {desc}
        </Text>
      </Box>

      {/* right icon */}
      <Icon
        color={'secondary'}
        size={'6'}
        as={<Entypo name={'chevron-right'} />}
      />
    </HStack>
  </Pressable>
);

// const SelectDelivery = ({isCurrent = false, title, handlePress}) => (
//   <Pressable onPress={handlePress}>
//     <HStack
//       space={'4'}
//       p={'3'}
//       borderColor={isCurrent ? 'primary' : 'black'}
//       borderWidth={'1'}
//       alignItems={'center'}
//       borderRadius={'xl'}>
//       <Center
//         w={'3'}
//         h={'3'}
//         borderRadius={'full'}
//         borderWidth={'1'}
//         p={'0.5'}
//         borderColor={isCurrent ? 'primary' : 'black'}>
//         {isCurrent && (
//           <Icon
//             color={'primary'}
//             as={<Ionicons name={'ios-checkmark-sharp'} />}
//           />
//         )}
//       </Center>

//       <Box
//         flexGrow={'1'}
//         _text={{
//           fontWeight: '700',
//         }}>
//         {title}
//       </Box>

//       <Icon
//         size={6}
//         color={isCurrent ? 'primary' : 'black'}
//         as={<Ionicons name={isCurrent ? 'chevron-up' : 'chevron-down'} />}
//       />
//     </HStack>
//   </Pressable>
// );

// const AgentCard = ({
//   list,
//   onClose,
//   onOpen,
//   handleSelectAgent,
//   isOpen,
//   text,
//   label,
// }) => (
//   <Selector
//     onSelect={handleSelectAgent}
//     // Text={selectedAgent?.agent_location}
//     isOpen={isOpen}
//     placeHolderText={text}
//     onClose={onClose}
//     onOpen={onOpen}
//     list={list}
//     label={label}
//   />
// );
