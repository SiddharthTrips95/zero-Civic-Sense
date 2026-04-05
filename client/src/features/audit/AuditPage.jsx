import GlassCard from "../../components/ui/GlassCard/GlassCard";

const aud = [
  { tx: '0xA3F2...9B1C', action: 'Issue verified', actor: 'DAO Node 7', time: '2 min ago' },
  { tx: '0x8C11...F42A', action: 'Fund disbursed', actor: 'Treasury', time: '15 min ago' },
  { tx: '0x1D34...6E0B', action: 'Score updated', actor: 'Oracle', time: '1 hr ago' },
];

const AuditPage = () => (
  <div>
    {aud.map((a) => (
      <div key={a.id}>
        {a.action}
      </div>
    ))}
  </div>
);

export default AuditPage;