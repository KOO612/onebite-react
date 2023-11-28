import React from 'react';
import './Body.css';

const Body = () => {
  const num = 19;
  return (
    <div>
      <h1>
        {num}은 {num % 2 === 0 ? '짝수' : '홀수'}
      </h1>
    </div>
  );
};

export default Body;
