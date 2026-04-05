

const colorMap = {
  olive: {
    bg: 'rgba(65,67,27,0.08)',
    border: 'rgba(65,67,27,0.16)',
    label: 'rgba(65,67,27,0.56)',
    value: '#41431B',
  },
  mint: {
    bg: 'rgba(174,183,132,0.18)',
    border: 'rgba(174,183,132,0.46)',
    label: 'rgba(65,67,27,0.62)',
    value: '#41431B',
  },
  terracotta: {
    bg: 'rgba(122,62,42,0.09)',
    border: 'rgba(122,62,42,0.24)',
    label: 'rgba(122,62,42,0.68)',
    value: '#7A3E2A',
  },
};

const defaultStyle = {
  bg: 'rgba(227,219,187,0.52)',
  border: 'rgba(65,67,27,0.14)',
  label: 'rgba(65,67,27,0.5)',
  value: '#41431B',
};

const StatTile = ({ label, value, unit, color }) => {
  const c = color ? colorMap[color] : defaultStyle;

  return (
    <div className="stat-tile" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
      <div className="stat-label" style={{ color: c.label }}>
        {label}
      </div>
      <div className="stat-value" style={{ color: c.value }}>
        {value}
        {unit && ` ${unit}`}
      </div>
    </div>
  );
};

export default StatTile;
