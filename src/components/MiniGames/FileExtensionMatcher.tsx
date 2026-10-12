import React, { useState } from 'react';
import { CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';
import { CharacterGuide } from '../CharacterGuide';
import { CharacterId } from '../../types/game';

interface MatchItem {
  id: string;
  extension: string;
  category: string;
  icon: string;
  example: string;
}

const ITEMS: MatchItem[] = [
  { id: '1', extension: '.jpg / .png', category: 'Resim / Fotoğraf', icon: '🖼️', example: 'Doğa ve gezi fotoğrafları' },
  { id: '2', extension: '.mp3 / .wav', category: 'Ses / Müzik Dosyası', icon: '🎵', example: 'Şarkılar ve ses kayıtları' },
  { id: '3', extension: '.docx / .txt', category: 'Metin / Yazı Belgesi', icon: '📝', example: 'Ders ödevleri ve mektuplar' },
  { id: '4', extension: '.mp4 / .avi', category: 'Video / Film Dosyası', icon: '🎬', example: 'Eğitici videolar ve çizgi filmler' },
  { id: '5', extension: '.zip / .rar', category: 'Sıkıştırılmış Arşiv', icon: '🗜️', example: 'Yer tasarrufu sağlayan paketler' },
  { id: '6', extension: '.pptx / .odp', category: 'Sunum / Slayt Dosyası', icon: '📊', example: 'Sınıfta tahtaya yansıtılan slaytlar' },
];

interface Props {
  characterId: CharacterId;
  onComplete: (score: number) => void;
  onBack: () => void;
}

export const FileExtensionMatcher: React.FC<Props> = ({ characterId, onComplete, onBack }) => {
  const [selectedExt, setSelectedExt] = useState<MatchItem | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [characterMood, setCharacterMood] = useState<'idle' | 'happy' | 'sad'>('idle');
  const [speech, setSpeech] = useState<string>(
    'Sol taraftan bir dosya uzantısına tıkla, ardından sağ taraftaki doğru dosya türüyle eşleştir!'
  );

  const [leftItems] = useState<MatchItem[]>([...ITEMS].sort(() => Math.random() - 0.5));
  const [rightItems] = useState<MatchItem[]>([...ITEMS].sort(() => Math.random() - 0.5));

  const resetGame = () => {
    setSelectedExt(null);
    setMatchedIds([]);
    setCharacterMood('idle');
    setSpeech('Yeniden başlıyoruz! Dosya uzantılarını doğru türlerle eşleştir.');
  };

  const handleSelectExt = (item: MatchItem) => {
    if (matchedIds.includes(item.id)) return;
    sounds.playClick();
    setSelectedExt(item);
    setSpeech(`${item.extension} seçildi. Bu uzantı hangi dosya türüne ait? Sağ taraftan seç!`);
  };

  const handleSelectCategory = (target: MatchItem) => {
    if (matchedIds.includes(target.id)) return;
    if (!selectedExt) {
      setSpeech('Önce sol taraftan bir dosya uzantısı (.jpg, .mp3 vb.) seçmelisin!');
      return;
    }

    if (selectedExt.id === target.id) {
      // Correct match!
      sounds.playCorrect();
      const nextMatched = [...matchedIds, target.id];
      setMatchedIds(nextMatched);
      setSelectedExt(null);
      setCharacterMood('happy');
      setSpeech(`Harika eşleştirme! ${target.extension} bir ${target.category} uzantısıdır!`);

      if (nextMatched.length === ITEMS.length) {
        sounds.playVictory();
        setSpeech('Tebrikler! Tüm dosya uzantılarını ve türlerini eksiksiz eşleştirdin!');
        onComplete(100);
      }
    } else {
      // Wrong match
      sounds.playWrong();
      setCharacterMood('sad');
      setSpeech(`Dikkat! ${selectedExt.extension} uzantısı ${target.category} ile eşleşmez. Tekrar dene!`);
      setSelectedExt(null);
    }
  };

  const isAllComplete = matchedIds.length === ITEMS.length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📁 🧩</span>
            <h2 className="text-xl font-bold text-white font-heading">
              Dosya Uzantısı Dedektifi
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            MEB 5. Sınıf Bilişim Kılavuzu 60. Sayfa Eşleştirme Etkinliği
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-slate-900 rounded-xl border border-slate-700 text-xs font-mono font-bold text-indigo-400">
            {matchedIds.length}/{ITEMS.length} Eşleşti
          </div>
          <button
            onClick={resetGame}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Yenile
          </button>
        </div>
      </div>

      {/* Guide companion */}
      <div className="mb-6 flex justify-center">
        <CharacterGuide
          characterId={characterId}
          mood={characterMood}
          speechText={speech}
          size="md"
        />
      </div>

      {/* 2-Column Matching Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Extensions */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 shadow-xl space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
            1. Adım: Dosya Uzantısını Seç
          </h3>
          {leftItems.map((item) => {
            const isMatched = matchedIds.includes(item.id);
            const isSelected = selectedExt?.id === item.id;
            return (
              <button
                key={item.id}
                disabled={isMatched}
                onClick={() => handleSelectExt(item)}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  isMatched
                    ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300 opacity-60 cursor-default'
                    : isSelected
                    ? 'bg-purple-600 text-white border-purple-400 shadow-md ring-2 ring-purple-400'
                    : 'bg-slate-700/60 hover:bg-slate-700 border-slate-600 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-mono font-bold text-sm tracking-wide">
                    {item.extension}
                  </span>
                </div>
                {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </button>
            );
          })}
        </div>

        {/* Right: File Types & Categories */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 shadow-xl space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
            2. Adım: Uygun Dosya Türünü Bul
          </h3>
          {rightItems.map((item) => {
            const isMatched = matchedIds.includes(item.id);
            return (
              <button
                key={item.id}
                disabled={isMatched}
                onClick={() => handleSelectCategory(item)}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  isMatched
                    ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300 opacity-60 cursor-default'
                    : 'bg-slate-700/60 hover:bg-slate-700 hover:border-cyan-400/60 border-slate-600 text-slate-200'
                }`}
              >
                <div>
                  <div className="font-bold text-sm text-white">{item.category}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{item.example}</div>
                </div>
                {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {isAllComplete && (
        <div className="mt-6 p-6 rounded-3xl bg-emerald-950/40 border border-emerald-500/60 text-center max-w-md mx-auto shadow-xl">
          <span className="text-4xl block mb-2">🏆</span>
          <h4 className="text-xl font-bold text-emerald-300 font-heading">
            Tüm Uzantılar Eşleşti!
          </h4>
          <p className="text-xs text-emerald-200 mt-1 mb-4">
            Dosya ve klasör yönetiminin ustası oldun.
          </p>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-all shadow"
          >
            <span>Haritaya Dön</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

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
