import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { fetchFuelStations } from '../../utils/airtable';

const StationListing = () => {
  const navigate = useNavigate();
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('price');
  const [filterBy, setFilterBy] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const stationsPerPage = 12;

  // Enhanced mock data with more realistic information
  const mockStations = [
    {
      id: '1',
      'Station Name': 'Shell Coles Express Melbourne Central',
      'Address': '211 La Trobe Street',
      'City': 'Melbourne',
      'Latitude': -37.8136,
      'Longitude': 144.9631,
      'Price Per Liter (from Fuel Prices)': '$1.61',
      brand: 'Shell',
      distance: '0.8',
      lastUpdated: '2 hours ago',
      amenities: ['24/7', 'Car Wash', 'ATM', 'Convenience Store'],
      fuelTypes: ['Unleaded 91', 'Premium 95', 'Diesel']
    },
    {
      id: '2',
      'Station Name': 'BP Connect Collins Street',
      'Address': '456 Collins Street',
      'City': 'Melbourne',
      'Latitude': -37.8142,
      'Longitude': 144.9632,
      'Price Per Liter (from Fuel Prices)': '$1.67',
      brand: 'BP',
      distance: '1.2',
      lastUpdated: '1 hour ago',
      amenities: ['24/7', 'Restrooms', 'Air Pump'],
      fuelTypes: ['Unleaded 91', 'Premium 95', 'Premium 98', 'Diesel']
    },
    {
      id: '3',
      'Station Name': '7-Eleven Swanston Street',
      'Address': '789 Swanston Street',
      'City': 'Carlton',
      'Latitude': -37.8014,
      'Longitude': 144.9658,
      'Price Per Liter (from Fuel Prices)': '$1.63',
      brand: '7-Eleven',
      distance: '1.5',
      lastUpdated: '3 hours ago',
      amenities: ['24/7', 'Convenience Store', 'Coffee'],
      fuelTypes: ['Unleaded 91', 'E10', 'Diesel']
    },
    {
      id: '4',
      'Station Name': 'Caltex Woolworths South Yarra',
      'Address': '123 Toorak Road',
      'City': 'South Yarra',
      'Latitude': -37.8400,
      'Longitude': 144.9900,
      'Price Per Liter (from Fuel Prices)': '$1.59',
      brand: 'Caltex',
      distance: '2.1',
      lastUpdated: '1 hour ago',
      amenities: ['Car Wash', 'ATM', 'Loyalty Program'],
      fuelTypes: ['Unleaded 91', 'Premium 95', 'Diesel', 'LPG']
    },
    {
      id: '5',
      'Station Name': 'Mobil Richmond',
      'Address': '567 Swan Street',
      'City': 'Richmond',
      'Latitude': -37.8200,
      'Longitude': 144.9950,
      'Price Per Liter (from Fuel Prices)': '$1.65',
      brand: 'Mobil',
      distance: '1.8',
      lastUpdated: '4 hours ago',
      amenities: ['Restrooms', 'Air Pump', 'Vacuum'],
      fuelTypes: ['Unleaded 91', 'Premium 95', 'Premium 98']
    },
    {
      id: '6',
      'Station Name': 'United Petroleum Fitzroy',
      'Address': '234 Brunswick Street',
      'City': 'Fitzroy',
      'Latitude': -37.7950,
      'Longitude': 144.9780,
      'Price Per Liter (from Fuel Prices)': '$1.58',
      brand: 'United',
      distance: '2.3',
      lastUpdated: '2 hours ago',
      amenities: ['24/7', 'Car Wash', 'Convenience Store'],
      fuelTypes: ['Unleaded 91', 'E10', 'Diesel']
    },
    {
      id: '7',
      'Station Name': 'Shell V-Power Prahran',
      'Address': '890 Chapel Street',
      'City': 'Prahran',
      'Latitude': -37.8500,
      'Longitude': 144.9900,
      'Price Per Liter (from Fuel Prices)': '$1.72',
      brand: 'Shell',
      distance: '2.8',
      lastUpdated: '1 hour ago',
      amenities: ['Premium Service', 'Car Wash', 'ATM'],
      fuelTypes: ['Premium 95', 'Premium 98', 'V-Power']
    },
    {
      id: '8',
      'Station Name': 'BP Ultimate St Kilda',
      'Address': '345 Acland Street',
      'City': 'St Kilda',
      'Latitude': -37.8680,
      'Longitude': 144.9780,
      'Price Per Liter (from Fuel Prices)': '$1.69',
      brand: 'BP',
      distance: '3.2',
      lastUpdated: '2 hours ago',
      amenities: ['Beach Location', 'Restrooms', 'Coffee'],
      fuelTypes: ['Unleaded 91', 'Premium 95', 'Ultimate 98']
    },
    {
      id: '9',
      'Station Name': 'Coles Express Docklands',
      'Address': '678 Collins Street',
      'City': 'Docklands',
      'Latitude': -37.8200,
      'Longitude': 144.9400,
      'Price Per Liter (from Fuel Prices)': '$1.64',
      brand: 'Shell',
      distance: '1.9',
      lastUpdated: '3 hours ago',
      amenities: ['Waterfront', 'Convenience Store', 'ATM'],
      fuelTypes: ['Unleaded 91', 'Premium 95', 'Diesel']
    },
    {
      id: '10',
      'Station Name': '7-Eleven Southbank',
      'Address': '123 Southbank Boulevard',
      'City': 'Southbank',
      'Latitude': -37.8250,
      'Longitude': 144.9600,
      'Price Per Liter (from Fuel Prices)': '$1.66',
      brand: '7-Eleven',
      distance: '1.4',
      lastUpdated: '1 hour ago',
      amenities: ['24/7', 'River Views', 'Coffee'],
      fuelTypes: ['Unleaded 91', 'E10', 'Diesel']
    },
    {
      id: '11',
      'Station Name': 'Metro Petroleum Carlton',
      'Address': '456 Lygon Street',
      'City': 'Carlton',
      'Latitude': -37.8000,
      'Longitude': 144.9700,
      'Price Per Liter (from Fuel Prices)': '$1.57',
      brand: 'Metro',
      distance: '2.0',
      lastUpdated: '5 hours ago',
      amenities: ['Budget Friendly', 'Basic Service'],
      fuelTypes: ['Unleaded 91', 'Diesel']
    },
    {
      id: '12',
      'Station Name': 'Liberty Oil Collingwood',
      'Address': '789 Smith Street',
      'City': 'Collingwood',
      'Latitude': -37.8050,
      'Longitude': 144.9850,
      'Price Per Liter (from Fuel Prices)': '$1.62',
      brand: 'Liberty',
      distance: '2.5',
      lastUpdated: '2 hours ago',
      amenities: ['Local Favorite', 'Air Pump', 'Vacuum'],
      fuelTypes: ['Unleaded 91', 'Premium 95', 'Diesel']
    }
  ];

  useEffect(() => {
    const loadStations = async () => {
      try {
        setLoading(true);
        // Try to fetch from Airtable first, fallback to mock data
        const data = await fetchFuelStations();
        if (data && data.length > 0) {
          setStations(data);
        } else {
          setStations(mockStations);
        }
      } catch (err) {
        console.error("Error fetching stations:", err);
        setStations(mockStations);
      } finally {
        setLoading(false);
      }
    };

    loadStations();
  }, []);

  // Filter and sort stations
  const filteredStations = stations.filter(station => {
    const matchesSearch = station['Station Name']?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         station['Address']?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         station['City']?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         station.brand?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterBy === 'all' || station.brand?.toLowerCase() === filterBy.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const sortedStations = [...filteredStations].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        const priceA = parseFloat(a['Price Per Liter (from Fuel Prices)']?.replace('$', '') || '0');
        const priceB = parseFloat(b['Price Per Liter (from Fuel Prices)']?.replace('$', '') || '0');
        return priceA - priceB;
      case 'distance':
        return parseFloat(a.distance || '0') - parseFloat(b.distance || '0');
      case 'name':
        return (a['Station Name'] || '').localeCompare(b['Station Name'] || '');
      case 'brand':
        return (a.brand || '').localeCompare(b.brand || '');
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedStations.length / stationsPerPage);
  const startIndex = (currentPage - 1) * stationsPerPage;
  const currentStations = sortedStations.slice(startIndex, startIndex + stationsPerPage);

  const getBrandColor = (brand) => {
    const colors = {
      'Shell': 'bg-red-100 text-red-700',
      'BP': 'bg-green-100 text-green-700',
      '7-Eleven': 'bg-orange-100 text-orange-700',
      'Caltex': 'bg-blue-100 text-blue-700',
      'Mobil': 'bg-purple-100 text-purple-700',
      'United': 'bg-teal-100 text-teal-700',
      'Metro': 'bg-gray-100 text-gray-700',
      'Liberty': 'bg-indigo-100 text-indigo-700'
    };
    return colors[brand] || 'bg-gray-100 text-gray-700';
  };

  const handleStationClick = (station) => {
    navigate(`/station/${station.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 lg:pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-text-secondary">Loading stations...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-text-secondary mb-2">
              <Link to="/" className="hover:text-primary transition-colors duration-200">
                Home
              </Link>
              <Icon name="ChevronRight" size={16} />
              <span>Station Listing</span>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-2">
                  Fuel Stations Near You
                </h1>
                <p className="text-text-secondary">
                  Browse {filteredStations.length} fuel stations in Melbourne with real-time pricing
                </p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Map"
                  iconPosition="left"
                  onClick={() => navigate('/map-dashboard')}
                >
                  Map View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Filter"
                  iconPosition="left"
                  onClick={() => navigate('/search-and-filter-interface')}
                >
                  Advanced Search
                </Button>
              </div>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="bg-surface rounded-lg border border-border p-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Search stations, addresses, or brands..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                >
                  <option value="all">All Brands</option>
                  <option value="shell">Shell</option>
                  <option value="bp">BP</option>
                  <option value="7-eleven">7-Eleven</option>
                  <option value="caltex">Caltex</option>
                  <option value="mobil">Mobil</option>
                  <option value="united">United</option>
                  <option value="metro">Metro</option>
                  <option value="liberty">Liberty</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                >
                  <option value="price">Lowest Price</option>
                  <option value="distance">Nearest First</option>
                  <option value="name">Station Name</option>
                  <option value="brand">Brand</option>
                </select>
              </div>
            </div>
          </div>

          {/* Station Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {currentStations.map((station) => (
              <div
                key={station.id}
                onClick={() => handleStationClick(station)}
                className="bg-surface rounded-lg border border-border hover:border-primary hover:shadow-elevation-3 transition-all duration-200 cursor-pointer group"
              >
                {/* Station Header */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors duration-200 truncate">
                        {station['Station Name']}
                      </h3>
                      <p className="text-sm text-text-secondary truncate">
                        {station['Address']}, {station['City']}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getBrandColor(station.brand)}`}>
                      {station.brand}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-text-muted">
                    <div className="flex items-center space-x-1">
                      <Icon name="Navigation" size={14} />
                      <span>{station.distance} km</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>{station.lastUpdated}</span>
                    </div>
                  </div>
                </div>

                {/* Price Display */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-secondary">Unleaded 91</p>
                      <p className="text-2xl font-data font-bold text-primary">
                        {station['Price Per Liter (from Fuel Prices)']}
                      </p>
                      <p className="text-xs text-text-muted">per litre</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-success">
                        <Icon name="TrendingDown" size={16} />
                        <span className="text-sm font-medium">Best Price</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="p-4">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {station.amenities?.slice(0, 3).map((amenity, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-md bg-secondary-100 text-xs text-text-secondary"
                      >
                        {amenity}
                      </span>
                    ))}
                    {station.amenities?.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-secondary-100 text-xs text-text-secondary">
                        +{station.amenities.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Navigation"
                      iconPosition="left"
                      onClick={(e) => {
                        e.stopPropagation();
                        const url = `https://www.google.com/maps/dir/?api=1&destination=${station.Latitude},${station.Longitude}`;
                        window.open(url, '_blank');
                      }}
                      className="text-xs"
                    >
                      Directions
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      iconName="Eye"
                      iconPosition="left"
                      className="text-xs"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-text-secondary">
                Showing {startIndex + 1}-{Math.min(startIndex + stationsPerPage, sortedStations.length)} of {sortedStations.length} stations
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ChevronLeft"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                          currentPage === pageNum
                            ? 'bg-primary text-primary-foreground'
                            : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  {totalPages > 5 && (
                    <>
                      <span className="text-text-muted">...</span>
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                          currentPage === totalPages
                            ? 'bg-primary text-primary-foreground'
                            : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                        }`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ChevronRight"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* No Results */}
          {filteredStations.length === 0 && !loading && (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="text-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                No stations found
              </h3>
              <p className="text-text-secondary mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setFilterBy('all');
                  setCurrentPage(1);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StationListing;