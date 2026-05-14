'use client';
import React from 'react';
import { ClassType } from '@/types';
import { CLASS_COLORS, CLASS_LABELS, CLASS_TAGLINES, CLASS_VIBE_PLACEHOLDER, parseVibeToGenres } from '@/lib/classStructures';
import { Wand2 } from 'lucide-react';

// SVG illustrations per class type
function BarreIllustration() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="w-28 h-24 opacity-90">
      {/* barre rail */}
      <rect x="10" y="55" width="100" height="5" rx="2.5" fill="white" opacity="0.4" />
      <rect x="15" y="40" width="4" height="20" rx="2" fill="white" opacity="0.3" />
      <rect x="101" y="40" width="4" height="20" rx="2" fill="white" opacity="0.3" />
      {/* figure at barre */}
      <circle cx="60" cy="18" r="8" fill="white" opacity="0.85" />
      <line x1="60" y1="26" x2="60" y2="50" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
      <line x1="60" y1="50" x2="40" y2="68" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
      <line x1="60" y1="50" x2="80" y2="68" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
      <line x1="60" y1="35" x2="40" y2="50" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
      <line x1="60" y1="35" x2="80" y2="50" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
      {/* sparkle */}
      <circle cx="95" cy="20" r="3" fill="white" opacity="0.5" />
      <circle cx="25" cy="30" r="2" fill="white" opacity="0.4" />
      <circle cx="105" cy="40" r="2" fill="white" opacity="0.3" />
    </svg>
  );
}

function CyclingIllustration() {
  return (
    <svg viewBox="0 0 130 100" fill="none" className="w-32 h-24 opacity-90">
      {/* wheels */}
      <circle cx="35" cy="68" r="24" stroke="white" strokeWidth="4" opacity="0.5" />
      <circle cx="95" cy="68" r="24" stroke="white" strokeWidth="4" opacity="0.5" />
      <circle cx="35" cy="68" r="4" fill="white" opacity="0.7" />
      <circle cx="95" cy="68" r="4" fill="white" opacity="0.7" />
      {/* spokes */}
      {[0,60,120,180,240,300].map(a => (
        <line key={a}
          x1={35 + 4*Math.cos(a*Math.PI/180)} y1={68 + 4*Math.sin(a*Math.PI/180)}
          x2={35 + 20*Math.cos(a*Math.PI/180)} y2={68 + 20*Math.sin(a*Math.PI/180)}
          stroke="white" strokeWidth="1.5" opacity="0.35" />
      ))}
      {[0,60,120,180,240,300].map(a => (
        <line key={a}
          x1={95 + 4*Math.cos(a*Math.PI/180)} y1={68 + 4*Math.sin(a*Math.PI/180)}
          x2={95 + 20*Math.cos(a*Math.PI/180)} y2={68 + 20*Math.sin(a*Math.PI/180)}
          stroke="white" strokeWidth="1.5" opacity="0.35" />
      ))}
      {/* frame */}
      <line x1="35" y1="68" x2="65" y2="40" stroke="white" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" />
      <line x1="65" y1="40" x2="95" y2="68" stroke="white" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" />
      <line x1="65" y1="40" x2="55" y2="68" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      {/* handlebar */}
      <line x1="65" y1="40" x2="72" y2="32" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      <line x1="68" y1="28" x2="76" y2="28" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      {/* rider */}
      <circle cx="62" cy="22" r="7" fill="white" opacity="0.85" />
      <line x1="62" y1="29" x2="65" y2="40" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      <line x1="62" y1="33" x2="72" y2="32" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      {/* speed lines */}
      <line x1="5" y1="50" x2="18" y2="50" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <line x1="2" y1="60" x2="12" y2="60" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      <line x1="8" y1="70" x2="15" y2="70" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.2" />
    </svg>
  );
}

