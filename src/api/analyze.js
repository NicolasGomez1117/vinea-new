// /api/analyze.js
import OpenAI from 'openai';
import Config from 'react-native-config';

const openai = new OpenAI({
  apiKey: Config.OPENAI_API_KEY,
});

export default async (req, res) => {
  const { text } = req.body;
  const response = await openai.chat.completions.create({ /* … */ });
  res.json(response);
};
