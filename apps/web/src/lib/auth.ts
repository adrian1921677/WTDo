// TODO: Replace with real auth (Auth.js/Clerk)
export function getUserId(): string {
  // Placeholder for now - replace with actual session/user ID
  return 'demo-user-id';
}

// Mock session check
export function requireAuth(): { userId: string } {
  return { userId: getUserId() };
}

