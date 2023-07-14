import React, { FC, forwardRef, ForwardedRef, RefAttributes } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { useBeersStore } from '@store/beers/slice';
import { selectToggleBeer, selectSelectedBeers } from '@store/beers/selectors';
import { Beer } from '@types';

import './BeersItem.scss';

type BeersItemProps = {
  beer: Beer;
} & RefAttributes<HTMLLIElement>;

const BeersItem: FC<BeersItemProps> = forwardRef(function BeersItem(
  { beer: { id, name, tagline, first_brewed, description } }: BeersItemProps,
  ref: ForwardedRef<HTMLLIElement>
) {
  const location = useLocation();

  const selectedBeers = useBeersStore(selectSelectedBeers);

  const toggleBeer = useBeersStore(selectToggleBeer);

  const areAnyBeersSelected = selectedBeers.some(beerId => beerId === id);

  const selectBeerHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    toggleBeer(id);
  };

  return (
    <li
      className={areAnyBeersSelected ? 'beers__item beers__item_selected' : 'beers__item'}
      ref={ref}
    >
      <NavLink
        to={`${id}`}
        state={{ from: location }}
        className="beers__link"
        onContextMenu={selectBeerHandler}
      >
        <h2 className="beers__heading">{name}</h2>
        <p className="beers__tag">#{tagline}</p>
        <div className="beers__description">
          <p>Firstly brewed: {first_brewed}</p>
          <p>{description}</p>
        </div>
      </NavLink>
    </li>
  );
});

export default BeersItem;
