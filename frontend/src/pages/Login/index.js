import { Box, Center, Text } from '@chakra-ui/react';
import React from 'react';
import { connect } from 'react-redux';
import LoginForm from '../../component/forms/loginForm';
import Layout from '../../component/Layout';
import { authService } from '../../services';

function Login(props) {
    
  const submitForm = (data) => {
    props.loginUser(data);
  };

  return (
    <Layout>
      <Center>
        <Box width={['100%', '30%']} borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Box p="6">
            <Center>
              <Text mb="24px" fontSize="2xl" fontWeight="bold">
                Login to your Account
              </Text>
            </Center>
            <LoginForm data={submitForm} />
          </Box>
        </Box>
      </Center>
    </Layout>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (payload) => dispatch(authService.loginUser(payload)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
