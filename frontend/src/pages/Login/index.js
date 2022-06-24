import { Box, Center, Text } from '@chakra-ui/react';
import React from 'react';
import LoginForm from '../../component/forms/loginForm';
import Layout from '../../component/Layout';

function Login() {
  const submitForm = (data) => {
    console.log(data);
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

export default Login;
