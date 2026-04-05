import { motion } from "framer-motion";
import {
  IndianRupee,
  ShieldCheck,
  TrendingUp,
  Calendar,
  CheckCircle2,
} from "lucide-react";

const officials = [
  {
    name: "Priya Sharma",
    ward: "Ward 14",
    score: 85,
    party: "Independent",
    allocated: 7.4,
    spent: 5.8,
    resolved: 42,
    days: 28,
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
  },
  {
    name: "Arjun Mehta",
    ward: "Ward 05",
    score: 72,
    party: "Reform Party",
    allocated: 6.1,
    spent: 4.2,
    resolved: 35,
    days: 21,
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a",
  },
];

const scoreConfig = (score) => {
  if (score >= 80)
    return {
      color: "text-green-600",
      bg: "bg-green-100",
    };
  if (score >= 60)
    return {
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    };
  return {
    color: "text-red-600",
    bg: "bg-red-100",
  };
};

const NetaMeterPage = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Accountability
        </h1>
        <p className="text-gray-500">
          Transparent tracking of local representatives
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {officials.map((o, idx) => {
          const progress = Math.min(
            (o.spent / o.allocated) * 100,
            100
          );

          const sc = scoreConfig(o.score);

          return (
            <motion.div
              key={idx}
              className="border rounded-lg p-4 space-y-4"
              whileHover={{ scale: 1.02 }}
            >
              {/* Profile */}
              <div className="flex items-center gap-4">
                <img
                  src={o.photo}
                  alt={o.name}
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div>
                  <h2 className="font-semibold">
                    {o.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {o.ward} • {o.party}
                  </p>
                </div>

                <div
                  className={`ml-auto px-3 py-1 rounded ${sc.bg} ${sc.color}`}
                >
                  {o.score}
                </div>
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Allocated</span>
                  <span>{o.allocated} Cr</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Spent</span>
                  <span>{o.spent} Cr</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 h-2 rounded">
                  <div
                    className="bg-blue-500 h-2 rounded"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p className="text-xs text-gray-500">
                  {progress.toFixed(0)}% utilized
                </p>
              </div>

              {/* Stats */}
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1">
                  <CheckCircle2 size={14} />
                  {o.resolved} resolved
                </div>

                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  {o.days} days
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default NetaMeterPage;