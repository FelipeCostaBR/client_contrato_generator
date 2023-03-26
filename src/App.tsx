import React, { useState } from 'react';
import { Flex, Button, Text, Box, Input, FormControl, FormLabel } from '@chakra-ui/react';

import api from './services/api';
import { formatDate, getDateAfterWeeks } from './helper/date_helpers';


const App = () => {
  const [name, setName] = useState('');
  const [value, setValue] = useState(0);
  const [vehicle, setVehicle] = useState('');
  const [registration, setRegistration] = useState('');
  const [odometer, setOdometer] = useState(0);
  const [bond, setBond] = useState(600);
  const [rentStartDate, setRentStartDate] = useState('');
  const [contractPeriod, setContractPeriod] = useState(0);


  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const rentEndDate = getDateAfterWeeks(contractPeriod);

      const response = await api.post(`/generate-pdf`, {
        name,
        value,
        vehicle,
        registration,
        odometer,
        bond,
        rentStartDate,
        rentEndDate: formatDate(rentEndDate)
      }, { responseType: 'blob' });

      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'output.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex
      w='100vw'
      h='100vh'
      align='center'
      flexDir={'column'}
    >
      <Box
        as={'form'}
        mt={16}
        w='70%'
        maxW='350px' onSubmit={handleSubmit}>
        <Text justifySelf={'center'} fontSize={'4xl'}>Contract Generator</Text>
        <FormControl mt='1rem' id="name" isRequired>
          <FormLabel htmlFor='name'>Name</FormLabel>
          <Input
            name='name'
            type='name'
            placeholder='name'
            border={'2px'}
            size='lg'
            isRequired={true}
            focusBorderColor='green.light'
            onChange={(event) => setName(event.target.value)}
          />
        </FormControl>

        <FormControl id="value" isRequired>
          <FormLabel htmlFor='value'>Value Rent Weekly</FormLabel>
          <Input
            name='value'
            type='text'
            placeholder='value'
            border={'2px'}
            size='lg'
            isRequired={true}
            focusBorderColor='green.light'
            onChange={(event) => setValue(parseFloat(event.target.value))}
          />
        </FormControl>

        <FormControl id="vehicle" isRequired>
          <FormLabel htmlFor='vehicle'>Vehicle</FormLabel>
          <Input
            name='vehicle'
            type='text'
            placeholder='vehicle'
            border={'2px'}
            size='lg'
            isRequired={true}
            focusBorderColor='green.light'
            onChange={(event) => setVehicle(event.target.value)}
          />
        </FormControl>

        <FormControl id="registration" isRequired>
          <FormLabel htmlFor='registration'>Registration</FormLabel>
          <Input
            name='registration'
            type='text'
            placeholder='registration'
            border={'2px'}
            size='lg'
            isRequired={true}
            focusBorderColor='green.light'
            onChange={(event) => setRegistration(event.target.value)}
          />
        </FormControl>

        <FormControl id="odometer" isRequired>
          <FormLabel htmlFor='odometer'>Odometer</FormLabel>
          <Input
            name='odometer'
            type='number'
            placeholder='odometer'
            border={'2px'}
            size='lg'
            isRequired={true}
            focusBorderColor='green.light'
            onChange={(event) => setOdometer(parseInt(event.target.value))}
          />
        </FormControl>

        <FormControl id="bond" isRequired>
          <FormLabel htmlFor='bond'>Bond</FormLabel>
          <Input
            name='bond'
            type='number'
            placeholder='bond'
            value={bond}
            border={'2px'}
            size='lg'
            isRequired={true}
            focusBorderColor='green.light'
            onChange={(event) => setBond(parseFloat(event.target.value))}
          />
        </FormControl>

        <FormControl id="rentStartDate" isRequired>
          <FormLabel htmlFor='rentStartDate'>Rent Start Date</FormLabel>
          <Input
            name='rentStartDate'
            type='date'
            placeholder='rentStartDate'
            border={'2px'}
            size='lg'
            isRequired={true}
            focusBorderColor='green.light'
            onChange={(event) => setRentStartDate(event.target.value)}
          />
        </FormControl>

        <FormControl id="contractPeriod" isRequired>
          <FormLabel htmlFor='contractPeriod'>Contract Period (in weeks)</FormLabel>
          <Input
            name='contractPeriod'
            type='number'
            placeholder='1 month=4 / 2 months=8 / 3 months=12'
            border={'2px'}
            size='lg'
            isRequired={true}
            focusBorderColor='green.light'
            onChange={(event) => setContractPeriod(parseInt(event.target.value))}
          />
        </FormControl>

        <Button
          type={'submit'}
          w='100%'
          colorScheme="green"
          size={'lg'}
          mt='62px'>
          Generate PDF
        </Button>
      </Box>
    </Flex >
  )
}
export default App;
