'use client';
import { useState, useRef } from 'react';
import { SpotifyArtist } from '@/types';
import { searchArtists } from '@/lib/spotify';
import { Search, X } from 'lucide-react';

interface Props {
  token: string | null;
  selected: SpotifyArtist[];
  onChange: (artists: SpotifyArtist[]) => void;
  accentColor: string;
}

export default function ArtistSearch({ token, selected, onChange, accentColor }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SpotifyArtist[]>([]);
  const [loading, setLoading] = useState(false);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleQuery = (q: string) => {
    setQuery(q);
    if (!token || q.length < 2) { setResults([]); return; }
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(async () => {
      setLoading(true);
      try {
        const hits = await searchArtists(q, token);
        setResults(hits.filter(a => !selected.find(s => s.id === a.id)));
      } finally {
        setLoading(false);
      }
    }, 350);
  };

  const add = (artist: SpotifyArtist) => {
    if (selected.length >= 5) return;
    onChange([...selected, artist]);
    setQuery('');
    setResults([]);
  };

  const remove = (id: string) => onChange(selected.filter(a => a.id !== id));

  return (
    <div className="space-y-2">
      <label className="text-xs text-slate-500 font-medium uppercase tracking-wider">
        Seed Artists (up to 5)
      </label>

      {/* Selected pills */}
      <div className="flex flex-wrap gap-1.5 min-h-[28px]">
        {selected.map(a => (
          <span key={a.id} className="flex items-center gap-1 bg-slate-100 border border-slate-200 text-slate-700 text-xs px-2.5 py-1 rounded-full">
            {a.imageUrl && <img src={a.imageUrl} className="w-4 h-4 rounded-full object-cover" />}
            {a.name}
            <button onClick={() => remove(a.id)} className="ml-0.5 text-slate-400 hover:text-slate-600">
              <X size={11} />
            </button>
          </span>
        ))}
        {selected.length === 0 && (
          <span className="text-xs text-slate-300 italic self-center">No artists selected — any style</span>
        )}
      </div>

      {/* Search input */}
      {selected.length < 5 && (
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={e => handleQuery(e.target.value)}
            placeholder={token ? 'Search artists…' : 'Sign in to search artists'}
            disabled={!token}
            className="w-full pl-8 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
          )}
          {results.length > 0 && (
            <div className="absolute z-20 top-full mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
              {results.map(a => (
                <button
                  key={a.id}
                  onClick={() => add(a)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-slate-50 text-left"
                >
                  {a.imageUrl
                    ? <img src={a.imageUrl} className="w-7 h-7 rounded-full object-cover shrink-0" />
                    : <div className="w-7 h-7 rounded-full bg-slate-200 shrink-0" />
                  }
                  <span className="text-sm text-slate-800">{a.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
