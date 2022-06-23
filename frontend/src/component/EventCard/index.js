import React from "react";
import PropTypes from "prop-types";
import { Badge, Box, HStack, Tag, Text } from "@chakra-ui/react";

import moment from "moment";

function EventCard(props) {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          {props.isVirtual ? (
            <Badge borderRadius="full" px="2" colorScheme="blue">
              Virtual Event
            </Badge>
          ) : null}
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
        <Box
          mt="2"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {props.title}
        </Box>
        <Box mt="1" textAlign="justify" color="gray.600" fontSize="sm">
          {props.description}
        </Box>
        <HStack mt="3" direction="row" justifyContent="space-between">
          <Tag variant="solid" colorScheme="green">
            {props.category}
          </Tag>
          <Text
            fontSize="xs"
            textTransform="uppercase"
            color="gray.400"
            fontWeight="semibold"
            noOfLines={1}
          >
            {moment(props.date).fromNow()}
          </Text>
        </HStack>
      </Box>
    </Box>
  );
}

EventCard.propTypes = {
  date: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  category: PropTypes.string,
  address: PropTypes.string,
  isVirtual: PropTypes.bool,
};

export default EventCard;
