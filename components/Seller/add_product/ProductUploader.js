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
import React, {useState} from 'react';
import {assets} from '../../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImageBox from './ImageBox';

const ProductUploader = ({images, uploadImage}) => {
  const [currentImage, setCurrentImage] = useState(0);
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
          source={images[0]?.uri ? {uri: images[0].uri} : assets?.empty_2}
          width={images[0]?.uri ? 'full' : 12}
          height={images[0]?.uri ? 'full' : 10}
          resizeMode={'cover'}
          // flex={1}
          alt="upload image"
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
        {images.map((image, i) =>
          image?.uri ? (
            <ImageBox key={i} image={image} />
          ) : (
            <Box
              key={i}
              borderRadius={'sm'}
              bg={'muted.300'}
              height={10}
              width={10}
            />
          ),
        )}
      </HStack>
    </Box>
    // </Center>
  );
};

export default ProductUploader;
