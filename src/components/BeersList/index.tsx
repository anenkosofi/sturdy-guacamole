import React, { FC } from 'react';

import BeersItem from '@components/BeersItem';
import { useBeersStore } from '@store/beers/slice';
import { selectBeers } from '@store/beers/selectors';

import './BeersList.scss';

const BeersList: FC = () => {
  const beers = useBeersStore(selectBeers);

  return (
    <ul className="beers__list">
      {beers.map(beer => (
        <BeersItem key={beer.id} beer={beer} />
      ))}
    </ul>
  );
};

export default BeersList;
