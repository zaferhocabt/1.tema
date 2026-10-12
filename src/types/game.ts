export type CharacterId = 'pikso' | 'civciv' | 'lara' | 'bilge_arf';

export interface Character {
  id: CharacterId;
  name: string;
  title: string;
  avatarBg: string;
  textColor: string;
  accentColor: string;
  personality: string;
  quote: string;
  svgType: 'cat' | 'robot' | 'hero' | 'owl';
}

export type QuestionType = 
  | 'multiple-choice'
  | 'true-false'
  | 'matching'
  | 'scenario-choice'
  | 'timeline';

export interface Question {
  id: string;
  levelId: number;
  difficulty: 'kolay' | 'orta' | 'zor';
  topic: string;
  question: string;
  scenario?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
  badgeSkill?: string;
}

export interface LevelInfo {
  id: number;
  title: string;
  subtitle: string;
  topicTag: string;
  color: string;
  bgGradient: string;
  iconName: string;
  badgeName: string;
  badgeIcon: string;
  requiredStars: number;
  hasMiniGame?: boolean;
  miniGameType?: 'deve-cuce' | 'data-ladder' | 'file-match' | 'password-lab';
  miniGameTitle?: string;
}

export interface GameState {
  currentLevel: number;
  playerLevel: number; // Max unlocked level
  score: number;
  highScore: number;
  lives: number;
  maxLives: number;
  streak: number;
  studentName: string;
  selectedCharacter: CharacterId;
  completedLevels: Record<number, { stars: number; bestScore: number }>;
  soundEnabled: boolean;
  gameMode: 'campaign' | 'minigame' | 'map' | 'glossary';
  activeMiniGame?: 'deve-cuce' | 'data-ladder' | 'file-match' | 'password-lab';
}

export interface GlossaryItem {
  term: string;
  definition: string;
  category: string;
  example?: string;
}
