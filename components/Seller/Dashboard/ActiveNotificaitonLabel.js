import {Box, Text} from 'native-base';
import React from 'react';

const ActiveNotificationLabel = () => {
  return (
    <Box
      position={'absolute'}
      bg={'danger.500'}
      width={2.5}
      h={2.5}
      right={0}
      top={-4}
      borderRadius={'full'}
    />
  );
};

export default ActiveNotificationLabel;
