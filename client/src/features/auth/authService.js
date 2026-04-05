import { apiClient } from '@/api/client';

const AUTH_MODE = import.meta.env.VITE_AUTH_MODE === 'api' ? 'api' : 'local';

const USERS_KEY = 'civic.auth.users';
const SESSION_KEY = 'civic.auth.session';

const isBrowser = typeof window !== 'undefined';

const readLocal = (key, fallback) => {
  if (!isBrowser) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const writeLocal = (key, value) => {
  if (!isBrowser) return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

const removeLocal = (key) => {
  if (!isBrowser) return;
  window.localStorage.removeItem(key);
};

const normalizeEmail = (value) => value.trim().toLowerCase();

const hashPassword = async (value) => {
  const encoded = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
};

const getStoredUsers = () => readLocal(USERS_KEY, []);

const setStoredUsers = (users) => {
  writeLocal(USERS_KEY, users);
};

const setSession = (session) => {
  writeLocal(SESSION_KEY, session);
};

const clearSession = () => {
  removeLocal(SESSION_KEY);
};

const createSessionToken = () =>
  `sess_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;

// ─── LOCAL AUTH ─────────────────────────────────────────

const signUpLocal = async (payload) => {
  const email = normalizeEmail(payload.email);
  const users = getStoredUsers();

  const alreadyExists = users.some(
    (user) => normalizeEmail(user.email) === email
  );

  if (alreadyExists) {
    throw new Error('An account with this email already exists.');
  }

  const passwordHash = await hashPassword(payload.password);

  const user = {
    id: createSessionToken(),
    name: payload.name,
    email,
    createdAt: new Date().toISOString(),
  };

  const storedUser = { ...user, passwordHash };

  setStoredUsers([storedUser, ...users]);
  setSession({ token: createSessionToken(), user });

  return user;
};

const signInLocal = async (payload) => {
  const email = normalizeEmail(payload.email);
  const passwordHash = await hashPassword(payload.password);

  const users = getStoredUsers();

  const found = users.find(
    (user) => normalizeEmail(user.email) === email
  );

  if (!found || found.passwordHash !== passwordHash) {
    throw new Error('Invalid email or password.');
  }

  const { passwordHash: _, ...user } = found;

  setSession({ token: createSessionToken(), user });

  return user;
};

const getSessionUserLocal = () => {
  const session = readLocal(SESSION_KEY, null);
  return session?.user ?? null;
};

// ─── GUEST LOGIN ─────────────────────────────────────────

const signInAsGuestLocal = () => {
  const user = {
    id: createSessionToken(),
    name: 'Guest',
    email: '',
    createdAt: new Date().toISOString(),
    isGuest: true,
  };

  setSession({ token: createSessionToken(), user });

  return user;
};

// ─── API AUTH ─────────────────────────────────────────

const signInApi = async (payload) => {
  const response = await apiClient.post('/auth/signin', {
    email: payload.email,
    password: payload.password,
  });

  if (!response.user) {
    throw new Error('Sign-in response is missing user details.');
  }

  setSession({ user: response.user, token: response.token });

  return response.user;
};

const signUpApi = async (payload) => {
  const response = await apiClient.post('/auth/signup', {
    name: payload.name.trim(),
    email: payload.email,
    password: payload.password,
  });

  if (!response.user) {
    throw new Error('Sign-up response is missing user details.');
  }

  setSession({ user: response.user, token: response.token });

  return response.user;
};

const signOutApi = async () => {
  try {
    await apiClient.post('/auth/signout', {});
  } catch {
    // ignore errors
  }
};

// ─── EXPORT ─────────────────────────────────────────

export const authService = {
  getSessionUser: () => {
    if (AUTH_MODE === 'local') {
      return getSessionUserLocal();
    }

    const session = readLocal(SESSION_KEY, null);
    return session?.user ?? null;
  },

  signIn: (payload) => {
    return AUTH_MODE === 'local'
      ? signInLocal(payload)
      : signInApi(payload);
  },

  signUp: (payload) => {
    return AUTH_MODE === 'local'
      ? signUpLocal(payload)
      : signUpApi(payload);
  },

  signInAsGuest: () => signInAsGuestLocal(),

  signOut: async () => {
    if (AUTH_MODE === 'api') {
      await signOutApi();
    }
    clearSession();
  },
};