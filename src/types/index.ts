export type ClassType = 'barre' | 'cycling' | 'tabata' | 'pilates';

export interface Segment {
  id: string;
  name: string;
  durationMinutes: number;
  bpmMin: number;
  bpmMax: number;
}

export interface ClassConfig {
  type: ClassType;
  totalMinutes: number;
  segments: Segment[];
  seedArtists: SpotifyArtist[];
  seedGenres: string[];
  location: string;
  freshTracksOnly: boolean;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { name: string; images: { url: string }[] };
  duration_ms: number;
  preview_url: string | null;
  tempo?: number;
  uri: string;
}

export interface PlaylistSegment {
  segment: Segment;
  tracks: SpotifyTrack[];
}

export interface GeneratedPlaylist {
  id: string;
  classType: ClassType;
  location: string;
  createdAt: string;
  segments: PlaylistSegment[];
  allTracks: SpotifyTrack[];
}

export interface SpotifyUser {
  id: string;
  display_name: string;
  images: { url: string }[];
}
