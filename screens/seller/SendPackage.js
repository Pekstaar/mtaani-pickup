import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Input,
  Image,
  Pressable,
  ScrollView,
  Stack,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import {Header} from '../Login';
import {TouchableOpacity} from 'react-native';
import {LabeledInput} from '../../components/Input';
import AboutBusinessService from '../../services/AboutBusinessService';
import Selector from '../../components/Seller/business_details/Selector';
import {SHADOWS, SIZES} from '../../constants/theme';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SubmitButton} from '../Credentials';

const SendPackage = () => {
  const [currentView, setCurrentView] = React.useState('agent');

  const [agents, setAgents] = React.useState([]);
  const [selectedAgent, setSelectedAgent] = React.useState({});
  const [showSelector, setShowSelector] = React.useState(false);
  const handleSelectAgent = agent => {
    setSelectedAgent(agent);
    setShowSelector(false);
  };

  React.useEffect(() => {
    const fetchAgents = () => {
      AboutBusinessService.fetchAgents()
        .then(r => {
          setAgents(r?.locations);
        })
        .catch(err => {
          console.log(err);
        });
    };

    fetchAgents();
  }, []);

  return (
    <Box flex={'1'} safeArea bg={'bg'} px={'3'}>
      <Header title={'Deliver Product'} />

      <Search />

      <ScrollView pt={'3'}>
        <Box minH={'20'}>
          <LabeledInput
            label={'Customer name'}
            placeholder={'Type customer name'}
            // value={credentials.email}
            // handleChange={email =>
            //   setCredentials(prev => ({...prev, email}))
            // }
          />
        </Box>

        <Box minH={'20'}>
          <LabeledInput
            label={'Phone number'}
            placeholder={'Type Phone number'}
            // value={credentials.email}
            // handleChange={email =>
            //   setCredentials(prev => ({...prev, email}))
            // }
          />
        </Box>

        <Box>
          <MiniHeader title={'Select pickup point'} />
          <VStack bg={'lightGray'} p={'3'} borderRadius={'xl'} space={'3'}>
            <AgentCard
              list={agents}
              onClose={() => setShowSelector(false)}
              onOpen={() => setShowSelector(true)}
              handleSelectAgent={handleSelectAgent}
              isOpen={showSelector}
              text={'Select your local agent'}
              label={'From agent'}
            />

            <AgentCard
              list={agents}
              onClose={() => setShowSelector(false)}
              onOpen={() => setShowSelector(true)}
              handleSelectAgent={handleSelectAgent}
              isOpen={showSelector}
              text={"Select customer's pickup agent"}
              label={'To agent'}
            />
          </VStack>

          <Box mt={'3'}>
            <Text fontWeight={'700'}>Product Payment</Text>

            <Text fontSize={'11px'} color={'trueGray.600'} fontWeight={'600'}>
              Select whether package is paid or not paid
            </Text>

            <HStack space={'4'}>
              <PaymentMethodButton
                icon={
                  <Icon
                    size={'5'}
                    color={'white'}
                    as={<FontAwesome5 name={'money-bill'} />}
                  />
                }
                payment={'Already Paid'}
              />

              <PaymentMethodButton
                icon={
                  <Icon
                    size={'5'}
                    color={'white'}
                    as={<MaterialIcons name={'do-not-disturb'} />}
                  />
                }
                payment={'Already Paid'}
              />
            </HStack>
          </Box>

          <SubmitButton text={'Proceed to payment'} mb={'5'} />
        </Box>
      </ScrollView>
    </Box>
  );
};

export default SendPackage;

const PaymentMethodButton = ({icon, handlePress, payment, pressed}) => (
  <Button
    my={'2'}
    mx={'2.5'}
    bg={'white'}
    // shadow={'1'}
    px={4}
    minWidth={'135px'}
    borderRadius={'2xl'}
    onPress={handlePress}
    _pressed={{
      borderColor: 'primary',
      borderWidth: '1',
    }}
    borderColor={'primary'}
    borderWidth={pressed === payment ? 1 : 0}
    style={
      pressed === payment && {
        ...SHADOWS.dark,
      }
    }>
    <HStack space={3} alignItems={'center'}>
      <Center bg={'trueGray.300'} borderRadius={'full'} w={'10'} h={'10'}>
        {icon}
      </Center>

      <Text fontWeight={700} fontSize={SIZES.base} textTransform={'capitalize'}>
        {payment}
      </Text>
    </HStack>
  </Button>
);

const Search = () => (
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
);

const MiniHeader = ({title}) => (
  <HStack px={1} py={3} alignItems={'center'} space={2}>
    {/* <Line /> */}
    <Box
      width={0.5}
      my={1}
      height={'full'}
      borderRadius={'full'}
      bg={'primary'}
    />

    <Text fontWeight={'700'} fontSize={'md'}>
      {title}
    </Text>
  </HStack>
);

const AgentCard = ({
  list,
  onClose,
  onOpen,
  handleSelectAgent,
  isOpen,
  text,
  label,
}) => (
  <Selector
    onSelect={handleSelectAgent}
    // Text={selectedAgent?.agent_location}
    isOpen={isOpen}
    placeHolderText={text}
    onClose={onClose}
    onOpen={onOpen}
    list={list}
    label={label}
  />
);
