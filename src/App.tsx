import React, { FC, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from '@components/Layout';
const BeersPage = lazy(() => import('@pages/Beers'));
const BeerDetailsPage = lazy(() => import('@pages/BeerDetails'));

import { Pathname } from '@types';

const App: FC = () => {
  return (
    <Routes>
      <Route path={Pathname.BEERS} element={<Layout />}>
        <Route index element={<BeersPage />} />
        <Route path={Pathname.BEER_DETAILS} element={<BeerDetailsPage />} />
      </Route>
    </Routes>
  );
};

export default App;
