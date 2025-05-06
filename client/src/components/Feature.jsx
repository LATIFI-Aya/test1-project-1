import React from 'react';
import { MdOutlineQuestionAnswer } from 'react-icons/md';
import { BiSelectMultiple } from 'react-icons/bi';
import { GrCertificate } from 'react-icons/gr';


const Feature = () => {
  return (
    <section className='max-padd-container py-16 xl:py-32'>
        {/* title */}
        <div className='text-center pb-16'>
            <h6 className='capitalize'> Few Steps to your new home </h6>
            <h2 className='h2 capitalize'>This is how easy it can be </h2>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12'>
            <div className='bg-white p-4 rounded-3xl'>
                <MdOutlineQuestionAnswer className='bold-32 mb-3 text-secondary'/>
                <h4 className='h4'>Answer Questions </h4>
                <p>Get started by answering a few simple questions to help us understand your needs. 
                    It's fast and easy, guiding you toward the best options available for your new home.</p>
            </div>
            <div className='bg-white p-4 rounded-3xl'>
                <BiSelectMultiple className='bold-32 mb-3 text-yellow-500'/>
                <h4 className='h4'>Select Property</h4>
                <p>Browse through a wide range of properties, each handpicked to meet your preferences and budget. 
                    Find the perfect space that fits your dream home.</p>
            </div>
            <div className='bg-white p-4 rounded-3xl'>
                <GrCertificate className='bold-32 mb-3 text-red-500'/>
                <h4 className='h4'>Enjoy Living </h4>
                <p>Once you've made your selection, it's time to enjoy your new space. 
                    Your dream home is just a few steps away from becoming a reality, where every detail is taken care of for you.</p>
            </div>
        </div>
    </section>
  )
}

export default Feature