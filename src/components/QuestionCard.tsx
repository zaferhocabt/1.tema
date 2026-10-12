import React, { useState, useEffect } from 'react';
import { Question, CharacterId } from '../types/game';
import { sounds } from '../utils/soundEffects';
import { CharacterGuide } from './CharacterGuide';
import { Lightbulb, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface Props {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  characterId: CharacterId;
  lives: number;
  score: number;
  streak: number;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

export const QuestionCard: React.FC<Props> = ({
  question,
  questionIndex,
  totalQuestions,
  characterId,
  lives,
  score,
  streak,
  onAnswer,
  onNext,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(question.difficulty === 'zor' ? 35 : question.difficulty === 'orta' ? 40 : 45);
  const [characterMood, setCharacterMood] = useState<'idle' | 'happy' | 'thinking' | 'sad'>('idle');
  const [speech, setSpeech] = useState<string>('Soruyu dikkatlice oku! En doğru seçeneği işaretle.');

  // Reset state on question change
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setTimeLeft(question.difficulty === 'zor' ? 35 : question.difficulty === 'orta' ? 40 : 45);
    setCharacterMood('idle');
    setSpeech('Soruyu dikkatlice oku! Gerekirse benden ipucu isteyebilirsin.');
  }, [question]);

  // Countdown timer
  useEffect(() => {
    if (isAnswered || timeLeft <= 0) {
      if (timeLeft <= 0 && !isAnswered) {
        // Time out treated as wrong
        handleOptionClick(-1);
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered]);

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;

    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === question.correctIndex;

    if (isCorrect) {
      sounds.playCorrect();
      if (streak >= 2) {
        sounds.playCombo();
      }
      setCharacterMood('happy');
      setSpeech('Tebrikler! Doğru cevap verdin. Bilişim bilgilerin parlıyor!');
      onAnswer(true);
    } else {
      sounds.playWrong();
      setCharacterMood('sad');
      setSpeech('Ah, bu sefer olmadı! Ama açıklamadaki bilgiyi okuyarak doğrusunu öğrenebilirsin.');
      onAnswer(false);
    }
  };

  const handleToggleHint = () => {
    sounds.playClick();
    setShowHint((prev) => !prev);
    setCharacterMood('thinking');
    setSpeech(`İpucu: ${question.hint}`);
  };

  const difficultyColors = {
    kolay: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    orta: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    zor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
  }[question.difficulty];

  return (
    <div className="max-w-3xl mx-auto px-4 py-4">
      {/* Top Status Bar: Question Count, Timer, Hearts, Score */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 bg-slate-800/80 border border-slate-700/80 rounded-2xl px-4 py-3 shadow">
        {/* Progress & Difficulty */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-300">
            Soru {questionIndex + 1} / {totalQuestions}
          </span>
          <span className="text-slate-600">·</span>
          <span className={`text-[11px] font-semibold uppercase px-2 py-0.5 rounded-md border ${difficultyColors}`}>
            {question.difficulty}
          </span>
        </div>

        {/* Hearts / Lives */}
        <div className="flex items-center gap-1.5" title={`${lives} Can Kaldı`}>
          {[1, 2, 3].map((heartIndex) => (
            <span
              key={heartIndex}
              className={`text-base transition-transform ${
                heartIndex <= lives ? 'opacity-100 scale-100' : 'opacity-25 grayscale scale-90'
              }`}
            >
              ❤️
            </span>
          ))}
        </div>

        {/* Score & Streak */}
        <div className="flex items-center gap-3 text-xs font-mono">
          {streak >= 2 && (
            <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 animate-pulse">
              🔥 {streak}x Kombo!
            </span>
          )}
          <div className="text-slate-400">
            Puan: <span className="text-emerald-400 font-bold tabular-nums text-sm">{score}</span>
          </div>
        </div>
      </div>

      {/* Timer Bar */}
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-6">
        <div
          style={{
            width: `${(timeLeft / (question.difficulty === 'zor' ? 35 : question.difficulty === 'orta' ? 40 : 45)) * 100}%`,
          }}
          className={`h-full transition-all duration-1000 ${
            timeLeft <= 10 ? 'bg-rose-500' : timeLeft <= 20 ? 'bg-amber-500' : 'bg-indigo-500'
          }`}
        />
      </div>

      {/* Guide Companion Reacting */}
      <div className="mb-6 flex justify-center">
        <CharacterGuide
          characterId={characterId}
          mood={characterMood}
          speechText={speech}
          size="md"
        />
      </div>

      {/* Question Main Card */}
      <div className="bg-slate-800/95 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
          {question.topic}
        </div>

        {/* Scenario Box (if available) */}
        {question.scenario && (
          <div className="mb-4 p-3.5 bg-slate-900/80 border border-slate-700/60 rounded-xl text-xs text-slate-300 leading-relaxed italic">
            📌 <strong>Senaryo:</strong> {question.scenario}
          </div>
        )}

        {/* Question Text */}
        <h3 className="text-lg sm:text-xl font-bold text-white mb-6 leading-relaxed">
          {question.question}
        </h3>

        {/* Options Grid */}
        <div className="space-y-3 mb-6">
          {question.options.map((option, idx) => {
            const isPicked = selectedOption === idx;
            const isCorrect = idx === question.correctIndex;

            let optionStyle =
              'bg-slate-900/60 hover:bg-slate-700/70 border-slate-700 text-slate-200';

            if (isAnswered) {
              if (isCorrect) {
                optionStyle =
                  'bg-emerald-950/60 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/50 shadow-md';
              } else if (isPicked) {
                optionStyle =
                  'bg-rose-950/60 border-rose-500 text-rose-200 ring-2 ring-rose-500/50';
              } else {
                optionStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60';
              }
            }

            const letter = ['A', 'B', 'C', 'D'][idx];

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleOptionClick(idx)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group active:scale-[0.99] ${optionStyle}`}
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                      isAnswered && isCorrect
                        ? 'bg-emerald-500 text-slate-900'
                        : isAnswered && isPicked
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-800 border border-slate-700 text-slate-300 group-hover:border-indigo-400'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="text-sm sm:text-base font-medium">{option}</span>
                </div>

                {isAnswered && (
                  <span className="shrink-0 ml-2">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : isPicked ? (
                      <XCircle className="w-5 h-5 text-rose-400" />
                    ) : null}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer of Card: Hint button & Next button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-700/60">
          {!isAnswered ? (
            <button
              onClick={handleToggleHint}
              className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold px-3 py-1.5 rounded-lg hover:bg-slate-700/50 transition-colors"
            >
              <Lightbulb className="w-4 h-4" />
              <span>{showHint ? 'İpucunu Kapat' : 'İpucu İste'}</span>
            </button>
          ) : (
            <div className="text-xs text-slate-300 flex-1">
              <strong className="text-indigo-400 block mb-0.5">Öğretmen Notu & Açıklama:</strong>
              {question.explanation}
            </div>
          )}

          {isAnswered && (
            <button
              onClick={onNext}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-102"
            >
              <span>{questionIndex + 1 === totalQuestions ? 'Sonuçları Gör' : 'Sonraki Soru'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
