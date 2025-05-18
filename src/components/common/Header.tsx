import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import { mockTasks } from '../../data/mockData';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    
    // Search through tasks
    const taskResults = mockTasks
      .filter(task => 
        task.title.toLowerCase().includes(searchTerm) ||
        task.description.toLowerCase().includes(searchTerm) ||
        task.assignedTo.toLowerCase().includes(searchTerm)
      )
      .map(task => ({
        ...task,
        type: 'task',
        url: `/tasks/${task.id}`
      }));

    setSearchResults(taskResults);
  };

  const handleResultClick = (result: any) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    navigate(result.url);
  };

  return (
    <header className="bg-[#015871] text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center py-4">
          <Link to="/" className="mb-4">
            <div className="flex items-center justify-center">
              <span className="text-2xl font-bold">The Apollo University</span>
            </div>
          </Link>
          
          <div className="flex items-center justify-between w-full md:w-auto">
            <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block`}>
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                <NavLink to="/" active={isActive('/')}>Home</NavLink>
                <NavLink to="/tasks" active={isActive('/tasks')}>Compliance Tracker</NavLink>
                <NavLink to="/calendar" active={isActive('/calendar')}>Compliance Calendar</NavLink>
                <NavLink to="/reports" active={isActive('/reports')}>Reports</NavLink>
                <NavLink to="/admin" active={isActive('/admin')}>Admin Panel</NavLink>
              </div>
            </nav>
            
            <div className="flex items-center space-x-4 ml-4">
              <div className="relative">
                <button 
                  className="p-2 rounded-full hover:bg-[#01475a] transition-colors"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
                </button>
                
                {isSearchOpen && (
                  <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                    <div className="p-4">
                      <input
                        type="text"
                        placeholder="Search tasks, reports, etc..."
                        className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#31A7BC]"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        autoFocus
                      />
                    </div>
                    
                    {searchResults.length > 0 ? (
                      <div className="max-h-96 overflow-y-auto border-t border-gray-200">
                        {searchResults.map((result, index) => (
                          <button
                            key={index}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3"
                            onClick={() => handleResultClick(result)}
                          >
                            <div>
                              <p className="text-gray-900 font-medium">{result.title}</p>
                              <p className="text-sm text-gray-500">
                                {result.type === 'task' ? `Due: ${new Date(result.dueDate).toLocaleDateString()}` : ''}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : searchQuery && (
                      <div className="px-4 py-3 text-gray-500 text-center border-t border-gray-200">
                        No results found
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <button 
                className="md:hidden p-2 rounded-full hover:bg-[#01475a] transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, children }) => {
  return (
    <Link 
      to={to} 
      className={`text-sm font-medium hover:text-[#F8B817] transition-colors ${active ? 'text-[#F8B817]' : 'text-white'}`}
    >
      {children}
    </Link>
  );
};

export default Header;