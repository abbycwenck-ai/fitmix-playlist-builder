import { ClassType, Segment } from '@/types';

export const CLASS_LABELS: Record<ClassType, string> = {
  barre: 'Barre',
  cycling: 'Cycling',
  tabata: 'Tabata',
  pilates: 'Pilates / Core',
};

export const CLASS_COLORS: Record<ClassType, {
  bg: string; tab: string; accent: string; border: string;
  hero: string; heroText: string; pill: string; pillText: string; glow: string;
}> = {
  barre: {
    bg: 'bg-rose-50',
    tab: 'bg-rose-100 border-rose-300 text-rose-800',
    accent: 'bg-rose-500',
    border: 'border-rose-300',
    hero: 'from-rose-600 via-pink-500 to-fuchsia-500',
    heroText: 'text-rose-100',
    pill: 'bg-rose-500',
    pillText: 'text-white',
    glow: 'shadow-rose-200',
  },
  cycling: {
    bg: 'bg-orange-50',
    tab: 'bg-orange-100 border-orange-300 text-orange-800',
    accent: 'bg-orange-500',
    border: 'border-orange-300',
    hero: 'from-orange-500 via-amber-400 to-yellow-400',
    heroText: 'text-orange-100',
    pill: 'bg-orange-500',
    pillText: 'text-white',
    glow: 'shadow-orange-200',
  },
  tabata: {
    bg: 'bg-violet-50',
    tab: 'bg-violet-100 border-violet-300 text-violet-800',
    accent: 'bg-violet-600',
    border: 'border-violet-300',
    hero: 'from-violet-700 via-purple-600 to-indigo-500',
    heroText: 'text-violet-100',
    pill: 'bg-violet-600',
    pillText: 'text-white',
    glow: 'shadow-violet-200',
  },
  pilates: {
    bg: 'bg-teal-50',
    tab: 'bg-teal-100 border-teal-300 text-teal-800',
    accent: 'bg-teal-500',
    border: 'border-teal-300',
    hero: 'from-teal-500 via-cyan-400 to-emerald-400',
    heroText: 'text-teal-100',
    pill: 'bg-teal-500',
    pillText: 'text-white',
    glow: 'shadow-teal-200',
  },
};

const id = () => Math.random().toString(36).slice(2);

export const DEFAULT_SEGMENTS: Record<ClassType, Segment[]> = {
  barre: [
    { id: id(), name: 'Warmup', durationMinutes: 5, bpmMin: 110, bpmMax: 125 },
    { id: id(), name: 'Arms', durationMinutes: 8, bpmMin: 120, bpmMax: 135 },
    { id: id(), name: 'Thighs', durationMinutes: 8, bpmMin: 125, bpmMax: 140 },
    { id: id(), name: 'Seat Work', durationMinutes: 8, bpmMin: 125, bpmMax: 140 },
    { id: id(), name: 'Plank / Core', durationMinutes: 5, bpmMin: 115, bpmMax: 130 },
    { id: id(), name: 'Stretch & Cool Down', durationMinutes: 5, bpmMin: 70, bpmMax: 95 },
  ],
  cycling: [
    { id: id(), name: 'Warmup', durationMinutes: 5, bpmMin: 120, bpmMax: 130 },
    { id: id(), name: 'Build', durationMinutes: 8, bpmMin: 130, bpmMax: 145 },
    { id: id(), name: 'Peak', durationMinutes: 10, bpmMin: 145, bpmMax: 165 },
    { id: id(), name: 'Recovery', durationMinutes: 5, bpmMin: 110, bpmMax: 125 },
    { id: id(), name: 'Sprint Intervals', durationMinutes: 10, bpmMin: 150, bpmMax: 175 },
    { id: id(), name: 'Cool Down', durationMinutes: 5, bpmMin: 85, bpmMax: 105 },
  ],
  tabata: [
    { id: id(), name: 'Warmup', durationMinutes: 4, bpmMin: 115, bpmMax: 130 },
    { id: id(), name: 'Round 1 (Work)', durationMinutes: 4, bpmMin: 140, bpmMax: 165 },
    { id: id(), name: 'Rest', durationMinutes: 2, bpmMin: 80, bpmMax: 100 },
    { id: id(), name: 'Round 2 (Work)', durationMinutes: 4, bpmMin: 140, bpmMax: 165 },
    { id: id(), name: 'Rest', durationMinutes: 2, bpmMin: 80, bpmMax: 100 },
    { id: id(), name: 'Round 3 (Work)', durationMinutes: 4, bpmMin: 145, bpmMax: 170 },
    { id: id(), name: 'Cool Down', durationMinutes: 4, bpmMin: 75, bpmMax: 95 },
  ],
  pilates: [
    { id: id(), name: 'Breathwork & Warmup', durationMinutes: 5, bpmMin: 80, bpmMax: 100 },
    { id: id(), name: 'Core Activation', durationMinutes: 8, bpmMin: 95, bpmMax: 115 },
    { id: id(), name: 'Glutes & Hips', durationMinutes: 8, bpmMin: 100, bpmMax: 120 },
    { id: id(), name: 'Full Body Flow', durationMinutes: 10, bpmMin: 110, bpmMax: 128 },
    { id: id(), name: 'Stretch', durationMinutes: 7, bpmMin: 65, bpmMax: 85 },
  ],
};

