import L from 'leaflet';
import { SEVERITY_DOT } from '../constants';

export function buildIssueIcon(issue) {
  const dotColor = SEVERITY_DOT[issue.severity] || '#999';

  const upActive = issue.userVoted === 'up';
  const downActive = issue.userVoted === 'down';

  const scoreColor = upActive
    ? '#41431B'
    : downActive
    ? '#7A3E2A'
    : 'rgba(65,67,27,0.9)';

  const html = `
    <div style="display:flex; flex-direction:column; align-items:center;">
      
      <div style="display:flex; flex-direction:column; align-items:center;">
        <span style="color:${upActive ? '#41431B' : '#aaa'};">&#9650;</span>
        <span style="color:${downActive ? '#7A3E2A' : '#aaa'};">&#9660;</span>
      </div>

      <div 
        style="
          background:${dotColor};
          color:white;
          padding:6px 10px;
          border-radius:8px;
          font-size:12px;
          text-align:center;
          margin-top:4px;
        "
      >
        <div>${issue.title}</div>
        <div style="color:${scoreColor}; font-weight:bold;">
          ${issue.upvotes || 0}
        </div>
      </div>

    </div>
  `;

  return L.divIcon({
    html,
    className: '',
    iconSize: [80, 60],
    iconAnchor: [40, 60],
  });
}