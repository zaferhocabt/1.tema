import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Trophy, ArrowUp, ArrowDown } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';
import { CharacterGuide } from '../CharacterGuide';
import { CharacterId } from '../../types/game';

interface DeviceCard {
  name: string;
  category: 'giris' | 'cikis'; // giris = Deve, cikis = Cüce
  role: string;
  icon: string;
}

const DEVICES_POOL: DeviceCard[] = [
  { name: 'Klavye', category: 'giris', role: 'Metin ve komutları bilgisayara iletir', icon: '⌨️' },
  { name: 'Monitör (Ekran)', category: 'cikis', role: 'İşlenen bilgiyi görüntü olarak gösterir', icon: '🖥️' },
  { name: 'Fare (Mouse)', category: 'giris', role: 'İşaretçiyle bilgisayara tıklama komutu verir', icon: '🖱️' },
  { name: 'Hoparlör', category: 'cikis', role: 'Bilgisayardaki ses dalgalarını kulağımıza iletir', icon: '🔊' },
  { name: 'Mikrofon', category: 'giris', role: 'Sesimizi bilgisayara elektrik sinyali olarak aktarır', icon: '🎙️' },
  { name: 'Yazıcı (Printer)', category: 'cikis', role: 'Ekranda hazırlanan belgeleri kâğıda döker', icon: '🖨️' },
  { name: 'Web Kamerası', category: 'giris', role: 'Görüntümüzü yakalayıp bilgisayara aktarır', icon: '📷' },
  { name: 'Kulaklık', category: 'cikis', role: 'Müzik ve sesleri doğrudan kulağımıza verir', icon: '🎧' },
  { name: 'Tarayıcı (Scanner)', category: 'giris', role: 'Kâğıttaki resmi/belgeyi bilgisayara dijital aktarır', icon: '📠' },
  { name: 'Projeksiyon Cihazı', category: 'cikis', role: 'Bilgisayar görüntüsünü duvara/perdeye yansıtır', icon: '📽️' },
  { name: 'Barkod Okuyucu', category: 'giris', role: 'Market ürün kodunu tarayıp sisteme veri girer', icon: '🏷️' },
  { name: 'Dokunmatik Ekran (Çift Yönlü)', category: 'giris', role: 'Dokunduğumuzda bilgisayara komut GİRİŞİ sağlar', icon: '📱' },
];

interface Props {
  characterId: CharacterId;
  onComplete: (score: number) => void;
  onBack: () => void;
}

