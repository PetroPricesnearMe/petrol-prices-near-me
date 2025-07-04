import Airtable from 'airtable';

const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY || process.env.AIRTABLE_API_KEY;
const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID || process.env.AIRTABLE_BASE_ID;

const base = new Airtable({ apiKey }).base(baseId);

export const fetchFuelStations = async () => {
  const records = await base('FuelStations').select().all();
  return records.map(record => ({ id: record.id, ...record.fields }));
};
