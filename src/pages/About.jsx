export default function About() {
  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>About This Site</h1>
      <p style={{ marginTop: 10 }}>
        PetrolPricesNearMe is a public directory of fuel stations in Melbourne, Victoria. Prices and location data are updated regularly using Airtable.
      </p>
      <p style={{ marginTop: 10 }}>
        This tool was built using Vite, React, and deployed with Vercel.
      </p>
    </div>
  );
}

