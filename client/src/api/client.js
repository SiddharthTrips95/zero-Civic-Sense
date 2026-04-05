const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? import.meta.env.VITE_API_URL ?? '/api').replace(/\/$/, '');
const AUTH_SESSION_KEY = 'civic.auth.session';

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const isAbsoluteUrl = (value) => /^https?:\/\//i.test(value);

const buildUrl = (endpoint) => {
  if (isAbsoluteUrl(endpoint)) {
    return endpoint;
  }

  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${normalizedEndpoint}`;
};

const getStoredToken = () => {
  if (typeof window === 'undefined') return undefined;

  try {
    const raw = window.localStorage.getItem(AUTH_SESSION_KEY);
    if (!raw) return undefined;

    const parsed = JSON.parse(raw);
    return parsed.token;
  } catch {
    return undefined;
  }
};

const request = async (
  method,
  endpoint,
  body,
  options,
) => {
  const token = options?.authToken ?? getStoredToken();
  const headers = {
    Accept: 'application/json',
    ...options?.headers,
  };

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(buildUrl(endpoint), {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (response.status === 204) {
    return undefined;
  }

  const text = await response.text();
  let payload;

  try {
    payload = text ? JSON.parse(text) : undefined;
  } catch {
    payload = text || undefined;
  }

  if (!response.ok) {
    const message =
      payload && typeof payload === 'object' && 'message' in payload
        ? String(payload.message)
        : `Request failed with status ${response.status}`;

    throw new ApiError(response.status, message);
  }

  return payload;
};

async function get(endpoint, options) {
  return request('GET', endpoint, undefined, options);
}

async function post(endpoint, body, options) {
  return request('POST', endpoint, body, options);
}

export const apiClient = { get, post, ApiError };

