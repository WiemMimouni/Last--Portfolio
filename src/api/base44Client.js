import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "68c09bda8d291c998f9da4d0", 
  requiresAuth: true // Ensure authentication is required for all operations
});
