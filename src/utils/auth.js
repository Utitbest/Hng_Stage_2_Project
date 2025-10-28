export const SESSION_KEY = 'ticketapp_session';
export const USERS_KEY = 'ticketapp_users'; 

export function isAuthenticated() {
  try {
    return !!localStorage.getItem(SESSION_KEY);
  } catch {
    return false;
  }
}

export function signupMock({ email, password, name }) {
  if (!email || !password) throw new Error('Email and password are required');

  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

  const existing = users.find(u => u.email === email);
  if (existing) throw new Error('User already exists');

  const newUser = { email, password, name};
  users.push(newUser);

  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  const session = {
    token: 'mock-token-' + Date.now(),
    user: { email: newUser.email, name: newUser.name }
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function loginMock({ email, password }) {
  if (!email || !password) throw new Error('Email and password are required');

  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

  const found = users.find(u => u.email === email);
  if (!found) throw new Error('User not found');
  if (found.password !== password) throw new Error('Incorrect password');

  const session = {
    token: 'mock-token-' + Date.now(),
    user: { email: found.email, name: found.name }
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser() {
  try {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY));
    return session?.user || null;
  } catch {
    return null;
  }
}
