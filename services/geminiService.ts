import { GoogleGenAI, Type } from "@google/genai";
import { Question, SyllabusTopic } from "../types";

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API_KEY is missing from environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-to-prevent-crash' });

/**
 * Generates a SINGLE question.
 * @param topic The main syllabus topic (e.g., Legislação Especial)
 * @param specificSubtopic (Optional) A specific string from the content list to focus on (e.g., "Lei de Drogas")
 */
export const generateSingleQuestion = async (topic: SyllabusTopic, specificSubtopic?: string): Promise<Question> => {
  const modelId = "gemini-2.5-flash";
  
  // Construct the focus part of the prompt
  let focusInstruction = "";
  
  if (specificSubtopic && specificSubtopic !== "Geral (Todos os tópicos)") {
    focusInstruction = `
    ATENÇÃO: A questão DEVE ser EXCLUSIVAMENTE sobre o seguinte tópico específico:
    "${specificSubtopic}"
    Não gere questões sobre outros assuntos.
    `;
  } else {
    focusInstruction = `
    Tópicos do edital (escolha um sub-tema aleatório desta lista para focar):
    ${topic.content.join('\n- ')}
    `;
  }

  const prompt = `
    Você é um examinador especialista em concursos públicos para a Polícia Penal, com foco total na banca INSTITUTO AOCP.
    
    Crie UMA ÚNICA questão de múltipla escolha inédita sobre a disciplina: ${topic.title}
    
    ${focusInstruction}
    
    Requisitos obrigatórios (Estilo AOCP):
    1. A questão deve seguir RIGOROSAMENTE o estilo da banca AOCP (Instituto AOCP).
    2. CARACTERÍSTICAS DA BANCA:
       - Se for Direito/Legislação: Cobre a literalidade da lei ("lei seca"), mas pode apresentar situações hipotéticas simples.
       - Se for Português: Foque em gramática normativa aplicada ao texto e reescrita de frases.
       - Se for Raciocínio Lógico: Seja direto e objetivo.
    3. Deve ter 5 alternativas (A, B, C, D, E).
    4. IMPORTANTE: A alternativa correta deve ser sorteada aleatoriamente entre as opções (não favoreça a letra A).
    5. Forneça uma explicação detalhada (gabarito comentado) citando o artigo da lei quando aplicável.
    6. FORMATAÇÃO DO TEXTO: Se a questão envolver afirmações (I, II, III...) ou textos de referência, use quebras de linha ("\\n") para separá-las claramente. O texto deve ser visualmente organizado.
    7. Retorne APENAS um Objeto JSON (não uma lista).
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING, description: "O enunciado da questão. Use \\n para quebras de linha em listas ou afirmações (I, II, III)." },
            options: { 
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Lista de 5 alternativas"
            },
            correctAnswerIndex: { type: Type.INTEGER, description: "Índice (0-4) da alternativa correta" },
            explanation: { type: Type.STRING, description: "Explicação do porquê a resposta está correta" }
          },
          required: ["text", "options", "correctAnswerIndex", "explanation"]
        },
        temperature: 0.7, 
      }
    });

    if (response.text) {
      const q = JSON.parse(response.text);
      
      let validIndex = q.correctAnswerIndex;
      if (validIndex < 0 || validIndex >= q.options.length) {
        validIndex = 0;
      }

      return {
        id: `${topic.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        text: q.text,
        options: q.options,
        correctAnswerIndex: validIndex,
        explanation: q.explanation
      };
    } else {
      throw new Error("Empty response from AI");
    }

  } catch (error) {
    console.error("Error generating question:", error);
    throw new Error("Falha ao gerar questão. Tente novamente.");
  }
};