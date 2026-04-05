const normalizeMode = (value) => {
  if (value === 'mock' || value === 'api' || value === 'hybrid') {
    return value;
  }

  return 'hybrid';
};

export const DATA_MODE = normalizeMode(import.meta.env.VITE_DATA_MODE);
