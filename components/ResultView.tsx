import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { SyllabusTopic, Question } from '../types';
import { RefreshCcw, Home } from 'lucide-react';

interface ResultViewProps {
  score: number;
  total: number;
  topic: SyllabusTopic;
  onRetry: () => void;
  onHome: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ score, total, topic, onRetry, onHome }) => {
  const percentage = Math.round((score / total) * 100);
  const correct = score;
  const incorrect = total - score;

  const data = [
    { name: 'Acertos', value: correct, color: '#22c55e' }, // Green-500
    { name: 'Erros', value: incorrect, color: '#ef4444' }, // Red-500
  ];

  let message = "";
  let subMessage = "";
  
  if (percentage >= 80) {
    message = "Excelente Desempenho!";
    subMessage = "Você está dominando este conteúdo. Continue assim!";
  } else if (percentage >= 50) {
    message = "Bom Trabalho!";
    subMessage = "Você está no caminho certo, mas ainda pode melhorar.";
  } else {
    message = "Precisa Estudar Mais";
    subMessage = "Revise o conteúdo teórico e tente novamente.";
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 p-8 text-center text-white">
          <h2 className="text-lg font-medium text-slate-300 uppercase tracking-widest mb-2">Resultado</h2>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{topic.title}</h1>
          <div className="text-5xl font-black text-blue-400 mt-6 mb-2">
            {percentage}%
          </div>
          <p className="text-slate-400">de aproveitamento</p>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">{message}</h3>
            <p className="text-slate-500">{subMessage}</p>
          </div>

          <div className="h-64 w-full mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onRetry}
              className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-blue-600/20"
            >
              <RefreshCcw className="w-5 h-5 mr-2" />
              Novo Simulado
            </button>
            <button
              onClick={onHome}
              className="flex items-center justify-center px-6 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl font-semibold transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Escolher Outro Tema
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};