function TabataIllustration() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="w-28 h-24 opacity-90">
      {/* figure jumping */}
      <circle cx="60" cy="15" r="8" fill="white" opacity="0.9" />
      <line x1="60" y1="23" x2="60" y2="52" stroke="white" strokeWidth="3.5" strokeLinecap="round" opacity="0.9" />
      {/* arms up */}
      <line x1="60" y1="32" x2="35" y2="18" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
      <line x1="60" y1="32" x2="85" y2="18" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
      {/* legs spread */}
      <line x1="60" y1="52" x2="38" y2="72" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
      <line x1="60" y1="52" x2="82" y2="72" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
      {/* fire flames */}
      <path d="M 20 90 Q 18 75 25 70 Q 22 80 28 78 Q 24 68 32 60 Q 30 72 36 70 Q 34 80 28 90 Z" fill="white" opacity="0.5" />
      <path d="M 85 90 Q 83 75 90 70 Q 87 80 93 78 Q 89 68 97 60 Q 95 72 101 70 Q 99 80 93 90 Z" fill="white" opacity="0.5" />
      {/* energy bursts */}
      <circle cx="15" cy="40" r="3" fill="white" opacity="0.4" />
      <circle cx="105" cy="35" r="3" fill="white" opacity="0.4" />
      <circle cx="110" cy="55" r="2" fill="white" opacity="0.3" />
      <circle cx="10" cy="60" r="2" fill="white" opacity="0.3" />
    </svg>
  );
}

function PilatesIllustration() {
  return (
    <svg viewBox="0 0 130 100" fill="none" className="w-32 h-24 opacity-90">
      {/* mat */}
      <rect x="10" y="78" width="110" height="8" rx="4" fill="white" opacity="0.25" />
      {/* figure in boat pose */}
      <circle cx="65" cy="48" r="8" fill="white" opacity="0.85" />
      <line x1="65" y1="56" x2="65" y2="72" stroke="white" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" />
      {/* legs raised in V */}
      <line x1="65" y1="72" x2="45" y2="52" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
      <line x1="65" y1="72" x2="85" y2="52" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
      {/* arms extended */}
      <line x1="65" y1="62" x2="42" y2="58" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <line x1="65" y1="62" x2="88" y2="58" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      {/* breath circles */}
      <circle cx="20" cy="30" r="8" stroke="white" strokeWidth="1.5" opacity="0.25" />
      <circle cx="20" cy="30" r="14" stroke="white" strokeWidth="1" opacity="0.15" />
      <circle cx="110" cy="25" r="6" stroke="white" strokeWidth="1.5" opacity="0.2" />
      <circle cx="110" cy="25" r="11" stroke="white" strokeWidth="1" opacity="0.1" />
      {/* leaf details */}
      <path d="M 100 80 Q 110 65 120 70 Q 110 75 100 80 Z" fill="white" opacity="0.3" />
      <path d="M 10 75 Q 20 60 30 65 Q 20 70 10 75 Z" fill="white" opacity="0.3" />
    </svg>
  );
}

const ILLUSTRATIONS: Record<ClassType, () => React.ReactElement> = {
  barre: BarreIllustration,
  cycling: CyclingIllustration,
  tabata: TabataIllustration,
  pilates: PilatesIllustration,
};

interface Props {
  classType: ClassType;
  vibe: string;
  onVibeChange: (v: string) => void;
  onVibeApply: (genres: string[]) => void;
}

export default function ClassHero({ classType, vibe, onVibeChange, onVibeApply }: Props) {
  const colors = CLASS_COLORS[classType];
  const Illustration = ILLUSTRATIONS[classType];

  const handleApply = () => {
    const genres = parseVibeToGenres(vibe, classType);
    onVibeApply(genres);
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors.hero} p-6 mb-6 shadow-xl ${colors.glow}`}>
      {/* background pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">
            {CLASS_LABELS[classType]} class
          </p>
          <h2 className="text-white text-2xl font-black leading-tight mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            {CLASS_TAGLINES[classType]}
          </h2>

          {/* Vibe input */}
          <div className="flex gap-2">
            <input
              value={vibe}
              onChange={e => onVibeChange(e.target.value)}
              placeholder={CLASS_VIBE_PLACEHOLDER[classType]}
              className="flex-1 bg-white/20 text-white placeholder-white/50 text-xs px-3 py-2 rounded-xl border border-white/30 focus:outline-none focus:border-white/60 backdrop-blur"
            />
            {vibe.trim().length > 5 && (
              <button
                onClick={handleApply}
                className="flex items-center gap-1 bg-white/25 hover:bg-white/35 text-white text-xs font-bold px-3 py-2 rounded-xl border border-white/30 transition whitespace-nowrap"
              >
                <Wand2 size={12} /> Apply vibe
              </button>
            )}
          </div>
          <p className="text-white/40 text-xs mt-1.5">Describe your class — we'll match the genres</p>
        </div>

        <div className="shrink-0 hidden sm:block">
          <Illustration />
        </div>
      </div>
    </div>
  );
}
