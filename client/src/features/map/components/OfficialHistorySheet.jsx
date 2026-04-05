import { motion } from 'framer-motion';
import { X, MapPin, Star, Activity, TrendingUp } from 'lucide-react';

const metricColors = {
  response: '#41431B',
  resolution: '#AEB784',
  trust: '#7A3E2A',
};

const OfficialHistorySheet = ({ official, onClose }) => {
  const metrics = [
    {
      key: 'response',
      label: 'Response Rate',
      value: official.responseRate,
      color: metricColors.response,
      icon: Activity,
    },
    {
      key: 'resolution',
      label: 'Resolution Rate',
      value: official.resolutionRate,
      color: metricColors.resolution,
      icon: TrendingUp,
    },
    {
      key: 'trust',
      label: 'Trust Score',
      value: official.trustScore,
      color: metricColors.trust,
      icon: Star,
    },
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="relative bg-white rounded-3xl shadow-xl p-6 max-w-lg mx-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-3 right-3 p-2 rounded-full border transition-all z-10"
        style={{
          background: 'rgba(65,67,27,0.05)',
          borderColor: 'rgba(65,67,27,0.16)',
          color: '#41431B',
        }}
      >
        <X className="w-4 h-4" />
      </button>

      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <MapPin className="w-4 h-4" />
          {official.ward}
        </div>

        <h2 className="mt-2 text-2xl font-semibold">{official.name}</h2>

        <p className="mt-3 text-slate-700">{official.bio}</p>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-slate-500">Trust Score</span>
            <span className="font-semibold">{official.trustScore}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-slate-500">Actions / Week</span>
            <span className="font-semibold">{official.weeklyResolved}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Performance Breakdown</h3>
        <div className="grid gap-3">
          {metrics.map(({ key, label, value, color, icon: Icon }) => (
            <div
              key={key}
              className="flex items-center justify-between p-4 rounded-2xl border"
              style={{ borderColor: color }}
            >
              <div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Icon className="w-4 h-4" />
                  {label}
                </div>
                <div className="mt-1 text-xl font-semibold">{value}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.aside>
  );
};

export default OfficialHistorySheet;


