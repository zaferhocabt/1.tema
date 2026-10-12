import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, KeyRound, Check, X, Sparkles, ArrowRight } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';
import { CharacterGuide } from '../CharacterGuide';
import { CharacterId } from '../../types/game';

interface Props {
  characterId: CharacterId;
  onComplete: (score: number) => void;
  onBack: () => void;
}

export const PasswordTester: React.FC<Props> = ({ characterId, onComplete, onBack }) => {
  const [inputPass, setInputPass] = useState('');
  const [completedChallenge, setCompletedChallenge] = useState(false);

  // Criteria evaluation
  const hasMinLength = inputPass.length >= 8;
  const hasUpper = /[A-ZĞÜŞİÖÇ]/.test(inputPass);
  const hasLower = /[a-zğüşıöç]/.test(inputPass);
  const hasNumber = /[0-9]/.test(inputPass);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>_\-+=~]/.test(inputPass);

  const criteriaCount = [hasMinLength, hasUpper, hasLower, hasNumber, hasSymbol].filter(Boolean).length;

  let strengthLabel = 'Henüz Şifre Yazılmadı';
  let strengthColor = 'bg-slate-700 text-slate-300';
  let progressWidth = '0%';

  if (inputPass.length > 0) {
    if (criteriaCount <= 2) {
      strengthLabel = 'ZAYIF ŞİFRE (Kolay Çalınabilir!)';
      strengthColor = 'bg-rose-500/20 text-rose-400 border-rose-500/40';
      progressWidth = '30%';
    } else if (criteriaCount <= 4) {
      strengthLabel = 'ORTA ŞİFRE (Biraz Daha Güçlendirebilirsin)';
      strengthColor = 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      progressWidth = '65%';
    } else {
      strengthLabel = 'AŞILMAZ SİBER KALE! (Çok Güçlü)';
      strengthColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      progressWidth = '100%';
    }
  }

  const handleTestPass = () => {
    if (criteriaCount === 5) {
      sounds.playVictory();
      setCompletedChallenge(true);
      onComplete(100);
    } else {
      sounds.playWrong();
    }
  };

  const generateSuggestion = () => {
    sounds.playClick();
    const suggestions = [
      'K@l3m!2026?T',
      'Y!ld!z#5Sınıf$',
      'B!lg!s@y@r_99',
      'P!ks0_Ked!2026*',
    ];
    const picked = suggestions[Math.floor(Math.random() * suggestions.length)];
    setInputPass(picked);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🛡️ 🔐</span>
            <h2 className="text-xl font-bold text-white font-heading">
              Güçlü Şifre Kalesi Laboratuvarı
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            MEB 5. Sınıf Dijital Vatandaşlık & Siber Güvenlik Standartları
          </p>
        </div>

        <button
          onClick={generateSuggestion}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs font-semibold text-indigo-300 transition-all border border-slate-600"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Örnek Güçlü Şifre Üret
        </button>
      </div>

      {/* Guide */}
      <div className="mb-6 flex justify-center">
        <CharacterGuide
          characterId={characterId}
          mood={completedChallenge ? 'celebrating' : criteriaCount >= 4 ? 'happy' : 'thinking'}
          speechText={
            completedChallenge
              ? 'Mükemmel! Bu şifreyi korsanlar yüzyıllarca uğraşsa bile kıramaz!'
              : 'MEB 5 Altın Şifre Kuralı: En az 8 karakter, büyük harf, küçük harf, rakam ve özel sembol (@, #, !).'
          }
          size="md"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Input Card */}
        <div className="lg:col-span-7 bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 shadow-xl">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Şifreni Test Et:
          </label>

          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={inputPass}
              onChange={(e) => setInputPass(e.target.value)}
              placeholder="Örn: K@l3m!2026?T"
              className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-white font-mono text-base placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Strength Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              <span className="text-slate-400">Güvenlik Seviyesi:</span>
              <span className={`px-2 py-0.5 rounded-lg border text-xs font-bold ${strengthColor}`}>
                {strengthLabel}
              </span>
            </div>
            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-700">
              <div
                style={{ width: progressWidth }}
                className={`h-full rounded-full transition-all duration-300 ${
                  criteriaCount === 5
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                    : criteriaCount >= 3
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                    : 'bg-gradient-to-r from-rose-500 to-orange-500'
                }`}
              />
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={handleTestPass}
            disabled={criteriaCount < 5}
            className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
              criteriaCount === 5
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer ring-2 ring-emerald-400/50'
                : 'bg-slate-700/60 text-slate-400 cursor-not-allowed'
            }`}
          >
            {criteriaCount === 5 ? (
              <>
                <ShieldCheck className="w-5 h-5 text-emerald-200" />
                Şifreyi Onayla ve Görevi Tamamla! (+100 Puan)
              </>
            ) : (
              <>
                <ShieldAlert className="w-5 h-5" />
                Görevi tamamlamak için tüm 5 kuralı sağlamalısın
              </>
            )}
          </button>
        </div>

        {/* 5 Rules Checklist */}
        <div className="lg:col-span-5 bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
              MEB Güçlü Şifre Kriterleri (5/5)
            </h3>

            <div className="space-y-2.5">
              <div
                className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs transition-colors ${
                  hasMinLength
                    ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                    hasMinLength ? 'bg-emerald-500 text-slate-900' : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {hasMinLength ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                </div>
                <span>En az 8 karakter uzunluğunda olmalı ({inputPass.length}/8)</span>
              </div>

              <div
                className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs transition-colors ${
                  hasUpper
                    ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                    hasUpper ? 'bg-emerald-500 text-slate-900' : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {hasUpper ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                </div>
                <span>En az bir BÜYÜK harf içermeli (A-Z)</span>
              </div>

              <div
                className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs transition-colors ${
                  hasLower
                    ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                    hasLower ? 'bg-emerald-500 text-slate-900' : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {hasLower ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                </div>
                <span>En az bir küçük harf içermeli (a-z)</span>
              </div>

              <div
                className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs transition-colors ${
                  hasNumber
                    ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                    hasNumber ? 'bg-emerald-500 text-slate-900' : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {hasNumber ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                </div>
                <span>En az bir rakam içermeli (0-9)</span>
              </div>

              <div
                className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs transition-colors ${
                  hasSymbol
                    ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                    hasSymbol ? 'bg-emerald-500 text-slate-900' : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {hasSymbol ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                </div>
                <span>En az bir özel sembol içermeli (@, #, !, ?)</span>
              </div>
            </div>
          </div>

          {completedChallenge && (
            <div className="mt-4 p-3 rounded-2xl bg-indigo-950/40 border border-indigo-500/50 text-center">
              <span className="text-xl block mb-0.5">🌟</span>
              <div className="text-xs font-bold text-indigo-300">
                Siber Muhafız Görevi Başarıldı!
              </div>
              <button
                onClick={onBack}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
              >
                <span>Haritaya Dön</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Back button */}
      <div className="mt-8 text-center">
        <button
          onClick={onBack}
          className="text-xs text-slate-400 hover:text-white underline transition-colors"
        >
          ← Bölüm Haritasına Dön
        </button>
      </div>
    </div>
  );
};
