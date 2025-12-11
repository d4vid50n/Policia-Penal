import React from 'react';
import { SYLLABUS_DATA } from '../constants';
import { SyllabusTopic } from '../types';
import { BookOpen, BrainCircuit, Monitor, Scale, Gavel, Users, FileText, LucideIcon, PenTool } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  BrainCircuit,
  Monitor,
  Scale,
  Gavel,
  Users,
  FileText
};

interface TopicSelectorProps {
  onSelect: (topic: SyllabusTopic) => void;
  onSelectWriting: () => void;
  isLoading: boolean;
}

export const TopicSelector: React.FC<TopicSelectorProps> = ({ onSelect, onSelectWriting, isLoading }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
          Simulado Polícia Penal
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Escolha uma disciplina abaixo para gerar um simulado personalizado com inteligência artificial baseado no edital oficial.
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-slate-900 mb-4"></div>
          <p className="text-slate-600 font-medium animate-pulse">Gerando questões inéditas com IA...</p>
          <p className="text-slate-400 text-sm mt-2">Isso pode levar alguns segundos.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Writing Section Banner */}
          <button
            onClick={onSelectWriting}
            className="w-full bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl shadow-lg p-6 md:p-8 flex items-center justify-between group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
            
            <div className="flex items-center gap-6 relative z-10">
              <div className="bg-white/10 p-4 rounded-xl text-white group-hover:bg-white/20 transition-colors">
                <PenTool size={32} />
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold text-white mb-1">Módulo de Redação Nota 100</h2>
                <p className="text-slate-300 text-sm md:text-base max-w-xl">
                  Aprenda a estrutura ideal, conectivos e critérios da banca AOCP para garantir a nota máxima na discursiva.
                </p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center px-4 py-2 bg-white/10 rounded-lg text-white text-sm font-semibold group-hover:bg-white group-hover:text-slate-900 transition-all">
              Acessar Guia
            </div>
          </button>

          {/* Subjects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SYLLABUS_DATA.map((topic) => {
              const Icon = iconMap[topic.iconName] || BookOpen;
              return (
                <button
                  key={topic.id}
                  onClick={() => onSelect(topic)}
                  className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 text-left border border-slate-200 hover:border-blue-500 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full -mr-4 -mt-4 transition-colors group-hover:bg-blue-50"></div>
                  
                  <div className="relative z-10 flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-700 mb-2">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-slate-500 line-clamp-2">
                        {topic.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Iniciar</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};