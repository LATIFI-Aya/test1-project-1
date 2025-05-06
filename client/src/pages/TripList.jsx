import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setTripList } from '../redux/state';
import Loader from '../components/Loader';
import Header from '../components/Header';
import ListingCard from '../components/ListingCard';

 const TripList = () => {
    const [loading, setLoading] = useState(true);
    const userId = useSelector((state) => state.user._id);
    const tripList = useSelector((state) => state.user.tripList);
    const dispatch = useDispatch();

    const getTripList = async () => {
        try {
            const response = await fetch(`http://localhost:4000/users/${userId}/trips`, {
                method: "GET",
            });
            const data = await response.json();
            dispatch(setTripList(data));
            setLoading(false);
        } catch (err) {
            console.log("Fetch Trip List Failed!", err.message);
        }
    };
    useEffect(() => {
        getTripList();  
    }, [])

    console.log(tripList);
  return loading ? ( <Loader /> ) : (
    <>
       <Header />
       <section className='max-padd-container pt-10'>
        <h3 className='h3'>Your Trip List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{tripList.map(({
            listingId,
            hostId,
            startDate,
            endDate,
            totalPrice,
            title,
            description,
            booking= true
        })=> (
            <ListingCard 
                key={listingId}
                listingId={listingId._id}
                creator={hostId._id}
                listingPhotoPaths={listingId.listingPhotoPaths}
                city={listingId.city}
                province={listingId.province}
                country={listingId.country}
                category={listingId.category}
                startDate={startDate}
                endDate={endDate}
                totalPrice={totalPrice}
                title={title}
                description={description}
                booking={booking}
            />
        ))} </div>
       </section>
    </>
  )
}

export default TripList;