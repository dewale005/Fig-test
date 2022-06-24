import React from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Button, Container, HStack, IconButton, Image, Stack } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

import Logo from '../../assets/meomind-logo.png';
import EventAddForm from '../forms/addEventForm';
import { eventService } from '../../services';
import { connect } from 'react-redux';

function Navbar({ postEvent, fetchData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getData = (data) => {
    postEvent(data).then((resp) => {
      if (resp.success) {
        fetchData();
      }
      onClose();
    });
  };

  return (
    <Box p={5} shadow="md">
      <Container maxW="container.xl">
        <HStack direction={['column', 'row']} spacing="24px" justifyContent="space-between">
          <Box as="a" href='/'>
              <Image width="150px" height="60px" objectFit="contain" src={Logo} alt="Logo" />
          </Box>
          <Box display={{ md: 'none', sm: 'flex' }}>
            <IconButton colorScheme="blue" aria-label="menu icon" size="lg" icon={<HamburgerIcon />} />
          </Box>
          <Box display={['none', 'none', 'flex']}>
            <Stack direction="row" spacing="25px">
                <Button as="a" href='/login' colorScheme="blue" variant="ghost">
                  Log In
                </Button>
                <Button as="a" href='/register' colorScheme="blue" variant="ghost">
                  Sign Up
                </Button>
              <Button onClick={onOpen} colorScheme="blue" variant="solid">
                Add A New Event
              </Button>
              <EventAddForm isOpen={isOpen} onClose={onClose} data={getData} />
            </Stack>
          </Box>
        </HStack>
      </Container>
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    postEvent: (payload) => dispatch(eventService.addEvents(payload)),
    fetchData: () => dispatch(eventService.getEvents()),
  };
};

export default connect(null, mapDispatchToProps)(Navbar);
