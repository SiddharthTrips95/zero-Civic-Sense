import { Link } from "react-router-dom";
import {
  Activity,
  ArrowUpRight,
  Clock,
  Star,
  History,
  CheckCircle2,
  X,
} from "lucide-react";

const MetaRow = ({ icon: Icon, label, value }) => (
  <div className="flex justify-between items-center text-sm">
    <div className="flex items-center gap-2">
      <Icon size={14} />
      <span>{label}</span>
    </div>
    <span className="font-semibold">{value}</span>
  </div>
);

const NetaMeterWidget = ({ official, onClose, onViewHistory }) => {
  const normalizedScore = Math.min(
    Math.max(official.trustScore, 0),
    100
  );

  const scoreColor =
    official.trustScore >= 75
      ? "#41431B"
      : official.trustScore >= 40
      ? "#7A3E2A"
      : "#8E2A22";

  const starsCount = Math.round(official.trustScore / 20);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white border rounded-xl p-4 w-72 shadow-lg space-y-4">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div>
          <p className="text-xs text-gray-500">
            Active Zone
          </p>
          <h3 className="font-semibold">
            {official.ward}
          </h3>
        </div>

        {/* Name + score */}
        <div>
          <h2 className="font-bold text-lg">
            {official.name}
          </h2>

          {/* Stars */}
          <div className="flex gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < starsCount
                    ? "text-yellow-500"
                    : "text-gray-300"
                }
              />
            ))}
          </div>

          <p
            className="text-sm mt-1 font-semibold"
            style={{ color: scoreColor }}
          >
            {official.trustScore}% Trust
          </p>
        </div>

        {/* Stats */}
        <div className="space-y-2">
          <MetaRow
            icon={Activity}
            label="Weekly Activity"
            value={`${official.weeklyResolved || 0} resolved`}
          />

          <MetaRow
            icon={Clock}
            label="Response Time"
            value={`${official.responseTime || "N/A"}`}
          />

          <MetaRow
            icon={CheckCircle2}
            label="Total Resolved"
            value={official.totalResolved || 0}
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <Link
            to="/dashboard"
            className="text-sm text-blue-600 flex items-center gap-1"
          >
            Open Vault Dashboard <ArrowUpRight size={14} />
          </Link>

          <button
            onClick={onViewHistory}
            className="text-sm text-gray-600 flex items-center gap-1"
          >
            <History size={14} />
            History & Bio
          </button>
        </div>
      </div>
    </div>
  );
};

export default NetaMeterWidget;