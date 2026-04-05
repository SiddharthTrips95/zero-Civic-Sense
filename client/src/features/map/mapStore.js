import { create } from 'zustand';

const DEFAULT_FILTERS = {
  showHeatmap: true,
  showClusters: true,
  showGhost: true,
};

export const useMapStore = create((set) => ({
  filters:      { ...DEFAULT_FILTERS },
  setFilters:   (partial) => set((state) => ({ filters: { ...state.filters, ...partial } })),
  resetFilters: () => set({ filters: { ...DEFAULT_FILTERS } }),
}));