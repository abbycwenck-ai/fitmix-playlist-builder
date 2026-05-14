const STORAGE_KEY = 'fitness_used_track_ids';

export function getUsedTrackIds(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export function markTracksUsed(trackIds: string[]) {
  if (typeof window === 'undefined') return;
  const existing = getUsedTrackIds();
  trackIds.forEach(id => existing.add(id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing]));
}

export function clearUsedTracks() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function getUsedCount(): number {
  return getUsedTrackIds().size;
}