export const GENRE_OPTIONS: Record<ClassType, string[]> = {
  barre: ['pop', 'indie-pop', 'dance-pop', 'soul', 'r-n-b', 'folk', 'classical'],
  cycling: ['edm', 'hip-hop', 'rock', 'pop', 'electronic', 'dance', 'house'],
  tabata: ['hip-hop', 'rock', 'edm', 'metal', 'electronic', 'drum-and-bass', 'pop'],
  pilates: ['ambient', 'chill', 'acoustic', 'classical', 'new-age', 'indie', 'folk'],
};

export const CLASS_EMOJI: Record<ClassType, string> = {
  barre: '🩰',
  cycling: '🚴',
  tabata: '🔥',
  pilates: '🧘',
};

export const CLASS_TAGLINES: Record<ClassType, string> = {
  barre: 'Elegant. Precise. Burn.',
  cycling: 'Push harder. Go faster. Feel alive.',
  tabata: '20 seconds of everything you have.',
  pilates: 'Breathe deep. Move with intention.',
};

export const CLASS_VIBE_PLACEHOLDER: Record<ClassType, string> = {
  barre: 'e.g. "Feminine and powerful, like a ballet meets pop concert — think Beyoncé meets Tchaikovsky"',
  cycling: 'e.g. "A festival on a bike — high energy EDM drops with hip hop hype breaks"',
  tabata: 'e.g. "Aggressive and raw — metal riffs, heavy bass, zero chill"',
  pilates: 'e.g. "Dreamy and focused — like yoga but cooler, acoustic with some lo-fi chill"',
};

// Maps vibe keywords → Spotify genre seeds + energy hints
export function parseVibeToGenres(vibe: string, classType: ClassType): string[] {
  const v = vibe.toLowerCase();
  const base = GENRE_OPTIONS[classType];
  const found: string[] = [];

  const map: [string[], string][] = [
    [['hip hop', 'hip-hop', 'rap', 'trap', 'hype'], 'hip-hop'],
    [['edm', 'electronic', 'rave', 'festival', 'drop'], 'edm'],
    [['pop', 'catchy', 'radio', 'mainstream'], 'pop'],
    [['rock', 'guitar', 'band', 'grunge'], 'rock'],
    [['metal', 'heavy', 'aggressive', 'intense', 'raw'], 'metal'],
    [['soul', 'r&b', 'rnb', 'groove', 'smooth'], 'r-n-b'],
    [['jazz', 'lounge', 'swing'], 'jazz'],
    [['classical', 'orchestra', 'ballet', 'tchaikovsky', 'piano'], 'classical'],
    [['indie', 'alternative', 'lo-fi', 'lofi', 'chill'], 'indie'],
    [['acoustic', 'unplugged', 'guitar', 'folk', 'singer'], 'acoustic'],
    [['dance', 'disco', 'house', 'club'], 'dance'],
    [['ambient', 'meditative', 'calm', 'peaceful', 'dreamy'], 'ambient'],
    [['latin', 'salsa', 'reggaeton', 'spanish'], 'latin'],
    [['funk', 'funky', 'groove'], 'funk'],
  ];

  for (const [keywords, genre] of map) {
    if (keywords.some(k => v.includes(k))) found.push(genre);
  }

  const merged = [...new Set([...found, ...base])].slice(0, 5);
  return merged.length > 0 ? merged : base.slice(0, 3);
}
