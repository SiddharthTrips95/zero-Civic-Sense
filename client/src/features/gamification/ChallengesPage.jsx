import { useState } from 'react';

const CIVIC_BALANCE = 1240;

const STORE_CATEGORIES = [
  { id: 'All', label: 'All Challenges' },
  { id: 'Easy', label: 'Easy' },
  { id: 'Medium', label: 'Medium' },
  { id: 'Hard', label: 'Hard' },
];

const mockChallenges = [
  {
    id: '1',
    name: 'Report a pothole',
    reward: 50,
    difficulty: 'Easy',
  },
  {
    id: '2',
    name: 'Verify 5 issues',
    reward: 120,
    difficulty: 'Medium',
  },
  {
    id: '3',
    name: 'Complete ward cleanup drive',
    reward: 300,
    difficulty: 'Hard',
  },
];

const ChallengesPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredChallenges =
    activeFilter === 'All'
      ? mockChallenges
      : mockChallenges.filter((c) => c.difficulty === activeFilter);

  const affordableCount = mockChallenges.filter(
    (c) => c.reward <= CIVIC_BALANCE
  ).length;

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold">Challenges</h1>
      <p className="text-gray-500 mb-4">
        Complete challenges and earn CIVIC rewards.
      </p>

      {/* Balance */}
      <div className="mb-4 p-4 border rounded-lg">
        <p>Your Balance</p>
        <h2 className="text-xl font-bold">{CIVIC_BALANCE} CIVIC</h2>
        <p>{affordableCount} challenges available</p>
      </div>

      {/* Filters */}
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

      {/* Challenges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredChallenges.map((challenge) => (
          <div key={challenge.id} className="border p-4 rounded-lg">
            <h3 className="font-semibold">{challenge.name}</h3>
            <p className="text-sm text-gray-500">
              Difficulty: {challenge.difficulty}
            </p>
            <p className="mt-2">{challenge.reward} CIVIC reward</p>

            <button className="mt-2 px-3 py-1 bg-green-500 text-white rounded">
              Start Challenge
            </button>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredChallenges.length === 0 && (
        <p className="mt-6 text-gray-500">
          No challenges available.
        </p>
      )}
    </div>
  );
};

export default ChallengesPage;