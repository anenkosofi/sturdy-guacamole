import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import AboutBeer from '@components/AboutBeer';
import Container from '@components/Container';
import Loader from '@components/Loader';
import { selectGetBeerById, selectIsLoading } from '@store/beers/selectors';
import { useBeersStore } from '@store/beers/slice';

const BeerDetails: FC = () => {
  const { id = '' } = useParams();

  const isLoading = useBeersStore(selectIsLoading);

  const getBeerById = useBeersStore(selectGetBeerById);

  useEffect(() => {
    getBeerById(id);

    window.scrollTo(0, 0);
  }, [id]);

  return (
    <section className="beer">
      <Container>{isLoading ? <Loader /> : <AboutBeer />}</Container>
    </section>
  );
};

export default BeerDetails;
