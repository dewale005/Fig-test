import React from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { Button, FormControl, FormHelperText, FormLabel, Input, VStack } from '@chakra-ui/react';

function LoginForm(props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (payload) => props.data(payload);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing="14px">
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <FormControl>
              <FormLabel htmlFor="email" fontSize="smaller">Email</FormLabel>
              <Input {...field} id="email" type="email" />
              {errors.email && <FormHelperText color="red.600">Email is required</FormHelperText>}
            </FormControl>
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <FormControl>
              <FormLabel htmlFor="password" fontSize="smaller">Password</FormLabel>
              <Input {...field} id="password" type="password" />
              {errors.password && <FormHelperText color="red.600">Password is required</FormHelperText>}
            </FormControl>
          )}
        />

        <Button mt="12px" width='100%' type="submit" variant="solid" colorScheme='blue'>
          Login
        </Button>
      </VStack>
    </form>
  );
}

LoginForm.propTypes = {
  data: PropTypes.func.isRequired,
};

export default LoginForm;
