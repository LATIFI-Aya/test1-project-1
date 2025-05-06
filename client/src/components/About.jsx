import React from 'react';
import aboutImg from '../assets/about.png'
import { BsCheck2Circle } from 'react-icons/bs';

const About = () => {
  return (
    <section className='max-padd-container py-16 xl:py-28'>
        <div className='flex flex-col xl:flex-row gap-10'>
            {/* left */}
            <div className='flex-1'><img src={aboutImg} alt="" className='h-[511px] rounded-xl' /></div>
            {/* Right */}
            <div className='flex-1 flex flex-col justify-center'>
                {/* title */}
                <div className='pb-2'>
                    <h6 className='capitalize'> Few Steps to your new home </h6>
                    <h2 className='h2 capitalize'>This is how easy it can be </h2>
                </div>
                <ul>
                    <li className='flex items-center gap-x-3 py-2'> <BsCheck2Circle /> Access exclusive property listings </li>
                    <li className='flex items-center gap-x-3 py-2'> <BsCheck2Circle /> Expert advice from local real estate professionals </li>
                    <li className='flex items-center gap-x-3 py-2'> <BsCheck2Circle /> Find your dream home in prime locations </li>
                    <li className='flex items-center gap-x-3 py-2'> <BsCheck2Circle /> Seamless online property search experience </li>
                    <li className='flex items-center gap-x-3 py-2'> <BsCheck2Circle /> Get personalized property recommendations </li>
                    <li className='flex items-center gap-x-3 py-2'> <BsCheck2Circle /> Transparent and hassle-free transactions </li>
                    <li className='flex items-center gap-x-3 py-2'> <BsCheck2Circle /> 24/7 customer support for all your inquiries </li>
                    <li className='flex items-center gap-x-3 py-2'> <BsCheck2Circle /> Comphensive market analysis and reports </li>
                </ul>
            </div>
        </div>
    </section>
  );
};

export default About