export default function Prices() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Live Fuel Prices</h1>

      <div className="w-full overflow-hidden rounded-lg border border-gray-300">
        <iframe
          className="airtable-embed"
          src="https://airtable.com/embed/appED1MPSFmtpTMPj/shr8SrnjOYbXtTFvk?layout=card&viewControls=on"
          frameBorder="0"
          width="100%"
          height="700"
          style={{ background: 'transparent', border: 'none' }}
          title="Fuel Prices Airtable"
        ></iframe>
      </div>
    </div>
  );
}

