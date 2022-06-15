import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Box, Button, Center, Icon, Image, useToast, VStack} from 'native-base';
import {Header} from '../Login';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import {assets} from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import {LoadingButton, SubmitButton} from '../Credentials';
import {LabeledInput} from '../../components/Input';

const CreateRiderProfile = () => {
  const toast = useToast();

  const [details, setDetails] = useState({
    nationalID: '',
    numberPlate: '',
  });
  const [businessLogo, setBusinessLogo] = useState(null);
  const [loading, setLoading] = useState(null);

  // functions
  const uploadImage = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setBusinessLogo(image);
        console.log(image);
      })
      .catch(err => {
        toast.show({
          title: 'Error!',
          status: 'error',
          description: err?.message,
        });

        return;
      });
  };

  const handleSubmit = () => {
    // /
  };

  return (
    <KeyboardAvoidingWrapper>
      <Box safeArea p={3}>
        {/* header */}
        <Header title={' Create Profile'} />

        {/* body */}
        <VStack py={8} space={5}>
          {/* profile image */}
          <Center>
            <Box
              bg={'gray.400'}
              borderRadius={'full'}
              p={'0.5'}
              position={'relative'}>
              <Image
                source={
                  businessLogo
                    ? {
                        uri: businessLogo?.path,
                      }
                    : assets.empty
                }
                borderRadius={'full'}
                width={'120px'}
                height={'120px'}
                alt="business_logo"
              />

              <Button
                position="absolute"
                bottom={-10}
                left={-5}
                bg={'secondary'}
                p={2}
                borderRadius={'full'}
                borderColor={'white'}
                borderWidth={2}
                onPress={uploadImage}>
                <Icon
                  size={6}
                  color={'white'}
                  as={<AntDesign name="camera" />}
                />
              </Button>
            </Box>

            {/* Text */}
            <Box _text={{color: 'gray.600', fontWeight: 'medium'}} mt={4}>
              upload your profile picture
            </Box>
          </Center>

          {/* <Button bg={'black'} onPress={logoutUser}>
            Logout
          </Button> */}
          <Box height={20}>
            <LabeledInput
              label={'National identity number'}
              placeholder={'Type your id number '}
              value={details?.nationalID}
              handleChange={name =>
                setDetails(prev => ({...prev, nationalID: name}))
              }
            />
          </Box>

          {/* <Button
            bg={'primary'}
            borderRadius={'full'}
            mt={4}
            width={'full'}
            onPress={handleSubmit}>
            <Text color={'secondary'} fontWeight={800} fontSize={'md'}>
              NEXT
            </Text> */}

          {loading ? (
            <LoadingButton />
          ) : (
            <SubmitButton text={'NEXT'} handlePress={handleSubmit} />
          )}
          {/* </Button> */}
        </VStack>
      </Box>
    </KeyboardAvoidingWrapper>
  );
};

export default CreateRiderProfile;
