// src/api/base44Client.js
import { createClient } from '@base44/sdk';

// PUBLIC MODE — no login, no redirect.
export const base44 = createClient({
  appId: import.meta.env.VITE_BASE44_APP_ID || '68c09bda8d291c998f9da4d0',
  requiresAuth: false
});

// Hard kill any auth guards some templates call:
export const ensureAuthenticated = () => {};
export const redirectToBase44Login = () => {};
export const isAuthenticated = () => true;
