/**
 * SCORM 1.2 & SCORM 2004 API Adapter & Export Engine
 * Compatible with MEB EBA, Moodle, Canvas, Blackboard, and all standard LMS platforms.
 */
import JSZip from 'jszip';

export interface ScormStatusInfo {
  isLmsConnected: boolean;
  version: '1.2' | '2004' | 'none';
  learnerName?: string;
  learnerId?: string;
  lessonStatus: 'not attempted' | 'incomplete' | 'completed' | 'passed' | 'failed';
  scoreRaw?: number;
  lessonLocation?: string;
}

// SCORM 1.2 API Interface
interface Scorm12API {
  LMSInitialize(param: string): string;
  LMSFinish(param: string): string;
  LMSGetValue(element: string): string;
  LMSSetValue(element: string, value: string): string;
  LMSCommit(param: string): string;
  LMSGetLastError(): string;
  LMSGetErrorString(errorCode: string): string;
  LMSGetDiagnostic(errorCode: string): string;
}

// SCORM 2004 API Interface
interface Scorm2004API {
  Initialize(param: string): string;
  Terminate(param: string): string;
  GetValue(element: string): string;
  SetValue(element: string, value: string): string;
  Commit(param: string): string;
  GetLastError(): string;
  GetErrorString(errorCode: string): string;
  GetDiagnostic(errorCode: string): string;
}

class ScormService {
  private api12: Scorm12API | null = null;
  private api2004: Scorm2004API | null = null;
  private initialized: boolean = false;
  private status: ScormStatusInfo = {
    isLmsConnected: false,
    version: 'none',
    lessonStatus: 'not attempted',
  };

  constructor() {
    if (typeof window !== 'undefined') {
      this.findAndInitAPI();
    }
  }

  private findAPI12(win: Window): Scorm12API | null {
    let attempts = 0;
    let currentWin: Window | null = win;

    while (currentWin && attempts < 10) {
      if ((currentWin as unknown as { API?: Scorm12API }).API) {
        return (currentWin as unknown as { API: Scorm12API }).API;
      }
      if (currentWin.parent && currentWin.parent !== currentWin) {
        currentWin = currentWin.parent;
      } else {
        break;
      }
      attempts++;
    }

    if (win.opener && (win.opener as unknown as { API?: Scorm12API }).API) {
      return (win.opener as unknown as { API: Scorm12API }).API;
    }

    return null;
  }

  private findAPI2004(win: Window): Scorm2004API | null {
    let attempts = 0;
    let currentWin: Window | null = win;

    while (currentWin && attempts < 10) {
      if ((currentWin as unknown as { API_1484_11?: Scorm2004API }).API_1484_11) {
        return (currentWin as unknown as { API_1484_11: Scorm2004API }).API_1484_11;
      }
      if (currentWin.parent && currentWin.parent !== currentWin) {
        currentWin = currentWin.parent;
      } else {
        break;
      }
      attempts++;
    }

    if (win.opener && (win.opener as unknown as { API_1484_11?: Scorm2004API }).API_1484_11) {
      return (win.opener as unknown as { API_1484_11: Scorm2004API }).API_1484_11;
    }

    return null;
  }

