import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { useBeersStore } from '@store/beers/slice';
import { selectToggleBeer, selectSelectedBeers } from '@store/beers/selectors';
import { Beer } from '@types';

import './BeersItem.scss';

type BeersItemProps = {
  beer: Beer;
};

const BeersItem: FC<BeersItemProps> = ({
  beer: { id, name, tagline, first_brewed, description },
}) => {
  const selectedBeers = useBeersStore(selectSelectedBeers);
  const toggleBeer = useBeersStore(selectToggleBeer);

  const areAnyBeersSelected = selectedBeers.some(beerId => beerId === id);

  const selectBeerHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    toggleBeer(id);
  };

  return (
    <li className={areAnyBeersSelected ? 'beers__item beers__item_selected' : 'beers__item'}>
      <NavLink to={`${id}`} className="beers__link" onContextMenu={selectBeerHandler}>
        <h2 className="beers__heading">{name}</h2>
        <p className="beers__tag">#{tagline}</p>
        <div className="beers__description">
          <p>Firstly brewed: {first_brewed}</p>
          <p>{description}</p>
        </div>
      </NavLink>
    </li>
  );
};

export default BeersItem;
