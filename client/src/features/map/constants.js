// ─── Map tile — light CartoDB Positron ─────────────────────────────

export const TILE_URL =
  'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

export const TILE_ATTRIBUTION =
  '&copy; OpenStreetMap &copy; CARTO';

// ─── Default map view ──────────────────────────────────────────────

export const DEFAULT_CENTER = [19.076, 72.8777];
export const DEFAULT_ZOOM = 13;

// ─── Palette ──────────────────────────────────────────────────────
// #41431B  olive-dark
// #AEB784  olive-mid
// #E3DBBB  olive-light
// #F8F3E1  cream

// ─── Severity dot colors ───────────────────────────────────────────

export const SEVERITY_DOT = {
  low: '#AEB784',
  medium: '#41431B',
  critical: '#7A3E2A',
};

// ─── Status styles ─────────────────────────────────────────────────

export const STATUS_STYLES = {
  open: {
    bg: 'rgba(122,62,42,0.1)',
    border: 'rgba(122,62,42,0.3)',
    color: '#7A3E2A',
    label: 'Open',
  },
  in_progress: {
    bg: 'rgba(65,67,27,0.1)',
    border: 'rgba(65,67,27,0.28)',
    color: '#41431B',
    label: 'In Progress',
  },
  resolved: {
    bg: 'rgba(174,183,132,0.18)',
    border: 'rgba(174,183,132,0.5)',
    color: '#41431B',
    label: 'Resolved',
  },
};