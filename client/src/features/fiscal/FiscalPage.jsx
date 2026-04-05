import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Landmark,
  ShieldCheck,
  Wallet
} from 'lucide-react';

const wards = [
  {
    name: 'Ward 14',
    allocated: 7.4,
    spent: 5.8,
    projects: 12,
    updated: '2h ago',
    risk: 'low'
  },
  {
    name: 'Ward 05',
    allocated: 6.1,
    spent: 4.2,
    projects: 8,
    updated: '1d ago',
    risk: 'high'
  },
  {
    name: 'Ward 22',
    allocated: 8.6,
    spent: 7.9,
    projects: 15,
    updated: '5h ago',
    risk: 'medium'
  },
  {
    name: 'Ward 31',
    allocated: 9.8,
    spent: 8.5,
    projects: 10,
    updated: '4h ago',
    risk: 'low'
  }
];

const disburseme = [
  {
    id: 'db-1',
    title: 'Road resurfacing batch 7',
    ward: 'Ward 14',
    amount: 'INR 1.8cr',
    status: 'Released',
    time: 'Today, 12'
  },
  {
    id: 'db-2',
    title: 'Drainage desilting contract',
    ward: 'Ward 22',
    amount: 'INR 0.9cr',
    status: 'Escrowed',
    time: 'Today, 09'
  },
  {
    id: 'db-3',
    title: 'Streetlight replacement wave 3',
    ward: 'Ward 05',
    amount: 'INR 0.45cr',
    status: 'Flagged',
    time: 'Yesterday, 18'
  }
];

const totalAllocated = wards.reduce((sum, ward) => sum + ward.allocated, 0);
const totalSpent = wards.reduce((sum, ward) => sum + ward.spent, 0);
const utilization = Math.round((totalSpent / totalAllocated) * 100);
const flaggedWards = wards.filter((ward) => ward.risk === 'high').length;

const getRiskStyle = (risk) => {
  if (risk === 'high') return 'text-red-300 bg-red-500/10 border-red-500/25';
  if (risk === 'medium') return 'text-yellow-300 bg-yellow-500/10 border-yellow-500/25';
  return 'text-civic-green bg-civic-green/10 border-civic-green/25';
};
const getStatusStyle = (status) => {
  if (status === 'Flagged') return 'text-red-300 bg-red-500/10 border-red-500/25';
  if (status === 'Escrowed') return 'text-yellow-300 bg-yellow-500/10 border-yellow-500/25';
  return 'text-civic-green bg-civic-green/10 border-civic-green/25';
};

const FiscalPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Vault Dashboard</h1>
          <p className="text-gray-400">Transparent ward spending, risk signals, and public disbursement ledger.</p>
        </div>
        <Link to="/map" className="flex items-center text-civic-green hover:text-civic-green/80">
          <ArrowUpRight className="w-4 h-4 mr-1" />
          Back to Map
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center mb-2">
            <Landmark className="w-5 h-5 text-civic-green mr-2" />
            <h3 className="text-lg font-semibold">Total Allocated</h3>
          </div>
          <p className="text-2xl font-bold">INR {totalAllocated.toFixed(1)}cr</p>
          <p className="text-gray-400">Across 4 tracked wards</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center mb-2">
            <Wallet className="w-5 h-5 text-civic-green mr-2" />
            <h3 className="text-lg font-semibold">Spent</h3>
          </div>
          <p className="text-2xl font-bold">INR {totalSpent.toFixed(1)}cr</p>
          <p className="text-gray-400">{utilization}% utilization</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
            <h3 className="text-lg font-semibold">Risk Ale</h3>
          </div>
          <p className="text-2xl font-bold">{flaggedWards}</p>
          <p className="text-gray-400">Needs immediate audit follow-up</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center mb-2">
            <ShieldCheck className="w-5 h-5 text-civic-green mr-2" />
            <h3 className="text-lg font-semibold">Vault Integrity</h3>
          </div>
          <p className="text-2xl font-bold">98.2%</p>
          <p className="text-gray-400">Smart contract checks healthy</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Ward Utilization Overview</h2>
            <Link to="/ledger" className="flex items-center text-civic-green hover:text-civic-green/80">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              Full Ledger
            </Link>
          </div>
          <div className="space-y-4">
            {wards.map((ward) => {
              const spentPercent = Math.min((ward.spent / ward.allocated) * 100, 100);
              const remaining = Math.max(ward.allocated - ward.spent, 0);

              return (
                <React.Fragment key={ward.name}>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="font-semibold">{ward.name}</h3>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getRiskStyle(ward.risk)}`}>
                        {ward.risk} risk
                      </span>
                    </div>
                    <span className="text-gray-400 text-sm">Updated {ward.updated}</span>
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <div className="bg-civic-green h-2 rounded-full" style={{ width: `${spentPercent}%` }}></div>
                  </div>

                  <p className="text-sm text-gray-400">
                    Spent INR {ward.spent.toFixed(1)}cr / INR {ward.allocated.toFixed(1)}cr
                    Remaining INR {remaining.toFixed(1)}cr | {ward.projects} projects
                  </p>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Integrity Watchlist</h2>
          <div className="space-y-4">
            <div className="p-4 bg-red-500/10 border border-red-500/25 rounded-lg">
              <h3 className="font-semibold text-red-300">Ward 05 anomaly detected</h3>
              <p className="text-sm text-gray-300">Low spending velocity, high release request ratio. Escalate for manual review.</p>
            </div>

            <div className="p-4 bg-gray-700 rounded-lg">
              <h3 className="font-semibold">Auto-check coverage</h3>
              <p className="text-sm text-gray-300">87 contra scanned in the last 24h with no critical integrity breaches.</p>
            </div>

            <button className="w-full bg-civic-green text-black font-semibold py-2 px-4 rounded-lg hover:bg-civic-green/90">
              Trigger Deep Audit
            </button>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Governance Controls</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Multisig confirmations</span>
              <span>4 / 5</span>
            </div>

            <div className="flex justify-between">
              <span>Pending payout approvals</span>
              <span>3</span>
            </div>

            <div className="flex justify-between">
              <span>Vault reserve</span>
              <span>INR 4.2cr</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Disburseme</h2>
          <Link to="/timeline" className="flex items-center text-civic-green hover:text-civic-green/80">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            Open Full Timeline
          </Link>
        </div>

        <div className="space-y-4">
          {disburseme.map((entry) => (
            <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
              <div>
                <h3 className="font-semibold">{entry.title}</h3>
                <div className="flex items-center text-sm text-gray-400">
                  <span>{entry.ward}</span>
                  <span className="mx-2">•</span>
                  <Clock3 className="w-4 h-4 mr-1" />
                  <span>{entry.time}</span>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold">{entry.amount}</p>
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getStatusStyle(entry.status)}`}>
                  {entry.status === 'Released' ? <CheckCircle2 className="w-4 h-4 inline mr-1" /> : null}
                  {entry.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FiscalPage;



