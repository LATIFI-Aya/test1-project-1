import React, { useState } from 'react';
import PropertyRequests from './PropertyRequests';
import Reservations from './Reservations';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('properties');

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard - Real Estate</h1>
        <button onClick={() => {
          localStorage.removeItem('adminToken');
          window.location.reload();
        }}>
          Logout
        </button>
      </header>
      
      <nav className="dashboard-nav">
        <button 
          className={activeTab === 'properties' ? 'active' : ''}
          onClick={() => setActiveTab('properties')}
        >
          Property Requests
        </button>
        <button 
          className={activeTab === 'reservations' ? 'active' : ''}
          onClick={() => setActiveTab('reservations')}
        >
          Reservations
        </button>
      </nav>
      
      <main className="dashboard-content">
        {activeTab === 'properties' ? <PropertyRequests /> : <Reservations />}
      </main>
    </div>
  );
}

export default Dashboard;