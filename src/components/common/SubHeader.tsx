import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SubHeaderProps {
  title: string;
}

const SubHeader: React.FC<SubHeaderProps> = ({ title }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-[#002d3d] text-white py-4">
      <div className="container mx-auto px-4">
        <nav className="flex items-center space-x-6 overflow-x-auto">
          <SubNavLink to="/" active={isActive('/')}>Office of Compliance</SubNavLink>
          <SubNavLink to="/tasks" active={isActive('/tasks')}>Compliance Tasks</SubNavLink>
          <SubNavLink to="/sponsored" active={isActive('/sponsored')}>Sponsored Projects</SubNavLink>
          <SubNavLink to="/committees" active={isActive('/committees')}>Committees</SubNavLink>
          <SubNavLink to="/regulations" active={isActive('/regulations')}>Regulations</SubNavLink>
          <SubNavLink to="/downloads" active={isActive('/downloads')}>Downloads</SubNavLink>
          <SubNavLink to="/rms" active={isActive('/rms')}>RMS</SubNavLink>
          <SubNavLink to="/publications" active={isActive('/publications')}>Publications</SubNavLink>
          <SubNavLink to="/events" active={isActive('/events')}>Events</SubNavLink>
          <SubNavLink to="/notifications" active={isActive('/notifications')}>Notifications</SubNavLink>
        </nav>
      </div>
    </div>
  );
};

interface SubNavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const SubNavLink: React.FC<SubNavLinkProps> = ({ to, active, children }) => {
  return (
    <Link 
      to={to} 
      className={`text-sm whitespace-nowrap hover:text-[#F8B817] transition-colors ${active ? 'text-[#F8B817]' : 'text-white'}`}
    >
      {children}
    </Link>
  );
};

export default SubHeader;