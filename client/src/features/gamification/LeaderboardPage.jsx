import { GlassCard, Badge } from '@/components/ui';

const leaders = [
  { name: 'Ward Champion', user: 'Aditi', poi: 100, ward: '14' },
  { name: 'Ghost Hunter', user: 'Ravi', poi: 150, ward: '05' },
];

const LeaderboardPage = () => (
  <div>
    {leaders.map((l) => (
      <GlassCard key={l.user}>
        <Badge>
          {l.user}
          {l.name} - Ward {l.ward}
        </Badge>
        {l.poi} XP
      </GlassCard>
    ))}
  </div>
);

export default LeaderboardPage;