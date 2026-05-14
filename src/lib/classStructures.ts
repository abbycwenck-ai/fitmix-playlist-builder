import { ClassType, Segment } from '@/types';

export const CLASS_LABELS: Record<ClassType, string> = {
  barre: 'Barre',
  cycling: 'Cycling',
  tabata: 'Tabata',
  pilates: 'Pilates / Core',
};

export const CLASS_COLORS: Record<ClassType, { bg: string; tab: string; accent: string; border: string }> = {
  barre: {
    bg: 'bg-rose-50',
    tab: 'bg-rose-100 border-rose-300 text-rose-800',
    accent: 'bg-rose-500',
    border: 'border-rose-300',
  },
  cycling: {
    bg: 'bg-orange-50',
    tab: 'bg-orange-100 border-orange-300 text-orange-800',
    accent: 'bg-orange-500',
    border: 'border-orange-300',
  },
  tabata: {
    bg: 'bg-violet-50',
    tab: 'bg-violet-100 border-violet-300 text-violet-800',
    accent: 'bg-violet-500',
    border: 'border-violet-300',
  },
  pilates: {
    bg: 'bg-teal-50',
    tab: 'bg-teal-100 border-teal-300 text-teal-800',
    accent: 'bg-teal-500',
    border: 'border-teal-300',
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
