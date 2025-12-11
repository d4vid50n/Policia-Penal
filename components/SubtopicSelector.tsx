import React from 'react';
import { SyllabusTopic } from '../types';
import { ArrowLeft, Target, Layers } from 'lucide-react';

interface SubtopicSelectorProps {
  topic: SyllabusTopic;
  onSelectSubtopic: (subtopic: string | undefined) => void;
  onBack: () => void;
}

export const SubtopicSelector: React.FC<SubtopicSelectorProps> = ({ topic, onSelectSubtopic, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button 
        onClick={onBack}
        className="flex items-center text-slate-500 hover:text-blue-600 mb-6 transition-colors font-medium"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Voltar para Disciplinas
      </button>

      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
          {topic.title}
        </h2>
        <p className="text-slate-600">
          Selecione um tópico específico para o simulado ou escolha "Geral" para misturar todos.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* General Option */}
        <button
          onClick={() => onSelectSubtopic(undefined)}
          className="group flex items-center p-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
        >
          <div className="bg-white/20 p-3 rounded-lg mr-4">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-lg">Simulado Geral</h3>
            <p className="text-blue-100 text-sm">Questões misturadas de todos os tópicos abaixo.</p>
          </div>
        </button>

        <div className="my-4 border-b border-slate-200" />

        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Tópicos Específicos</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topic.content.map((item, index) => (
            <button
              key={index}
              onClick={() => onSelectSubtopic(item)}
              className="group flex items-start p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left"
            >
              <Target className="w-5 h-5 text-slate-400 group-hover:text-blue-600 mt-1 mr-3 flex-shrink-0" />
              <span className="text-slate-700 group-hover:text-blue-800 font-medium text-sm md:text-base">
                {item}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};