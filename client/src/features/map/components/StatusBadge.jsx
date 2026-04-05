import { STATUS_STYLES } from '../consta';

const StatusBadge = ({ status }) => {
  const s = STATUS_STYLES[status];

  return (
    <span>{s.label}</span>
  );
};

export default StatusBadge;
