import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import 'react-image-upload/dist/index.css'
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
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
  const [image, setImage] = useState({ preview: '', data: '' })
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    console.log(img.data)
    setImage(img)
  }

  const onSubmit = (payload) => {
    let formData = new FormData();
    formData.append('thumbnail', image.data);
    formData.append('title', payload.title);
    formData.append('description', payload.description);
    formData.append('category', payload.category);
    formData.append('address', payload.address);
    formData.append('startDate', payload.startDate);
    formData.append('endDate', payload.endDate);
    formData.append('timezone', payload.timezone);
    data(formData)
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
      <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(10px) hue-rotate(90deg)" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader>Add new Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="14px">

              {image.preview && <Image src={image.preview} width='100%' height='200px' />}
              <input type='file' name='file' onChange={handleFileChange}></input>
          
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
                name="timezone"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel htmlFor="timezone">Time Zone</FormLabel>
                    <Input {...field} id="timezone" type="text" />
                    {errors.timezone && <FormHelperText color="red.600">Description is required.</FormHelperText>}
                  </FormControl>
                )}
              />

              <Controller
                name="startDate"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel htmlFor="startDate">Start Date</FormLabel>
                    <Input {...field} id="startDate" type="date" />
                    {errors.startDate && <FormHelperText color="red.600">Date is required.</FormHelperText>}
                  </FormControl>
                )}
              />

              <Controller
                name="endDate"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel htmlFor="endDate">End Date</FormLabel>
                    <Input {...field} id="endDate" type="date" />
                    {errors.endDate && <FormHelperText color="red.600">Date is required.</FormHelperText>}
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

            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button type="submit" variant="ghost">
            Create Event
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
