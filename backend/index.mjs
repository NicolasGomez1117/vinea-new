// backend/index.mjs
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import OpenAI from 'openai'

dotenv.config()

if (!process.env.OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY in process.env")
  process.exit(1)
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const app = express()

app.use(cors())         
app.use(express.json())

app.post('/analyze', async (req, res) => {
  const { text } = req.body
  if (typeof text !== 'string') {
    return res.status(400).json({ error: 'Expected { text: string }' })
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are a JSON generator.  When given user text, respond with exactly one
JSON object with these SIX keys: "joy","sadness","anger","fear","surprise","neutral".
Each value must be a number between 0 and 1.  DO NOT output any extra text,
markdown, or explanation—just the JSON.`,
        },
        { role: "user", content: text },
      ],
    })

    // Grab the raw text
    const raw = completion.choices[0].message.content.trim()

    // Sanity‐check: must start with "{"
    if (!raw.startsWith("{")) {
      console.error("Non‐JSON from OpenAI:", raw)
      return res
        .status(500)
        .json({ error: "Unexpected response format from OpenAI" })
    }

    // Send back _just_ the JSON string
    res.type("application/json").send(raw)

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message || "OpenAI error" })
  }
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`⚡️ Server listening on http://localhost:${port}`)
})
