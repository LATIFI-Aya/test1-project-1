import React from 'react';
import { BsEnvelopeFill, BsFacebook, BsGeoAltFill, BsInstagram, BsLinkedin, BsTelephoneFill, BsTwitterX } from 'react-icons/bs';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <div className='max-padd-container '>
        <div className='max-padd-container bg-black text-white py-10 rounded-3xl'>
            <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8'>
               {/* logo */}
               <Link to={'/'}  >
                   <div className="bold-24 mb-4"> Doorway <span className='text-secondary'>Dreams</span></div>
                   <p className='text_white/70'> Find your home or investment property with us. We offer seamless, trusted real estate experience. </p>
                   <p className='mt-4 text-white/70'> Copyright 2025 DoorwayDreams. All rights reserved.</p>
                </Link>
               {/*Quick Links*/}
               <div className=''>
                  <h4 className='h4 mb-4'>Quick Links</h4>
                  <ul className='space-y-2 regular-15'>
                    <li className='text-gray-10'><a href="/about">About Us</a></li>
                    <li className='text-gray-10'><a href="/properties">Properties</a></li>
                    <li className='text-gray-10'><a href="/services">Services</a></li>
                    <li className='text-gray-10'><a href="/contact">Contact</a></li>
                    <li className='text-gray-10'><a href="/privacy-policy<">Privacy Policy</a></li>
                  </ul>
               </div>
               {/* Contact Info */}
               <div >
                  <h4 className='h4 mb-4'>Contact Us</h4>
                  <p className='text-gray-10 mb-2'>
                    <BsTelephoneFill className='inline-block mr-2'/> +212 6 12 34 56 78
                  </p>
                  <p className='text-gray-10 mb-2'>
                    <BsEnvelopeFill className='inline-block mr-2'/> {""} house@gmail.com
                  </p>
                  <p className='text-gray-10 mb-2'>
                    <BsGeoAltFill className='inline-block mr-2'/> gomycode maarif, casablanca
                  </p>
                </div>

                {/* Social Media Links */}
                <div>
                  <h4 className='h4 mb-4'>Follow Us</h4>
                  <div className='flex space-x-4 text-gray-10'>
                    <a href="#" className='hover:text-blue-500'>
                        <BsFacebook />
                    </a>
                    <a href="#" className='hover:text-blue-400'>
                        <BsTwitterX />
                    </a>
                    <a href="#" className='hover:text-red-500'>
                        <BsInstagram />
                    </a>
                    <a href="#" className='hover:text-red-600'>
                        <BsLinkedin />
                    </a>
                </div>
               </div>
            </div>
    

            <div className='mt-10 text-center text-gray-100'>
                <p> Power by <a href="#"> DoorwayDreams Team </a></p>
            </div>
        </div>
    </div>
  )
}

export default Footer