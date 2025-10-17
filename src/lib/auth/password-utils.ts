// Simple password strength utilities
// Score from 0 (very weak) to 5 (very strong)
export function calculatePasswordStrength(password: string): number {
  let score = 0;
  if (!password) return score;

  // Length checks
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;

  // Character variety
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  // Cap at 5
  return Math.min(score, 5);
}

export function getPasswordStrengthLabel(score: number): string {
  switch (true) {
    case score <= 1:
      return 'Very Weak';
    case score === 2:
      return 'Weak';
    case score === 3:
      return 'Fair';
    case score === 4:
      return 'Good';
    default:
      return 'Strong';
  }
}
