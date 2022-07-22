import React from 'react';
import {
  Actionsheet,
  Icon,
  HStack,
  Box,
  Input,
  ScrollView,
  Pressable,
} from 'native-base';
// import Fontiso from 'react-native-vector-icons/Fontisto';
import {TouchableOpacity} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {SIZES} from '../../../constants';
const Selector = ({
  isOpen,
  onClose,
  onOpen,
  list,
  Text,
  onSelect,
  placeHolderText = '--Please Select item--',
  label,
}) => {
  return (
    <>
      <Pressable onPress={onOpen}>
        <Box>{label}</Box>
        <HStack
          my={'2'}
          p={'3'}
          borderWidth={'1'}
          borderColor={'primary'}
          alignItems={'center'}
          borderRadius={'xl'}>
          <Box
            flexGrow={'1'}
            _text={{color: Text ? 'trueGray.800' : 'trueGray.400'}}>
            {Text ? Text : placeHolderText}
          </Box>
          <Icon
            size={'5'}
            color={'black'}
            as={<Entypo name={'chevron-up'} />}
          />
        </HStack>
      </Pressable>

      <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
        <Actionsheet.Content py={5} minH={SIZES.height * 0.9}>
          <Pressable
            _pressed={{opacity: '80'}}
            onPress={onClose}
            borderRadius={'full'}
            p={'1'}
            position={'absolute'}
            top={'5'}
            right={'5'}
            bg={'trueGray.100'}>
            <Icon
              color={'trueGray.500'}
              size={'5'}
              as={<Ionicons name={'close'} />}
            />
          </Pressable>
          <Box
            flexDir={'row'}
            w={'full'}
            alignItems={'center'}
            px={'3'}
            mb={'2'}
            py={'2'}
            _text={{
              fontSize: 'lg',
              textTransform: 'uppercase',
              fontWeight: '700',
            }}>
            <Box
              width={1}
              mr={'2'}
              my={1}
              height={'full'}
              borderRadius={'full'}
              bg={'primary'}
            />
            MTAANI AGENTS LIST
          </Box>

          <SearchInput />

          <Actionsheet.Item disabled py={'2'}>
            <HStack>
              <Box
                w={'1/2'}
                _text={{
                  fontWeight: '600',
                  fontSize: 'md',
                  color: 'trueGray.700',
                }}>
                Name
              </Box>

              <Box
                w={'1/2'}
                _text={{
                  fontWeight: '600',
                  fontSize: 'md',
                  color: 'trueGray.700',
                }}>
                Location
              </Box>
            </HStack>
          </Actionsheet.Item>

          <ScrollView>
            {list?.map(item => (
              <Actionsheet.Item
                py={0}
                key={item?._id}
                _pressed={{
                  bg: 'trueGray.200',
                  borderRadius: 'sm',
                }}
                onPress={() => onSelect(item)}>
                <HStack
                  py={'1.5'}
                  borderBottomWidth="1.5"
                  borderColor={'primary'}
                  alignItems={'center'}>
                  <Box
                    w={'1/2'}
                    _text={{
                      fontWeight: '600',
                      color: 'trueGray.800',
                    }}>
                    {item?.agent_location}
                  </Box>

                  <Box
                    w={'1/2'}
                    _text={{
                      fontWeight: '600',
                      color: 'trueGray.800',
                      fontSize: 'xs',
                      textTransform: 'uppercase',
                    }}>
                    {item?.agent_description}
                  </Box>
                </HStack>
              </Actionsheet.Item>
            ))}
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

export default Selector;

const SearchInput = () => (
  <HStack
    py={0.5}
    space={2}
    mb={'4'}
    mx={'3'}
    bg={'muted.200'}
    borderRadius={'full'}
    px={'3'}
    alignItems={'center'}>
    <Icon size={5} as={<Ionicons name="search" />} />

    <Input
      variant={'unstyled'}
      h={10}
      flex={1}
      borderWidth={0}
      size={'md'}
      placeholder={'Search Name'}
    />

    <TouchableOpacity>
      <Icon size={5} as={<Ionicons name="arrow-forward" />} />
    </TouchableOpacity>
  </HStack>
);
