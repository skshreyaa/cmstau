import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';

const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-[#015871] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm">© 2025 Apollo University. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;