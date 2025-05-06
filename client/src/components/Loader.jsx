import React from 'react';

const Loader = () => {
  return (
    <div className='flexCenter h-screen w-full'> 
        <div className='h-24 w-24 border-t-transparent border-blue-500 rounded-full animate-spin'/>
    </div>
  );
};

export default Loader;
