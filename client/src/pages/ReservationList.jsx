import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setReservationList } from '../redux/state';
import Loader from '../components/Loader';
import Header from '../components/Header';
import ListingCard from '../components/ListingCard';

 const ReservationList = () => {
    const [loading, setLoading] = useState(true);
    const userId = useSelector((state) => state.user._id);
    const reservationList = useSelector((state) => state.user.reservationList);
    const dispatch = useDispatch();

    const getReservationList = async () => {
        try {
            const response = await fetch(`http://localhost:4000/users/${userId}/reservations`, {
                method: "GET",
            });
            const data = await response.json();
            dispatch(setReservationList(data));
            setLoading(false);
        } catch (err) {
            console.log("Fetch Reservation List Failed!", err.message);
        }
    };
    useEffect(() => {
      getReservationList();  
    }, [])

    console.log(reservationList);
  return loading ? ( <Loader /> ) : (
    <>
       <Header />
       <section className='max-padd-container pt-10'>
        <h3 className='h3'>Your Reservation List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{reservationList.map(({
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
export default ReservationList;