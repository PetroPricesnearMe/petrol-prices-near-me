export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-6 py-16">
      <div className="max-w-3xl">
        <img
          src="/logo.png"
          alt="Petrol Prices Near Me Logo"
          className="mx-auto mb-6 w-20 h-20"
        />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
          Find the Cheapest Petrol Near You
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8">
          Live fuel price tracking across Melbourne & Victoria. Stay informed, save money.
        </p>
        <a
          href="/map"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full transition"
        >
          View Fuel Map
        </a>
      </div>
    </div>
  );
}

