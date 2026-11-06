export const MIN_PASSWORD_LENGTH = 8;

export const PASSWORD_HINT =
  "At least 8 characters with an uppercase letter, a lowercase letter, a number and a special character.";

/** Returns an error message if the password is weak, otherwise null. */
export function validatePassword(password: string): string | null {
  if (password.length < MIN_PASSWORD_LENGTH)
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  if (!/[A-Z]/.test(password))
    return "Password must include at least one uppercase letter";
  if (!/[a-z]/.test(password))
    return "Password must include at least one lowercase letter";
  if (!/[0-9]/.test(password))
    return "Password must include at least one number";
  if (!/[^A-Za-z0-9]/.test(password))
    return "Password must include at least one special character (e.g. @, #, $, !)";
  return null;
}