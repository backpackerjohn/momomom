
import React from 'react';

const navLinks = [
  { id: 'maps', label: 'Maps' },
  { id: 'progress', label: 'Progress' },
  { id: 'brain-dump', label: 'Brain Dump' },
  { id: 'scheduler', label: 'Scheduler' },
];

const NavLink = ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => (
  <button 
    onClick={onClick} 
    className="cursor-pointer text-text-on-light hover:text-text-on-light-strong transition-colors duration-300"
  >
    {children}
  </button>
);

interface HeaderProps {
  navigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ navigate }) => {
  const handleNavigation = (page: string) => {
    if (page === 'maps') {
      navigate('maps');
    } else {
      // For now, other links can be considered "coming soon"
      console.log(`${page} page is not yet implemented.`);
      // Or show an alert: alert(`${label} page is coming soon!`);
    }
  };

  return (
    <header className="bg-brand-header/80 backdrop-blur-sm sticky top-0 z-50 w-full py-4 px-4 sm:px-8 lg:px-16 border-b border-black/5">
      <div className="max-w-[95rem] mx-auto flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => navigate('home')} 
          className="text-2xl font-bold tracking-wide text-text-on-light-primary"
          aria-label="Go to homepage"
        >
          MOMENTUM
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(({ id, label }) => (
            <NavLink key={label} onClick={() => handleNavigation(id)}>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('newTask')}
            className="bg-dark-primary text-text-on-dark font-semibold px-6 py-2 rounded-full hover:bg-dark-secondary transition-colors duration-300 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-100"
            aria-label="Create a new task"
          >
            New Task +
          </button>
          <button 
            className="bg-accent-primary text-white font-semibold px-6 py-2 rounded-full hover:bg-accent-secondary transition-colors duration-300 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-100"
            aria-label="Add to Brain Dump"
          >
            Brain Dump +
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;