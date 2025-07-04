import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Petrol Prices Near Me logo"
            className="h-10 w-10 object-contain"
          />
          <h1 className="text-xl font-bold tracking-tight text-gray-800">
            PetrolPricesNearMe
          </h1>
        </div>

        <nav className="space-x-6">
          <Link to="/" className="text-gray-700 hover:text-black font-medium">Home</Link>
          <Link to="/map" className="text-gray-700 hover:text-black font-medium">Map</Link>
          <Link to="/about" className="text-gray-700 hover:text-black font-medium">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-black font-medium">Contact</Link>
		  <Link to="/prices" className="text-gray-700 hover:text-black font-medium">Prices</Link>
        </nav>
      </div>
    </header>
  );
}

