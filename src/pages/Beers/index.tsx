import React, { FC, useEffect } from 'react';

import BeersList from '@components/BeersList';
import Container from '@components/Container';
import {
  selectGetBeers,
  selectSelectedBeers,
  selectDeleteSelectedBeers,
  selectPage,
  selectSetVisibleBeers,
} from '@store/beers/selectors';
import { useBeersStore } from '@store/beers/slice';

const Beers: FC = () => {
  const selectedBeers = useBeersStore(selectSelectedBeers);
  const page = useBeersStore(selectPage);

  const getBeers = useBeersStore(selectGetBeers);
  const deleteSelectedBeers = useBeersStore(selectDeleteSelectedBeers);
  const setVisibleBeers = useBeersStore(selectSetVisibleBeers);

  useEffect(() => {
    getBeers();
  }, [page]);

  const deleteSelectedBeersHandler = () => {
    deleteSelectedBeers();
    setVisibleBeers();
  };

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
