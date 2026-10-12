import React, { useState } from 'react';
import { GameState, CharacterId } from '../types/game';
import { LEVELS, CHARACTERS } from '../data/curriculumData';
import { CharacterGuide } from './CharacterGuide';
import { sounds } from '../utils/soundEffects';
import { Play, Lock, Star, Gamepad2, Award, User, Edit3, Check } from 'lucide-react';

interface Props {
  gameState: GameState;
  onStartLevel: (levelId: number) => void;
  onStartMiniGame: (miniGameType: GameState['activeMiniGame']) => void;
  onSelectCharacter: (charId: CharacterId) => void;
  onUpdateStudentName: (name: string) => void;
  onOpenCertificate: () => void;
}

export const LevelMap: React.FC<Props> = ({
  gameState,
  onStartLevel,
  onStartMiniGame,
  onSelectCharacter,
  onUpdateStudentName,
  onOpenCertificate,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(gameState.studentName);
  const [showCharModal, setShowCharModal] = useState(false);

  const totalStars = Object.values(gameState.completedLevels).reduce((acc, curr) => acc + curr.stars, 0);

  const handleSaveName = () => {
    sounds.playClick();
    if (tempName.trim()) {
      onUpdateStudentName(tempName.trim());
    }
    setIsEditingName(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      {/* Hero Profile & Stats Bar */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-800/90 to-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Companion and Student Identity */}
          <div className="flex items-center gap-5">
            <div
              onClick={() => {
                sounds.playClick();
                setShowCharModal(true);
              }}
              className="group cursor-pointer"
              title="Rehber Karakterini Değiştir"
            >
              <CharacterGuide
                characterId={gameState.selectedCharacter}
                mood="idle"
                size="lg"
              />
              <span className="text-[11px] text-center block text-indigo-400 group-hover:underline mt-1 font-medium">
                Değiştir 🔄
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      placeholder="Öğrenci Adı"
                      className="px-3 py-1 bg-slate-900 border border-indigo-500 rounded-lg text-white font-bold text-sm focus:outline-none"
                    />
                    <button
                      onClick={handleSaveName}
                      className="p-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <h1 className="text-xl sm:text-2xl font-bold text-white font-heading">
                      {gameState.studentName}
                    </h1>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="p-1 text-slate-400 hover:text-white rounded-md transition-colors"
                      title="İsmi Düzenle"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-300">
                5. Sınıf Bilişim Kahramanı &amp; 1. Tema Yolcusu
              </p>

              {/* Badges preview */}
              <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                {LEVELS.map((lvl) => {
                  const isDone = gameState.completedLevels[lvl.id]?.stars > 0;
                  return (
                    <span
                      key={lvl.id}
                      title={`${lvl.badgeName} (${isDone ? 'Kazanıldı' : 'Kilitli'})`}
                      className={`text-lg p-1 rounded-lg border transition-transform ${
                        isDone
                          ? 'bg-amber-500/20 border-amber-500/40 scale-105'
                          : 'bg-slate-900 border-slate-800 opacity-30 grayscale'
                      }`}
                    >
                      {lvl.badgeIcon}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Score Metrics */}
          <div className="flex items-center gap-4 bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4">
            <div className="text-center px-3">
              <span className="text-xs text-slate-400 block mb-0.5">Yıldızlar</span>
              <div className="flex items-center justify-center gap-1 text-amber-400 font-bold font-mono text-xl tabular-nums">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{totalStars} / 18</span>
              </div>
            </div>

            <div className="h-8 w-[1px] bg-slate-700" />

            <div className="text-center px-3">
              <span className="text-xs text-slate-400 block mb-0.5">Toplam Puan</span>
              <div className="text-emerald-400 font-bold font-mono text-xl tabular-nums">
                {gameState.score}
              </div>
            </div>

            <div className="h-8 w-[1px] bg-slate-700" />

            <button
              onClick={onOpenCertificate}
              className="flex flex-col items-center justify-center px-3 py-1 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 transition-colors"
            >
              <Award className="w-5 h-5 text-amber-300 mb-0.5" />
              <span className="text-[11px] font-semibold">Sertifika</span>
            </button>
          </div>
        </div>
      </div>

      {/* Level Path Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white font-heading">
            1. Tema Seviye Görevleri
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Her seviyedeki soruları çöz, yıldızları topla ve yeni aşamaların kilidini aç!
          </p>
        </div>
        <span className="text-xs font-mono text-indigo-400 bg-indigo-950/40 border border-indigo-500/30 px-3 py-1.5 rounded-xl">
          Seviye {Math.min(gameState.playerLevel, 6)} / 6 Açık
        </span>
      </div>

      {/* 6 Level Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LEVELS.map((level) => {
          const isUnlocked = gameState.playerLevel >= level.id || totalStars >= level.requiredStars;
          const completedData = gameState.completedLevels[level.id];
          const starsEarned = completedData?.stars || 0;

          return (
            <div
              key={level.id}
              className={`relative rounded-3xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-lg ${
                isUnlocked
                  ? 'bg-slate-800/90 border-slate-700/80 hover:border-indigo-500/80 hover:shadow-indigo-500/10'
                  : 'bg-slate-900/60 border-slate-800/80 opacity-70'
              }`}
            >
              {/* Colored top bar banner */}
              <div className={`h-2.5 w-full bg-gradient-to-r ${level.color}`} />

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Top line: Level Tag & Stars */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      {level.topicTag}
                    </span>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1">
                      {[1, 2, 3].map((starIdx) => (
                        <Star
                          key={starIdx}
                          className={`w-4 h-4 ${
                            starIdx <= starsEarned
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Level Title */}
                  <h3 className="text-lg font-bold text-white mb-1.5">
                    {level.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {level.subtitle}
                  </p>

                  {/* Badge reward preview */}
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 mb-4">
                    <span className="text-xl">{level.badgeIcon}</span>
                    <div>
                      <span className="font-semibold block text-slate-200">{level.badgeName}</span>
                      <span className="text-[10px] text-slate-500">
                        {starsEarned > 0 ? 'Kazanıldı ✓' : 'Tamamlayınca açılır'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="space-y-2 pt-2 border-t border-slate-700/60">
                  {isUnlocked ? (
                    <>
                      <button
                        onClick={() => {
                          sounds.playClick();
                          onStartLevel(level.id);
                        }}
                        className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 text-white bg-gradient-to-r ${level.color} shadow-md hover:brightness-110 active:scale-98 transition-all`}
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>{starsEarned > 0 ? 'Tekrar Oyna' : 'Görevi Başlat'}</span>
                      </button>

                      {/* Mini game button if present */}
                      {level.hasMiniGame && level.miniGameType && (
                        <button
                          onClick={() => {
                            sounds.playClick();
                            onStartMiniGame(level.miniGameType);
                          }}
                          className="w-full py-2 px-3 rounded-xl border border-indigo-500/50 hover:bg-indigo-950/40 text-indigo-300 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                        >
                          <Gamepad2 className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Mini Oyun: {level.miniGameTitle}</span>
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 text-xs font-semibold">
                      <Lock className="w-4 h-4" />
                      <span>{level.requiredStars} Yıldız ile Açılır</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Character Switcher Modal */}
      {showCharModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white font-heading mb-1 text-center">
              Rehber Karakterini Seç
            </h3>
            <p className="text-xs text-slate-400 text-center mb-6">
              Macera boyunca sana ipuçları verecek ve seninle sevinecek karakter:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {CHARACTERS.map((char) => (
                <div
                  key={char.id}
                  onClick={() => {
                    sounds.playClick();
                    onSelectCharacter(char.id);
                    setShowCharModal(false);
                  }}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    gameState.selectedCharacter === char.id
                      ? 'bg-indigo-950/60 border-indigo-400 ring-2 ring-indigo-400 shadow'
                      : 'bg-slate-900/60 hover:bg-slate-900 border-slate-700'
                  }`}
                >
                  <CharacterGuide
                    characterId={char.id}
                    showDetails={true}
                    size="sm"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowCharModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold text-xs"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
