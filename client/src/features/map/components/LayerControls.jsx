import GlassCard from "@/components/ui/GlassCard/GlassCard";

const IssueDetailPanel = ({ issue, onClose }) => {
  if (!issue) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <GlassCard className="p-6 w-full max-w-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-sm"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold mb-2">
          {issue.title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-4">
          {issue.description}
        </p>

        {/* Meta Info */}
        <div className="space-y-2 text-sm">
          <p>
            <strong>Status:</strong>{" "}
            <span className="capitalize">
              {issue.status}
            </span>
          </p>

          <p>
            <strong>Severity:</strong>{" "}
            {issue.severity}
          </p>

          <p>
            <strong>Reporter:</strong>{" "}
            {issue.reporter}
          </p>

          <p>
            <strong>Location:</strong>{" "}
            {issue.location}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <GlassButton>Upvote</GlassButton>
          <GlassButton>Verify</GlassButton>
        </div>
      </GlassCard>
    </div>
  );
};

export default IssueDetailPanel;