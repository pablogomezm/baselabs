export const JWT_CONSTANTS = {
  SECRET: process.env.JWT_SECRET || 'jwt-secret-change-in-production',
  EXPIRES_IN: '7d',
} as const;
