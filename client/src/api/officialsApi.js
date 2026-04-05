import { mockOfficials } from '@/mocks';
import { apiClient } from './client';
import { DATA_MODE } from './dataMode';

const cloneOfficials = (officials) => officials.map((official) => ({ ...official }));

const getOfficialsFromMock = async () => {
  return cloneOfficials(mockOfficials);
};

const getOfficialByIdFromMock = async (id) => {
  const official = mockOfficials.find((item) => item.id === id);
  return official ? { ...official } : null;
};

const getOfficialsFromApi = async () => apiClient.get('/officials');
const getOfficialByIdFromApi = async (id) => apiClient.get(`/officials/${id}`);

export async function getOfficials() {
  if (DATA_MODE === 'mock') {
    return getOfficialsFromMock();
  }

  if (DATA_MODE === 'api') {
    return getOfficialsFromApi();
  }

  try {
    return await getOfficialsFromApi();
  } catch {
    return getOfficialsFromMock();
  }
}

export async function getOfficialById(id) {
  if (DATA_MODE === 'mock') {
    return getOfficialByIdFromMock(id);
  }

  if (DATA_MODE === 'api') {
    return getOfficialByIdFromApi(id);
  }

  try {
    return await getOfficialByIdFromApi(id);
  } catch {
    return getOfficialByIdFromMock(id);
  }
}
