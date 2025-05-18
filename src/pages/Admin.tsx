import React from 'react';
import PageTitle from '../components/common/PageTitle';
import { Users, Shield, Settings, UserPlus, Key } from 'lucide-react';

interface AdminCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const AdminPanel: React.FC = () => {
  const adminCards: AdminCard[] = [
    {
      title: 'User Management',
      description: 'Manage user accounts, roles, and permissions',
      icon: <Users className="h-6 w-6 text-[#31A7BC]" />,
      link: '/admin/users'
    },
    {
      title: 'Role Management',
      description: 'Configure roles and associated permissions',
      icon: <Shield className="h-6 w-6 text-[#31A7BC]" />,
      link: '/admin/roles'
    },
    {
      title: 'System Settings',
      description: 'Configure system-wide settings and preferences',
      icon: <Settings className="h-6 w-6 text-[#31A7BC]" />,
      link: '/admin/settings'
    },
    {
      title: 'User Registration',
      description: 'Manage new user registrations and approvals',
      icon: <UserPlus className="h-6 w-6 text-[#31A7BC]" />,
      link: '/admin/registration'
    },
    {
      title: 'Access Control',
      description: 'Configure access policies and restrictions',
      icon: <Key className="h-6 w-6 text-[#31A7BC]" />,
      link: '/admin/access'
    }
  ];

  return (
    <div className="container mx-auto px-4 pb-10">
      <PageTitle title="Admin Control Panel" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminCards.map((card, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              {card.icon}
              <h3 className="text-lg font-semibold ml-2">{card.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{card.description}</p>
            <button className="w-full px-4 py-2 bg-[#31A7BC] text-white rounded hover:bg-[#2590a3] transition-colors">
              Manage
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-green-600 font-semibold">System Health</div>
            <div className="text-2xl font-bold text-green-700">Healthy</div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-blue-600 font-semibold">Active Users</div>
            <div className="text-2xl font-bold text-blue-700">127</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-purple-600 font-semibold">Last Backup</div>
            <div className="text-2xl font-bold text-purple-700">2 hours ago</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;