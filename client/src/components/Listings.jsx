import React, { useEffect, useState } from 'react'
import { categories } from '../assets/data';
import { useDispatch, useSelector } from 'react-redux';
import { setListings } from '../redux/state';
import  Loader  from '../components/Loader';
import ListingCard from '../components/ListingCard';

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading]  = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const listings = useSelector((state) => state.listings);

  const getQueryListings = async () => {
    try {
      const response = await fetch( 
      selectedCategory !== "All" ?
      `http://localhost:4000/listing?category=${selectedCategory}` : 
       "http://localhost:4000/listing",{ 
        method: "GET",
      }
    )
    const data = await response.json()
    dispatch(setListings({listings:data}))
    setLoading(false);
    } catch (err) {
      console.log("Fetch Listings failed", err.message);
    }
  }
  useEffect(() => {
    getQueryListings();
  }, [selectedCategory]);
  
  return (
    <section id='listing' className='max-padd-container py-12 '>
      {/* Title */}
      <div className='text-center pb-16'>
        <h6 className='capitalize'> From concept to reality </h6>
        <h2 className='h2 capitalize'>Discover our newest listings </h2>
      </div>
      {/*  Categories container */}
      <div className='hide-scrollbar flex gap-x-1 bg-white ring-1 ring-slate-400/5 shadow-sm rounded-full px-2 py-3 overflow-x-auto mb-16' >
        {categories.map((category) => (
          <div key={category.label} onClick={() => setSelectedCategory(category.label)} className='flexCenter flex-col gap-2 p-2 rounded-xl cursor-pointer min-w-24 xl:min-w-32' style={{flexShrink:0}}>
            <div className='text-secondary rounded-full h-10 w-10 p-2 flexCenter text-lg' style={{backgroundColor: `${category.color}`}}>{category.icon}</div>
            <p className={`${category.label === selectedCategory?
              "text-secondary" : ""} medium-14`}>{category.label}</p>
          </div>
          
        ))}
      </div>

     { /*Properties / Listings */}
     {loading ? (<Loader />) : (
      <div className='grid grid-cols-cols-1 md:grid-cols-2 gap-6'>
        {listings.map(({_id, creator, listingPhotoPaths, city, province, country, category, type, price, title, description, booking=false }) => (
          <ListingCard
            key={_id}
            listingId={_id}
            creator={creator}
            listingPhotoPaths={listingPhotoPaths}
            city={city}
            province={province}
            country={country}
            category={category}
            type={type}
            price={price}
            title={title}
            description={description}
            booking={booking}
          /> ) 
        )}
      </div>
     )}
    </section>
  );
};

export default Listings;