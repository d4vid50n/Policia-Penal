import React, { useState } from 'react';
import { TopicSelector } from './components/TopicSelector';
import { SubtopicSelector } from './components/SubtopicSelector';
import { QuizView } from './components/QuizView';
import { ResultView } from './components/ResultView';
import { WritingGuideView } from './components/WritingGuideView';
import { AppScreen, Question, SyllabusTopic } from './types';
import { generateSingleQuestion } from './services/geminiService';
import { ShieldCheck } from 'lucide-react';

// Total number of questions for a complete simulation session
const QUESTIONS_PER_SESSION = 5;

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>(AppScreen.SELECTION);
  const [currentTopic, setCurrentTopic] = useState<SyllabusTopic | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | undefined>(undefined);
  const [questions, setQuestions] = useState<Question[]>([]);
  
  // Loading states
  const [isInitializing, setIsInitializing] = useState(false); // Initial load of first question
  const [isLoadingNext, setIsLoadingNext] = useState(false);   // Loading subsequent questions

  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Step 1: User selects a main topic
  const handleTopicSelect = (topic: SyllabusTopic) => {
    setCurrentTopic(topic);
    // Go to subtopic selection screen instead of starting immediately
    setScreen(AppScreen.SUBTOPIC_SELECTION);
  };

  // Writing Guide Navigation
  const handleWritingSelect = () => {
    setScreen(AppScreen.WRITING_GUIDE);
  };

  // Step 2: User selects a subtopic (or chooses General)
  const handleSubtopicSelect = async (subtopic: string | undefined) => {
    if (!currentTopic) return;

    setSelectedSubtopic(subtopic);
    setIsInitializing(true);
    setError(null);
    setQuestions([]); 
    setScore(0);
    
    try {
      // Fetch just the first question to start quickly
      const firstQuestion = await generateSingleQuestion(currentTopic, subtopic);
      setQuestions([firstQuestion]);
      setScreen(AppScreen.QUIZ);
    } catch (err) {
      console.error(err);
      setError("Não foi possível iniciar o simulado. Verifique sua conexão e tente novamente.");
      // Remain on subtopic screen if error occurs
    } finally {
      setIsInitializing(false);
    }
  };

  // Called by QuizView when user clicks "Next Question"
  const handleLoadNextQuestion = async () => {
    if (!currentTopic) return;
    
    setIsLoadingNext(true);
    setError(null);

    try {
      const nextQuestion = await generateSingleQuestion(currentTopic, selectedSubtopic);
      setQuestions(prev => [...prev, nextQuestion]);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar a próxima questão. Tente novamente.");
    } finally {
      setIsLoadingNext(false);
    }
  };

  const handleQuizFinish = (userAnswers: number[], finalScore: number) => {
    setScore(finalScore);
    setScreen(AppScreen.RESULT);
  };

  const handleRetry = () => {
    // Retry with the same topic and subtopic context
    if (currentTopic) {
      handleSubtopicSelect(selectedSubtopic);
    }
  };

  const handleBackToTopics = () => {
    setScreen(AppScreen.SELECTION);
    setCurrentTopic(null);
    setSelectedSubtopic(undefined);
  };

  const handleHome = () => {
    setScreen(AppScreen.SELECTION);
    setCurrentTopic(null);
    setSelectedSubtopic(undefined);
    setQuestions([]);
    setScore(0);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={handleHome}>
            <div className="bg-blue-600 p-2 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none">Polícia Penal</h1>
              <p className="text-xs text-slate-400 font-medium">Plataforma de Treinamento</p>
            </div>
          </div>
          {screen !== AppScreen.SELECTION && (
            <button 
              onClick={handleHome}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Sair
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {error && (
          <div className="max-w-md mx-auto mt-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700 mx-4">
            <span className="mr-2">⚠️</span> {error}
          </div>
        )}

        {/* Screen 1: Topic Selection */}
        {screen === AppScreen.SELECTION && (
          <TopicSelector 
            onSelect={handleTopicSelect} 
            onSelectWriting={handleWritingSelect}
            isLoading={isInitializing} 
          />
        )}

        {/* Screen 2: Subtopic Selection */}
        {screen === AppScreen.SUBTOPIC_SELECTION && currentTopic && (
          <SubtopicSelector 
            topic={currentTopic} 
            onSelectSubtopic={handleSubtopicSelect}
            onBack={handleBackToTopics}
          />
        )}

        {/* Screen: Writing Guide */}
        {screen === AppScreen.WRITING_GUIDE && (
          <WritingGuideView onBack={handleBackToTopics} />
        )}

        {/* Screen 3: Loading Indicator (Overlay) */}
        {isInitializing && screen === AppScreen.SUBTOPIC_SELECTION && (
             <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-slate-800 font-medium animate-pulse">Gerando sua primeira questão...</p>
             </div>
        )}

        {/* Screen 4: Quiz */}
        {screen === AppScreen.QUIZ && currentTopic && (
          <QuizView 
            topic={currentTopic} 
            questions={questions} 
            totalQuestionsTarget={QUESTIONS_PER_SESSION}
            onLoadNext={handleLoadNextQuestion}
            isLoadingNext={isLoadingNext}
            onFinish={handleQuizFinish} 
          />
        )}

        {/* Screen 5: Result */}
        {screen === AppScreen.RESULT && currentTopic && (
          <ResultView 
            score={score} 
            total={questions.length} 
            topic={currentTopic} 
            onRetry={handleRetry}
            onHome={handleHome}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Simulado Polícia Penal. Desenvolvido para fins educativos.
          </p>
          <p className="text-slate-400 text-xs mt-2">
            Questões geradas por Inteligência Artificial baseadas no edital oficial.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;