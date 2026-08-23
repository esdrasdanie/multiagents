import { ChatGoogleGenerativeAI } from '@langchain/google-genai'

export const ai = new ChatGoogleGenerativeAI({
  model: 'gemini-3-flash-preview',
  apiKey: process.env.GOOGLE_GEN_AI_API_KEY,
})