import React from 'react';
import { Volume2, VolumeX, Sparkles, Award, Package } from 'lucide-react';
import { GameState } from '../types/game';

interface Props {
  gameState: GameState;
  onNavigate: (mode: GameState['gameMode']) => void;
  onToggleSound: () => void;
  onOpenCertificate: () => void;
  onOpenGlossary: () => void;
  onOpenScorm: () => void;
  isLmsConnected?: boolean;
}

export const Navbar: React.FC<Props> = ({
  gameState,
  onNavigate,
  onToggleSound,
  onOpenCertificate,
  onOpenGlossary,
  onOpenScorm,
  isLmsConnected = false,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title wordmark, single line */}
        <div
          onClick={() => onNavigate('map')}
          className="flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
              TeknoMacera 5
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs text-slate-400 font-medium">
              1. Tema Bilişim
            </span>
          </div>
        </div>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onNavigate('map')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              gameState.gameMode === 'map' ? 'text-indigo-400 border-b-2 border-indigo-400' : ''
            }`}
          >
            Bölüm Haritası
          </button>
          <button
            onClick={() => {
              gameState.activeMiniGame = 'deve-cuce';
              onNavigate('minigame');
            }}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              gameState.gameMode === 'minigame' && gameState.activeMiniGame === 'deve-cuce'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : ''
            }`}
          >
            Deve mi Cüce mi?
          </button>
          <button
            onClick={() => {
              gameState.activeMiniGame = 'data-ladder';
              onNavigate('minigame');
            }}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              gameState.gameMode === 'minigame' && gameState.activeMiniGame === 'data-ladder'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : ''
            }`}
          >
            Veri Merdiveni
          </button>
          <button
            onClick={onOpenGlossary}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 text-slate-300"
          >
            Bilişim Sözlüğü
          </button>
        </nav>

        {/* Zone 3: 1 primary action cluster */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Audio toggle */}
          <button
            onClick={onToggleSound}
            aria-label="Ses Aç/Kapat"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {gameState.soundEnabled ? (
              <Volume2 className="w-5 h-5 text-indigo-400" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-500" />
            )}
          </button>

          {/* SCORM package button */}
          <button
            onClick={onOpenScorm}
            title="EBA / Moodle SCORM Paketini İndir"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all whitespace-nowrap shrink-0 ${
              isLmsConnected
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-indigo-300 hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">SCORM Paketi</span>
            <span className="sm:hidden">SCORM</span>
          </button>

          {/* Certificate button */}
          <button
            onClick={onOpenCertificate}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm hover:shadow-indigo-500/25 transition-all whitespace-nowrap shrink-0"
          >
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Başarı Belgesi</span>
            <span className="sm:hidden">Belge</span>
          </button>
        </div>
      </div>
    </header>
  );
};
