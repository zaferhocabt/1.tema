import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, Trophy, ArrowRight, RotateCcw } from 'lucide-react';
import { LevelInfo, CharacterId } from '../types/game';
import { CharacterGuide } from './CharacterGuide';
import { sounds } from '../utils/soundEffects';

interface Props {
  level: LevelInfo;
  characterId: CharacterId;
  correctCount: number;
  totalCount: number;
  earnedStars: number;
  earnedScore: number;
  isGameOverByLives?: boolean;
  onNextLevel: () => void;
  onRetry: () => void;
  onBackToMap: () => void;
}

export const LevelCompleteModal: React.FC<Props> = ({
  level,
  characterId,
  correctCount,
  totalCount,
  earnedStars,
  earnedScore,
  isGameOverByLives = false,
  onNextLevel,
  onRetry,
  onBackToMap,
}) => {
  useEffect(() => {
    if (!isGameOverByLives && earnedStars > 0) {
      sounds.playVictory();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isGameOverByLives, earnedStars]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden">
        {/* Confetti or Warning Header */}
        {!isGameOverByLives ? (
          <>
            <div className="w-20 h-20 mx-auto mb-3 rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-900 flex items-center justify-center text-4xl shadow-xl shadow-amber-500/20 animate-bounce-subtle">
              {level.badgeIcon}
            </div>

            <h3 className="text-2xl font-bold text-white font-heading mb-1">
              {level.title} Tamamlandı!
            </h3>
            <p className="text-xs text-slate-400 mb-4">{level.subtitle}</p>

            {/* Stars */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {[1, 2, 3].map((starIdx) => (
                <Star
                  key={starIdx}
                  className={`w-8 h-8 transition-all duration-500 ${
                    starIdx <= earnedStars
                      ? 'text-amber-400 fill-amber-400 scale-110 drop-shadow-md'
                      : 'text-slate-600 scale-90'
                  }`}
                />
              ))}
            </div>

            {/* Companion celebration */}
            <div className="mb-6 flex justify-center">
              <CharacterGuide
                characterId={characterId}
                mood="celebrating"
                speechText={`Harika iş çıkardın! ${correctCount}/${totalCount} soruyu doğru bildin ve ${level.badgeName}'ni kazandın!`}
                size="md"
              />
            </div>

            {/* Score pill breakdown */}
            <div className="grid grid-cols-2 gap-3 mb-6 bg-slate-900/80 rounded-2xl p-3 border border-slate-700/60">
              <div>
                <span className="text-[11px] text-slate-400 block">Doğru Cevap</span>
                <span className="text-lg font-bold text-emerald-400 font-mono">
                  {correctCount} / {totalCount}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Kazanılan Puan</span>
                <span className="text-lg font-bold text-amber-400 font-mono">
                  +{earnedScore}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={onNextLevel}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <span>Sonraki Seviyeye Geç</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex gap-2">
                <button
                  onClick={onRetry}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Tekrar Dene
                </button>
                <button
                  onClick={onBackToMap}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Trophy className="w-3.5 h-3.5" />
                  Haritaya Dön
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Game Over (Canlar Bitti) */
          <>
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center text-3xl">
              💔
            </div>

            <h3 className="text-2xl font-bold text-white font-heading mb-1">
              Canların Tükendi!
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Üzülme! Bilişimde her hata yeni bir öğrenme fırsatıdır.
            </p>

            <div className="mb-6 flex justify-center">
              <CharacterGuide
                characterId={characterId}
                mood="sad"
                speechText="Sorun değil! İpuçlarına dikkat ederek hemen yeniden deneyebilirsin!"
                size="md"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={onRetry}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow"
              >
                Yeniden Dene
              </button>
              <button
                onClick={onBackToMap}
                className="flex-1 py-3 px-4 rounded-xl font-semibold text-xs bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
              >
                Haritaya Dön
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
