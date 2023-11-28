import React from 'react';
import Button from '../components/Button';

const Home = () => {
  return (
    <div>
      <Button
        text={'기본 버튼'}
        onClick={() => {
          alert('default');
        }}
      />
      <Button
        type="positive"
        text={'긍정 버튼'}
        onClick={() => {
          alert('positive');
        }}
      />
      <Button
        type="negative"
        text={'부정 버튼'}
        onClick={() => {
          alert('negative');
        }}
      />
    </div>
  );
};

export default Home;
