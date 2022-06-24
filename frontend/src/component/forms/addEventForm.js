import React from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import {
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  VStack,
} from '@chakra-ui/react';

function EventAddForm({ isOpen, onClose, data }) {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (payload) => data(payload);
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
      <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(10px) hue-rotate(90deg)" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader>Add new Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="14px">
              <Controller
                name="title"
                control={control}
                rules={{
                    required: true,
                   }}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input {...field} id="title" type="text" />
                    {errors.title && <FormHelperText color="red.600">Title is required</FormHelperText>}
                  </FormControl>
                )}
              />

              <Controller
                name="description"
                control={control}
                rules={{
                    required: true,
                   }}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Textarea {...field} id="description" type="text" />
                    {errors.description && <FormHelperText color="red.600">Description is required.</FormHelperText>}
                  </FormControl>
                )}
              />

              <Controller
                name="date"
                control={control}
                rules={{
                    required: true,
                   }}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel htmlFor="date">Date</FormLabel>
                    <Input {...field} id="date" type="date" />
                    {errors.date && <FormHelperText color="red.600">Date is required.</FormHelperText>}
                  </FormControl>
                )}
              />
              

              <Controller
                name="category"
                control={control}
                rules={{
                    required: true,
                   }}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel htmlFor="category">Category</FormLabel>
                    <Input {...field} id="category" type="text" />
                    {errors.category && <FormHelperText color="red.600">Category is required</FormHelperText>}
                  </FormControl>
                )}
              />

              <Controller
                name="address"
                control={control}
                rules={{
                    required: true,
                   }}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel htmlFor="address">Address</FormLabel>
                    <Input {...field} id="address" type="text" />
                    {errors.address && <FormHelperText color="red.600">Address is required</FormHelperText>}
                  </FormControl>
                )}
              />

              <Controller
                name="isVirtual"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <Checkbox {...field}>Is Virtual</Checkbox>
                    {/* <FormHelperText>Select only if you're a fan.</FormHelperText> */}
                  </FormControl>
                )}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button type="submit" variant="ghost">
              Secondary Action
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}

EventAddForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.func.isRequired,
};

export default EventAddForm;
