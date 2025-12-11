import React, { useState, useEffect } from 'react';
import { Question, SyllabusTopic } from '../types';
import { CheckCircle, XCircle, ChevronRight, AlertCircle, Loader2 } from 'lucide-react';

interface QuizViewProps {
  topic: SyllabusTopic;
  questions: Question[];
  totalQuestionsTarget: number;
  isLoadingNext: boolean;
  onLoadNext: () => Promise<void>;
  onFinish: (userAnswers: number[], score: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ 
  topic, 
  questions, 
  totalQuestionsTarget,
  isLoadingNext,
  onLoadNext,
  onFinish 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  
  // Track answers and score locally
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];
  // Calculate progress based on the target total (e.g., 5 questions)
  const progress = ((currentIndex + 1) / totalQuestionsTarget) * 100;

  // Reset local state when moving to a new question index
  useEffect(() => {
    setSelectedOption(null);
    setIsConfirmed(false);
  }, [currentIndex]);

  const handleOptionSelect = (index: number) => {
    if (isConfirmed) return;
    setSelectedOption(index);
  };

  const handleConfirm = () => {
    if (selectedOption === null) return;

    // Record answer
    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedOption;
    setAnswers(newAnswers);

    const isCorrect = selectedOption === currentQuestion.correctAnswerIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setIsConfirmed(true);
  };

  const handleNextAction = async () => {
    // If we have more questions already loaded (rare in this new flow, but possible)
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      return;
    }

    // If we reached the target limit (e.g., 5 questions), finish
    if (currentIndex + 1 >= totalQuestionsTarget) {
      onFinish(answers, score);
      return;
    }

    // Otherwise, fetch the next question
    await onLoadNext();
    // After loading, increment index to show the new question
    setCurrentIndex(prev => prev + 1);
  };

  if (!currentQuestion) {
    return (
       <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="animate-spin text-blue-600 w-12 h-12 mb-4" />
          <p className="text-slate-600">Carregando questão...</p>
       </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header / Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
            {topic.title}
          </span>
          <span className="text-sm font-medium text-slate-600">
            Questão {currentIndex + 1} de {totalQuestionsTarget}
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-6">
        <div className="p-6 md:p-8">
          {/* 
              CHANGED: Added 'whitespace-pre-wrap' to ensure newlines from the API are respected.
              Also changed from h2 to div to prevent semantic nesting issues if content is complex.
          */}
          <div className="text-xl md:text-2xl font-medium text-slate-900 leading-relaxed mb-6 whitespace-pre-wrap font-serif">
            {currentQuestion.text}
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              let buttonClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-start space-x-3 ";
              
              if (isConfirmed) {
                if (idx === currentQuestion.correctAnswerIndex) {
                  buttonClass += "border-green-500 bg-green-50 text-green-900";
                } else if (idx === selectedOption) {
                  buttonClass += "border-red-500 bg-red-50 text-red-900";
                } else {
                  buttonClass += "border-slate-100 opacity-50";
                }
              } else {
                if (selectedOption === idx) {
                  buttonClass += "border-blue-500 bg-blue-50 shadow-md";
                } else {
                  buttonClass += "border-slate-100 hover:border-slate-300 hover:bg-slate-50";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={isConfirmed || isLoadingNext}
                  className={buttonClass}
                >
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border 
                    ${isConfirmed && idx === currentQuestion.correctAnswerIndex ? 'bg-green-500 border-green-500 text-white' : 
                      isConfirmed && idx === selectedOption ? 'bg-red-500 border-red-500 text-white' : 
                      selectedOption === idx ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-slate-300 text-slate-500'}`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="mt-1">{option}</span>
                  {isConfirmed && idx === currentQuestion.correctAnswerIndex && (
                    <CheckCircle className="ml-auto text-green-600 w-6 h-6 flex-shrink-0" />
                  )}
                  {isConfirmed && idx === selectedOption && idx !== currentQuestion.correctAnswerIndex && (
                    <XCircle className="ml-auto text-red-600 w-6 h-6 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation Section */}
        {isConfirmed && (
          <div className="bg-slate-50 p-6 border-t border-slate-200 animate-fade-in">
            <div className="flex items-start space-x-3">
              <AlertCircle className="text-blue-600 w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-800 mb-1">Comentário do Professor (IA):</h4>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base whitespace-pre-wrap">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Bar */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
          {!isConfirmed ? (
            <button
              onClick={handleConfirm}
              disabled={selectedOption === null || isLoadingNext}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition-all flex items-center"
            >
              Confirmar Resposta
            </button>
          ) : (
            <button
              onClick={handleNextAction}
              disabled={isLoadingNext}
              className="bg-slate-800 hover:bg-slate-900 disabled:bg-slate-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all flex items-center group min-w-[200px] justify-center"
            >
              {isLoadingNext ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  {currentIndex < totalQuestionsTarget - 1 ? 'Próxima Questão' : 'Ver Resultado'}
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};