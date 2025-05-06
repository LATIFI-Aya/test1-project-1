import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
    const [pendingProperties, setPendingProperties] = useState([]);
    const [bookings, setBookings] = useState([]);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch pending properties
                const propertiesRes = await fetch('http://localhost:4000/admin/properties/pending', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const propertiesData = await propertiesRes.json();
                setPendingProperties(propertiesData);

                // Fetch all bookings
                const bookingsRes = await fetch('http://localhost:4000/admin/bookings', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const bookingsData = await bookingsRes.json();
                setBookings(bookingsData);
            } catch(err) {
                console.log("Error fetching admin data:", err);
            }
        };

        if(user) {
            fetchData();
        }
    }, [user]);

    const handlePropertyStatus = async (id, status) => {
        try {
            const response = await fetch(`http://localhost:4000/admin/properties/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ status })
            });
            const updatedProperty = await response.json();
            setPendingProperties(pendingProperties.filter(property => property._id !== id));
        } catch(err) {
            console.log("Error updating property status:", err);
        }
    };

    return (
        <>
            <Header />
            <div className="max-padd-container py-10">
                <h2 className="h2">Admin Dashboard</h2>
                
                {/* Pending Properties Section */}
                <section className="my-8">
                    <h3 className="h3">Pending Properties ({pendingProperties.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                        {pendingProperties.map(property => (
                            <div key={property._id} className="bg-white p-4 rounded-lg shadow">
                                <img src={`http://localhost:4000/${property.listingPhotoPaths[0].replace("public", "")}`} 
                                     alt={property.title} 
                                     className="w-full h-48 object-cover rounded"/>
                                <h4 className="text-xl font-semibold mt-2">{property.title}</h4>
                                <p className="text-gray-600">{property.city}, {property.country}</p>
                                <div className="flex gap-2 mt-4">
                                    <button onClick={() => handlePropertyStatus(property._id, 'approved')} 
                                            className="btn-secondary flex-1">
                                        Approve
                                    </button>
                                    <button onClick={() => handlePropertyStatus(property._id, 'rejected')} 
                                            className="btn-secondary bg-red-500 flex-1">
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Bookings Section */}
                <section className="my-8">
                    <h3 className="h3">Recent Bookings ({bookings.length})</h3>
                    <div className="overflow-x-auto mt-4">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border">Property</th>
                                    <th className="py-2 px-4 border">Customer</th>
                                    <th className="py-2 px-4 border">Dates</th>
                                    <th className="py-2 px-4 border">Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map(booking => (
                                    <tr key={booking._id}>
                                        <td className="py-2 px-4 border">{booking.listingId?.title}</td>
                                        <td className="py-2 px-4 border">{booking.customerId?.firstName} {booking.customerId?.lastName}</td>
                                        <td className="py-2 px-4 border">{booking.startDate} to {booking.endDate}</td>
                                        <td className="py-2 px-4 border">MAD {booking.totalPrice}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </>
    );
};

export default AdminDashboard;