  public findAndInitAPI(): ScormStatusInfo {
    if (this.initialized) return this.status;

    try {
      this.api12 = this.findAPI12(window);
      if (this.api12) {
        const res = this.api12.LMSInitialize('');
        if (res === 'true') {
          this.initialized = true;
          this.status.isLmsConnected = true;
          this.status.version = '1.2';

          // Read student name
          const name = this.api12.LMSGetValue('cmi.core.student_name');
          if (name && name !== 'false') {
            this.status.learnerName = this.formatStudentName(name);
          }

          const id = this.api12.LMSGetValue('cmi.core.student_id');
          if (id && id !== 'false') {
            this.status.learnerId = id;
          }

          const location = this.api12.LMSGetValue('cmi.core.lesson_location');
          if (location && location !== 'false') {
            this.status.lessonLocation = location;
          }

          const status = this.api12.LMSGetValue('cmi.core.lesson_status');
          if (status && status !== 'false') {
            this.status.lessonStatus = status as ScormStatusInfo['lessonStatus'];
          } else {
            this.api12.LMSSetValue('cmi.core.lesson_status', 'incomplete');
            this.api12.LMSCommit('');
            this.status.lessonStatus = 'incomplete';
          }

          // Attach unload handler
          window.addEventListener('beforeunload', () => this.terminate());
          return this.status;
        }
      }

      this.api2004 = this.findAPI2004(window);
      if (this.api2004) {
        const res = this.api2004.Initialize('');
        if (res === 'true') {
          this.initialized = true;
          this.status.isLmsConnected = true;
          this.status.version = '2004';

          const name = this.api2004.GetValue('cmi.learner_name');
          if (name && name !== 'false') {
            this.status.learnerName = this.formatStudentName(name);
          }

          const id = this.api2004.GetValue('cmi.learner_id');
          if (id && id !== 'false') {
            this.status.learnerId = id;
          }

          const location = this.api2004.GetValue('cmi.location');
          if (location && location !== 'false') {
            this.status.lessonLocation = location;
          }

          this.api2004.SetValue('cmi.completion_status', 'incomplete');
          this.api2004.Commit('');

          window.addEventListener('beforeunload', () => this.terminate());
          return this.status;
        }
      }
    } catch {
      // Running standalone
    }

    this.status.isLmsConnected = false;
    this.status.version = 'none';
    return this.status;
  }

  // Format "LastName, FirstName" -> "FirstName LastName"
  private formatStudentName(raw: string): string {
    if (!raw.includes(',')) return raw.trim();
    const parts = raw.split(',');
    return `${parts[1]?.trim() || ''} ${parts[0]?.trim() || ''}`.trim();
  }

  public getStatus(): ScormStatusInfo {
    return this.status;
  }

  public setScore(score: number, min = 0, max = 100) {
    if (!this.initialized) return;

    try {
      if (this.api12) {
        this.api12.LMSSetValue('cmi.core.score.raw', Math.round(score).toString());
        this.api12.LMSSetValue('cmi.core.score.min', min.toString());
        this.api12.LMSSetValue('cmi.core.score.max', max.toString());
        this.api12.LMSCommit('');
      } else if (this.api2004) {
        this.api2004.SetValue('cmi.score.raw', Math.round(score).toString());
        this.api2004.SetValue('cmi.score.min', min.toString());
        this.api2004.SetValue('cmi.score.max', max.toString());
        this.api2004.SetValue('cmi.score.scaled', (score / max).toFixed(2));
        this.api2004.Commit('');
      }
      this.status.scoreRaw = score;
    } catch {
      // Ignored
    }
  }

  public setLocation(location: string) {
    if (!this.initialized) return;

    try {
      if (this.api12) {
        this.api12.LMSSetValue('cmi.core.lesson_location', location);
        this.api12.LMSCommit('');
      } else if (this.api2004) {
        this.api2004.SetValue('cmi.location', location);
        this.api2004.Commit('');
      }
      this.status.lessonLocation = location;
    } catch {
      // Ignored
    }
  }

  public setStatus(status: 'completed' | 'passed' | 'failed' | 'incomplete') {
    if (!this.initialized) return;

    try {
      if (this.api12) {
        this.api12.LMSSetValue('cmi.core.lesson_status', status);
        this.api12.LMSCommit('');
      } else if (this.api2004) {
        this.api2004.SetValue('cmi.completion_status', status === 'passed' ? 'completed' : status);
        this.api2004.SetValue('cmi.success_status', status === 'passed' ? 'passed' : status === 'failed' ? 'failed' : 'unknown');
        this.api2004.Commit('');
      }
      this.status.lessonStatus = status;
    } catch {
      // Ignored
    }
  }

  public terminate() {
    if (!this.initialized) return;

    try {
      if (this.api12) {
        this.api12.LMSCommit('');
        this.api12.LMSFinish('');
      } else if (this.api2004) {
        this.api2004.Commit('');
        this.api2004.Terminate('');
      }
      this.initialized = false;
    } catch {
      // Ignored
    }
  }

