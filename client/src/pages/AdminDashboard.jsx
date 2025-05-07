import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  setLogout } from "../redux/authSlice";

const AdminDashboard = () => {
    const [pendingProperties, setPendingProperties] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const auth = useSelector((state) => state.auth); // Changed this line
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Destructure after getting auth from Redux
    const { user, token, isAdmin } = auth || {};

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Verify admin status and token
                if (!isAdmin || !token) {
                    dispatch(setLogout());
                    throw new Error('Admin access required. Please log in.');
                }

                // Rest of your existing code...
                const propertiesRes = await fetch('http://localhost:4000/admin/properties/pending', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (propertiesRes.status === 401) {
                    dispatch(setLogout()); 
                    throw new Error('Session expired. Please log in again.');
                }
                

                if (!propertiesRes.ok) {
                    throw new Error(`Failed to fetch properties: ${propertiesRes.statusText}`);
                }

                const propertiesData = await propertiesRes.json();
                setPendingProperties(Array.isArray(propertiesData) ? propertiesData : []);

                // Fetch bookings
                const bookingsRes = await fetch('http://localhost:4000/admin/bookings', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!bookingsRes.ok) {
                    throw new Error(`Failed to fetch bookings: ${bookingsRes.statusText}`);
                }

                const bookingsData = await bookingsRes.json();
                setBookings(Array.isArray(bookingsData) ? bookingsData : []);
                
            } catch (err) {
                console.error("Admin data fetch error:", err);
                setError(err.message);
                setPendingProperties([]);
                setBookings([]);
                
                if (err.message.includes('log in')) {
                    navigate('/admin/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, token, isAdmin, navigate, dispatch]);

    // Rest of your component remains the same...
    const handlePropertyStatus = async (id, status) => {
        try {
            const response = await fetch(`http://localhost:4000/admin/properties/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });
            
            if (!response.ok) {
                throw new Error(`Failed to update property: ${response.status}`);
            }
            
            setPendingProperties(pendingProperties.filter(property => property._id !== id));
        } catch (err) {
            console.error("Property update error:", err);
            setError(err.message);
        }
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="max-padd-container py-10">
                    <h2 className="h2">Admin Dashboard</h2>
                    <p>Loading admin data...</p>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div className="max-padd-container py-10">
                    <h2 className="h2">Admin Dashboard</h2>
                    <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                        <p>{error}</p>
                        {error.includes('expired') && (
                            <button 
                                onClick={() => navigate('/admin/login')}
                                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Log In Again
                            </button>
                        )}
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="max-padd-container py-10">
                <h2 className="h2">Admin Dashboard</h2>
                
                <section className="my-8">
                    <h3 className="h3">Pending Properties ({pendingProperties.length})</h3>
                    {pendingProperties.length === 0 ? (
                        <p className="mt-4">No properties awaiting approval</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                            {pendingProperties.map(property => (
                                <div key={property._id} className="bg-white p-4 rounded-lg shadow">
                                    <img 
                                        src={`http://localhost:4000/${property.listingPhotoPaths[0]?.replace("public", "")}`} 
                                        alt={property.title} 
                                        className="w-full h-48 object-cover rounded"
                                        onError={(e) => e.target.src = '/placeholder-property.jpg'}
                                    />
                                    <h4 className="text-xl font-semibold mt-2">{property.title}</h4>
                                    <p className="text-gray-600">{property.city}, {property.country}</p>
                                    <div className="flex gap-2 mt-4">
                                        <button 
                                            onClick={() => handlePropertyStatus(property._id, 'approved')} 
                                            className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                        >
                                            Approve
                                        </button>
                                        <button 
                                            onClick={() => handlePropertyStatus(property._id, 'rejected')} 
                                            className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section className="my-8">
                    <h3 className="h3">Recent Bookings ({bookings.length})</h3>
                    {bookings.length === 0 ? (
                        <p className="mt-4">No bookings found</p>
                    ) : (
                        <div className="overflow-x-auto mt-4">
                            <table className="min-w-full bg-white border">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-3 px-4 border">Property</th>
                                        <th className="py-3 px-4 border">Customer</th>
                                        <th className="py-3 px-4 border">Dates</th>
                                        <th className="py-3 px-4 border">Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map(booking => (
                                        <tr key={booking._id} className="hover:bg-gray-50">
                                            <td className="py-2 px-4 border">{booking.listingId?.title || 'N/A'}</td>
                                            <td className="py-2 px-4 border">
                                                {booking.customerId?.firstName || 'Unknown'} {booking.customerId?.lastName || ''}
                                            </td>
                                            <td className="py-2 px-4 border">
                                                {new Date(booking.startDate).toLocaleDateString()} to {new Date(booking.endDate).toLocaleDateString()}
                                            </td>
                                            <td className="py-2 px-4 border">MAD {booking.totalPrice?.toFixed(2) || '0.00'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </div>
        </>
    );
};

export default AdminDashboard;