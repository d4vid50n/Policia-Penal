export interface SyllabusTopic {
  id: string;
  title: string;
  iconName: string;
  description: string;
  content: string[]; // Detailed breakdown for the prompt
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizState {
  status: 'idle' | 'loading' | 'active' | 'finished' | 'error';
  currentTopicId: string | null;
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: number[]; // Index of selected answer for each question. -1 if not answered.
  score: number;
  error?: string;
}

export enum AppScreen {
  SELECTION = 'SELECTION',
  SUBTOPIC_SELECTION = 'SUBTOPIC_SELECTION',
  QUIZ = 'QUIZ',
  RESULT = 'RESULT',
  WRITING_GUIDE = 'WRITING_GUIDE',
}