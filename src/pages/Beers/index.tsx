import React, { FC, useEffect } from 'react';

import BeersList from '@components/BeersList';
import Container from '@components/Container';
import { useBeersStore } from '@store/beers/slice';
import {
  selectGetBeers,
  selectSelectedBeers,
  selectDeleteSelectedBeers,
} from '@store/beers/selectors';

const Beers: FC = () => {
  const getBeers = useBeersStore(selectGetBeers);
  const deleteSelectedBeers = useBeersStore(selectDeleteSelectedBeers);

  const selectedBeers = useBeersStore(selectSelectedBeers);

  useEffect(() => {
    getBeers();
  }, []);

  const deleteSelectedBeersHandler = () => deleteSelectedBeers();

  return (
    <section className="beers">
      <Container>
        {Boolean(selectedBeers.length) && (
          <button type="button" className="beers__button" onClick={deleteSelectedBeersHandler}>
            Delete selected items
          </button>
        )}
        <BeersList />
      </Container>
    </section>
  );
};

export default Beers;
