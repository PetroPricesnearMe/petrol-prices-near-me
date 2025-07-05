import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: 'MapPin',
      title: 'Real-Time Locations',
      description: 'Find fuel stations near you with live location data and accurate directions.'
    },
    {
      icon: 'TrendingDown',
      title: 'Best Prices',
      description: 'Compare fuel prices across Melbourne to save money on every fill-up.'
    },
    {
      icon: 'Clock',
      title: 'Live Updates',
      description: 'Get real-time price updates and station availability information.'
    },
    {
      icon: 'Smartphone',
      title: 'Mobile Optimized',
      description: 'Access fuel data on-the-go with our responsive mobile interface.'
    }
  ];

  const stats = [
    { number: '1,200+', label: 'Fuel Stations' },
    { number: '50,000+', label: 'Monthly Users' },
    { number: '24/7', label: 'Live Updates' },
    { number: '100%', label: 'Free to Use' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50 to-accent-50">
      {/* Enhanced Header */}
      <header className="relative bg-white/90 backdrop-blur-md shadow-elevation-2 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary to-accent rounded-xl shadow-elevation-2">
                <Icon name="Fuel" size={24} color="white" className="lg:w-7 lg:h-7" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg lg:text-xl font-heading font-bold text-text-primary">
                  Melbourne Fuel Finder
                </h1>
                <p className="text-xs text-text-secondary hidden sm:block">
                  Smart fuel price comparison
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/map-dashboard" 
                className="text-text-secondary hover:text-primary transition-colors duration-200 font-medium"
              >
                Map View
              </Link>
              <Link 
                to="/search-and-filter-interface" 
                className="text-text-secondary hover:text-primary transition-colors duration-200 font-medium"
              >
                Search
              </Link>
              <Link 
                to="/csv-data-upload" 
                className="text-text-secondary hover:text-primary transition-colors duration-200 font-medium"
              >
                Upload Data
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              iconName="Menu"
              className="md:hidden"
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className={`space-y-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  <Icon name="Zap" size={16} className="mr-2" />
                  Live fuel price tracking
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text-primary leading-tight">
                  Find the{' '}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    cheapest fuel
                  </span>{' '}
                  in Melbourne
                </h1>
                
                <p className="text-lg lg:text-xl text-text-secondary leading-relaxed max-w-2xl">
                  Compare real-time fuel prices across 1,200+ stations in Melbourne. 
                  Save money on every fill-up with our smart price comparison tool.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/map-dashboard">
                  <Button
                    variant="primary"
                    size="lg"
                    iconName="Navigation"
                    iconPosition="left"
                    className="w-full sm:w-auto px-8 py-4 text-lg font-semibold shadow-elevation-3 hover:shadow-elevation-4 transform hover:scale-105 transition-all duration-200"
                  >
                    Explore Fuel Map
                  </Button>
                </Link>
                
                <Link to="/search-and-filter-interface">
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="Search"
                    iconPosition="left"
                    className="w-full sm:w-auto px-8 py-4 text-lg font-semibold border-2 hover:bg-primary hover:text-white transition-all duration-200"
                  >
                    Advanced Search
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={20} className="text-success" />
                  <span className="text-sm text-text-secondary">100% Free</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={20} className="text-success" />
                  <span className="text-sm text-text-secondary">Real-time Data</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={20} className="text-success" />
                  <span className="text-sm text-text-secondary">50k+ Users</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className={`relative ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
              <div className="relative">
                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-elevation-4 p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-text-primary">Nearby Stations</h3>
                    <Icon name="MapPin" size={20} className="text-primary" />
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { name: 'Shell Collins St', price: '161.9', distance: '0.8km', trend: 'down' },
                      { name: 'BP Bourke St', price: '164.5', distance: '1.2km', trend: 'up' },
                      { name: '7-Eleven Swanston', price: '159.9', distance: '1.5km', trend: 'down' }
                    ].map((station, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg">
                        <div>
                          <p className="font-medium text-text-primary text-sm">{station.name}</p>
                          <p className="text-xs text-text-muted">{station.distance} away</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            <span className="font-bold text-primary">${station.price}</span>
                            <Icon 
                              name={station.trend === 'down' ? 'TrendingDown' : 'TrendingUp'} 
                              size={14} 
                              className={station.trend === 'down' ? 'text-success' : 'text-error'} 
                            />
                          </div>
                          <p className="text-xs text-text-muted">per litre</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-success text-white px-3 py-2 rounded-full text-sm font-semibold shadow-elevation-3 animate-pulse">
                  Save $0.15/L
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-elevation-3 p-4 transform -rotate-6">
                  <div className="flex items-center space-x-2">
                    <Icon name="TrendingDown" size={16} className="text-success" />
                    <span className="text-sm font-semibold text-text-primary">Prices dropping</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-text-secondary font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-surface to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-text-primary mb-4">
              Why Choose Melbourne Fuel Finder?
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Our platform provides comprehensive fuel price comparison with real-time data 
              to help you make informed decisions and save money.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 shadow-elevation-2 hover:shadow-elevation-4 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                  <Icon name={feature.icon} size={24} color="white" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-6">
            Ready to Start Saving on Fuel?
          </h2>
          <p className="text-lg lg:text-xl mb-8 opacity-90">
            Join thousands of Melbourne drivers who save money every day with our fuel price comparison tool.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/map-dashboard">
              <Button
                variant="secondary"
                size="lg"
                iconName="Map"
                iconPosition="left"
                className="w-full sm:w-auto px-8 py-4 text-lg font-semibold bg-white text-primary hover:bg-primary-50 shadow-elevation-3"
              >
                Start Exploring Now
              </Button>
            </Link>
            
            <Link to="/csv-data-upload">
              <Button
                variant="outline"
                size="lg"
                iconName="Upload"
                iconPosition="left"
                className="w-full sm:w-auto px-8 py-4 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-200"
              >
                Contribute Data
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-text-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg">
                  <Icon name="Fuel" size={20} color="white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Melbourne Fuel Finder</h3>
                  <p className="text-sm text-gray-400">Smart fuel price comparison</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                Helping Melbourne drivers find the best fuel prices since 2024. 
                Compare prices, save money, and contribute to our community-driven platform.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/map-dashboard" className="block text-gray-400 hover:text-white transition-colors duration-200">
                  Map View
                </Link>
                <Link to="/search-and-filter-interface" className="block text-gray-400 hover:text-white transition-colors duration-200">
                  Search Stations
                </Link>
                <Link to="/csv-data-upload" className="block text-gray-400 hover:text-white transition-colors duration-200">
                  Upload Data
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <a href="mailto:help@melbournefuelfinder.com.au" className="block text-gray-400 hover:text-white transition-colors duration-200">
                  Contact Us
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Melbourne Fuel Finder. All rights reserved. 
              Built with ❤️ for Melbourne drivers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}