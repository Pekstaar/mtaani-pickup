import {Button} from 'native-base';
import React from 'react';

const outlined = ({text, ...rest}) => (
  <Button
    borderWidth={'1.5'}
    p={0}
    h={10}
    borderRadius={'full'}
    minW={'24'}
    {...rest}>
    {text}
  </Button>
);

const CButton = {outlined};

export default CButton;
