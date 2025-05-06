import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Feature from '../components/Feature'
import Listings from '../components/Listings'
import Footer from '../components/Footer'
import About from '../components/About'

 const Home = () => {
  return (
    <>
        <Header/>
        <Hero />
        <Feature />
        <Listings />
        <About />
        <Footer/>
    </>
  );
};

export default Home;