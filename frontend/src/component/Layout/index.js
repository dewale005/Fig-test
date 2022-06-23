import React from "react";
import PropTypes from "prop-types";
import Navbar from "../Navbar";
import { Container } from "@chakra-ui/react";

function Layout(props) {
  return (
    <div>
      <Navbar />
      <Container maxW="container.xl" marginTop="50px">{props.children}</Container>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
