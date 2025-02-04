import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = async (input) => {
  const genAI = new GoogleGenerativeAI("AIzaSyDqvkUKBkzVcHf8fJn_iJRLqFNiEwtneWc");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = input;
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export {gemini}