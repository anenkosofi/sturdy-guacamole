import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Beer } from '@types';

import './BeersItem.scss';

type BeersItemProps = {
  beer: Beer;
};

const BeersItem: FC<BeersItemProps> = ({
  beer: { id, name, tagline, first_brewed, description },
}) => {
  return (
    <li className="beers__item">
      <NavLink to={`${id}`} className="beers__link">
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