export const DeveCuceGame: React.FC<Props> = ({ characterId, onComplete, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deck, setDeck] = useState<DeviceCard[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [lastResult, setLastResult] = useState<'correct' | 'wrong' | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);
  const [characterMood, setCharacterMood] = useState<'idle' | 'happy' | 'thinking' | 'sad'>('idle');
  const [speech, setSpeech] = useState<string>(
    'MEB Deve-Cüce Kuralları: Giriş birimleri DEVE (Ayağa Kalk/Üst), Çıkış birimleri CÜCE (Çömel/Alt)!'
  );

  // Shuffle deck
  const resetGame = () => {
    const shuffled = [...DEVICES_POOL].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(30);
    setIsGameOver(false);
    setLastResult(null);
    setCharacterMood('idle');
    setSpeech('Hazırsan başla! Giriş birimlerine DEVE, Çıkış birimlerine CÜCE!');
  };

  useEffect(() => {
    resetGame();
  }, []);

  // Timer
  useEffect(() => {
    if (isGameOver || timeLeft <= 0) {
      if (timeLeft <= 0 && !isGameOver) {
        setIsGameOver(true);
        sounds.playVictory();
        onComplete(score);
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isGameOver, score, onComplete]);

  const currentDevice = deck[currentIndex];

  const handleChoice = (chosen: 'giris' | 'cikis') => {
    if (!currentDevice || isGameOver) return;

    if (chosen === currentDevice.category) {
      // Correct!
      sounds.playJump();
      const points = 10 + streak * 2;
      setScore((s) => s + points);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
      setLastResult('correct');
      setCharacterMood('happy');
      setSpeech(
        `Harikasın! ${currentDevice.name} bir ${
          currentDevice.category === 'giris' ? 'GİRİŞ BİRİMİDİR (DEVE)' : 'ÇIKIŞ BİRİMİDİR (CÜCE)'
        }! +${points} Puan!`
      );
    } else {
      // Wrong!
      sounds.playWrong();
      setStreak(0);
      setLastResult('wrong');
      setCharacterMood('sad');
      setSpeech(
        `Dikkat! ${currentDevice.name} aslında bir ${
          currentDevice.category === 'giris' ? 'GİRİŞ BİRİMİ (DEVE)' : 'ÇIKIŞ BİRİMİ (CÜCE)'
        } olmalıydı.`
      );
    }

    // Move next
    if (currentIndex + 1 < deck.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      // Re-shuffle and continue until timer expires
      setDeck([...DEVICES_POOL].sort(() => Math.random() - 0.5));
      setCurrentIndex(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🐪 👶</span>
            <h2 className="text-xl font-bold text-white font-heading">
              Giriş - Çıkış: Deve mi Cüce mi?
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            MEB 5. Sınıf Bilişim Kılavuzu 52. Sayfa Özel Etkinliği
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-center px-3 py-1 bg-slate-900 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 block">Süre</span>
            <span className={`text-lg font-bold font-mono tabular-nums ${timeLeft <= 5 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`}>
              {timeLeft}s
            </span>
          </div>
          <div className="text-center px-3 py-1 bg-slate-900 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 block">Puan</span>
            <span className="text-lg font-bold font-mono tabular-nums text-emerald-400">
              {score}
            </span>
          </div>
          <div className="text-center px-3 py-1 bg-slate-900 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 block">Seri</span>
            <span className="text-lg font-bold font-mono tabular-nums text-indigo-400">
              {streak}x
            </span>
          </div>
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

      {!isGameOver && currentDevice ? (
        <div className="space-y-6">
          {/* Card Presentation */}
          <div
            className={`relative bg-slate-800/90 border-2 rounded-3xl p-8 text-center shadow-xl transition-all duration-200 ${
              lastResult === 'correct'
                ? 'border-emerald-500/80 bg-emerald-950/20'
                : lastResult === 'wrong'
                ? 'border-rose-500/80 bg-rose-950/20'
                : 'border-slate-700'
            }`}
          >
            <div className="text-6xl mb-3 animate-float">{currentDevice.icon}</div>
            <h3 className="text-2xl font-bold text-white mb-2">{currentDevice.name}</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">{currentDevice.role}</p>
          </div>

          {/* Action Buttons: DEVE (GİRİŞ) vs CÜCE (ÇIKIŞ) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => handleChoice('giris')}
              className="group relative flex items-center justify-center gap-3 py-5 px-6 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold text-lg shadow-lg shadow-amber-600/30 transition-all transform active:scale-95"
            >
              <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
              <div className="text-left">
                <div className="font-heading tracking-wide">DEVE (Ayağa Kalk)</div>
                <div className="text-xs font-normal text-amber-100">GİRİŞ BİRİMİ</div>
              </div>
            </button>

            <button
              onClick={() => handleChoice('cikis')}
              className="group relative flex items-center justify-center gap-3 py-5 px-6 rounded-2xl bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-bold text-lg shadow-lg shadow-cyan-600/30 transition-all transform active:scale-95"
            >
              <ArrowDown className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
              <div className="text-left">
                <div className="font-heading tracking-wide">CÜCE (Çömel)</div>
                <div className="text-xs font-normal text-cyan-100">ÇIKIŞ BİRİMİ</div>
              </div>
            </button>
          </div>
        </div>
      ) : (
        /* Game Over Scoreboard */
        <div className="bg-slate-800/95 border border-slate-700 rounded-3xl p-8 text-center max-w-md mx-auto shadow-2xl">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-3xl">
            🏆
          </div>
          <h3 className="text-2xl font-bold text-white font-heading mb-1">
            Deve-Cüce Turu Tamamlandı!
          </h3>
          <p className="text-sm text-slate-400 mb-6">
            Giriş ve çıkış birimlerini başarıyla ayırt ettin.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Toplam Skor</span>
              <span className="text-2xl font-bold text-emerald-400 font-mono block">
                {score}
              </span>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">En Uzun Seri</span>
              <span className="text-2xl font-bold text-indigo-400 font-mono block">
                {bestStreak}x
              </span>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Tekrar Oyna
            </button>
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-md"
            >
              <Trophy className="w-4 h-4" />
              Haritaya Dön
            </button>
          </div>
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
