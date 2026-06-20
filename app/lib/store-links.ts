/**
 * App listing URLs. Set in `.env.local` for production:
 * NEXT_PUBLIC_APP_STORE_URL=https://apps.apple.com/app/.../id...
 * NEXT_PUBLIC_GOOGLE_PLAY_URL=https://play.google.com/store/apps/details?id=...
 */
export const APP_STORE_URL =
  process.env.NEXT_PUBLIC_APP_STORE_URL ??
  "https://apps.apple.com/search?term=Wash%20and%20Wow";

export const GOOGLE_PLAY_URL =
  process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL ??
  "https://play.google.com/store/search?q=Wash+and+Wow&c=apps";
