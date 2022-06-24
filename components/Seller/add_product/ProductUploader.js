import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
} from 'native-base';
import React from 'react';
import {assets} from '../../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImageBox from './ImageBox';

const ProductUploader = ({images, uploadImage}) => {
  return (
    // <Center bg={'info.200'}>
    <Box>
      <Stack
        bg={'muted.400'}
        height={'180px'}
        justifyContent={'center'}
        flex={1}
        p={'0.5'}
        rounded="md"
        position={'relative'}>
        <Image
          source={
            images
              ? {
                  uri: images[0]?.path,
                }
              : assets.empty_2
          }
          width={'80px'}
          height={'80px'}
          alt="business_logo"
          alignSelf={'center'}
        />

        <Button
          position="absolute"
          bottom={-28}
          left={4}
          bg={'secondary'}
          p={4}
          borderRadius={'full'}
          borderColor={'white'}
          borderWidth={2}
          onPress={uploadImage}>
          <Icon size={7} color={'white'} as={<AntDesign name="camera" />} />
        </Button>

        {/* Text */}
        <Text
          color="white"
          position={'absolute'}
          bottom={1}
          right={2}
          fontWeight={600}
          fontSize={'xs'}
          mt={4}>
          Upload your product image (1:1)
        </Text>
      </Stack>

      <HStack py={1} space={2} px={2} justifyContent={'flex-end'}>
        <ImageBox />
        <ImageBox />
        <ImageBox />
        <ImageBox />
        <ImageBox />
      </HStack>
    </Box>
    // </Center>
  );
};

export default ProductUploader;
