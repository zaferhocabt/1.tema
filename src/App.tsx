/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GameState, CharacterId, Question } from './types/game';
import { LEVELS, QUESTIONS } from './data/curriculumData';
import { Navbar } from './components/Navbar';
import { LevelMap } from './components/LevelMap';
import { QuestionCard } from './components/QuestionCard';
import { DeveCuceGame } from './components/MiniGames/DeveCuceGame';
import { DataLadderGame } from './components/MiniGames/DataLadderGame';
import { PasswordTester } from './components/MiniGames/PasswordTester';
import { FileExtensionMatcher } from './components/MiniGames/FileExtensionMatcher';
import { LevelCompleteModal } from './components/LevelCompleteModal';
import { CertificateModal } from './components/CertificateModal';
import { GlossaryModal } from './components/GlossaryModal';
import { ScormModal } from './components/ScormModal';
import { sounds } from './utils/soundEffects';
import { scormService, ScormStatusInfo } from './utils/scorm';

const STORAGE_KEY = 'teknomacera_5_state_v1';

export default function App() {
  const [scormStatus, setScormStatus] = useState<ScormStatusInfo>({
    isLmsConnected: false,
    version: 'none',
    lessonStatus: 'not attempted',
  });

  const [gameState, setGameState] = useState<GameState>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      } catch {
        // Fallback
      }
    }
    return {
      currentLevel: 1,
      playerLevel: 1,
      score: 0,
      highScore: 0,
      lives: 3,
      maxLives: 3,
      streak: 0,
      studentName: 'Bilişim Kaşifi',
      selectedCharacter: 'pikso',
      completedLevels: {},
      soundEnabled: true,
      gameMode: 'map',
      activeMiniGame: undefined,
    };
  });

  // Campaign level specific state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [levelQuestions, setLevelQuestions] = useState<Question[]>([]);
  const [levelCorrectCount, setLevelCorrectCount] = useState(0);
  const [levelEarnedScore, setLevelEarnedScore] = useState(0);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [isGameOverByLives, setIsGameOverByLives] = useState(false);

  // Modals
  const [showGlossary, setShowGlossary] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showScormModal, setShowScormModal] = useState(false);

  // Initialize SCORM on component mount
  useEffect(() => {
    const status = scormService.findAndInitAPI();
    setScormStatus(status);

    if (status.learnerName) {
      setGameState((prev) => ({
        ...prev,
        studentName: status.learnerName || prev.studentName,
      }));
    }

    if (status.lessonLocation) {
      const loc = parseInt(status.lessonLocation, 10);
      if (!isNaN(loc) && loc >= 1 && loc <= 6) {
        setGameState((prev) => ({
          ...prev,
          currentLevel: loc,
        }));
      }
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch {
      // Ignore storage errors
    }
  }, [gameState]);

  // Sync sound setting
  useEffect(() => {
    sounds.setEnabled(gameState.soundEnabled);
  }, [gameState.soundEnabled]);

  // Start campaign level
  const startLevel = (lvlId: number) => {
    const qList = QUESTIONS.filter((q) => q.levelId === lvlId);
    setLevelQuestions(qList);
    setCurrentQuestionIndex(0);
    setLevelCorrectCount(0);
    setLevelEarnedScore(0);
    setShowLevelComplete(false);
    setIsGameOverByLives(false);

    // Update SCORM location
    scormService.setLocation(lvlId.toString());

    setGameState((prev) => ({
      ...prev,
      currentLevel: lvlId,
      lives: 3,
      streak: 0,
      gameMode: 'campaign',
    }));
  };

  // Handle single question answer
  const handleAnswerQuestion = (isCorrect: boolean) => {
    if (isCorrect) {
      const currentQ = levelQuestions[currentQuestionIndex];
      const basePoints = currentQ?.difficulty === 'zor' ? 30 : currentQ?.difficulty === 'orta' ? 20 : 15;
      const streakMultiplier = Math.min(gameState.streak + 1, 3);
      const points = basePoints * streakMultiplier;

      setLevelCorrectCount((c) => c + 1);
      setLevelEarnedScore((s) => s + points);

      setGameState((prev) => {
        const newScore = prev.score + points;
        // Scale to 0-100 range for SCORM raw score
        const scaledScorm = Math.min(Math.round((newScore / 500) * 100), 100);
        scormService.setScore(scaledScorm);

        return {
          ...prev,
          score: newScore,
          streak: prev.streak + 1,
        };
      });
    } else {
      const nextLives = gameState.lives - 1;
      setGameState((prev) => ({
        ...prev,
        lives: nextLives,
        streak: 0,
      }));

      if (nextLives <= 0) {
        setIsGameOverByLives(true);
        setShowLevelComplete(true);
      }
    }
  };

  // Advance to next question or complete level
  const handleNextQuestion = () => {
    sounds.playClick();
    if (currentQuestionIndex + 1 < levelQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      finishLevel();
    }
  };

  const finishLevel = () => {
    const total = levelQuestions.length;
    const ratio = levelCorrectCount / total;

    let stars = 1;
    if (ratio >= 0.99) stars = 3;
    else if (ratio >= 0.6) stars = 2;

    const currentLvlId = gameState.currentLevel;

    setGameState((prev) => {
      const currentCompleted = prev.completedLevels[currentLvlId] || { stars: 0, bestScore: 0 };
      const updatedStars = Math.max(currentCompleted.stars, stars);
      const updatedBest = Math.max(currentCompleted.bestScore, levelEarnedScore);
      const nextPlayerLevel = Math.max(prev.playerLevel, currentLvlId + 1);

      // Report to SCORM LMS
      if (currentLvlId === 6) {
        scormService.setStatus('completed');
      } else {
        scormService.setStatus('incomplete');
      }

      return {
        ...prev,
        playerLevel: Math.min(nextPlayerLevel, 6),
        completedLevels: {
          ...prev.completedLevels,
          [currentLvlId]: {
            stars: updatedStars,
            bestScore: updatedBest,
          },
        },
      };
    });

    setIsGameOverByLives(false);
    setShowLevelComplete(true);
  };

  // Start a mini game
  const handleStartMiniGame = (miniType: GameState['activeMiniGame']) => {
    if (!miniType) return;
    setGameState((prev) => ({
      ...prev,
      gameMode: 'minigame',
      activeMiniGame: miniType,
    }));
  };

  // Mini game score completion
  const handleMiniGameComplete = (earned: number) => {
    setGameState((prev) => {
      const newScore = prev.score + earned;
      const scaledScorm = Math.min(Math.round((newScore / 500) * 100), 100);
      scormService.setScore(scaledScorm);

      return {
        ...prev,
        score: newScore,
      };
    });
  };

  // Select guide character
  const handleSelectCharacter = (charId: CharacterId) => {
    setGameState((prev) => ({
      ...prev,
      selectedCharacter: charId,
    }));
  };

  // Student name change
  const handleUpdateStudentName = (name: string) => {
    setGameState((prev) => ({
      ...prev,
      studentName: name,
    }));
  };

  // Audio toggle
  const handleToggleSound = () => {
    setGameState((prev) => {
      const next = !prev.soundEnabled;
      sounds.setEnabled(next);
      return {
        ...prev,
        soundEnabled: next,
      };
    });
  };

  const currentLevelInfo = LEVELS.find((l) => l.id === gameState.currentLevel) || LEVELS[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar Header */}
      <Navbar
        gameState={gameState}
        onNavigate={(mode) => {
          sounds.playClick();
          setGameState((prev) => ({ ...prev, gameMode: mode }));
        }}
        onToggleSound={handleToggleSound}
        onOpenCertificate={() => {
          sounds.playClick();
          setShowCertificate(true);
        }}
        onOpenGlossary={() => {
          sounds.playClick();
          setShowGlossary(true);
        }}
        onOpenScorm={() => {
          sounds.playClick();
          setShowScormModal(true);
        }}
        isLmsConnected={scormStatus.isLmsConnected}
      />

      {/* Main View Area */}
      <main className="flex-1 py-4 sm:py-8">
        {gameState.gameMode === 'map' && (
          <LevelMap
            gameState={gameState}
            onStartLevel={startLevel}
            onStartMiniGame={handleStartMiniGame}
            onSelectCharacter={handleSelectCharacter}
            onUpdateStudentName={handleUpdateStudentName}
            onOpenCertificate={() => setShowCertificate(true)}
          />
        )}

        {gameState.gameMode === 'campaign' && levelQuestions.length > 0 && (
          <QuestionCard
            question={levelQuestions[currentQuestionIndex]}
            questionIndex={currentQuestionIndex}
            totalQuestions={levelQuestions.length}
            characterId={gameState.selectedCharacter}
            lives={gameState.lives}
            score={gameState.score}
            streak={gameState.streak}
            onAnswer={handleAnswerQuestion}
            onNext={handleNextQuestion}
          />
        )}

        {gameState.gameMode === 'minigame' && (
          <>
            {gameState.activeMiniGame === 'deve-cuce' && (
              <DeveCuceGame
                characterId={gameState.selectedCharacter}
                onComplete={handleMiniGameComplete}
                onBack={() => setGameState((p) => ({ ...p, gameMode: 'map' }))}
              />
            )}
            {gameState.activeMiniGame === 'data-ladder' && (
              <DataLadderGame
                characterId={gameState.selectedCharacter}
                onComplete={handleMiniGameComplete}
                onBack={() => setGameState((p) => ({ ...p, gameMode: 'map' }))}
              />
            )}
            {gameState.activeMiniGame === 'password-lab' && (
              <PasswordTester
                characterId={gameState.selectedCharacter}
                onComplete={handleMiniGameComplete}
                onBack={() => setGameState((p) => ({ ...p, gameMode: 'map' }))}
              />
            )}
            {gameState.activeMiniGame === 'file-match' && (
              <FileExtensionMatcher
                characterId={gameState.selectedCharacter}
                onComplete={handleMiniGameComplete}
                onBack={() => setGameState((p) => ({ ...p, gameMode: 'map' }))}
              />
            )}
          </>
        )}
      </main>

      {/* Level Complete / Game Over Modal */}
      {showLevelComplete && (
        <LevelCompleteModal
          level={currentLevelInfo}
          characterId={gameState.selectedCharacter}
          correctCount={levelCorrectCount}
          totalCount={levelQuestions.length}
          earnedStars={
            levelCorrectCount === levelQuestions.length
              ? 3
              : levelCorrectCount >= Math.ceil(levelQuestions.length * 0.6)
              ? 2
              : 1
          }
          earnedScore={levelEarnedScore}
          isGameOverByLives={isGameOverByLives}
          onNextLevel={() => {
            sounds.playClick();
            if (gameState.currentLevel < 6) {
              startLevel(gameState.currentLevel + 1);
            } else {
              setGameState((p) => ({ ...p, gameMode: 'map' }));
              setShowLevelComplete(false);
              setShowCertificate(true);
            }
          }}
          onRetry={() => {
            sounds.playClick();
            startLevel(gameState.currentLevel);
          }}
          onBackToMap={() => {
            sounds.playClick();
            setShowLevelComplete(false);
            setGameState((p) => ({ ...p, gameMode: 'map' }));
          }}
        />
      )}

      {/* Glossary Modal */}
      <GlossaryModal
        isOpen={showGlossary}
        onClose={() => setShowGlossary(false)}
      />

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={showCertificate}
        gameState={gameState}
        onClose={() => setShowCertificate(false)}
      />

      {/* SCORM Modal */}
      <ScormModal
        isOpen={showScormModal}
        onClose={() => setShowScormModal(false)}
        scormStatus={scormStatus}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800 py-4 px-4 text-center text-xs text-slate-500">
        <p>
          MEB 5. Sınıf Bilişim Teknolojileri ve Yazılım Dersi · 1. Tema &quot;Bilişim Teknolojilerinin Hayatımızdaki Yeri&quot; · SCORM 1.2 / EBA Uyumlu
        </p>
      </footer>
    </div>
  );
}
