import { useState } from 'react';

const CIVIC_BALANCE = 1240;

const STORE_CATEGORIES = [
  { id: 'All', label: 'All Rewards' },
  { id: 'Vouchers', label: 'Vouchers' },
  { id: 'Transit', label: 'Transit' },
  { id: 'Eco-Merch', label: 'Eco' },
  { id: 'Digital', label: 'Digital' },
];

const mockProducts = [
  {
    id: '1',
    name: '₹500 Metro Card',
    brand: 'Mumbai Metro',
    cost: 250,
    category: 'Transit',
  },
  {
    id: '2',
    name: 'BookMyShow ₹250',
    brand: 'Entertainment',
    cost: 200,
    category: 'Vouchers',
  },
  {
    id: '3',
    name: 'Spotify Premium',
    brand: '1 Month',
    cost: 350,
    category: 'Digital',
  },
];

const StorePage = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProducts =
    activeFilter === 'All'
      ? mockProducts
      : mockProducts.filter((p) => p.category === activeFilter);

  const affordableCount = mockProducts.filter(
    (p) => p.cost <= CIVIC_BALANCE
  ).length;

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold">Rewards Store</h1>
      <p className="text-gray-500 mb-4">
        Redeem your civic impact for real-world rewards.
      </p>

      {/* Balance */}
      <div className="mb-4 p-4 border rounded-lg">
        <p>Your Balance</p>
        <h2 className="text-xl font-bold">{CIVIC_BALANCE} CIVIC</h2>
        <p>{affordableCount} items you can afford</p>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {STORE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveFilter(cat.id)}
            className={`px-3 py-1 rounded ${
              activeFilter === cat.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <p className="text-sm text-gray-500">{product.brand}</p>
            <h3 className="font-semibold">{product.name}</h3>
            <p>{product.cost} CIVIC</p>

            <button
              className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
              disabled={product.cost > CIVIC_BALANCE}
            >
              Redeem
            </button>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredProducts.length === 0 && (
        <p className="mt-6 text-gray-500">
          No rewards in this category.
        </p>
      )}
    </div>
  );
};

export default StorePage;