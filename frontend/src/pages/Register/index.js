import { Box, Center, Text } from '@chakra-ui/react';
import React from 'react';
import { connect } from 'react-redux';
import RegisterForm from '../../component/forms/registerForm';
import Layout from '../../component/Layout';
import { authService } from '../../services';

function Register(props) {
  const submitForm = (data) => {
    props.registerUser(data);
  };
  return (
    <Layout>
      <Center>
        <Box width={['100%', '30%']} borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Box p="6">
            <Center>
              <Text mb="24px" fontSize="2xl" fontWeight="bold">
                Register a new Account
              </Text>
            </Center>
            <RegisterForm data={submitForm} />
          </Box>
        </Box>
      </Center>
    </Layout>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
      registerUser: (payload) => dispatch(authService.registerUser(payload)),
    };
  };

export default connect(null, mapDispatchToProps)(Register);
