import React, { FC, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import BeersItem from '@components/BeersItem';
import { useBeersStore } from '@store/beers/slice';
import {
  selectBeers,
  selectPage,
  selectSetPage,
  selectLastBeerId,
  selectSetVisibleBeers,
  selectVisibleBeers,
  selectSetLastBeerId,
  selectIsLoading,
} from '@store/beers/selectors';

import './BeersList.scss';

const BeersList: FC = () => {
  const beers = useBeersStore(selectBeers);
  const page = useBeersStore(selectPage);
  const lastBeerId = useBeersStore(selectLastBeerId);
  const visibleBeers = useBeersStore(selectVisibleBeers);
  const isLoading = useBeersStore(selectIsLoading);

  const setPage = useBeersStore(selectSetPage);
  const setVisibleBeers = useBeersStore(selectSetVisibleBeers);
  const setLastBeerId = useBeersStore(selectSetLastBeerId);

  useEffect(() => {
    if (!isLoading && beers.length) setVisibleBeers();
  }, [beers]);

  useEffect(() => {
    if (visibleBeers.length) {
      setLastBeerId(visibleBeers[visibleBeers.length - 1].id);
    }
  }, [visibleBeers]);

  const options = {};
  const [ref, inView] = useInView(options);

  useEffect(() => {
    if (inView) {
      setVisibleBeers();
    }
  }, [inView]);

  useEffect(() => {
    if (beers.length && lastBeerId >= beers[beers.length - 1].id) {
      setPage(page + 1);
    }
  }, [lastBeerId]);

  return (
    <div className="beers__container">
      <ul className="beers__list">
        {Boolean(visibleBeers) &&
          visibleBeers.map((beer, index) => {
            const lastElement = index === visibleBeers.length - 1;
            return <BeersItem key={beer.id} beer={beer} ref={lastElement ? ref : null} />;
          })}
      </ul>
    </div>
  );
};

export default BeersList;
