import React from 'react';
import {Center, Icon, Text} from 'native-base';
import {SIZES} from '../../../constants';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const EmptyShelf = () => {
  return (
    <Center h={SIZES.height * 0.7}>
      <Icon
        color={'trueGray.700'}
        size={'32'}
        as={<SimpleLineIcons name={'social-dropbox'} />}
      />
      <Text fontWeight={'800'} fontSize={'lg'} color={'trueGray.700'}>
        Nothing to show!
      </Text>
      <Text fontWeight={'600'} textAlign={'center'}>
        You haven't added any product yet. please click on the add product
        button to create product.
      </Text>
    </Center>
  );
};

export default EmptyShelf;
