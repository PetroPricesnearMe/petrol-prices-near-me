const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TABLE_NAME = "tblXpiLDcSOKE5o8e";
const VIEW_ID = "viwZbnqGr4ujOyjDd";

export async function fetchFuelStations() {
  // Check if environment variables are available
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.warn("Airtable credentials not found. Using mock data.");
    return getMockData();
  }

  try {
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}?view=${VIEW_ID}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch from Airtable:", response.status, response.statusText);
      throw new Error(`Airtable API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Enhanced data processing to ensure all stations have required fields
    const processedStations = data.records.map(record => ({
      id: record.id,
      ...record.fields,
      // Ensure we have all required fields with fallbacks
      'Station Name': record.fields['Station Name'] || 'Unknown Station',
      'Address': record.fields['Address'] || 'Address not available',
      'City': record.fields['City'] || 'Melbourne',
      'Latitude': record.fields['Latitude'] || -37.8136,
      'Longitude': record.fields['Longitude'] || 144.9631,
      'Price Per Liter (from Fuel Prices)': record.fields['Price Per Liter (from Fuel Prices)'] || '$1.65',
      // Add additional fields for better display
      brand: record.fields['Brand'] || extractBrandFromName(record.fields['Station Name']),
      distance: calculateDistance(record.fields['Latitude'], record.fields['Longitude']),
      lastUpdated: '2 hours ago', // This would come from your data source
      amenities: record.fields['Amenities'] ? record.fields['Amenities'].split(',') : ['Basic Service'],
      fuelTypes: record.fields['Fuel Types'] ? record.fields['Fuel Types'].split(',') : ['Unleaded 91']
    }));

    console.log(`Successfully loaded ${processedStations.length} stations from Airtable`);
    return processedStations;
  } catch (error) {
    console.error("Error fetching from Airtable:", error);
    // Return mock data as fallback
    return getMockData();
  }
}

function extractBrandFromName(stationName) {
  if (!stationName) return 'Unknown';
  
  const brands = ['Shell', 'BP', '7-Eleven', 'Caltex', 'Mobil', 'United', 'Metro', 'Liberty'];
  for (const brand of brands) {
    if (stationName.toLowerCase().includes(brand.toLowerCase())) {
      return brand;
    }
  }
  return 'Independent';
}

function calculateDistance(lat, lng) {
  // Simple distance calculation from Melbourne CBD (-37.8136, 144.9631)
  const melbourneLat = -37.8136;
  const melbourneLng = 144.9631;
  
  if (!lat || !lng) return '0.0';
  
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat - melbourneLat) * Math.PI / 180;
  const dLng = (lng - melbourneLng) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(melbourneLat * Math.PI / 180) * Math.cos(lat * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  return distance.toFixed(1);
}

function getMockData() {
  console.log("Using enhanced mock data with 50+ stations");
  
  // Generate more comprehensive mock data
  const baseStations = [
    {
      id: "mock1",
      "Station Name": "Shell Coles Express Melbourne Central",
      "Address": "211 La Trobe Street",
      "City": "Melbourne",
      "Latitude": -37.8136,
      "Longitude": 144.9631,
      "Price Per Liter (from Fuel Prices)": "$1.61",
      brand: "Shell",
      distance: "0.8",
      lastUpdated: "2 hours ago",
      amenities: ["24/7", "Car Wash", "ATM", "Convenience Store"],
      fuelTypes: ["Unleaded 91", "Premium 95", "Diesel"]
    },
    {
      id: "mock2",
      "Station Name": "BP Connect Collins Street",
      "Address": "456 Collins Street",
      "City": "Melbourne",
      "Latitude": -37.8142,
      "Longitude": 144.9632,
      "Price Per Liter (from Fuel Prices)": "$1.67",
      brand: "BP",
      distance: "1.2",
      lastUpdated: "1 hour ago",
      amenities: ["24/7", "Restrooms", "Air Pump"],
      fuelTypes: ["Unleaded 91", "Premium 95", "Premium 98", "Diesel"]
    },
    {
      id: "mock3",
      "Station Name": "7-Eleven Swanston Street",
      "Address": "789 Swanston Street",
      "City": "Carlton",
      "Latitude": -37.8014,
      "Longitude": 144.9658,
      "Price Per Liter (from Fuel Prices)": "$1.63",
      brand: "7-Eleven",
      distance: "1.5",
      lastUpdated: "3 hours ago",
      amenities: ["24/7", "Convenience Store", "Coffee"],
      fuelTypes: ["Unleaded 91", "E10", "Diesel"]
    }
  ];

  // Generate additional mock stations with varied locations around Melbourne
  const additionalStations = [];
  const suburbs = [
    { name: "Richmond", lat: -37.8200, lng: 144.9950 },
    { name: "Fitzroy", lat: -37.7950, lng: 144.9780 },
    { name: "South Yarra", lat: -37.8400, lng: 144.9900 },
    { name: "Prahran", lat: -37.8500, lng: 144.9900 },
    { name: "St Kilda", lat: -37.8680, lng: 144.9780 },
    { name: "Docklands", lat: -37.8200, lng: 144.9400 },
    { name: "Southbank", lat: -37.8250, lng: 144.9600 },
    { name: "Collingwood", lat: -37.8050, lng: 144.9850 },
    { name: "Brunswick", lat: -37.7700, lng: 144.9600 },
    { name: "Northcote", lat: -37.7700, lng: 144.9950 }
  ];

  const brands = ["Shell", "BP", "7-Eleven", "Caltex", "Mobil", "United", "Metro", "Liberty"];
  
  suburbs.forEach((suburb, suburbIndex) => {
    brands.forEach((brand, brandIndex) => {
      const stationId = `mock${baseStations.length + suburbIndex * brands.length + brandIndex + 1}`;
      const price = (1.55 + Math.random() * 0.20).toFixed(2);
      const distance = calculateDistance(suburb.lat, suburb.lng);
      
      additionalStations.push({
        id: stationId,
        "Station Name": `${brand} ${suburb.name}`,
        "Address": `${Math.floor(Math.random() * 999) + 1} ${suburb.name} Street`,
        "City": suburb.name,
        "Latitude": suburb.lat + (Math.random() - 0.5) * 0.01,
        "Longitude": suburb.lng + (Math.random() - 0.5) * 0.01,
        "Price Per Liter (from Fuel Prices)": `$${price}`,
        brand: brand,
        distance: distance,
        lastUpdated: `${Math.floor(Math.random() * 6) + 1} hours ago`,
        amenities: getRandomAmenities(),
        fuelTypes: getRandomFuelTypes()
      });
    });
  });

  return [...baseStations, ...additionalStations];
}

function getRandomAmenities() {
  const allAmenities = ["24/7", "Car Wash", "ATM", "Convenience Store", "Restrooms", "Air Pump", "Vacuum", "Coffee", "Food Service", "Loyalty Program"];
  const count = Math.floor(Math.random() * 4) + 2; // 2-5 amenities
  const shuffled = allAmenities.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getRandomFuelTypes() {
  const allTypes = ["Unleaded 91", "Premium 95", "Premium 98", "Diesel", "E10", "LPG"];
  const count = Math.floor(Math.random() * 3) + 2; // 2-4 fuel types
  const shuffled = allTypes.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}