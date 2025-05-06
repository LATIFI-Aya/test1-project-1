import React from 'react'
import { Link } from 'react-router-dom';
import circle from '../assets/circle.png';
import cient1 from '../assets/person-1.jpg';
import cient2 from '../assets/person-2.jpg';
import sideImg from '../assets/sideImg.png';
import sideImg1 from '../assets/sideImg1.png';
import sideImg2 from '../assets/sideImg2.png';
import { useSelector } from 'react-redux';

 const Hero = () => {
    const user = useSelector((state) => state.user);

  return (
    <section className='max-padd-container mt-16 xl:mt-10'>
        <div className='flex flex-col xl:flex-row gap-16 '>
            {/* left */}
            <div className='flex justify-center flex-1 flex-col gap-y-8 xl:max-w-[555px] relative'>
                <h1 className='h1'>Invist in <span className='text-secondary'>Your Future</span> With confidence </h1>
                <p> <span className="font-semibold text-gray-800">Doorway Dreams</span> is your trusted partner in real estate, helping you invest in your future with confidence. We offer carefully curated listings, insightful guidance, and a seamless experience designed to match your goals. Whether you're looking for your first home or your next investment opportunity, Doorway Dreams opens the door to lasting value and peace of mind.</p>
                <div className='flex gap-3'>
                    <a href="#listing" className='btn-dark flexCenter rounded-full '>Explore Properties</a>
                    {user ? (
                        <Link to={"/create-listing"} className='btn-secondary flexCenter rounded-full' ><span className='medium-20 pr-1 '>+</span>Add Property</Link> 
                       ):(
                        <Link to={"/login"} className='btn-secondary flexCenter rounded-full' ><span className='medium-20 pr-1 '>+</span>Add Property</Link> 
                       ) }
                </div>
                <div className='flex relative '>
                    {/* Clients images */}
                    <img src={circle} alt="" className='rounded-full h-[99px] z-30'/>
                    <img src={cient1} alt="" className='rounded-full h-[80px] shadow-sm absolute left-16 z-20'/>
                    <img src={cient2} alt="" className='rounded-full h-[80px] shadow-sm absolute left-32 z-10'/>
                </div>
            </div>
            {/* left */}
            <div className='flex-1 flex flex-col gap-y-4'>
                <div className='rounded-2xl h-[266px] overflow-hidden'><img className='rounded-2xl object-cover ' src={sideImg} alt="" /></div>
                <div className='flexBetween gap-4'>
                    <div className='flex-1 flex rounded-xl'><img className='rounded-2xl object-cover aspect-square' src={sideImg1} alt="" /></div>
                    <div className='flex-1 flex rounded-xl'><img className='rounded-2xl object-cover aspect-square' src={sideImg2} alt="" /></div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Hero