import React, { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { useBeersStore } from '@store/beers/slice';
import { selectDetails } from '@store/beers/selectors';

import './AboutBeer.scss';

const AboutBeer: FC = () => {
  const location = useLocation();

  const beer = useBeersStore(selectDetails);

  if (!beer) {
    return null;
  }
  const {
    abv,
    attenuation_level,
    boil_volume: { value, unit },
    brewers_tips,
    contributed_by,
    description,
    ebc,
    first_brewed,
    food_pairing,
    ibu,
    image_url,
    ingredients,
    method,
    name,
    ph,
    srm,
    tagline,
    target_fg,
    target_og,
  } = beer;

  const content = {
    ABV: abv,
    IBU: ibu,
    'Final gravity': target_fg,
    'Original gravity': target_og,
    EBC: ebc,
    SRM: srm,
    pH: ph,
    'Attenuation level': attenuation_level,
    'Boil volume': `${value} ${unit}`,
  };

  const backLinkHref = location.state?.from ?? '/';

  return (
    <>
      <NavLink className="beer__backlink" to={backLinkHref}>
        Go back
      </NavLink>
      <div className="beer__container">
        <div className="beer__thumb">
          <img src={image_url} alt={name} className="beer__image" />
        </div>
        <div className="beer__content">
          <h1 className="beer__heading">{name}</h1>
          <p className="beer__tag">#{tagline}</p>
          <p className="beer__brewed">
            First brewed: <span>{first_brewed}</span>
          </p>
          <p className="beer__description">{description}</p>
          <ul className="beer__properties">
            {Object.entries(content).map(([key, value]) => (
              <li key={key}>
                <span>{key}</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
          <div className="beer__food">
            <h2 className="beer__post-heading">Food pairing</h2>
            <ul className="beer__food-list">
              {food_pairing.map((food, index) => (
                <li key={index}>
                  <span>{index + 1}.</span>
                  <span>{food}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="beer__method">
            <h2 className="beer__post-heading">Method</h2>
            <ul className="beer__method-list">
              {Object.entries(method).map(([key, value], index) => (
                <li key={index}>
                  <span>{key === 'mash_temp' ? 'Mash temperature' : key}</span>
                  <ul>
                    {Array.isArray(value) &&
                      value.map(({ temp, duration }, index) => (
                        <li key={index}>
                          <div>
                            <span>Temperature:</span>
                            <span>
                              {temp.value} {temp.unit}
                            </span>
                          </div>
                          {duration && (
                            <div>
                              <span>Duration:</span>
                              <span>{duration}</span>
                            </div>
                          )}
                        </li>
                      ))}
                    {!Array.isArray(value) && typeof value === 'object' && value !== null && (
                      <li key={index}>
                        <div>
                          <span>Temperature:</span>
                          <span>
                            {value.temp.value} {value.temp.unit}
                          </span>
                        </div>
                        {value.duration && (
                          <div>
                            <span>Duration:</span>
                            <span>{value.duration}</span>
                          </div>
                        )}
                      </li>
                    )}
                    {!Array.isArray(value) && typeof value !== 'object' && value === null && null}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <div className="beer__ingredients">
            <h2 className="beer__post-heading">Ingredients</h2>
            <ul className="beer__ingredients-list">
              {Object.entries(ingredients).map(([key, value], index) => (
                <li key={index}>
                  <span>{key}</span>
                  <ul>
                    {typeof value !== 'string' &&
                      value.map(({ name, amount }, index) => (
                        <li key={index}>
                          <div>
                            <span>Name:</span>
                            <span>{name}</span>
                          </div>
                          <div>
                            <span>Amount:</span>
                            <span>
                              {amount.value} {amount.unit}
                            </span>
                          </div>
                        </li>
                      ))}
                    {typeof value === 'string' && <li>{value}</li>}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <p className="beer__tips">
            <span>Tips: </span>
            {brewers_tips}
          </p>
          <p className="beer__contribution">
            Contributed by:<span>{contributed_by}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutBeer;
