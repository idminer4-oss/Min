
import { GoogleGenAI } from "@google/genai";

const AI_MODEL = 'gemini-3-flash-preview';

export const getAIResponse = async (userMessage: string) => {
  try {
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      return "Sistem AI sedang offline. Silakan hubungi admin di 083169046085 untuk bantuan manual.";
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: AI_MODEL,
      contents: userMessage,
      config: {
        systemInstruction: `You are the Customer Support AI for Coin IDR MINIER. 
        Your goal is to help users with deposits, withdrawals, and platform info.
        For deposit questions, simulate guidance to deposit to the DANA account: 083169046085.
        Keep answers helpful, tech-focused, and friendly.
        Rules: 
        1. Always mention that 1.0000 IDR Coin is equal to 1,000 IDR.
        2. Help with 'how to mine' or 'how to upgrade hashrate'.
        3. Be professional.`,
      },
    });
    return response.text || "Saya mengalami kendala koneksi. Silakan coba sesaat lagi.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Jaringan mining sedang padat. Silakan hubungi dukungan manual di 083169046085.";
  }
};
