import React, { FC } from 'react';
import { ThreeDots } from 'react-loader-spinner';

const Loader: FC = () => {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#00a698"
      ariaLabel="three-dots-loading"
      wrapperStyle={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      visible
    />
  );
};

export default Loader;
