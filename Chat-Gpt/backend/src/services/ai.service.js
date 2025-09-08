const { GoogleGenAI } = require("@google/genai");


const ai = new GoogleGenAI({});

async function generateResponse(data) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: data,
  });
  return (response.text);
}

module.exports = {generateResponse};
