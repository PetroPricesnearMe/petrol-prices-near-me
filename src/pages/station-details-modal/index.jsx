import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import StationHeader from './components/StationHeader';
import FuelPricesGrid from './components/FuelPricesGrid';
import StationInfo from './components/StationInfo';
import PriceHistoryChart from './components/PriceHistoryChart';
import ActionButtons from './components/ActionButtons';
import LoadingSkeleton from './components/LoadingSkeleton';
import ErrorState from './components/ErrorState';

const StationDetailsModal = () => {
  const { stationId } = useParams();
  const navigate = useNavigate();
  const [station, setStation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFuelType, setSelectedFuelType] = useState('Unleaded 91');

  // Mock station data
  const mockStationData = {
    id: stationId || '1',
    name: 'Shell Coles Express Melbourne Central',
    brand: 'Shell',
    address: '211 La Trobe Street',
    suburb: 'Melbourne',
    postcode: '3000',
    distance: '2.3',
    latitude: -37.8136,
    longitude: 144.9631,
    phone: '(03) 9663 2847',
    website: 'shell.com.au',
    email: 'melbourne.central@shell.com.au',
    fuelPrices: [
      {
        type: 'Unleaded 91',
        price: 1.61,
        lastUpdated: '2 hours ago',
        trend: 'down'
      },
      {
        type: 'Premium 95',
        price: 1.75,
        lastUpdated: '2 hours ago',
        trend: 'up'
      },
      {
        type: 'Premium 98',
        price: 1.89,
        lastUpdated: '3 hours ago',
        trend: 'down'
      },
      {
        type: 'Diesel',
        price: 1.58,
        lastUpdated: '1 hour ago',
        trend: 'down'
      },
      {
        type: 'E10',
        price: 1.59,
        lastUpdated: '2 hours ago',
        trend: 'up'
      },
      {
        type: 'LPG',
        price: 0.89,
        lastUpdated: '4 hours ago',
        trend: 'down'
      }
    ],
    amenities: [
      '24/7 Open',
      'Car Wash',
      'Convenience Store',
      'ATM',
      'Restrooms',
      'Air & Water',
      'Loyalty Program',
      'Pay at Pump'
    ],
    operatingHours: {
      'Monday': '24 Hours',
      'Tuesday': '24 Hours',
      'Wednesday': '24 Hours',
      'Thursday': '24 Hours',
      'Friday': '24 Hours',
      'Saturday': '24 Hours',
      'Sunday': '24 Hours'
    }
  };

  // Simulate data loading
  useEffect(() => {
    const loadStationData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulate random error for demonstration
        if (Math.random() < 0.1) {
          throw new Error('Network error');
        }
        
        setStation(mockStationData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStationData();
  }, [stationId]);

  const handleClose = () => {
    navigate('/map-dashboard');
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // Trigger reload
    window.location.reload();
  };

  // Handle swipe to dismiss on mobile
  useEffect(() => {
    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
      isDragging = true;
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;
      
      if (deltaY > 0) {
        const modal = document.getElementById('station-modal');
        if (modal) {
          modal.style.transform = `translateY(${Math.min(deltaY, 100)}px)`;
          modal.style.opacity = Math.max(1 - deltaY / 200, 0.5);
        }
      }
    };

    const handleTouchEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      
      const deltaY = currentY - startY;
      const modal = document.getElementById('station-modal');
      
      if (modal) {
        if (deltaY > 100) {
          handleClose();
        } else {
          modal.style.transform = 'translateY(0)';
          modal.style.opacity = '1';
        }
      }
    };

    const modalElement = document.getElementById('station-modal');
    if (modalElement) {
      modalElement.addEventListener('touchstart', handleTouchStart);
      modalElement.addEventListener('touchmove', handleTouchMove);
      modalElement.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (modalElement) {
        modalElement.removeEventListener('touchstart', handleTouchStart);
        modalElement.removeEventListener('touchmove', handleTouchMove);
        modalElement.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Mobile Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-modal-backdrop lg:hidden"
        onClick={handleClose}
      />
      
      {/* Modal Container */}
      <div className="fixed inset-0 z-modal pt-16 lg:pt-20">
        <div className="flex items-end lg:items-center justify-center min-h-full p-0 lg:p-4">
          <div 
            id="station-modal"
            className={`
              relative w-full lg:w-full lg:max-w-4xl xl:max-w-5xl
              bg-surface lg:rounded-xl shadow-elevation-4 
              transform transition-all duration-300 ease-out
              animate-slide-up lg:animate-fade-in
              max-h-full lg:max-h-[90vh] overflow-hidden
              flex flex-col
            `}
          >
            {loading ? (
              <LoadingSkeleton />
            ) : error ? (
              <ErrorState 
                onRetry={handleRetry} 
                onClose={handleClose}
                errorType={error.includes('Network') ? 'network' : 'general'}
              />
            ) : station ? (
              <>
                {/* Header */}
                <StationHeader station={station} onClose={handleClose} />
                
                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4 lg:p-6">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                      {/* Left Column - Main Info */}
                      <div className="xl:col-span-2 space-y-6">
                        {/* Fuel Prices */}
                        <FuelPricesGrid fuelPrices={station.fuelPrices} />
                        
                        {/* Price History Chart */}
                        <PriceHistoryChart fuelType={selectedFuelType} />
                        
                        {/* Fuel Type Selector for Chart */}
                        <div className="flex flex-wrap gap-2">
                          {station.fuelPrices.map((fuel) => (
                            <button
                              key={fuel.type}
                              onClick={() => setSelectedFuelType(fuel.type)}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                                selectedFuelType === fuel.type
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-surface-secondary text-text-secondary hover:bg-secondary-200'
                              }`}
                            >
                              {fuel.type}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Right Column - Station Info & Actions */}
                      <div className="space-y-6">
                        <StationInfo station={station} />
                        <ActionButtons station={station} onClose={handleClose} />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Mobile Swipe Indicator */}
                <div className="lg:hidden flex justify-center py-2 bg-surface-secondary">
                  <div className="w-12 h-1 bg-secondary-300 rounded-full"></div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationDetailsModal;