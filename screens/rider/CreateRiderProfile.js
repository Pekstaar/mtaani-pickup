import React, {useCallback, useEffect, useState} from 'react';
import {
  Box,
  Button,
  Center,
  Icon,
  Image,
  Pressable,
  useToast,
  VStack,
  HStack,
  Input,
} from 'native-base';
import {Header} from '../Login';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import {assets} from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import {LoadingButton, SubmitButton} from '../Credentials';
import {LabeledInput} from '../../components/Input';
import IonIcons from 'react-native-vector-icons/Ionicons';

const CreateRiderProfile = () => {
  const toast = useToast();

  const [details, setDetails] = useState({
    nationalID: '',
    numberPlate: '',
  });
  const [businessLogo, setBusinessLogo] = useState(null);
  const [id, setId] = useState(null);
  const [drivingLicense, setDrivingLicense] = useState(null);
  const [loading, setLoading] = useState(null);

  const handleLogo = useCallback(
    logo => {
      setBusinessLogo(logo);
    },
    [setBusinessLogo],
  );

  const handleId = useCallback(
    id => {
      setId(id);
    },
    [setId],
  );

  const handleLicense = useCallback(
    l => {
      setDrivingLicense(l);
    },
    [setId],
  );

  // functions
  const uploadImage = setStateCallback => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        // setBusinessLogo(image);
        setStateCallback(image);
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

  useEffect(() => {
    console.log(businessLogo);
  }, [businessLogo]);

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
                onPress={() => uploadImage(handleLogo)}>
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
          <Box>
            <LabeledInput
              label={'National identity number'}
              placeholder={'Type your id number '}
              value={details?.nationalID}
              handleChange={name =>
                setDetails(prev => ({...prev, nationalID: name}))
              }
            />
          </Box>

          <FileInput
            placeholder={'upload your ID photo'}
            handlePress={() => uploadImage(handleId)}
            file={id}
          />

          <Box>
            <LabeledInput
              label={'Motorbike number plate'}
              placeholder={'Type your number plate '}
              value={details?.nationalID}
              handleChange={name =>
                setDetails(prev => ({...prev, nationalID: name}))
              }
            />
          </Box>

          <FileInput
            placeholder={'upload your license'}
            handlePress={() => uploadImage(handleLicense)}
            file={drivingLicense}
          />

          {loading ? (
            <LoadingButton />
          ) : (
            <SubmitButton text={'CONTINUE'} handlePress={handleSubmit} />
          )}
          {/* </Button> */}
        </VStack>
      </Box>
    </KeyboardAvoidingWrapper>
  );
};

export default CreateRiderProfile;

const FileInput = ({handlePress, placeholder, file}) => {
  const fileName = file?.path?.split('/') || [];
  return (
    <Pressable onPress={handlePress}>
      <HStack
        h={'12'}
        borderColor="primary"
        borderWidth={'1.5'}
        borderRadius="xl">
        <Center borderLeftRadius={'lg'} w={'12'} bg="primary" color={'black'}>
          <Icon
            color={'black'}
            size="6"
            as={<IonIcons name="cloud-upload" />}
          />
        </Center>

        <Input
          flex={1}
          placeholder={placeholder}
          size={'md'}
          value={fileName[fileName?.length - 1] || null}
          borderWidth="0"
          isDisabled={true}
        />
      </HStack>
    </Pressable>
  );
};
