'use client';
import { useState, useEffect } from 'react';
import { ClassType, ClassConfig, GeneratedPlaylist, PlaylistSegment, SpotifyTrack } from '@/types';
import { CLASS_LABELS, CLASS_COLORS, DEFAULT_SEGMENTS, GENRE_OPTIONS } from '@/lib/classStructures';
import { getStoredToken, initiateSpotifyLogin, logout } from '@/lib/spotifyAuth';
import { getCurrentUser, getRecommendations, createSpotifyPlaylist } from '@/lib/spotify';
import { getUsedTrackIds, markTracksUsed, clearUsedTracks, getUsedCount } from '@/lib/freshTracks';
import ClassTabs from '@/components/ClassTabs';
import SegmentBuilder from '@/components/SegmentBuilder';
import ArtistSearch from '@/components/ArtistSearch';
import PlaylistPreview from '@/components/PlaylistPreview';
import { LogIn, LogOut, RefreshCw, Music2, Sparkles, MapPin } from 'lucide-react';

function defaultConfig(type: ClassType): ClassConfig {
  return {
    type,
    totalMinutes: DEFAULT_SEGMENTS[type].reduce((s, seg) => s + seg.durationMinutes, 0),
    segments: DEFAULT_SEGMENTS[type].map(s => ({ ...s, id: Math.random().toString(36).slice(2) })),
    seedArtists: [],
    seedGenres: GENRE_OPTIONS[type].slice(0, 2),
    location: '',
    freshTracksOnly: false,
  };
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<ClassType>('barre');
  const [configs, setConfigs] = useState<Record<ClassType, ClassConfig>>({
    barre: defaultConfig('barre'),
    cycling: defaultConfig('cycling'),
    tabata: defaultConfig('tabata'),
    pilates: defaultConfig('pilates'),
  });
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: string; display_name: string; images: { url: string }[] } | null>(null);
  const [generating, setGenerating] = useState(false);
  const [playlist, setPlaylist] = useState<GeneratedPlaylist | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedUrl, setSavedUrl] = useState<string | null>(null);
  const [usedCount, setUsedCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const config = configs[activeTab];
  const colors = CLASS_COLORS[activeTab];

  const setConfig = (patch: Partial<ClassConfig>) =>
    setConfigs(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], ...patch } }));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      window.history.replaceState({}, '', '/');
      import('@/lib/spotifyAuth').then(({ exchangeCodeForToken }) => {
        exchangeCodeForToken(code)
          .then(tok => { setToken(tok); loadUser(tok); })
          .catch(e => setError(e.message));
      });
      return;
    }
    const stored = getStoredToken();
    if (stored) { setToken(stored); loadUser(stored); }
    setUsedCount(getUsedCount());
  }, []);

  async function loadUser(tok: string) {
    try {
      const u = await getCurrentUser(tok);
      setUser(u);
    } catch { logout(); setToken(null); }
  }

  async function generate() {
    if (!token) { initiateSpotifyLogin(); return; }
    setGenerating(true);
    setError(null);
    setPlaylist(null);
    setSavedUrl(null);

    const usedIds = config.freshTracksOnly ? getUsedTrackIds() : new Set<string>();

    try {
      const segments: PlaylistSegment[] = [];
      for (const seg of config.segments) {
        const targetTempo = (seg.bpmMin + seg.bpmMax) / 2;
        const recs = await getRecommendations({
          seedArtistIds: config.seedArtists.map(a => a.id),
          seedGenres: config.seedGenres,
          targetTempo,
          minTempo: seg.bpmMin,
          maxTempo: seg.bpmMax,
          limit: 50,
          token,
        });

        const filtered = config.freshTracksOnly ? recs.filter(t => !usedIds.has(t.id)) : recs;

        let totalMs = 0;
        const targetMs = seg.durationMinutes * 60_000;
        const picked: SpotifyTrack[] = [];
        for (const t of filtered) {
          if (totalMs >= targetMs) break;
          picked.push(t);
          totalMs += t.duration_ms;
        }

        segments.push({ segment: seg, tracks: picked.length > 0 ? picked : recs.slice(0, 3) });
      }

      const allTracks = segments.flatMap(s => s.tracks);
      const generated: GeneratedPlaylist = {
        id: Math.random().toString(36).slice(2),
        classType: activeTab,
        location: config.location,
        createdAt: new Date().toISOString(),
        segments,
        allTracks,
      };
      setPlaylist(generated);
      markTracksUsed(allTracks.map(t => t.id));
      setUsedCount(getUsedCount());
    } catch (e: any) {
      setError(e.message || 'Failed to generate playlist');
    } finally {
      setGenerating(false);
    }
  }

  async function savePlaylist() {
    if (!token || !playlist || !user) return;
    setSaving(true);
    try {
      const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const name = `${CLASS_LABELS[activeTab]} Class${config.location ? ' · ' + config.location : ''} — ${date}`;
      const result = await createSpotifyPlaylist({
        userId: user.id,
        name,
        description: `Generated by FitMix · ${playlist.allTracks.length} tracks`,
        trackUris: playlist.allTracks.map(t => t.uri),
        token,
      });
      setSavedUrl(result.external_urls.spotify);
    } catch (e: any) {
      setError(e.message || 'Failed to save playlist');
    } finally {
      setSaving(false);
    }
  }

  const toggleGenre = (genre: string) => {
    const genres = config.seedGenres.includes(genre)
      ? config.seedGenres.filter(g => g !== genre)
      : [...config.seedGenres, genre].slice(0, 5);
    setConfig({ seedGenres: genres });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      <header className="bg-white/80 backdrop-blur border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music2 size={20} className="text-slate-700" />
            <span className="font-bold text-slate-800 text-lg" style={{ fontFamily: 'Georgia, serif' }}>
              FitMix
            </span>
            <span className="text-xs text-slate-400 hidden sm:block">Fitness Playlist Builder</span>
          </div>
          <div className="flex items-center gap-3">
            {usedCount > 0 && (
              <button
                onClick={() => { clearUsedTracks(); setUsedCount(0); }}
                className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
                title="Clear fresh tracks history"
              >
                <RefreshCw size={12} />
                <span className="hidden sm:block">{usedCount} tracked</span>
              </button>
            )}
            {user ? (
              <div className="flex items-center gap-2">
                {user.images[0]?.url && (
                  <img src={user.images[0].url} className="w-7 h-7 rounded-full object-cover" />
                )}
                <span className="text-sm text-slate-700 font-medium hidden sm:block">{user.display_name}</span>
                <button
                  onClick={() => { logout(); setToken(null); setUser(null); }}
                  className="text-slate-400 hover:text-slate-600 p-1"
                  title="Log out"
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => initiateSpotifyLogin()}
                className="flex items-center gap-1.5 bg-[#1DB954] hover:bg-[#1aa34a] text-white text-sm font-medium px-4 py-2 rounded-full transition"
              >
                <LogIn size={14} /> Connect Spotify
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto pb-16">
        <ClassTabs active={activeTab} onChange={t => { setActiveTab(t); setPlaylist(null); setSavedUrl(null); }} />

        <div className={`rounded-b-2xl rounded-tr-2xl border-2 ${colors.border} bg-white/90 backdrop-blur shadow-sm mx-6`}>
          <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">

            <div className="lg:col-span-3 p-6 space-y-6">
              <SegmentBuilder
                segments={config.segments}
                onChange={segments => setConfig({ segments })}
                accentColor={colors.accent}
              />

              <ArtistSearch
                token={token}
                selected={config.seedArtists}
                onChange={seedArtists => setConfig({ seedArtists })}
                accentColor={colors.accent}
              />

              <div className="space-y-2">
                <label className="text-xs text-slate-500 font-medium uppercase tracking-wider">Genres (up to 5)</label>
                <div className="flex flex-wrap gap-1.5">
                  {GENRE_OPTIONS[activeTab].map(genre => (
                    <button
                      key={genre}
                      onClick={() => toggleGenre(genre)}
                      className={`text-xs px-3 py-1 rounded-full border transition ${
                        config.seedGenres.includes(genre)
                          ? `${colors.accent} text-white border-transparent`
                          : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-500 font-medium uppercase tracking-wider">Studio / Location</label>
                <div className="relative">
                  <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={config.location}
                    onChange={e => setConfig({ location: e.target.value })}
                    placeholder="e.g. The Barre Studio, Brooklyn"
                    className="w-full pl-8 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-amber-500" /> Fresh Tracks Only
                  </p>
                  <p className="text-xs text-slate-400">Skip songs used in previous playlists</p>
                </div>
                <button
                  onClick={() => setConfig({ freshTracksOnly: !config.freshTracksOnly })}
                  className={`relative w-10 h-5 rounded-full transition-colors ${config.freshTracksOnly ? colors.accent : 'bg-slate-200'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${config.freshTracksOnly ? 'translate-x-5' : ''}`} />
                </button>
              </div>

              {error && (
                <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-3 py-2">{error}</p>
              )}

              <button
                onClick={generate}
                disabled={generating}
                className={`w-full py-3 rounded-xl ${colors.accent} text-white font-bold text-sm tracking-wide hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2`}
              >
                {generating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Building playlist…
                  </>
                ) : (
                  <>{token ? '✦ Generate Playlist' : '🔗 Connect Spotify to Generate'}</>
                )}
              </button>
            </div>

            <div className="lg:col-span-2 p-6">
              {playlist ? (
                <PlaylistPreview
                  playlist={playlist}
                  onSave={savePlaylist}
                  saving={saving}
                  savedUrl={savedUrl}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center gap-3">
                  <div className={`w-16 h-16 rounded-full ${colors.bg} border-2 ${colors.border} flex items-center justify-center`}>
                    <Music2 size={24} className="text-slate-400" />
                  </div>
                  <p className="text-slate-500 text-sm font-medium">Your playlist will appear here</p>
                  <p className="text-slate-300 text-xs max-w-[200px]">
                    Customize the structure, pick artists, and hit Generate
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
