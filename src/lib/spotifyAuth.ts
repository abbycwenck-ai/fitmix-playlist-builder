// PKCE OAuth — no backend secret needed, safe for client-side
const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!;

const SCOPES = [
  'user-read-private',
  'user-read-email',
  'playlist-modify-private',
  'playlist-modify-public',
].join(' ');

function generateCodeVerifier(length = 128) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let result = '';
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  for (const b of bytes) result += chars[b % chars.length];
  return result;
}

async function generateCodeChallenge(verifier: string) {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function initiateSpotifyLogin() {
  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);
  sessionStorage.setItem('spotify_verifier', verifier);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    code_challenge_method: 'S256',
    code_challenge: challenge,
  });

  window.location.href = `https://accounts.spotify.com/authorize?${params}`;
}

export async function exchangeCodeForToken(code: string): Promise<string> {
  const verifier = sessionStorage.getItem('spotify_verifier');
  if (!verifier) throw new Error('No code verifier found');

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      code_verifier: verifier,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || 'Token exchange failed');

  const expiry = Date.now() + data.expires_in * 1000;
  localStorage.setItem('spotify_token', data.access_token);
  localStorage.setItem('spotify_token_expiry', String(expiry));
  if (data.refresh_token) localStorage.setItem('spotify_refresh_token', data.refresh_token);
  sessionStorage.removeItem('spotify_verifier');

  return data.access_token;
}

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem('spotify_token');
  const expiry = Number(localStorage.getItem('spotify_token_expiry') || 0);
  if (!token || Date.now() > expiry - 30_000) return null;
  return token;
}

export function logout() {
  localStorage.removeItem('spotify_token');
  localStorage.removeItem('spotify_token_expiry');
  localStorage.removeItem('spotify_refresh_token');
}
