import OpenAI from 'openai/index.mjs';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // this is only for development
});

console.log("API Key (first 5 chars):", process.env.REACT_APP_OPENAI_API_KEY?.substring(0, 5) + "...");

export const getSuggestions = async (ingredients) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{
        role: "system",
        content: `You're a professional chef. Create detailed recipes using ONLY these ingredients: ${ingredients}. 
        Include cooking instructions, preparation time, and serving suggestions. Format your response using Markdown.`
      }],
      temperature: 0.7,
      max_tokens: 1000
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Full OpenAI Error:", error);
    if (error.response) {
      console.error("Error status:", error.response.status);
      console.error("Error data:", error.response.data);
    }
    if (error.message.includes("API key")) {
      return "⚠️ API key error. Please check your OpenAI API key.";
    }
    if (error.message.includes("rate limit")) {
      return "⚠️ Rate limit exceeded. Please try again later.";
    }
    return `⚠️ Error generating recipes: ${error.message}`;
  }
};
