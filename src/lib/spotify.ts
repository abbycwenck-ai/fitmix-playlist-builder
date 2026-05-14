import { SpotifyArtist, SpotifyTrack } from '@/types';

const BASE = 'https://api.spotify.com/v1';

async function fetchSpotify(url: string, token: string) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Spotify error ${res.status}`);
  }
  return res.json();
}

export async function getCurrentUser(token: string) {
  return fetchSpotify(`${BASE}/me`, token);
}

export async function searchArtists(query: string, token: string): Promise<SpotifyArtist[]> {
  const data = await fetchSpotify(
    `${BASE}/search?q=${encodeURIComponent(query)}&type=artist&limit=6`,
    token
  );
  return data.artists.items.map((a: any) => ({
    id: a.id,
    name: a.name,
    imageUrl: a.images?.[0]?.url,
  }));
}

export async function getRecommendations(params: {
  seedArtistIds: string[];
  seedGenres: string[];
  targetTempo: number;
  minTempo: number;
  maxTempo: number;
  limit: number;
  token: string;
}): Promise<SpotifyTrack[]> {
  const { seedArtistIds, seedGenres, targetTempo, minTempo, maxTempo, limit, token } = params;

  const seeds: string[] = [];
  const artistSeeds = seedArtistIds.slice(0, 2);
  const genreSeeds = seedGenres.slice(0, Math.max(1, 5 - artistSeeds.length));

  const qp = new URLSearchParams({
    limit: String(Math.min(limit, 100)),
    target_tempo: String(Math.round(targetTempo)),
    min_tempo: String(Math.round(minTempo)),
    max_tempo: String(Math.round(maxTempo)),
    min_energy: targetTempo > 130 ? '0.6' : '0.3',
    target_energy: targetTempo > 130 ? '0.85' : '0.5',
  });

  if (artistSeeds.length) qp.set('seed_artists', artistSeeds.join(','));
  if (genreSeeds.length) qp.set('seed_genres', genreSeeds.join(','));

  const data = await fetchSpotify(`${BASE}/recommendations?${qp}`, token);
  const tracks: SpotifyTrack[] = data.tracks.map((t: any) => ({
    id: t.id,
    name: t.name,
    artists: t.artists,
    album: t.album,
    duration_ms: t.duration_ms,
    preview_url: t.preview_url,
    uri: t.uri,
  }));

  // Fetch audio features to get real BPM
  if (tracks.length === 0) return [];
  const ids = tracks.map(t => t.id).join(',');
  const features = await fetchSpotify(`${BASE}/audio-features?ids=${ids}`, token);
  const tempoMap: Record<string, number> = {};
  for (const f of features.audio_features || []) {
    if (f) tempoMap[f.id] = f.tempo;
  }
  return tracks.map(t => ({ ...t, tempo: tempoMap[t.id] }));
}

export async function createSpotifyPlaylist(params: {
  userId: string;
  name: string;
  description: string;
  trackUris: string[];
  token: string;
}): Promise<{ id: string; external_urls: { spotify: string } }> {
  const { userId, name, description, trackUris, token } = params;

  const playlist = await fetch(`${BASE}/users/${userId}/playlists`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description, public: false }),
  }).then(r => r.json());

  // Add tracks in batches of 100
  for (let i = 0; i < trackUris.length; i += 100) {
    const batch = trackUris.slice(i, i + 100);
    await fetch(`${BASE}/playlists/${playlist.id}/tracks`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ uris: batch }),
    });
  }

  return playlist;
}
