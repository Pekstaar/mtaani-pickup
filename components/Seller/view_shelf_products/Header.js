import {Box, Text, Icon, HStack, Input, VStack, Stack} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import React from 'react';
import {SIZES} from '../../../constants';
import Fontiso from 'react-native-vector-icons/Fontisto';

const Header = ({title, handleChangeLayout, layout = 'list'}) => {
  return (
    <VStack space={1} bg={'muted.50'} p={3} shadow={1}>
      <HStack
        py={0.5}
        space={2}
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
          placeholder={'Search Product'}
        />

        <TouchableOpacity>
          <Icon size={5} as={<Ionicons name="arrow-forward" />} />
        </TouchableOpacity>
      </HStack>

      <HStack px={1} py={2} alignItems={'center'} space={1}>
        {/* <Line /> */}
        <Box
          width={1}
          my={1}
          height={'full'}
          borderRadius={'full'}
          bg={'primary'}
        />

        <Text fontWeight={600} fontSize={SIZES.lg}>
          {title}
        </Text>

        <HStack space={2} right={0} position={'absolute'}>
          <TouchableOpacity onPress={() => handleChangeLayout('grid')}>
            <Icon
              size={'5'}
              color={layout === 'grid' ? 'gray.800' : 'gray.400'}
              as={<Fontiso name={'nav-icon-grid'} />}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleChangeLayout('list')}>
            <Icon
              size={'5'}
              color={layout === 'list' ? 'gray.800' : 'gray.400'}
              as={<Fontiso name={'nav-icon-list'} />}
            />
          </TouchableOpacity>
        </HStack>
      </HStack>
    </VStack>
  );
};

export default Header;
