import React, { useEffect } from 'react';
import Layout from '../../component/Layout';
import EventCard from '../../component/EventCard';
import { SimpleGrid } from '@chakra-ui/react';
import { eventService } from '../../services';
import { connect } from 'react-redux';

function Home({ event, fetchData }) {
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Layout>
      <SimpleGrid columns={{ sm: 1, md: 3 }} spacing="40px">
        {event.results.map((element, index) => (
          <EventCard key={index} {...element} />
        ))}
      </SimpleGrid>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    event: state.event,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(eventService.getEvents()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
