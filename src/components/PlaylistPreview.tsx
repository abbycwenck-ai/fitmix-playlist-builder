'use client';
import { useState, useRef } from 'react';
import { GeneratedPlaylist, SpotifyTrack } from '@/types';
import { CLASS_COLORS } from '@/lib/classStructures';
import { Play, Pause, Music, ExternalLink, Save } from 'lucide-react';

interface Props {
  playlist: GeneratedPlaylist;
  onSave: () => void;
  saving: boolean;
  savedUrl: string | null;
}

function formatMs(ms: number) {
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function PlaylistPreview({ playlist, onSave, saving, savedUrl }: Props) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const colors = CLASS_COLORS[playlist.classType];

  const togglePreview = (track: SpotifyTrack) => {
    if (!track.preview_url) return;
    if (playingId === track.id) {
      audioRef.current?.pause();
      setPlayingId(null);
      return;
    }
    if (audioRef.current) audioRef.current.pause();
    const audio = new Audio(track.preview_url);
    audio.volume = 0.7;
    audio.play();
    audio.onended = () => setPlayingId(null);
    audioRef.current = audio;
    setPlayingId(track.id);
  };

  const totalTracks = playlist.allTracks.length;
  const totalMs = playlist.allTracks.reduce((s, t) => s + t.duration_ms, 0);
  const totalMin = Math.round(totalMs / 60000);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800 capitalize">
            {CLASS_COLORS[playlist.classType] && playlist.classType} class
            {playlist.location && <span className="font-normal text-slate-500"> · {playlist.location}</span>}
          </h3>
          <p className="text-sm text-slate-400">{totalTracks} tracks · {totalMin} min</p>
        </div>
        <div className="flex gap-2">
          {savedUrl ? (
            <a
              href={savedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 px-4 py-2 ${colors.accent} text-white text-sm font-medium rounded-xl hover:opacity-90 transition`}
            >
              Open in Spotify <ExternalLink size={13} />
            </a>
          ) : (
            <button
              onClick={onSave}
              disabled={saving}
              className={`flex items-center gap-1.5 px-4 py-2 ${colors.accent} text-white text-sm font-medium rounded-xl hover:opacity-90 transition disabled:opacity-60`}
            >
              {saving ? (
                <span className="flex items-center gap-1.5">
                  <div className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Saving…
                </span>
              ) : (
                <><Save size={13} /> Save to Spotify</>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Segments */}
      {playlist.segments.map(({ segment, tracks }) => (
        <div key={segment.id}>
          <div className={`flex items-center gap-2 mb-2 px-3 py-1.5 rounded-lg ${colors.bg} border ${colors.border}`}>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{segment.name}</span>
            <span className="text-xs text-slate-400">
              {segment.durationMinutes} min · {segment.bpmMin}–{segment.bpmMax} BPM
            </span>
          </div>
          <div className="space-y-1">
            {tracks.map(track => (
              <div
                key={track.id}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 transition group ${playingId === track.id ? 'bg-slate-50' : ''}`}
              >
                {/* Album art */}
                <div className="relative shrink-0 w-9 h-9">
                  {track.album.images[0]?.url
                    ? <img src={track.album.images[0].url} className="w-9 h-9 rounded-lg object-cover" />
                    : <div className="w-9 h-9 rounded-lg bg-slate-200 flex items-center justify-center"><Music size={14} className="text-slate-400" /></div>
                  }
                  {track.preview_url && (
                    <button
                      onClick={() => togglePreview(track)}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition"
                    >
                      {playingId === track.id
                        ? <Pause size={14} className="text-white" />
                        : <Play size={14} className="text-white" />
                      }
                    </button>
                  )}
                </div>
                {/* Track info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{track.name}</p>
                  <p className="text-xs text-slate-400 truncate">{track.artists.map(a => a.name).join(', ')}</p>
                </div>
                {/* BPM + duration */}
                <div className="text-right shrink-0">
                  {track.tempo && (
                    <p className="text-xs font-medium text-slate-500">{Math.round(track.tempo)} BPM</p>
                  )}
                  <p className="text-xs text-slate-300">{formatMs(track.duration_ms)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
