// src/lib/openai.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // only for frontend use; insecure for prod
});

export const generateChatResponse = async (userMessage: string, lifePlanContext?: string) => {
  const systemPrompt = `
You are a helpful and motivational Ikigai Life Plan Assistant. Based on a user's life plan, give thoughtful and actionable responses.
${lifePlanContext ? `\n\nUser's life plan:\n${lifePlanContext}` : ''}
`;

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    // store: true,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ],
    temperature: 0.7,
  });
  console.log('Calling OpenAI with:', userMessage);


  return res.choices[0].message.content;
};

