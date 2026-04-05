import { useState, useRef, useCallback, useEffect } from 'react';

const walletAddress = '0x7FA1...3B9A';

const activities = [
  {
    id: 'tx-1',
    title: 'Pothole fixed verification accepted',
    location: 'MG Road, Andheri',
    time: 'Today, 14',
    reward: '+40 CIVIC',
    impact: '32 commuters confirmed',
    status: 'verified',
  },
];

const spendingHistory = [
  { id: 'sp-1', title: 'Evidence Upload Boost', time: 'Today, 11', amount: 20 },
];

const ProfilePage = () => {
  const [copied, setCopied] = useState(false);
  const [isSpendingHistoryOpen, setIsSpendingHistoryOpen] = useState(false);
  const [isMilestonesOpen, setIsMilestonesOpen] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

  const cardRef = useRef(null);

  const handleCardMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const monthlySpent = spendingHistory.reduce((s, e) => s + e.amount, 0);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  useEffect(() => {
    if (!isSpendingHistoryOpen && !isMilestonesOpen) return;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSpendingHistoryOpen, isMilestonesOpen]);

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold">Profile</h1>
      <p className="text-gray-500 mb-6">
        Track your civic impact, rewards, and performance.
      </p>

      {/* Wallet */}
      <div className="mb-6 border p-4 rounded-lg">
        <p className="font-semibold">Wallet Address</p>
        <p className="text-sm">{walletAddress}</p>

        <button onClick={handleCopy} className="mt-2 text-blue-500">
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Spending */}
      <div className="mb-6 border p-4 rounded-lg">
        <p>Monthly Spending: {monthlySpent} CIVIC</p>

        <button
          onClick={() => setIsSpendingHistoryOpen(true)}
          className="mt-2 text-green-600"
        >
          Open Spending History
        </button>
      </div>

      {/* Activities */}
      <div className="border p-4 rounded-lg">
        <h2 className="font-semibold mb-2">Activities</h2>

        {activities.map((a) => (
          <div key={a.id} className="mb-2 border-b pb-2">
            <p>{a.title}</p>
            <p className="text-sm text-gray-500">{a.location}</p>
            <p className="text-sm">{a.reward}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isSpendingHistoryOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="font-bold mb-4">Spending History</h2>

            {spendingHistory.map((item) => (
              <div key={item.id} className="mb-2">
                <p>{item.title}</p>
                <p className="text-sm text-gray-500">{item.time}</p>
                <p>-{item.amount} CIVIC</p>
              </div>
            ))}

            <button
              onClick={() => setIsSpendingHistoryOpen(false)}
              className="mt-4 text-red-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;