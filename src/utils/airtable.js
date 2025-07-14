const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const TABLE_NAME = "tblXpiLDcSOKE5o8e";
const VIEW_ID = "viwZbnqGr4ujOyjDd";

export async function fetchFuelStations() {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}?view=${VIEW_ID}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error("Failed to fetch from Airtable:", response.status);
    return [];
  }

  const data = await response.json();
  return data.records.map((record) => ({
    id: record.id,
    ...record.fields,
  }));
}
