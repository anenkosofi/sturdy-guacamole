import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import AboutBeer from '@components/AboutBeer';
import Container from '@components/Container';
import { selectGetBeerById } from '@store/beers/selectors';
import { useBeersStore } from '@store/beers/slice';

const BeerDetails: FC = () => {
  const { id = '' } = useParams();

  const getBeerById = useBeersStore(selectGetBeerById);

  useEffect(() => {
    getBeerById(id);
  }, [id]);

  return (
    <section className="beer">
      <Container>
        <AboutBeer />
      </Container>
    </section>
  );
};

export default BeerDetails;
