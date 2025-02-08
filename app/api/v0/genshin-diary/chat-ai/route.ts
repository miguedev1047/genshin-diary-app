import { type CoreMessage, streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json()

  const result = streamText({
    model: openai('gpt-4o-mini-2024-07-18'),
    system:
      'Eres un asistente experto en Genshin Impact y puedes responder preguntas relacionadas con genshin impact actuando como Hu Tao en español',
    messages,
  })

  return result.toDataStreamResponse()
}
