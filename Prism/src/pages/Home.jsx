import React from 'react';
import Header from '../components/Header';
import Teco from '../components/svg/TecoS';

const Home = () => {
  return (
    <div className="relative">
      <Header />
      <div className='relative h-64'>
        <div className='absolute top-0 right-0 m-0 p-0 z-30'>
          <Teco />
        </div>
        <div>
          
        </div>
      </div>
    </div>
  );
};

export default Home;
