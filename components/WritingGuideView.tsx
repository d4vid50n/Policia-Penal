import React from 'react';
import { ArrowLeft, CheckCircle2, Bookmark, PenTool, AlertTriangle, Ruler, Ban, FileWarning } from 'lucide-react';

interface WritingGuideViewProps {
  onBack: () => void;
}

export const WritingGuideView: React.FC<WritingGuideViewProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-slate-800">
      <button 
        onClick={onBack}
        className="flex items-center text-slate-500 hover:text-blue-600 mb-6 transition-colors font-medium"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Voltar para o Início
      </button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-10">
        <div className="bg-slate-900 p-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-600 p-3 rounded-lg">
              <PenTool className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Guia de Redação Oficial</h1>
          </div>
          <p className="text-slate-300 text-lg">
            Guia baseado nos itens 12.7 a 12.10 do edital da Polícia Penal.
          </p>
        </div>

        <div className="p-8 space-y-12">

          {/* Section: Official Rules (Crucial) */}
          <section className="bg-red-50 border border-red-100 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-red-900 mb-6 flex items-center">
              <AlertTriangle className="w-7 h-7 mr-3" />
              Regras Eliminatórias (O que zera sua prova)
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-red-800 mb-3 flex items-center">
                  <Ban className="w-5 h-5 mr-2" />
                  Nota ZERO imediata se:
                </h3>
                <ul className="space-y-2 text-sm text-red-900 bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                  <li className="flex items-start">
                    <span className="font-bold mr-2">•</span> Fugir do tema proposto.
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">•</span> Não escrever um texto dissertativo-argumentativo.
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">•</span> Letra ilegível.
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">•</span> Escrever a lápis ou caneta de outra cor.
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">•</span> <strong>Identificar a prova:</strong> assinar, desenhar, colocar números ou símbolos em qualquer lugar.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-slate-800 mb-3 flex items-center">
                  <Ruler className="w-5 h-5 mr-2" />
                  Limites e Formatação
                </h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                    <p className="font-bold text-slate-900 text-sm uppercase mb-1">Limite de Linhas (Item 12.7)</p>
                    <div className="flex items-center text-blue-700 font-bold text-lg">
                      Mínimo: 20 linhas <span className="mx-2 text-slate-300">|</span> Máximo: 30 linhas
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Textos com menos de 20 ou mais de 30 linhas perderão pontos ou serão desconsiderados.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                    <p className="font-bold text-slate-900 text-sm uppercase mb-1">Material (Item 12.8.b)</p>
                    <p className="text-sm text-slate-700">
                      Obrigatório o uso de <strong>caneta esferográfica de corpo transparente</strong> de tinta <strong>AZUL</strong> ou <strong>PRETA</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Section 1: Criteria */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <Bookmark className="w-6 h-6 text-blue-600 mr-2" />
              1. Critérios de Avaliação AOCP
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="font-bold text-blue-900 mb-2">Estrutura e Conteúdo</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-1 flex-shrink-0" /> Atendimento total ao tema.</li>
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-1 flex-shrink-0" /> Progressão textual lógica.</li>
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-1 flex-shrink-0" /> Argumentação consistente.</li>
                </ul>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Expressão Escrita</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-1 flex-shrink-0" /> Coesão (uso correto de conectivos).</li>
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-1 flex-shrink-0" /> Gramática normativa (acentos, crase, concordância).</li>
                  <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 mt-1 flex-shrink-0" /> Respeito às margens e parágrafos.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: Ideal Structure */}
          <section>
             <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <FileWarning className="w-6 h-6 text-blue-600 mr-2" />
              2. Estrutura Ideal (Para atingir 30 linhas)
            </h2>
            <p className="text-slate-600 mb-6">
              Para preencher as 20-30 linhas exigidas com qualidade, divida o texto em 4 parágrafos.
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50 rounded-r-lg">
                <h4 className="font-bold text-purple-900">1º Parágrafo: Introdução (~6 linhas)</h4>
                <p className="text-sm text-purple-800 mt-1">
                  Contextualização + Tese + Citação de 2 argumentos.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-lg">
                <h4 className="font-bold text-blue-900">2º Parágrafo: Desenvolvimento 1 (~8 linhas)</h4>
                <p className="text-sm text-blue-800 mt-1">
                  Tópico frasal + Repertório sociocultural (Lei, Dado, Filósofo) + Explicação + Fechamento.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-lg">
                <h4 className="font-bold text-blue-900">3º Parágrafo: Desenvolvimento 2 (~8 linhas)</h4>
                <p className="text-sm text-blue-800 mt-1">
                  Semelhante ao anterior, focando no segundo argumento (causa/consequência).
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded-r-lg">
                <h4 className="font-bold text-green-900">4º Parágrafo: Conclusão (~6 linhas)</h4>
                <p className="text-sm text-green-800 mt-1">
                  Retomada da tese + Proposta de Intervenção (Quem? O quê? Como? Para quê?) ou Síntese.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Skeleton */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <PenTool className="w-6 h-6 text-blue-600 mr-2" />
              3. Modelo Esqueleto (AOCP)
            </h2>
            
            <div className="bg-slate-100 p-6 rounded-xl font-mono text-sm md:text-base border border-slate-300 relative overflow-hidden shadow-inner">
               <div className="absolute top-2 right-2 text-xs font-sans bg-yellow-200 text-yellow-800 px-2 py-1 rounded font-bold">
                 MEMORIZE
               </div>
               
               <p className="mb-4 text-slate-500 italic text-xs border-b pb-2">Substitua os termos entre colchetes [...] pelo tema da prova.</p>

               <div className="space-y-6">
                 <div>
                   <span className="text-purple-600 font-bold">INTRO:</span> "É notório que <span className="text-slate-900 font-bold bg-white px-1">[TEMA]</span> representa um desafio intrínseco à sociedade brasileira. Sob essa ótica, é imperativo analisar não apenas <span className="text-slate-900 font-bold bg-white px-1">[ARGUMENTO 1]</span>, como também <span className="text-slate-900 font-bold bg-white px-1">[ARGUMENTO 2]</span>."
                 </div>

                 <div>
                   <span className="text-blue-600 font-bold">D1:</span> "Em primeira análise, cabe pontuar que <span className="text-slate-900 font-bold bg-white px-1">[EXPLICAÇÃO DO ARG 1]</span>. De acordo com a Constituição Federal, a segurança é direito de todos, entretanto, observa-se na prática que <span className="text-slate-900 font-bold bg-white px-1">[PROBLEMA]</span>..."
                 </div>

                 <div>
                    <span className="text-blue-600 font-bold">D2:</span> "Ademais, é fundamental destacar <span className="text-slate-900 font-bold bg-white px-1">[EXPLICAÇÃO DO ARG 2]</span>. Isso ocorre devido a <span className="text-slate-900 font-bold bg-white px-1">[CAUSA]</span>, o que acarreta <span className="text-slate-900 font-bold bg-white px-1">[CONSEQUÊNCIA]</span>..."
                 </div>

                 <div>
                   <span className="text-green-600 font-bold">CONCL:</span> "Portanto, medidas são necessárias para mitigar os impasses do <span className="text-slate-900 font-bold bg-white px-1">[TEMA]</span>. Cabe ao Estado, mediante políticas públicas, promover <span className="text-slate-900 font-bold bg-white px-1">[AÇÃO]</span>, a fim de garantir a efetividade da lei."
                 </div>
               </div>
            </div>
          </section>

          {/* Section 4: Connectors */}
          <section>
             <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <Bookmark className="w-6 h-6 text-blue-600 mr-2" />
              4. Conectivos (Coesão Textual)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
               <div className="p-4 bg-white border shadow-sm rounded-lg hover:bg-slate-50">
                 <div className="font-bold text-sm text-slate-500 mb-1">Início D1</div>
                 <div className="text-blue-600 font-medium">Primordialmente,<br/>Em primeiro plano,<br/>A princípio</div>
               </div>
               <div className="p-4 bg-white border shadow-sm rounded-lg hover:bg-slate-50">
                 <div className="font-bold text-sm text-slate-500 mb-1">Início D2</div>
                 <div className="text-blue-600 font-medium">Ademais,<br/>Outrossim,<br/>Em segunda análise</div>
               </div>
               <div className="p-4 bg-white border shadow-sm rounded-lg hover:bg-slate-50">
                 <div className="font-bold text-sm text-slate-500 mb-1">Conclusão</div>
                 <div className="text-blue-600 font-medium">Portanto,<br/>Em suma,<br/>Dessarte</div>
               </div>
               <div className="p-4 bg-white border shadow-sm rounded-lg hover:bg-slate-50">
                 <div className="font-bold text-sm text-slate-500 mb-1">Explicação</div>
                 <div className="text-blue-600 font-medium">Visto que,<br/>Haja vista,<br/>Porquanto</div>
               </div>
            </div>
          </section>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex items-start">
            <AlertTriangle className="text-yellow-600 w-6 h-6 mr-3 flex-shrink-0" />
            <p className="text-sm text-yellow-800">
              <strong>Lembre-se:</strong> O texto deve ser impessoal (nunca use "eu"). A folha definitiva é digitalizada, então a legibilidade é essencial para não zerar a prova (Item 12.10.1).
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};