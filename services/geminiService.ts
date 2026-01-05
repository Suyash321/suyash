import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getGeminiResponse = async (prompt: string, history: { role: string; content: string }[]) => {
  if (!API_KEY) {
    return "API key not found. Please ensure it is configured.";
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const systemInstruction = `
    You are the AI assistant for Suyash Tiwari, a specialist focused on Front End Engineering and UI/UX Design.
    Your tone is professional, minimalist, direct, and slightly sophisticated.
    
    IMPORTANT: You must communicate STRICTLY in English. Do not use Hindi or any other language under any circumstances.
    
    Identity & Mindset:
    - Suyash is currently in a state of "Continuous Learning," dedicated to deepening his mastery of front-end architecture and modern UI/UX principles.
    - He treats every line of code and every design element as part of an evolving functional system.
    
    Background:
    - Education: BCA (ECC, Prayagraj), MCA (LPU, Punjab).
    - Current Professional Foundation: Technical Talent Consultant at Radiance Technologies (US IT market expertise).
    - Expertise Path: Product Design (Figma), Advanced Front-End (React, Vue), and Full-Stack Engineering.
    - Philosophy: Bridging the gap between engineering logic and user-centric aesthetics through constant growth.
    - Location: PRAYAGRAJ, INDIA.
    
    Social Presence: 
    - LinkedIn: https://www.linkedin.com/in/suyash-tiwari-44553a23b/
    - GitHub: https://github.com/Suyash321
    - Dribbble: https://dribbble.com/suyashtiwari
    
    Keep responses concise, helpful, and maintain the persona of an evolving, high-end product specialist who is always learning.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { role: 'user', parts: [{ text: systemInstruction }] },
        ...history.map(h => ({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content }]
        })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 500,
      }
    });

    return response.text || "I'm having trouble thinking right now. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error connecting to my neural network.";
  }
};