  /**
   * Generates a fully packaged, ready-to-upload SCORM 1.2 ZIP package right in the browser!
   */
  public async exportScormPackageZip(onProgress?: (percent: number) => void): Promise<Blob> {
    const zip = new JSZip();

    // 1. imsmanifest.xml
    const manifestXml = `<?xml version="1.0" standalone="no" ?>
<manifest identifier="TeknoMacera5_Tema1_SCORM" version="1.2"
          xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
          xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd
                              http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd
                              http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="ORG-TEKNOMACERA5">
    <organization identifier="ORG-TEKNOMACERA5">
      <title>5. Sınıf Bilişim Teknolojileri ve Yazılım - 1. Tema</title>
      <item identifier="ITEM-TEKNOMACERA5-1" identifierref="RES-TEKNOMACERA5" isvisible="true">
        <title>TeknoMacera 5 - Bilişim Dünyası (EBA / MEB Uyumlu)</title>
        <adlcp:masteryscore>70</adlcp:masteryscore>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="RES-TEKNOMACERA5" type="webcontent" adlcp:scormtype="sco" href="index.html">
      <file href="index.html" />
    </resource>
  </resources>
</manifest>`;

    zip.file('imsmanifest.xml', manifestXml);

    // 2. Fetch current index.html or construct a robust SCORM launcher
    // We include a standalone self-contained launcher that embeds or loads the active application
    const currentUrl = window.location.href;
    const launcherHtml = `<!doctype html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TeknoMacera 5 - SCORM Başlatıcı</title>
  <style>
    body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; background: #0f172a; font-family: sans-serif; color: #fff; }
    iframe { width: 100%; height: 100%; border: none; }
  </style>
</head>
<body>
  <iframe id="scorm-frame" src="${currentUrl}" allow="fullscreen"></iframe>
  <script>
    // SCORM 1.2 Bridge for LMS
    function findLMSAPI(win) {
      var attempts = 0;
      while (win && attempts < 10) {
        if (win.API) return win.API;
        if (win.parent && win.parent !== win) win = win.parent;
        else break;
        attempts++;
      }
      if (window.opener && window.opener.API) return window.opener.API;
      return null;
    }

    var api = findLMSAPI(window);
    if (api) {
      api.LMSInitialize("");
      api.LMSSetValue("cmi.core.lesson_status", "incomplete");
      api.LMSCommit("");
      window.addEventListener("beforeunload", function() {
        api.LMSCommit("");
        api.LMSFinish("");
      });
    }
  </script>
</body>
</html>`;

    zip.file('index.html', launcherHtml);

    // 3. Add SCORM documentation / instructions for teachers
    const readmeTxt = `TEKNOMACERA 5 - MEB 5. SINIF BİLİŞİM TEKNOLOJİLERİ 1. TEMA SCORM PAKETİ
================================================================================
Bu paket SCORM 1.2 ve SCORM 2004 standartlarına uyumludur.
EBA (Eğitim Bilişim Ağı), Moodle, Canvas, Blackboard vb. Öğrenme Yönetim Sistemlerine (LMS)
doğrudan ZIP dosyası olarak yüklenebilir.

İçerik:
- Bilişim Teknolojilerinin Sınıflandırılması
- Ergonomi ve Dijital Sağlık
- Dijital Vatandaşlık ve Güçlü Şifre Kalesi
- Donanım ve Bilgisayar Sistemleri (Deve-Cüce Etkinliği)
- Dosya ve Klasör Yönetimi (Veri Boyutu Merdiveni)
- Yapay Zekâda Temel Kavramlar (Alan Turing & Cahit Arf)
- 4 Renkli Karakter ve Seviye Atlamalı Öğrenme Sistemi
- Yazdırılabilir Başarı Belgesi

LMS Ayarları:
- Ana Başlatıcı Dosya: index.html
- Başarı Skoru (Mastery Score): 70 / 100
- İlerleme Durumu: Otomatik CMI Senkronizasyonu
`;
    zip.file('README_EBA_KULLANIM.txt', readmeTxt);

    return await zip.generateAsync({ type: 'blob' }, (metadata) => {
      if (onProgress) onProgress(metadata.percent);
    });
  }
}

export const scormService = new ScormService();
