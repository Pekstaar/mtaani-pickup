import {Box, Center, Image} from 'native-base';
import React from 'react';
// import {assets} from '../../../constants';

const ImageBox = ({image}) => {
  return (
    <Box borderRadius={'sm'} bg={'muted.300'} height={10} width={10}>
      <Image
        borderRadius={'sm'}
        source={{uri: image?.uri ? image?.uri : image}}
        alt={'upload image'}
        flex={1}
        resizeMode={'cover'}
      />
    </Box>
  );
};

export default ImageBox;
