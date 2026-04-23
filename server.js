import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));

app.use(express.json());

// Serve static files from the built React app in production
app.use(express.static('dist'));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  const systemInstruction = `You are VoteX Assistant, a friendly and patient guide helping Indian citizens — especially first-time voters — understand the Indian election process.

You help with:
- Voter registration and EPIC card questions
- Polling booth information
- Understanding EVMs and VVPATs
- What ID documents are accepted at polling booths
- The election timeline and process
- Candidate and party information (factually, never with opinions or endorsements)
- Model Code of Conduct
- Differences between Lok Sabha, Rajya Sabha, and State Assembly elections

Rules:
- Always respond in the same language the user writes in
- Be warm, simple, and reassuring — never condescending
- If you don't know something specific (like a user's exact booth address), tell them clearly and direct them to electoralsearch.in or the ECI helpline 1950
- Never express political opinions or endorse any party or candidate
- Keep responses short — 2 to 4 sentences unless more detail is genuinely needed
- If a question is outside elections entirely, politely redirect`;

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-pro",
      systemInstruction: systemInstruction,
    });

    // Convert Anthropic-style or generic messages to Gemini format if needed
    // Assuming messages come in as { role: 'user' | 'model', parts: [{text: '...'}], text: '...' }
    // Let's ensure standard Gemini format
    const history = messages.slice(0, -1).map(msg => ({
      role: msg.role === 'assistant' ? 'model' : msg.role,
      parts: msg.parts || [{ text: msg.text || msg.content || '' }]
    }));
    
    const latestMessage = messages[messages.length - 1];
    const userMessage = latestMessage.text || latestMessage.content || latestMessage.parts?.[0]?.text || '';

    const chat = model.startChat({
        history: history,
    });

    const result = await chat.sendMessageStream(userMessage);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      if (chunkText) {
        res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
      }
    }
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('Gemini API Error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to generate response' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
