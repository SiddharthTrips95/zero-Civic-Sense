import { mockIssues } from '@/mocks';
import { apiClient } from './client';
import { DATA_MODE } from './dataMode';

const MOCK_ISSUES_KEY = 'civic.mock.issues';
const isBrowser = typeof window !== 'undefined';

const cloneIssues = (issues) => issues.map((issue) => ({ ...issue }));

const readMockIssues = () => {
  if (!isBrowser) return cloneIssues(mockIssues);

  try {
    const raw = window.localStorage.getItem(MOCK_ISSUES_KEY);
    if (!raw) {
      const seeded = cloneIssues(mockIssues);
      window.localStorage.setItem(MOCK_ISSUES_KEY, JSON.stringify(seeded));
      return seeded;
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return cloneIssues(mockIssues);
    }

    return cloneIssues(parsed);
  } catch {
    return cloneIssues(mockIssues);
  }
};

const writeMockIssues = (issues) => {
  if (!isBrowser) return;
  window.localStorage.setItem(MOCK_ISSUES_KEY, JSON.stringify(issues));
};

const getIssuesFromMock = async () => {
  return readMockIssues();
};

const getIssueByIdFromMock = async (id) => {
  const issues = readMockIssues();
  return issues.find((issue) => issue.id === id);
};

const createIssueInMock = async (data) => {
  const issues = readMockIssues();
  const created = {
    ...data,
    id: `iss-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  };

  writeMockIssues([created, ...issues]);
  return created;
};

const getIssuesFromApi = async () => apiClient.get('/issues');
const getIssueByIdFromApi = async (id) => apiClient.get(`/issues/${id}`);
const createIssueInApi = async (data) => apiClient.post('/issues', data);

export async function getIssues() {
  if (DATA_MODE === 'mock') {
    return getIssuesFromMock();
  }

  if (DATA_MODE === 'api') {
    return getIssuesFromApi();
  }

  try {
    return await getIssuesFromApi();
  } catch {
    return getIssuesFromMock();
  }
}

export async function getIssueById(id) {
  if (DATA_MODE === 'mock') {
    return getIssueByIdFromMock(id);
  }

  if (DATA_MODE === 'api') {
    return getIssueByIdFromApi(id);
  }

  try {
    return await getIssueByIdFromApi(id);
  } catch {
    return getIssueByIdFromMock(id);
  }
}

export async function createIssue(data) {
  if (DATA_MODE === 'mock') {
    return createIssueInMock(data);
  }

  if (DATA_MODE === 'api') {
    return createIssueInApi(data);
  }

  try {
    return await createIssueInApi(data);
  } catch {
    return createIssueInMock(data);
  }
}
