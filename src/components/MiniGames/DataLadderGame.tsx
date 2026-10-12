import React, { useState } from 'react';
import { CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';
import { CharacterGuide } from '../CharacterGuide';
import { CharacterId } from '../../types/game';

interface LadderStep {
  name: string;
  abbreviation: string;
  order: number;
  description: string;
  example: string;
  icon: string;
}

const LADDER_DATA: LadderStep[] = [
  { name: 'Bit', abbreviation: 'bit', order: 1, description: 'En küçük veri birimi (0 veya 1)', example: 'Tek bir elektrik anahtarı', icon: '⚡' },
  { name: 'Byte', abbreviation: 'B', order: 2, description: '8 bitin birleşmesiyle oluşur', example: 'Klavyedeki 1 harf veya rakam', icon: '🔤' },
  { name: 'Kilobyte', abbreviation: 'KB', order: 3, description: '1.024 Byte', example: 'Kısa bir not veya metin belgesi', icon: '📄' },
  { name: 'Megabyte', abbreviation: 'MB', order: 4, description: '1.024 Kilobyte', example: '1 adet net fotoğraf veya MP3 şarkı', icon: '🎵' },
  { name: 'Gigabyte', abbreviation: 'GB', order: 5, description: '1.024 Megabyte', example: 'Yüksek çözünürlüklü film veya oyun', icon: '🎬' },
  { name: 'Terabyte', abbreviation: 'TB', order: 6, description: '1.024 Gigabyte', example: 'Büyük arşiv sabit diski veya bulut sunucu', icon: '💾' },
];

interface Props {
  characterId: CharacterId;
  onComplete: (score: number) => void;
  onBack: () => void;
}

export const DataLadderGame: React.FC<Props> = ({ characterId, onComplete, onBack }) => {
  // Available pool to pick from
  const [available, setAvailable] = useState<LadderStep[]>(
    [...LADDER_DATA].sort(() => Math.random() - 0.5)
  );
  // Placed steps (indices 0 to 5 for steps 1 to 6)
  const [ladderSlots, setLadderSlots] = useState<(LadderStep | null)[]>([
    null, null, null, null, null, null
  ]);
  const [selectedItem, setSelectedItem] = useState<LadderStep | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [speech, setSpeech] = useState<string>(
    'Veri hafıza birimlerini KÜÇÜKTEN BÜYÜĞE merdivenin basamaklarına doğru sırayla yerleştir!'
  );
  const [characterMood, setCharacterMood] = useState<'idle' | 'happy' | 'sad'>('idle');

  const resetGame = () => {
    setAvailable([...LADDER_DATA].sort(() => Math.random() - 0.5));
    setLadderSlots([null, null, null, null, null, null]);
    setSelectedItem(null);
    setIsSuccess(false);
    setCharacterMood('idle');
    setSpeech('Yeniden deniyoruz! En küçük birim en alt basamağa (1. basamak), en büyük en tepeye!');
  };

  const handleSelectFromPool = (item: LadderStep) => {
    sounds.playClick();
    setSelectedItem(item);
    setSpeech(`${item.name} (${item.abbreviation}) seçildi. Merdivende koymak istediğin basamağa tıkla.`);
  };

  const handlePlaceAtSlot = (slotIndex: number) => {
    if (!selectedItem) {
      // If clicking already placed slot, pick it back up
      const existing = ladderSlots[slotIndex];
      if (existing) {
        sounds.playClick();
        setLadderSlots((prev) => {
          const next = [...prev];
          next[slotIndex] = null;
          return next;
        });
        setAvailable((prev) => [...prev, existing]);
        setSpeech(`${existing.name} basamaktan geri alındı.`);
      }
      return;
    }

    sounds.playClick();
    // If slot has something, return old item to pool
    const oldItem = ladderSlots[slotIndex];
    const newAvailable = available.filter((a) => a.name !== selectedItem.name);
    if (oldItem) {
      newAvailable.push(oldItem);
    }

    setLadderSlots((prev) => {
      const next = [...prev];
      next[slotIndex] = selectedItem;
      return next;
    });
    setAvailable(newAvailable);
    setSelectedItem(null);
  };

  // Check answers
  const handleCheck = () => {
    const isComplete = ladderSlots.every((slot) => slot !== null);
    if (!isComplete) {
      sounds.playWrong();
      setCharacterMood('sad');
      setSpeech('Henüz tüm basamakları doldurmadın! Lütfen 6 basamağın hepsine bir birim yerleştir.');
      return;
    }

    const allCorrect = ladderSlots.every((slot, idx) => slot?.order === idx + 1);
    if (allCorrect) {
      sounds.playVictory();
      setIsSuccess(true);
      setCharacterMood('happy');
      setSpeech('Tebrikler! Veri Boyutu Merdiveni\'ni mükemmel şekilde inşa ettin: Bit < Byte < KB < MB < GB < TB!');
      onComplete(100);
    } else {
      sounds.playWrong();
      setCharacterMood('sad');
      setSpeech('Bazı basamaklar yanlış sırada! İpucu: En küçük Bit, ardından Byte, sonra KB, MB, GB ve en büyük TB gelir.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🪜 💾</span>
            <h2 className="text-xl font-bold text-white font-heading">
              Veri Boyutu Merdiveni
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            MEB 5. Sınıf Bilişim Kılavuzu 50. Sayfa Etkinliği (Küçükten Büyüğe Sıralama)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetGame}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Sıfırla
          </button>
          <button
            onClick={handleCheck}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition-all"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            Kontrol Et
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Step Ladder Visual (6 slots, from 1 (bottom) to 6 (top)) */}
        <div className="lg:col-span-7 bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-700/60">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Merdiven Basamakları (1. En Küçük → 6. En Büyük)
            </span>
            <span className="text-xs text-slate-400">
              Dolu: {ladderSlots.filter(Boolean).length}/6
            </span>
          </div>

          {/* Vertical Staircase (Reversed order: Slot 5 at top, Slot 0 at bottom) */}
          <div className="space-y-2.5">
            {[5, 4, 3, 2, 1, 0].map((slotIdx) => {
              const placed = ladderSlots[slotIdx];
              const stepNumber = slotIdx + 1;
              const isCorrectInPlace = isSuccess && placed?.order === stepNumber;

              return (
                <div
                  key={slotIdx}
                  onClick={() => handlePlaceAtSlot(slotIdx)}
                  style={{ marginLeft: `${slotIdx * 10}px` }}
                  className={`flex items-center justify-between p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                    placed
                      ? isCorrectInPlace
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                        : 'bg-slate-700/80 border-purple-500/80 text-white shadow-md'
                      : selectedItem
                      ? 'bg-purple-950/20 border-dashed border-purple-400/60 hover:bg-purple-900/30'
                      : 'bg-slate-900/60 border-slate-700/60 hover:border-slate-600 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-bold font-mono text-purple-400">
                      {stepNumber}
                    </span>
                    {placed ? (
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base">{placed.icon}</span>
                          <span className="font-bold text-white text-sm">
                            {placed.name}
                          </span>
                          <span className="text-xs font-mono text-purple-300 px-1.5 py-0.5 rounded bg-purple-900/40">
                            {placed.abbreviation}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 block mt-0.5">
                          {placed.example}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs italic text-slate-500">
                        {stepNumber}. Basamak: Birim yerleştirmek için tıkla
                      </span>
                    )}
                  </div>

                  {placed && (
                    <span className="text-xs text-rose-400 hover:text-rose-300 font-medium px-2 py-1 rounded bg-slate-800">
                      Çıkar ✕
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Available Cards Pool */}
        <div className="lg:col-span-5 bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400 mb-1">
              Hafıza Birimi Kartları
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Bir karta tıkla, ardından sol taraftaki istediğin basamağa yerleştir:
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              {available.map((item) => {
                const isCurrent = selectedItem?.name === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleSelectFromPool(item)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isCurrent
                        ? 'bg-indigo-600 text-white border-indigo-400 shadow-md scale-102 ring-2 ring-indigo-400'
                        : 'bg-slate-700/60 hover:bg-slate-700 border-slate-600 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-xs font-mono font-bold text-amber-300">
                        {item.abbreviation}
                      </span>
                    </div>
                    <div className="font-bold text-sm">{item.name}</div>
                    <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                      {item.description}
                    </div>
                  </button>
                );
              })}
            </div>

            {available.length === 0 && !isSuccess && (
              <div className="text-center py-6 text-sm text-slate-400">
                Tüm birimler basamaklara dizildi! Yukarıdaki <strong>Kontrol Et</strong> butonuna basabilirsin.
              </div>
            )}
          </div>

          {isSuccess && (
            <div className="mt-4 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-center animate-bounce-subtle">
              <span className="text-2xl block mb-1">🎉</span>
              <h4 className="font-bold text-emerald-300 text-sm">Harika Başarı!</h4>
              <p className="text-xs text-emerald-200 mt-0.5">
                Veri Merdiveni Rozetini kazandın!
              </p>
              <button
                onClick={onBack}
                className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow"
              >
                <span>Macera Haritasına Dön</span>
                <ArrowRight className="w-3.5 h-3.5" />
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
