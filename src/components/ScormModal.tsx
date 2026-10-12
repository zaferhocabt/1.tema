import React, { useState } from 'react';
import { Download, CheckCircle2, Server, HelpCircle, X, Loader2 } from 'lucide-react';
import { scormService, ScormStatusInfo } from '../utils/scorm';
import { sounds } from '../utils/soundEffects';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  scormStatus: ScormStatusInfo;
}

export const ScormModal: React.FC<Props> = ({ isOpen, onClose, scormStatus }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownloadZip = async () => {
    sounds.playClick();
    setIsExporting(true);
    setDownloadProgress(10);

    try {
      const blob = await scormService.exportScormPackageZip((percent) => {
        setDownloadProgress(Math.round(percent));
      });

      // Trigger browser download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'TeknoMacera5_1Tema_SCORM.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      sounds.playVictory();
      setDownloadSuccess(true);
    } catch (err) {
      console.error('SCORM ZIP export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-800 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-700">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xl">
              📦
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-heading">
                SCORM 1.2 / EBA E-Öğrenme Paketi
              </h3>
              <p className="text-xs text-slate-400">
                Moodle, EBA, Canvas ve LMS Sistemleri ile Tam Uyumlu
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

        {/* Live LMS Connection Status Box */}
        <div className="my-5 p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5" />
              LMS Bağlantı Durumu:
            </span>
            <span
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 ${
                scormStatus.isLmsConnected
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  scormStatus.isLmsConnected ? 'bg-emerald-400' : 'bg-indigo-400'
                }`}
              />
              {scormStatus.isLmsConnected
                ? `LMS Bağlı (SCORM ${scormStatus.version})`
                : 'Bağımsız Önizleme Modu'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-800">
            <div>
              <span className="text-slate-500 block text-[10px]">Öğrenci Adı (cmi):</span>
              <span className="font-semibold text-slate-200">
                {scormStatus.learnerName || 'Web Kullanıcısı (Önizleme)'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Tamamlanma Durumu:</span>
              <span className="font-semibold text-emerald-400 capitalize">
                {scormStatus.lessonStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Download SCORM ZIP Button */}
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/40">
            <h4 className="text-sm font-bold text-indigo-200 mb-1 flex items-center gap-1.5">
              <span>🚀</span> EBA veya LMS İçin SCORM .ZIP İndir
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Bu oyunu <strong>imsmanifest.xml</strong> manifestosu ve SCORM 1.2 entegrasyonuyla birlikte tek tıkla hazır bir .ZIP paketi olarak bilgisayarınıza indirebilir, EBA veya Moodle dersinize doğrudan yükleyebilirsiniz.
            </p>

            <button
              onClick={handleDownloadZip}
              disabled={isExporting}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-101 active:scale-98 disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>SCORM Paketi Paketleniyor... (%{downloadProgress})</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-amber-300" />
                  <span>TeknoMacera5_1Tema_SCORM.zip İndir</span>
                </>
              )}
            </button>

            {downloadSuccess && (
              <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400 font-semibold justify-center">
                <CheckCircle2 className="w-4 h-4" />
                <span>SCORM Paketi başarıyla indirildi!</span>
              </div>
            )}
          </div>

          {/* Teacher Guide: How to upload to EBA / Moodle */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/60 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-300">
              <HelpCircle className="w-4 h-4" />
              <span>Öğretmenler İçin EBA / Moodle Yükleme Adımları:</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-slate-400 pl-1 text-[11px] leading-relaxed">
              <li>Yukarıdaki butonla <strong>TeknoMacera5_1Tema_SCORM.zip</strong> dosyasını indirin.</li>
              <li>EBA veya Moodle platformunuzda ilgili dersin sayfasına gidin.</li>
              <li><strong>"Yeni Etkinlik Ekle"</strong> &gt; <strong>"SCORM Paketi"</strong> seçeneğini seçin.</li>
              <li>İndirdiğiniz .ZIP dosyasını arşivden çıkarmadan doğrudan yükleyin.</li>
              <li>Öğrencileriniz oynadıkça puanlar ve tamamlama bilgisi otomatik olarak e-okul/LMS not çizelgesine yansır.</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-3 border-t border-slate-700/80 text-right">
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
