'use client';
import { Segment } from '@/types';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface Props {
  segments: Segment[];
  onChange: (segments: Segment[]) => void;
  accentColor: string;
}

const newSegment = (): Segment => ({
  id: Math.random().toString(36).slice(2),
  name: 'New Segment',
  durationMinutes: 5,
  bpmMin: 120,
  bpmMax: 140,
});

export default function SegmentBuilder({ segments, onChange, accentColor }: Props) {
  const update = (id: string, patch: Partial<Segment>) =>
    onChange(segments.map(s => (s.id === id ? { ...s, ...patch } : s)));

  const remove = (id: string) => onChange(segments.filter(s => s.id !== id));

  const totalMins = segments.reduce((sum, s) => sum + s.durationMinutes, 0);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
          Class Structure — {totalMins} min total
        </span>
        <button
          onClick={() => onChange([...segments, newSegment()])}
          className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full ${accentColor} text-white font-medium hover:opacity-90 transition`}
        >
          <Plus size={12} /> Add Segment
        </button>
      </div>

      {segments.map((seg, idx) => (
        <div key={seg.id} className="flex items-center gap-2 group">
          <GripVertical size={14} className="text-slate-300 shrink-0" />
          <div className="flex-1 grid grid-cols-12 gap-2 bg-white/80 border border-slate-200 rounded-xl px-3 py-2">
            {/* Segment number */}
            <div className="col-span-1 flex items-center">
              <span className="text-xs font-bold text-slate-400">{idx + 1}</span>
            </div>
            {/* Name */}
            <div className="col-span-4">
              <input
                value={seg.name}
                onChange={e => update(seg.id, { name: e.target.value })}
                className="w-full text-sm font-medium text-slate-800 bg-transparent border-b border-transparent focus:border-slate-300 focus:outline-none"
              />
            </div>
            {/* Duration */}
            <div className="col-span-2 flex items-center gap-1">
              <input
                type="number"
                value={seg.durationMinutes}
                onChange={e => update(seg.id, { durationMinutes: Number(e.target.value) })}
                min={1}
                max={60}
                className="w-12 text-sm text-center bg-slate-50 border border-slate-200 rounded-lg px-1 py-0.5 focus:outline-none focus:border-slate-400"
              />
              <span className="text-xs text-slate-400">min</span>
            </div>
            {/* BPM range */}
            <div className="col-span-4 flex items-center gap-1">
              <input
                type="number"
                value={seg.bpmMin}
                onChange={e => update(seg.id, { bpmMin: Number(e.target.value) })}
                min={60}
                max={200}
                className="w-14 text-sm text-center bg-slate-50 border border-slate-200 rounded-lg px-1 py-0.5 focus:outline-none focus:border-slate-400"
              />
              <span className="text-xs text-slate-400">–</span>
              <input
                type="number"
                value={seg.bpmMax}
                onChange={e => update(seg.id, { bpmMax: Number(e.target.value) })}
                min={60}
                max={220}
                className="w-14 text-sm text-center bg-slate-50 border border-slate-200 rounded-lg px-1 py-0.5 focus:outline-none focus:border-slate-400"
              />
              <span className="text-xs text-slate-400">BPM</span>
            </div>
            {/* Delete */}
            <div className="col-span-1 flex items-center justify-end">
              <button
                onClick={() => remove(seg.id)}
                className="opacity-0 group-hover:opacity-100 transition text-slate-300 hover:text-red-400"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
