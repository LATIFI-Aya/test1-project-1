import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from "../redux/authSlice";

const AdminLogin = () => {
  const [email, setEmail] = useState('aya@gmail.com'); // Updated to your admin email
  const [password, setPassword] = useState('aya'); // Updated to your admin password
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // First check if it's the hardcoded admin credentials
      if (email === 'aya@gmail.com' && password === 'aya') {
        const adminUser = {
          _id: 'admin-user-id',
          firstName: 'Admin',
          lastName: 'User',
          email: 'aya@gmail.com',
          role: 'admin'
        };

        const mockToken = 'mock-admin-token-123456789';

        dispatch(setLogin({  // Changed to setLogin
            user: adminUser,
            token: mockToken,
            isAdmin: true
          }));
        
        localStorage.setItem('adminToken', mockToken);
        localStorage.setItem('adminUser', JSON.stringify(adminUser));
        navigate('/admin/dashboard');
        return;
      }

      // If not hardcoded credentials, try normal login
      const response = await fetch('http://localhost:4000/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      if (!response) {
        throw new Error('No response from server. Is the backend running?');
      }

      if (response.status >= 500) {
        throw new Error('Server error. Please try again later.');
      }

      const data = await response.json();
      
      if (!response.ok) {
        const errorMsg = data.message || 
                       (response.status === 401 ? 'Invalid credentials' : 
                       (response.status === 403 ? 'Admin access required' : 'Login failed'));
        throw new Error(errorMsg);
      }

      if (!data.token) {
        throw new Error('No authentication token received');
      }

      dispatch(setLogin({  // Changed to setLogin
        user: data.user,
        token: data.token,
        isAdmin: true
      }));
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.user));
      navigate('/admin/dashboard');
      
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'An unexpected error occurred');
      
      if (process.env.NODE_ENV === 'development') {
        setError(`${err.message} (Check console for details)`);
      }
    } finally {
      setLoading(false);
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
            {error.includes('server') && (
              <p className="mt-2 text-sm">
                Make sure your backend server is running at http://localhost:4000
              </p>
            )}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;