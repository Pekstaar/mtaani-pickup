import {
  Box,
  Center,
  HStack,
  Icon,
  Image,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import React, {useEffect, useMemo} from 'react';
import {assets} from '../../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SubmitButton} from '../../../screens/Credentials';
import {useState} from 'react';
import AboutBusinessService from '../../../services/AboutBusinessService';
import Selector from '../business_details/Selector';
import {LabeledInput} from '../../Input';

const SendPackage = () => {
  const [currentView, setCurrentView] = useState('agent');

  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState({});
  const [showSelector, setShowSelector] = useState(false);
  const handleSelectAgent = agent => {
    setSelectedAgent(agent);
    setShowSelector(false);
  };

  useEffect(() => {
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
    <Box px={'3'} mb={'2'}>
      {/* card */}
      <VStack space={'4'}>
        {/* image */}
        <Box h={'170px'}>
          <Image
            source={{
              uri: 'https://www.wheninmanila.com/wp-content/uploads/2021/08/delivery-rider-stock-motorcycle.jpg?width=1200&enable=upscale',
            }}
            alt={'delivery image'}
            h={'full'}
            w={'full'}
            resizeMethod={'resize'}
            resizeMode={'cover'}
            borderTopRadius={'2xl'}
            position={'relative'}
          />

          <Box position={'absolute'} bottom={'0'} w={'full'}>
            <Text
              textTransform={'uppercase'}
              textAlign={'center'}
              fontWeight={'800'}
              fontSize={'md'}
              color={'primary'}>
              Send Package instantly
            </Text>

            <Text textAlign={'center'} color={'white'} fontWeight={'700'}>
              To send a package select Agent delivery or Doorstep delivery.
            </Text>
          </Box>
        </Box>
        {/* inputs */}
        <SelectDelivery
          title={'Agent Delivery'}
          handlePress={() => setCurrentView('agent')}
          isCurrent={currentView === 'agent'}
        />
        {currentView === 'agent' && (
          <VStack bg={'#F2F3F5'} p={'3'} borderRadius={'xl'}>
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
        )}

        <SelectDelivery
          title={'Doorstep Delivery'}
          handlePress={() => setCurrentView('doorstep')}
          isCurrent={currentView === 'doorstep'}
        />
        {currentView === 'doorstep' && (
          <VStack bg={'#F2F3F5'} p={'3'} borderRadius={'xl'}>
            <Box height={20}>
              <LabeledInput
                placeholder={'Location'}
                //   value={details?.mpesaPhone}
                //   handleChange={phone =>
                //     setDetails(prev => ({...prev, mpesaPhone: phone}))
                //   }
              />
            </Box>
            <Box height={20}>
              <LabeledInput
                placeholder={'Hse./Office/floor'}
                //   value={details?.mpesaPhone}
                //   handleChange={phone =>
                //     setDetails(prev => ({...prev, mpesaPhone: phone}))
                //   }
              />
            </Box>
            <Box height={20}>
              <LabeledInput
                placeholder={'Selecto Rider'}
                //   value={details?.mpesaPhone}
                //   handleChange={phone =>
                //     setDetails(prev => ({...prev, mpesaPhone: phone}))
                //   }
              />
            </Box>
          </VStack>
        )}

        <SubmitButton text="Send Package " />
      </VStack>
      {/* proceed button */}
    </Box>
  );
};

export default SendPackage;

const SelectDelivery = ({isCurrent = false, title, handlePress}) => (
  <Pressable onPress={handlePress}>
    <HStack
      space={'4'}
      p={'3'}
      borderColor={isCurrent ? 'primary' : 'black'}
      borderWidth={'1'}
      alignItems={'center'}
      borderRadius={'xl'}>
      <Center
        w={'3'}
        h={'3'}
        borderRadius={'full'}
        borderWidth={'1'}
        p={'0.5'}
        borderColor={isCurrent ? 'primary' : 'black'}>
        {isCurrent && (
          <Icon
            color={'primary'}
            as={<Ionicons name={'ios-checkmark-sharp'} />}
          />
        )}
      </Center>

      <Box
        flexGrow={'1'}
        _text={{
          fontWeight: '700',
        }}>
        {title}
      </Box>

      <Icon
        size={6}
        color={isCurrent ? 'primary' : 'black'}
        as={<Ionicons name={isCurrent ? 'chevron-up' : 'chevron-down'} />}
      />
    </HStack>
  </Pressable>
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
