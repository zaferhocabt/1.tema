import React, { useState } from 'react';
import { GLOSSARY } from '../data/curriculumData';
import { GlossaryItem } from '../types/game';
import { Search, BookOpen, X } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Hepsi');

  if (!isOpen) return null;

  const categories = ['Hepsi', 'Temel Kavramlar', 'Donanım', 'Sistem', 'Dijital Sağlık', 'Dijital Vatandaşlık', 'Veri Yönetimi', 'Yapay Zekâ', 'Yapay Zekâ Tarihi'];

  const filteredItems = GLOSSARY.filter((item: GlossaryItem) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'Hepsi' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-700/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-heading">
                5. Sınıf 1. Tema Bilişim Sözlüğü
              </h3>
              <p className="text-xs text-slate-400">
                MEB Öğretmen Kılavuz Kitabı Terimler Sözlüğü (Sayfa 243-245)
              </p>
            </div>
          </div>

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

        {/* Search & Categories */}
        <div className="py-4 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Terim veya tanım ara (örn: RAM, Ergonomi, Cahit Arf...)"
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sounds.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Glossary List */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-slate-900/70 border border-slate-700/70 rounded-2xl space-y-1"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-indigo-300 text-sm">{item.term}</h4>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">{item.definition}</p>
                {item.example && (
                  <p className="text-[11px] text-amber-300/90 italic pt-1">
                    💡 Örnek: {item.example}
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-xs text-slate-400">
              Aramanıza uygun terim bulunamadı.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 mt-2 border-t border-slate-700/80 text-right">
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
