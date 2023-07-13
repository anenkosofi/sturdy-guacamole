import React, { FC, useEffect } from 'react';

import BeersList from '@components/BeersList';
import Container from '@components/Container';
import { useBeersStore } from '@store/beers/slice';
import { selectGetBeers } from '@store/beers/selectors';

const Beers: FC = () => {
  const getBeers = useBeersStore(selectGetBeers);

  useEffect(() => {
    getBeers();
  }, []);

  return (
    <section className="beers">
      <Container>
        <BeersList />
      </Container>
    </section>
  );
};

export default Beers;
