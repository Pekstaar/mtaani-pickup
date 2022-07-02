import {Image, Center, Text, Icon} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Product = ({details, handlePress}) => {
  return (
    <TouchableOpacity bg={'white'} onPress={handlePress}>
      <Center
        bg={'muted.300'}
        m={1}
        borderRadius={'sm'}
        // borderWidth={1}
        shadow={'1'}
        h={'105px'}
        w={'105px'}>
        {details?.images.length > 0 ? (
          <Image
            source={{
              uri: details?.images[0],
            }}
            alt={'product image'}
            h={'full'}
            w={'full'}
            resizeMode={'cover'}
          />
        ) : (
          <Icon size={'10'} color={'white'} as={<Ionicons name={'shirt'} />} />
        )}
      </Center>
    </TouchableOpacity>
  );
};

export default Product;
