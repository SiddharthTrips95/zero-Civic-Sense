import GlassButton from "@/components/ui/GlassButton/GlassButton";
import GlassCard from "@/components/ui/GlassCard/GlassCard";
import "./landing.css";

const highlights = [
  { label: "Ward 14", value: "87", meta: "Neta-Meter Score" },
  { label: "Resolved", value: "86", meta: "Issues verified" },
  { label: "CIVIC", value: "1,240", meta: "Rewards earned" },
];

const LandingPage = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Hero Section */}
      <div>
        <h1 className="text-3xl font-bold">
          Civic-Glass Interface
        </h1>
        <p className="text-gray-600">
          Accountability you can see, trust, and verify.
        </p>

        <p className="mt-2 text-gray-500">
          CivicChain is a decentralized civic utility. Map issues,
          track public spending, and earn rewards for verified fixes.
        </p>

        <div className="mt-4 flex gap-3">
          <GlassButton>Open Live Map</GlassButton>
          <GlassButton>Report an Issue</GlassButton>
        </div>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {highlights.map((item, index) => (
          <GlassCard key={index} className="p-4 text-center">
            <h2 className="text-xl font-bold">
              {item.value}
            </h2>
            <p className="text-sm text-gray-500">
              {item.meta}
            </p>
            <p className="text-xs text-gray-400">
              {item.label}
            </p>
          </GlassCard>
        ))}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="p-4">
          <h3 className="font-semibold mb-2">
            Accountability
          </h3>
          <p>
            Track accountability scores, verified spend, and
            promise completion in one view.
          </p>
          <p className="mt-2 font-bold">87/100</p>
        </GlassCard>

        <GlassCard className="p-4">
          <h3 className="font-semibold mb-2">
            Report Issues
          </h3>
          <p>
            Capture evidence and submit issues easily.
          </p>

          <div className="flex gap-2 mt-2">
            <span className="px-2 py-1 bg-gray-200 rounded">
              Pothole
            </span>
            <span className="px-2 py-1 bg-gray-200 rounded">
              Water Log
            </span>
            <span className="px-2 py-1 bg-gray-200 rounded">
              Litter
            </span>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <h3 className="font-semibold mb-2">
            Earn Rewards
          </h3>
          <p>
            Earn CIVIC tokens for verified fixes.
          </p>
          <p className="mt-2 font-bold">
            1,240 CIVIC
          </p>
        </GlassCard>
      </div>
    </div>
  );
};

export default LandingPage;