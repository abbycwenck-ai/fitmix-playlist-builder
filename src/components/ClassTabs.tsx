'use client';
import { ClassType } from '@/types';
import { CLASS_LABELS, CLASS_COLORS, CLASS_EMOJI } from '@/lib/classStructures';

const TABS: ClassType[] = ['barre', 'cycling', 'tabata', 'pilates'];

interface Props {
  active: ClassType;
  onChange: (t: ClassType) => void;
}

export default function ClassTabs({ active, onChange }: Props) {
  return (
    <div className="flex gap-1.5 items-end px-6 pt-8">
      {TABS.map((tab) => {
        const isActive = tab === active;
        const colors = CLASS_COLORS[tab];
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`
              relative px-5 py-3 rounded-t-2xl border-2 border-b-0 font-bold text-sm
              transition-all duration-200 cursor-pointer select-none
              ${isActive
                ? `bg-gradient-to-br ${colors.hero} text-white border-transparent z-10 -mb-px pb-4 shadow-lg ${colors.glow}`
                : 'bg-white/70 border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-white mb-0'
              }
            `}
          >
            <span className="flex items-center gap-1.5">
              <span className="text-base">{CLASS_EMOJI[tab]}</span>
              <span className="tracking-wide">{CLASS_LABELS[tab]}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
