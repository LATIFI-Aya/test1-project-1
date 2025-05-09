import  { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import CreateListing from './pages/CreateListing';
import ListingDetails from './pages/ListingDetails';
import TripList from './pages/TripList';
import PropertyList from './pages/PropertyList';
import ReservationList from './pages/ReservationList';
import WishList from './pages/WishList';
import Search from './pages/Search';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <div className="text-[#404040] bg-primary">
        <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/listing/:listingId" element={<ListingDetails />} />
          <Route path="/listing/search/:search" element={<Search />} />
          <Route path="/:userId/trips" element={<TripList />} />
          <Route path="/:userId/wishlist" element={<WishList />} />
          <Route path="/:userId/listing" element={<PropertyList />} />
          <Route path="/:userId/reservations" element={<ReservationList />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Add this 404 route at the end */}
          <Route path="*" element={<div className="flex justify-center items-center h-screen">
            <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
          </div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}