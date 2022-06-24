import React from 'react';
import PropTypes from 'prop-types';
import { useDisclosure } from '@chakra-ui/hooks';
import { useForm, Controller } from 'react-hook-form';
import {
  Badge,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { toast } from 'react-toastify';

import moment from 'moment';

function EventCard(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (payload) => {
    reset({
      email: "",
    })
    toast.success("Your Email Been submitted Successfully")
    onClose()
  };
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image objectFit="cover" height="180px" width="100%" src={`/${props.thumbnail}`} alt="thumbnail" />
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="blue">
            {props.category}
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            noOfLines={1}
            textTransform="uppercase"
            ml="2"
          >
            {props.address}
          </Box>
        </Box>
        <Text mt="2" fontSize="xl" fontWeight="semibold" as="h2" lineHeight="tight" noOfLines={1}>
          {props.title}
        </Text>
        <Box mt="1" textAlign="justify" color="gray.600" fontSize="sm">
          {props.description}
        </Box>
        <HStack mt="10px" justifyContent="space-between">
          <HStack mt="1">
            <Text fontSize="xs" textTransform="uppercase" noOfLines={1} fontWeight="semibold">
              Starts:
            </Text>
            <Text fontSize="xs" textTransform="capitalize" color="red.600" fontWeight="semibold" noOfLines={1}>
              {moment(props.startDate).format('LL')}
            </Text>
          </HStack>
          <HStack mt="1">
            <Text fontSize="xs" textTransform="uppercase" noOfLines={1} fontWeight="semibold">
              End:
            </Text>
            <Text fontSize="xs" textTransform="capitalize" color="blue.700" fontWeight="semibold" noOfLines={1}>
              {moment(props.endDate).format('LL')}
            </Text>
          </HStack>
        </HStack>
        <Button onClick={onOpen} mt="12px" type="submit" variant="solid" colorScheme="blue">
          Register interest
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
          <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(10px) hue-rotate(90deg)" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalContent>
              <ModalHeader>Register Interest</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing="14px">
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <FormControl>
                        <FormLabel htmlFor="title">Email</FormLabel>
                        <Input {...field} id="title" type="text" />
                        {errors.email && <FormHelperText color="red.600">Title is required</FormHelperText>}
                      </FormControl>
                    )}
                  />
                </VStack>
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button type="submit" colorScheme="blue">
                  Submit Interest
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
      </Box>
    </Box>
  );
}

EventCard.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  category: PropTypes.string,
  address: PropTypes.string,
  id: PropTypes.string,
};

export default EventCard;
