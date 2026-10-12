import React from 'react';
import { GameState } from '../types/game';
import { LEVELS, CHARACTERS } from '../data/curriculumData';
import { Award, Printer, X, Star } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface Props {
  isOpen: boolean;
  gameState: GameState;
  onClose: () => void;
}

export const CertificateModal: React.FC<Props> = ({ isOpen, gameState, onClose }) => {
  if (!isOpen) return null;

  const totalStars = Object.values(gameState.completedLevels).reduce((acc, curr) => acc + curr.stars, 0);
  const character = CHARACTERS.find((c) => c.id === gameState.selectedCharacter) || CHARACTERS[0];

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-800 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 shadow-2xl my-auto">
        {/* Controls */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-white text-sm font-heading">
              Başarı Belgesi Önizleme
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Yazdır / PDF Kaydet</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Printable Certificate Frame */}
        <div
          id="certificate-print-area"
          className="bg-amber-50 text-slate-900 rounded-2xl p-6 sm:p-10 border-8 border-double border-amber-600/60 shadow-xl relative overflow-hidden"
        >
          {/* Subtle watermarks / corners */}
          <div className="absolute top-2 left-2 text-2xl text-amber-600/40 select-none">⚜️</div>
          <div className="absolute top-2 right-2 text-2xl text-amber-600/40 select-none">⚜️</div>
          <div className="absolute bottom-2 left-2 text-2xl text-amber-600/40 select-none">⚜️</div>
          <div className="absolute bottom-2 right-2 text-2xl text-amber-600/40 select-none">⚜️</div>

          <div className="text-center relative z-10">
            {/* Header */}
            <div className="text-xs font-bold tracking-widest text-amber-800 uppercase mb-1">
              ORTAOKUL BİLİŞİM TEKNOLOJİLERİ VE YAZILIM
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-heading mb-1 tracking-tight">
              1. TEMA ÜSTÜN BAŞARI BELGESİ
            </h2>
            <div className="h-0.5 w-32 bg-amber-600 mx-auto mb-4" />

            <p className="text-xs text-slate-600 mb-6 italic">
              Bu belge, 5. Sınıf Bilişim Teknolojileri ve Yazılım dersi 1. Tema kapsamındaki tüm görevleri üstün başarıyla tamamlayan öğrencimize verilmiştir.
            </p>

            {/* Student Name */}
            <div className="mb-6">
              <span className="text-xs text-amber-800 uppercase font-semibold block mb-1">
                Sayın Öğrencimiz
              </span>
              <div className="text-2xl sm:text-3xl font-bold text-indigo-900 border-b-2 border-dashed border-amber-400 pb-1 inline-block min-w-[240px]">
                {gameState.studentName || 'Bilişim Şampiyonu'}
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed mb-6">
              Bilişim Teknolojilerinin Sınıflandırılması, Ergonomi ve Dijital Sağlık, Dijital Vatandaşlık, Bilgisayar Sistemleri, Dosya Yönetimi ve Yapay Zekâ modüllerindeki tüm soruları ve mini oyunları başarıyla tamamlayarak <strong>«Günün BT Uzmanı»</strong> unvanını almaya hak kazanmıştır.
            </p>

            {/* Badges preview */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              {LEVELS.map((lvl) => {
                const isEarned = gameState.completedLevels[lvl.id]?.stars > 0;
                return (
                  <div
                    key={lvl.id}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border ${
                      isEarned
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-slate-100 text-slate-400 border-slate-200'
                    }`}
                  >
                    <span>{lvl.badgeIcon}</span>
                    <span>{lvl.badgeName}</span>
                  </div>
                );
              })}
            </div>

            {/* Signature & Seal Footer */}
            <div className="flex items-end justify-between pt-6 border-t border-amber-300/80 text-left text-xs">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Toplam Puan</span>
                <span className="font-mono font-bold text-amber-900 text-base">
                  {gameState.score} PUAN
                </span>
                <div className="flex items-center gap-0.5 text-amber-600 mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span className="font-bold">{totalStars} / 18 Yıldız</span>
                </div>
              </div>

              {/* Digital Seal */}
              <div className="text-center">
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-amber-700 bg-amber-100 flex flex-col items-center justify-center mx-auto text-[9px] font-bold text-amber-900 uppercase">
                  <span>MEB</span>
                  <span className="text-xs">★</span>
                  <span>ONAY</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase block">Rehber Karakter</span>
                <span className="font-bold text-indigo-900">{character.name}</span>
                <span className="text-[10px] text-slate-500 block italic">({character.title})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
