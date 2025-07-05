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
    return data.records.map(record => ({
      id: record.id,
      ...record.fields,
    }));
  } catch (error) {
    console.error("Error fetching from Airtable:", error);
    // Return mock data as fallback
    return getMockData();
  }
}

function getMockData() {
  return [
    {
      id: "mock1",
      "Station Name": "Shell Coles Express Melbourne Central",
      "Address": "211 La Trobe Street",
      "City": "Melbourne",
      "Latitude": -37.8136,
      "Longitude": 144.9631,
      "Price Per Liter (from Fuel Prices)": "$1.65"
    },
    {
      id: "mock2",
      "Station Name": "BP Connect Collins Street",
      "Address": "456 Collins Street",
      "City": "Melbourne",
      "Latitude": -37.8142,
      "Longitude": 144.9632,
      "Price Per Liter (from Fuel Prices)": "$1.67"
    },
    {
      id: "mock3",
      "Station Name": "7-Eleven Swanston Street",
      "Address": "789 Swanston Street",
      "City": "Carlton",
      "Latitude": -37.8014,
      "Longitude": 144.9658,
      "Price Per Liter (from Fuel Prices)": "$1.63"
    }
  ];
}