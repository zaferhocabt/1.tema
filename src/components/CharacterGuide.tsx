import React from 'react';
import { Character, CharacterId } from '../types/game';
import { CHARACTERS } from '../data/curriculumData';

interface Props {
  characterId: CharacterId;
  mood?: 'idle' | 'happy' | 'thinking' | 'sad' | 'celebrating';
  speechText?: string;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
  onSelect?: () => void;
  isSelected?: boolean;
}

export const CharacterGuide: React.FC<Props> = ({
  characterId,
  mood = 'idle',
  speechText,
  size = 'md',
  showDetails = false,
  onSelect,
  isSelected = false,
}) => {
  const character: Character = CHARACTERS.find((c) => c.id === characterId) || CHARACTERS[0];

  const renderSvgAvatar = () => {
    switch (character.id) {
      case 'pikso':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            {/* Body */}
            <circle cx="50" cy="56" r="34" fill="#F59E0B" />
            {/* Belly highlight */}
            <circle cx="50" cy="62" r="22" fill="#FDE68A" />
            {/* Ears */}
            <polygon points="26,34 16,12 40,24" fill="#D97706" />
            <polygon points="26,32 20,17 36,25" fill="#FDE68A" />
            <polygon points="74,34 84,12 60,24" fill="#D97706" />
            <polygon points="74,32 80,17 64,25" fill="#FDE68A" />
            {/* Gamer Headset */}
            <path d="M 22 52 A 28 28 0 0 1 78 52" fill="none" stroke="#6366F1" strokeWidth="5" strokeLinecap="round" />
            <rect x="14" y="46" width="10" height="18" rx="4" fill="#4F46E5" />
            <rect x="76" y="46" width="10" height="18" rx="4" fill="#4F46E5" />
            {/* Eyes */}
            {mood === 'happy' || mood === 'celebrating' ? (
              <>
                <path d="M 36 50 Q 42 42 48 50" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 52 50 Q 58 42 64 50" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
              </>
            ) : mood === 'sad' ? (
              <>
                <circle cx="42" cy="52" r="4.5" fill="#1E293B" />
                <circle cx="58" cy="52" r="4.5" fill="#1E293B" />
                <path d="M 44 64 Q 50 60 56 64" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx="42" cy="50" r="5" fill="#1E293B" />
                <circle cx="43.5" cy="48.5" r="1.8" fill="#FFFFFF" />
                <circle cx="58" cy="50" r="5" fill="#1E293B" />
                <circle cx="59.5" cy="48.5" r="1.8" fill="#FFFFFF" />
              </>
            )}
            {/* Pixel Nose & Whiskers */}
            <polygon points="48,58 52,58 50,61" fill="#EA580C" />
            {mood !== 'sad' && (
              <path d="M 46 62 Q 50 66 54 62" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
            )}
            {/* Whiskers */}
            <line x1="24" y1="56" x2="35" y2="58" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
            <line x1="24" y1="63" x2="35" y2="61" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
            <line x1="76" y1="56" x2="65" y2="58" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
            <line x1="76" y1="63" x2="65" y2="61" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
            {/* Pixel Sparkle */}
            <rect x="74" y="24" width="4" height="4" fill="#FDE047" />
            <rect x="78" y="28" width="4" height="4" fill="#FDE047" />
          </svg>
        );

      case 'civciv':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            {/* Robot Antenna */}
            <line x1="50" y1="12" x2="50" y2="28" stroke="#06B6D4" strokeWidth="4" strokeLinecap="round" />
            <circle cx="50" cy="11" r="6" fill="#F43F5E" className="animate-pulse" />
            {/* Robot Head Outer */}
            <rect x="22" y="28" width="56" height="52" rx="14" fill="#0E7490" stroke="#0891B2" strokeWidth="3" />
            {/* Screen Face */}
            <rect x="28" y="34" width="44" height="38" rx="8" fill="#164E63" />
            {/* Bolts / Ears */}
            <circle cx="18" cy="54" r="5" fill="#67E8F9" />
            <circle cx="82" cy="54" r="5" fill="#67E8F9" />
            {/* Digital Eyes */}
            {mood === 'happy' || mood === 'celebrating' ? (
              <>
                <path d="M 36 50 Q 42 42 46 50" fill="none" stroke="#22D3EE" strokeWidth="4" strokeLinecap="round" />
                <path d="M 54 50 Q 58 42 64 50" fill="none" stroke="#22D3EE" strokeWidth="4" strokeLinecap="round" />
              </>
            ) : mood === 'thinking' ? (
              <>
                <rect x="36" y="48" width="10" height="4" rx="2" fill="#22D3EE" />
                <circle cx="60" cy="50" r="4.5" fill="#22D3EE" />
              </>
            ) : mood === 'sad' ? (
              <>
                <circle cx="40" cy="50" r="4" fill="#38BDF8" />
                <circle cx="60" cy="50" r="4" fill="#38BDF8" />
                <path d="M 42 64 Q 50 59 58 64" fill="none" stroke="#F43F5E" strokeWidth="3" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx="40" cy="48" r="4.5" fill="#22D3EE" />
                <circle cx="60" cy="48" r="4.5" fill="#22D3EE" />
                <path d="M 40 60 Q 50 68 60 60" fill="none" stroke="#34D399" strokeWidth="3.5" strokeLinecap="round" />
              </>
            )}
            {/* Circuit pattern */}
            <line x1="32" y1="78" x2="68" y2="78" stroke="#0891B2" strokeWidth="3" strokeDasharray="4 2" />
          </svg>
        );

      case 'lara':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            {/* Cape behind */}
            <path d="M 28 40 L 16 88 L 84 88 L 72 40 Z" fill="#047857" />
            {/* Hair back */}
            <circle cx="50" cy="46" r="30" fill="#7C2D12" />
            {/* Face */}
            <circle cx="50" cy="52" r="22" fill="#FED7AA" />
            {/* Cyber Visor / Mask */}
            <path d="M 32 44 Q 50 48 68 44 L 66 54 Q 50 58 34 54 Z" fill="#10B981" opacity="0.95" />
            <path d="M 36 48 L 64 48" stroke="#ECFDF5" strokeWidth="2" strokeLinecap="round" />
            {/* Eyes behind translucent visor */}
            <circle cx="42" cy="50" r="2.5" fill="#064E3B" />
            <circle cx="58" cy="50" r="2.5" fill="#064E3B" />
            {/* Smile */}
            {mood === 'sad' ? (
              <path d="M 45 66 Q 50 62 55 66" fill="none" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" />
            ) : (
              <path d="M 44 63 Q 50 68 56 63" fill="none" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
            )}
            {/* Hair bangs */}
            <path d="M 28 40 Q 50 24 72 40 Q 60 32 50 36 Q 40 32 28 40 Z" fill="#9A3412" />
            {/* Shield Badge */}
            <polygon points="50,78 57,84 57,92 50,96 43,92 43,84" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
          </svg>
        );

      case 'bilge_arf':
      default:
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            {/* Owl Body */}
            <ellipse cx="50" cy="58" rx="30" ry="34" fill="#7E22CE" />
            <ellipse cx="50" cy="64" rx="20" ry="24" fill="#DDD6FE" />
            {/* Ear Tufts */}
            <polygon points="26,30 22,12 38,24" fill="#6B21A8" />
            <polygon points="74,30 78,12 62,24" fill="#6B21A8" />
            {/* Graduation / Scholar Cap */}
            <polygon points="50,14 82,24 50,34 18,24" fill="#1E1B4B" />
            <rect x="42" y="28" width="16" height="8" fill="#312E81" />
            <line x1="80" y1="24" x2="84" y2="44" stroke="#FBBF24" strokeWidth="2" />
            <circle cx="84" cy="45" r="2.5" fill="#F59E0B" />
            {/* Big Scholar Glasses */}
            <circle cx="37" cy="50" r="13" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="3" />
            <circle cx="63" cy="50" r="13" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="3" />
            <line x1="50" y1="50" x2="50" y2="50" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
            {/* Pupils */}
            {mood === 'happy' || mood === 'celebrating' ? (
              <>
                <path d="M 31 50 Q 37 43 43 50" fill="none" stroke="#1E1B4B" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 57 50 Q 63 43 69 50" fill="none" stroke="#1E1B4B" strokeWidth="3.5" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx="37" cy="50" r="5.5" fill="#1E1B4B" />
                <circle cx="39" cy="48" r="2" fill="#FFFFFF" />
                <circle cx="63" cy="50" r="5.5" fill="#1E1B4B" />
                <circle cx="65" cy="48" r="2" fill="#FFFFFF" />
              </>
            )}
            {/* Beak */}
            <polygon points="46,59 54,59 50,68" fill="#F59E0B" />
            {/* Mathematical Arf Symbol on Belly */}
            <text x="50" y="80" textAnchor="middle" fill="#6B21A8" fontSize="11" fontWeight="bold" fontFamily="monospace">
              f(x)
            </text>
          </svg>
        );
    }
  };

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-28 h-28',
  }[size];

  return (
    <div
      onClick={onSelect}
      className={`relative inline-flex items-center gap-3 transition-all ${
        onSelect ? 'cursor-pointer' : ''
      }`}
    >
      {/* Avatar Container */}
      <div
        className={`relative ${sizeClasses} rounded-2xl p-1.5 flex items-center justify-center border-2 shadow-sm transition-all ${
          isSelected
            ? 'ring-4 ring-indigo-400 border-indigo-400 scale-105'
            : character.avatarBg
        }`}
      >
        <div className="w-full h-full animate-float">
          {renderSvgAvatar()}
        </div>

        {/* Small mood badge */}
        {mood === 'happy' && (
          <span className="absolute -top-1 -right-1 text-sm bg-amber-400 text-slate-900 rounded-full w-5 h-5 flex items-center justify-center font-bold shadow">
            ⭐
          </span>
        )}
        {mood === 'celebrating' && (
          <span className="absolute -top-1 -right-1 text-sm bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold shadow">
            🎉
          </span>
        )}
      </div>

      {/* Speech Bubble / Information */}
      {speechText && (
        <div className="max-w-xs md:max-w-sm bg-slate-800/95 border border-slate-700/80 rounded-2xl px-4 py-2.5 shadow-lg text-slate-200 text-sm relative">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-0.5">
            {character.name}
          </div>
          <p className="leading-snug">{speechText}</p>
          {/* Arrow */}
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-slate-800" />
        </div>
      )}

      {/* Detailed selector card view */}
      {showDetails && (
        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-100 text-base">{character.name}</span>
            <span className={`text-xs font-semibold ${character.textColor}`}>({character.title})</span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{character.personality}</p>
        </div>
      )}
    </div>
  );
};
