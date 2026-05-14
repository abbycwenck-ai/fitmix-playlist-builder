'use client';
import { ClassType } from '@/types';
import { CLASS_LABELS, CLASS_COLORS } from '@/lib/classStructures';

const TABS: ClassType[] = ['barre', 'cycling', 'tabata', 'pilates'];

interface Props {
  active: ClassType;
  onChange: (t: ClassType) => void;
}

export default function ClassTabs({ active, onChange }: Props) {
  return (
    <div className="flex gap-1 items-end px-6 pt-6">
      {TABS.map((tab, i) => {
        const isActive = tab === active;
        const colors = CLASS_COLORS[tab];
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`
              relative px-6 py-3 rounded-t-xl border-2 border-b-0 font-semibold text-sm tracking-wide
              transition-all duration-150 cursor-pointer
              ${isActive
                ? `${colors.tab} z-10 shadow-sm scale-y-100 -mb-px pb-4`
                : 'bg-white/60 border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-white/80 mb-0'
              }
            `}
            style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.04em' }}
          >
            {/* filing cabinet tab notch */}
            {isActive && (
              <span
                className={`absolute -bottom-1 left-0 right-0 h-1 ${colors.accent}`}
              />
            )}
            {CLASS_LABELS[tab]}
          </button>
        );
      })}
    </div>
  );
}
