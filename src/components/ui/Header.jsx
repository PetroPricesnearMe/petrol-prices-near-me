import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const navigationItems = [
    { path: '/map-dashboard', label: 'Map', icon: 'Map' },
    { path: '/csv-data-upload', label: 'Upload Data', icon: 'Upload' },
    { path: '/settings-and-data-management', label: 'Settings', icon: 'Settings' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-fixed bg-surface border-b border-border shadow-elevation-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link 
              to="/map-dashboard" 
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
              onClick={closeMobileMenu}
            >
              <div className="flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-lg">
                <Icon name="Fuel" size={20} color="white" className="lg:w-6 lg:h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg lg:text-xl font-heading font-semibold text-text-primary">
                  Melbourne Fuel Finder
                </span>
                <span className="text-xs text-text-secondary hidden sm:block">
                  Find the best fuel prices
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActiveRoute(item.path)
                    ? 'bg-primary text-primary-foreground shadow-elevation-1'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Quick Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              iconName="Upload"
              iconPosition="left"
              onClick={() => window.location.href = '/csv-data-upload'}
            >
              Quick Upload
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Search"
              onClick={() => {
                // Toggle search panel - this would be handled by parent component
                console.log('Toggle search panel');
              }}
            >
              Search
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              onClick={toggleMobileMenu}
              className="p-2"
            />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-surface animate-slide-down">
            <nav className="py-4 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 text-base font-medium transition-all duration-200 ${
                    isActiveRoute(item.path)
                      ? 'bg-primary-50 text-primary border-r-2 border-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {/* Mobile Quick Actions */}
              <div className="pt-4 mt-4 border-t border-border space-y-2">
                <Button
                  variant="primary"
                  size="sm"
                  iconName="Upload"
                  iconPosition="left"
                  fullWidth
                  onClick={() => {
                    closeMobileMenu();
                    window.location.href = '/csv-data-upload';
                  }}
                >
                  Upload Data
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Search"
                  iconPosition="left"
                  fullWidth
                  onClick={() => {
                    closeMobileMenu();
                    console.log('Toggle search panel');
                  }}
                >
                  Search Stations
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;